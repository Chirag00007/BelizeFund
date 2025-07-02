const express = require('express');
const { body, validationResult } = require('express-validator');
const Application = require('../models/Application');
const zohoService = require('../services/zohoService');

const router = express.Router();

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
        message: 'Missing required fields: projectTitle, contactName, contactEmail'
      });
    }

    // Create concept record in Zoho Creator
    const result = await zohoService.createConceptRecord(conceptData);
    
    res.status(201).json({
      success: true,
      message: 'Concept paper record created successfully in Zoho Creator',
      data: result
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