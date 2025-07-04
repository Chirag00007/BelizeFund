const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const Application = require('../models/Application');
const zohoService = require('../services/zohoService');
const emailService = require('../services/emailService');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Validation middleware
const validateApplication = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('mobile').notEmpty().withMessage('Mobile number is required'),
  body('organizationName').notEmpty().withMessage('Organization name is required'),
];

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .select('applicationId organizationName firstName lastName applicationStatus createdAt updatedAt');
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      message: 'Error fetching applications', 
      error: error.message 
    });
  }
});

// Get application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ 
      message: 'Error fetching application', 
      error: error.message 
    });
  }
});

// Create new application
router.post('/', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(400).json({ 
      message: 'Error creating application', 
      error: error.message 
    });
  }
});

// Update application (for saving progress)
router.put('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(400).json({ 
      message: 'Error updating application', 
      error: error.message 
    });
  }
});

// Save progress (partial update)
router.put('/:id/progress', async (req, res) => {
  try {
    const { currentStep, stepData, completedSteps } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        ...stepData,
        currentStep,
        completedSteps,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(400).json({ 
      message: 'Error saving progress', 
      error: error.message 
    });
  }
});

// Submit application (final submission)
router.put('/:id/submit', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        applicationStatus: 'submitted',
        submittedAt: new Date(),
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Create record in Zoho Creator
    let zohoResult = null;
    try {
      zohoResult = await zohoService.createProposalRecord(req.body);
      console.log('Zoho Creator record created successfully:', zohoResult);
    } catch (zohoError) {
      console.error('Error creating Zoho Creator record:', zohoError);
      // Continue with application submission even if Zoho fails
    }
    
    res.json({
      ...application.toObject(),
      zohoRecordId: zohoResult?.recordId,
      zohoSuccess: !!zohoResult?.success,
      zohoError: zohoResult ? null : 'Failed to create Zoho Creator record'
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(400).json({ 
      message: 'Error submitting application', 
      error: error.message 
    });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ 
      message: 'Error deleting application', 
      error: error.message 
    });
  }
});

// Get applications by status
router.get('/status/:status', async (req, res) => {
  try {
    const applications = await Application.find({ 
      applicationStatus: req.params.status 
    }).sort({ created: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications by status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create record in Zoho Creator
router.post('/zoho/create', async (req, res) => {
  try {
    const proposalData = req.body;
    
    // Validate required fields
    if (!proposalData.projectTitle || !proposalData.contactName || !proposalData.email) {
      return res.status(400).json({
        message: 'Missing required fields: projectTitle, contactName, email'
      });
    }

    // Create record in Zoho Creator
    const result = await zohoService.createProposalRecord(proposalData);
    
    res.status(201).json({
      success: true,
      message: 'Record created successfully in Zoho Creator',
      data: result
    });
  } catch (error) {
    console.error('Error creating record in Zoho Creator:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating record in Zoho Creator',
      error: error.response?.data || error.message
    });
  }
});

// Create record in Zoho Creator for concept paper
router.post('/concept/zoho/create', async (req, res) => {
  try {
    const conceptData = req.body;
    
    // Validate required fields for concept paper
    if (!conceptData.projectTitle || !conceptData.contactName || !conceptData.contactEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: projectTitle, contactName, contactEmail'
      });
    }

    // --- Preliminary Eligibility Check ---
    const checkEligibility = (data) => {
      const { organizationType, otherOrganizationType, dateOfIncorporation } = data;
      const disallowedTypes = ['Statutory Body', 'Government'];
      let finalOrgType = organizationType;

      if (organizationType === 'Other' && otherOrganizationType) {
        finalOrgType = otherOrganizationType;
      }

      if (disallowedTypes.some(type => finalOrgType.toLowerCase().includes(type.toLowerCase()))) {
        return { eligible: false, reason: 'Organization type is not eligible.' };
      }

      if (!dateOfIncorporation) {
        return { eligible: false, reason: 'Date of incorporation is required for eligibility check.' };
      }

      const incorporationDate = new Date(dateOfIncorporation);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      if (incorporationDate > oneYearAgo) {
        return { eligible: false, reason: 'Organization must have existed for at least one year.' };
      }

      return { eligible: true };
    };

    const eligibility = checkEligibility(conceptData);

    // Always create the record in Zoho regardless of eligibility
    const result = await zohoService.createConceptRecord(conceptData);

    // Send email based on eligibility
    if (eligibility.eligible) {
      const successEmailHtml = emailService.getSuccessEmailTemplate(conceptData.contactName);
      await emailService.sendEmail(
        conceptData.contactEmail,
        'Concept Paper Submission Successful',
        successEmailHtml
      );
    } else {
      const ineligibleEmailHtml = emailService.getIneligibleEmailTemplate(conceptData.contactName, eligibility.reason);
      await emailService.sendEmail(
        conceptData.contactEmail,
        'Concept Paper Submission Status',
        ineligibleEmailHtml
      );
    }
    
    // Respond to frontend
    res.status(201).json({
      success: true,
      message: 'Concept paper record created successfully in Zoho Creator',
      data: result,
      eligibility: eligibility // Optionally send eligibility status to frontend
    });

  } catch (error) {
    console.error('Error creating concept record in Zoho Creator:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating concept paper record in Zoho Creator',
      error: error.response?.data || error.message
    });
  }
});

// Endpoint to upload a single file to a concept record
router.post('/concept/upload', upload.single('file'), async (req, res) => {
  try {
    const { recordId, fieldName } = req.body;
    const file = req.file;

    if (!recordId || !fieldName || !file) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: recordId, fieldName, and file are required.'
      });
    }

    console.log(`File upload request for record ${recordId}, field ${fieldName}`);

    const result = await zohoService.uploadFileToRecord(
      recordId,
      fieldName,
      file.buffer,
      file.originalname
    );

    if (result.success) {
      res.status(200).json({
        success: true,
        message: `File uploaded successfully to ${fieldName}`,
        data: result.data
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Failed to upload file: ${result.message}`,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error uploading file to concept record:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file to concept record',
      error: error.message
    });
  }
});

// Test Zoho connection
router.get('/zoho/test', async (req, res) => {
  try {
    const accessToken = await zohoService.getValidAccessToken();
    res.json({
      success: true,
      message: 'Zoho connection successful',
      hasAccessToken: !!accessToken
    });
  } catch (error) {
    console.error('Error testing Zoho connection:', error);
    res.status(500).json({
      success: false,
      message: 'Zoho connection failed',
      error: error.message
    });
  }
});

module.exports = router; 