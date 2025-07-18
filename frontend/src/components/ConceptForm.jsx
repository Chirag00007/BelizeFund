import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { applicationService } from '../services/applicationService'
import { 
  FileText, 
  Building2, 
  User, 
  Calendar, 
  Award, 
  Target, 
  Lightbulb, 
  Activity, 
  DollarSign, 
  FileCheck,
  Save,
  Send
} from 'lucide-react'

// Utility to get funding and co-financing requirements based on Regular Grants Funding Window
const getAwardRequirements = (awardCategory, totalBudgetRequested, totalCoFinancing) => {
  // All amounts in BZD
  let limits = {
    min: 0,
    max: Infinity,
    coFinMin: 0,
    coFinMax: 100,
    coFinRequired: false,
    coFinText: '',
    fundingText: '',
    maxDuration: '',
    durationText: '',
  };
  
  if (!awardCategory) return limits;
  
  if (awardCategory === 'Community Grant') {
    limits.max = 50000;
    limits.fundingText = 'Awards do not exceed BZ$50,000.00';
    limits.coFinRequired = false;
    limits.coFinText = 'No co-financing required for Community Grant (≤ BZ$50,000.00)';
    limits.maxDuration = 18;
    limits.durationText = 'Projects must not exceed eighteen (18) months in duration';
  } else if (awardCategory === 'Small Grants') {
    limits.max = 50000;
    limits.fundingText = 'Awards do not exceed BZ$50,000.00';
    limits.coFinRequired = false;
    limits.coFinText = 'No co-financing required for Small Grants (≤ BZ$50,000.00)';
    limits.maxDuration = 18;
    limits.durationText = 'Projects must not exceed eighteen (18) months in duration';
  } else if (awardCategory === 'Medium Grants') {
    limits.min = 50000.01;
    limits.max = 150000;
    limits.fundingText = 'Awards between BZ$50,000.00 and BZ$150,000.00';
    limits.coFinRequired = true;
    limits.coFinMin = 10;
    limits.coFinMax = 25;
    limits.coFinText = 'Co-financing required: 10–25% of total project cost';
    limits.maxDuration = 24;
    limits.durationText = 'Projects must not exceed two (2) years in duration';
  } else if (awardCategory === 'Large Grants') {
    limits.min = 150000.01;
    limits.max = 500000;
    limits.fundingText = 'Awards over BZ$150,000.00 up to BZ$500,000.00';
    limits.coFinRequired = true;
    limits.coFinMin = 25;
    limits.coFinMax = 50;
    limits.coFinText = 'Co-financing required: 25–50% of total project cost';
    limits.maxDuration = 36;
    limits.durationText = 'Projects must not exceed three (3) years in duration';
  }
  
  // Calculate actual co-fin %
  const totalProjectCost = (parseFloat(totalBudgetRequested) || 0) + (parseFloat(totalCoFinancing) || 0);
  limits.actualCoFinPct = totalProjectCost > 0 ? ((parseFloat(totalCoFinancing) || 0) / totalProjectCost * 100) : 0;
  return limits;
};

// Validation Schema
const conceptSchema = yup.object().shape({
  // Background Information
  projectTitle: yup.string()
    .required('Project title is required')
    .test('word-count', 'Project title should be 15 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).length
      return wordCount <= 15
    }),
  organizationName: yup.string().required('Organization name is required'),
  organizationAddress: yup.string().required('Organization address is required'),
  district: yup.string().required('District is required'),
  organizationType: yup.string().required('Organization type is required'),
  otherOrganizationType: yup.string().when('organizationType', {
    is: 'Other',
    then: yup.string().required('Please specify organization type')
  }),
  dateOfIncorporation: yup.date().required('Date of incorporation is required'),
  
  // Main Contact
  contactName: yup.string().required('Contact name is required'),
  contactPosition: yup.string().required('Contact position is required'),
  contactEmail: yup.string().email('Invalid email').required('Contact email is required'),
  contactTelephone: yup.string().required('Contact telephone is required'),
  
  // Project Duration
  proposedStartDate: yup.date().required('Start date is required'),
  durationMonths: yup.number()
    .positive('Duration must be positive')
    .required('Duration is required')
    .test('award-duration-limits', 'Project duration exceeds the maximum allowed for the selected award category.', function(value) {
      const { awardCategory } = this.parent;
      const limits = getAwardRequirements(awardCategory, this.parent.totalBudgetRequested, this.parent.totalCoFinancing);
      if (!awardCategory || !limits.maxDuration) return true;
      if (typeof value !== 'number' || isNaN(value)) return false;
      return value <= limits.maxDuration;
    }),
  
  // Award Category
  thematicArea: yup.string().required('Thematic area is required'),
  awardCategory: yup.string().required('Award category is required'),
  
  // Content Sections
  projectSummary: yup.string()
    .required('Project summary is required')
    .test('word-count', 'Summary should be 250 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 250
    }),
  
  projectGoalObjectives: yup.string()
    .required('Project goals and objectives are required')
    .test('word-count', 'Content should be 200 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 200
    }),
    
  projectOutputsActivities: yup.string()
    .required('Project outputs and activities are required')
    .test('word-count', 'Content should be 500 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 500
    }),
  
  // Budget
  totalBudgetRequested: yup.number()
    .min(0)
    .test('award-funding-limits', 'Requested amount does not meet the funding limits for the selected award category.', function(value) {
      const { awardCategory } = this.parent;
      const limits = getAwardRequirements(awardCategory, value, this.parent.totalCoFinancing);
      if (!awardCategory) return true;
      if (typeof value !== 'number' || isNaN(value)) return false;
      return value >= limits.min && value <= limits.max;
    }),
  totalCoFinancing: yup.number()
    .min(0)
    .test('award-cofin-limits', 'Co-financing does not meet the requirements for the selected award category.', function(value) {
      const { awardCategory, totalBudgetRequested } = this.parent;
      const limits = getAwardRequirements(awardCategory, totalBudgetRequested, value);
      if (!awardCategory) return true;
      if (!limits.coFinRequired) return true;
      const totalProjectCost = (parseFloat(totalBudgetRequested) || 0) + (parseFloat(value) || 0);
      if (totalProjectCost === 0) return true;
      const pct = (parseFloat(value) || 0) / totalProjectCost * 100;
      return pct >= limits.coFinMin && pct <= limits.coFinMax;
    }),
  
  // Declaration
  legalRepresentativeName: yup.string().required('Legal representative name is required'),
  declarationDate: yup.date().required('Declaration date is required'),
  
  // Required Documentation
  hasRegistrationCert: yup.boolean(),
  hasArticles: yup.boolean(),
  hasCertGoodStanding: yup.boolean(),
  hasReadImportantNote: yup.boolean(),
  registrationCertFile: yup.mixed(),
  articlesFile: yup.mixed(),
  certGoodStandingFile: yup.mixed(),
})

const ConceptForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCounts, setWordCounts] = useState({
    projectSummary: 0,
    projectGoalObjectives: 0,
    projectOutputsActivities: 0
  })

  const formik = useFormik({
    initialValues: {
      // Background Information
      projectTitle: '',
      organizationName: '',
      organizationAddress: '',
      district: '',
      organizationType: '',
      otherOrganizationType: '',
      dateOfIncorporation: '',
      
      // Main Contact
      contactName: '',
      contactPosition: '',
      contactEmail: '',
      contactTelephone: '',
      
      // Project Duration
      proposedStartDate: '',
      durationMonths: '',
      
      // Award Category & Thematic Area
      thematicArea: '',
      awardCategory: '',
      
      // Content Sections
      projectSummary: '',
      projectGoalObjectives: '',
      projectOutputsActivities: '',
      
      // Budget Components
      salaryBudget: 0,
      travelBudget: 0,
      equipmentBudget: 0,
      contractedServicesBudget: 0,
      operationalBudget: 0,
      educationBudget: 0,
      trainingBudget: 0,
      administrativeBudget: 0,
      totalCoFinancing: 0,
      
      // Declaration
      legalRepresentativeName: '',
      declarationDate: '',

      // Required Documentation
      hasRegistrationCert: false,
      hasArticles: false,
      hasCertGoodStanding: false,
      hasReadImportantNote: false,
      registrationCertFile: null,
      articlesFile: null,
      certGoodStandingFile: null,
    },
    validationSchema: conceptSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const loadingToast = toast.loading('Submitting your concept paper...');
      try {
        console.log('Concept Paper Submitted:', values)
        
        // Submit to Zoho Creator via backend API
        const result = await applicationService.submitConceptPaper(values);
        
        toast.dismiss(loadingToast);
        
        if (result.success) {
          toast.success(result.message || 'Concept paper submitted successfully!');
          console.log('Zoho Creator submission result:', result);
          
          // Clear saved draft
          localStorage.removeItem('conceptFormData');
          
          // Reset form
          formik.resetForm();
          setWordCounts({
            projectSummary: 0,
            projectGoalObjectives: 0,
            projectOutputsActivities: 0
          });
        } else {
          throw new Error(result.message || 'Failed to submit concept paper');
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error(`Error submitting concept paper: ${error.message}`);
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  })

  // Word count tracking
  const updateWordCount = (fieldName, value) => {
    const wordCount = value ? value.trim().split(/\s+/).filter(word => word.length > 0).length : 0
    setWordCounts(prev => ({ ...prev, [fieldName]: wordCount }))
  }

  // Load saved draft on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('conceptFormData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        formik.setValues(parsedData)
        
        // Update word counts for loaded data
        updateWordCount('projectSummary', parsedData.projectSummary || '')
        updateWordCount('projectGoalObjectives', parsedData.projectGoalObjectives || '')
        updateWordCount('projectOutputsActivities', parsedData.projectOutputsActivities || '')
        
        toast.success('Draft loaded successfully!')
      } catch (error) {
        console.error('Error loading saved draft:', error)
        localStorage.removeItem('conceptFormData')
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-update duration field when award category changes
  useEffect(() => {
    if (formik.values.awardCategory) {
      const requirements = getAwardRequirements(formik.values.awardCategory, formik.values.totalBudgetRequested, formik.values.totalCoFinancing);
      const currentDuration = parseFloat(formik.values.durationMonths) || 0;
      
      // If current duration exceeds the new limit, update it to the maximum allowed
      if (currentDuration > requirements.maxDuration) {
        formik.setFieldValue('durationMonths', requirements.maxDuration);
        toast.info(`Duration updated to maximum allowed for ${formik.values.awardCategory}: ${requirements.maxDuration} months`);
      }
    }
  }, [formik.values.awardCategory]) // eslint-disable-line react-hooks/exhaustive-deps

  // Calculate budget totals
  const totalBudgetRequested = 
    (parseFloat(formik.values.salaryBudget) || 0) +
    (parseFloat(formik.values.travelBudget) || 0) +
    (parseFloat(formik.values.equipmentBudget) || 0) +
    (parseFloat(formik.values.contractedServicesBudget) || 0) +
    (parseFloat(formik.values.operationalBudget) || 0) +
    (parseFloat(formik.values.educationBudget) || 0) +
    (parseFloat(formik.values.trainingBudget) || 0) +
    (parseFloat(formik.values.administrativeBudget) || 0)

  const totalProjectCost = totalBudgetRequested + (parseFloat(formik.values.totalCoFinancing) || 0)
  const coFinancingPercentage = totalProjectCost > 0 ? ((parseFloat(formik.values.totalCoFinancing) || 0) / totalProjectCost * 100).toFixed(1) : 0
  const requestedPercentage = totalProjectCost > 0 ? (totalBudgetRequested / totalProjectCost * 100).toFixed(1) : 0

  // Get requirements for current selection
  const awardRequirements = getAwardRequirements(formik.values.awardCategory, totalBudgetRequested, formik.values.totalCoFinancing);

  const thematicAreas = [
    {
      id: 'TA2',
      name: 'TA2. Sustainable Fisheries',
      active: true,
      awards: ['Community Grant', 'Small Grants', 'Medium Grants', 'Large Grants']
    },
    {
      id: 'TA4',
      name: 'TA4. Blue Business Innovation',
      active: true,
      awards: ['Community Grant', 'Small Grants', 'Medium Grants', 'Large Grants']
    },
    {
      id: 'TA1',
      name: 'TA1. Protection of Biodiversity',
      active: false,
      awards: ['Community Grant', 'Small Grants', 'Medium Grants', 'Large Grants']
    },
    {
      id: 'TA3',
      name: 'TA3. Climate Resilience',
      active: false,
      awards: ['Community Grant', 'Small Grants', 'Medium Grants', 'Large Grants']
    }
  ]

  const organizationTypes = [
    'NGO',
    'Private',
    'Community-based organization/association',
    'Academia',
    'International Organization',
    'Other'
  ]

  const districts = [
    'Corozal',
    'Orange Walk',
    'Belize',
    'Cayo',
    'Stann Creek',
    'Toledo'
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8 text-center border-b-2 border-blue-600 pb-6">
        <div className="flex justify-center mb-4">
          <img 
            src="/logo.png" 
            alt="Belize Fund Logo" 
            className="h-24 mb-4"
          />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          GRANTS AWARD PROGRAM (GAP)
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600">
          CONCEPT PAPER
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/* Section A: Background Information */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center mb-4">
            <Building2 className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">
              A. BACKGROUND INFORMATION
            </h3>
            <span className="ml-2 text-sm text-gray-500">(max 1 page)</span>
          </div>

          {/* 1. Lead Organization */}
          <div className="mb-6 bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-700 mb-3">1. Lead Organization</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...formik.getFieldProps('projectTitle')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please limit to 15 words or less"
                  rows="2"
                />
                {formik.touched.projectTitle && formik.errors.projectTitle && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.projectTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps('organizationName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Name of applying/lead organization"
                />
                {formik.touched.organizationName && formik.errors.organizationName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.organizationName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps('organizationAddress')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Office address"
                />
                {formik.touched.organizationAddress && formik.errors.organizationAddress && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.organizationAddress}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  {...formik.getFieldProps('district')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select district</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                {formik.touched.district && formik.errors.district && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.district}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Organization <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <select
                    {...formik.getFieldProps('organizationType')}
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (e.target.value === 'Other') {
                        formik.setFieldValue('otherOrganizationType', '');
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select organization type</option>
                    {organizationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {formik.touched.organizationType && formik.errors.organizationType && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.organizationType}</p>
                  )}
                  
                  {formik.values.organizationType === 'Other' && (
                    <div>
                      <input
                        type="text"
                        {...formik.getFieldProps('otherOrganizationType')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please specify organization type"
                      />
                      {formik.touched.otherOrganizationType && formik.errors.otherOrganizationType && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.otherOrganizationType}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Incorporation <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...formik.getFieldProps('dateOfIncorporation')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.dateOfIncorporation && formik.errors.dateOfIncorporation && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.dateOfIncorporation}</p>
                )}
              </div>
            </div>

            {/* Required Documentation */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-gray-700 mb-3">Required Documentation</h5>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={formik.values.hasRegistrationCert}
                      disabled={!formik.values.registrationCertFile}
                      className="mr-2"
                      readOnly
                    />
                    <span>Certificate of Registration</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        formik.setFieldValue('registrationCertFile', file);
                        formik.setFieldValue('hasRegistrationCert', true);
                      } else {
                        formik.setFieldValue('registrationCertFile', null);
                        formik.setFieldValue('hasRegistrationCert', false);
                      }
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>

                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={formik.values.hasArticles}
                      disabled={!formik.values.articlesFile}
                      className="mr-2"
                      readOnly
                    />
                    <span>Articles of Association/Business Extract</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        formik.setFieldValue('articlesFile', file);
                        formik.setFieldValue('hasArticles', true);
                      } else {
                        formik.setFieldValue('articlesFile', null);
                        formik.setFieldValue('hasArticles', false);
                      }
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>

                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={formik.values.hasCertGoodStanding}
                      disabled={!formik.values.certGoodStandingFile}
                      className="mr-2"
                      readOnly
                    />
                    <span>Certificate of Good Standing (BCAAR)</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        formik.setFieldValue('certGoodStandingFile', file);
                        formik.setFieldValue('hasCertGoodStanding', true);
                      } else {
                        formik.setFieldValue('certGoodStandingFile', null);
                        formik.setFieldValue('hasCertGoodStanding', false);
                      }
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Main Contact */}
          <div className="mb-6 bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-700 mb-3">2. Main Contact</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps('contactName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.contactName && formik.errors.contactName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.contactName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps('contactPosition')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.contactPosition && formik.errors.contactPosition && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.contactPosition}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...formik.getFieldProps('contactEmail')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.contactEmail && formik.errors.contactEmail && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.contactEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telephone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...formik.getFieldProps('contactTelephone')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.contactTelephone && formik.errors.contactTelephone && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.contactTelephone}</p>
                )}
              </div>
            </div>
          </div>

          {/* 3. Project Duration */}
          <div className="mb-6 bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-700 mb-3">3. Project Duration</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...formik.getFieldProps('proposedStartDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.proposedStartDate && formik.errors.proposedStartDate && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.proposedStartDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (months) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...formik.getFieldProps('durationMonths')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max={awardRequirements.maxDuration || undefined}
                  placeholder={`Enter duration (max: ${awardRequirements.maxDuration || 'unlimited'} months)`}
                />
                {formik.touched.durationMonths && formik.errors.durationMonths && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.durationMonths}</p>
                )}
                {formik.values.awardCategory && awardRequirements.durationText && (
                  <p className="text-xs text-blue-600 mt-1 font-medium">{awardRequirements.durationText}</p>
                )}
                {formik.values.awardCategory && awardRequirements.maxDuration && (
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum allowed: {awardRequirements.maxDuration} months
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 4. Link to Belize Fund Thematic Area (TA) */}
          <div className="mb-6 bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-700 mb-3">4. Link to Belize Fund Thematic Area (TA)</h4>
            <p className="text-sm text-gray-600 mb-3">Please select the most relevant Thematic Area (Check only one)</p>
            <div className="space-y-4">
              {thematicAreas.map(area => (
                <div key={area.id} className={`p-4 rounded-lg ${area.active ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="thematicArea"
                      value={area.name}
                      checked={formik.values.thematicArea === area.name}
                      onChange={formik.handleChange}
                      disabled={!area.active}
                      className="mr-2 text-blue-600"
                    />
                    <span className={`text-sm ${area.active ? 'text-gray-900' : 'text-gray-500'}`}>
                      {area.name}
                      {!area.active && <span className="ml-2 text-xs">(Currently inactive)</span>}
                    </span>
                  </label>
                  
                  {formik.values.thematicArea === area.name && (
                    <div className="mt-3 ml-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Select Award Category:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {area.awards.map(award => (
                          <label key={award} className="flex items-center">
                            <input
                              type="radio"
                              name="awardCategory"
                              value={award}
                              checked={formik.values.awardCategory === award}
                              onChange={formik.handleChange}
                              className="mr-2 text-blue-600"
                            />
                            <span className="text-sm">{award}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Award Category Requirements Display */}
          {formik.values.awardCategory && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-3">
                <Award className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-800">Award Category Requirements</h4>
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-bold text-blue-700">{formik.values.awardCategory}</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-700">💰 Funding Limits</p>
                    <p className="text-gray-600">{awardRequirements.fundingText}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-700">⏱️ Project Duration</p>
                    <p className="text-gray-600">{awardRequirements.durationText}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-700">💳 Co-financing</p>
                    <p className="text-gray-600">{awardRequirements.coFinText}</p>
                  </div>
                </div>
                {awardRequirements.coFinRequired && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Current co-financing percentage:</span> {awardRequirements.actualCoFinPct.toFixed(1)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Section B: Project Summary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                B. PROJECT SUMMARY
              </h3>
            </div>
            <div className="text-sm text-gray-500">
              ({wordCounts.projectSummary}/250 words)
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="mb-3">
              <h4 className="font-medium text-gray-700 mb-2">Project Overview (250 words)</h4>
              <div className="text-sm text-gray-600 mb-4">
                <p>In this section, please provide an overview of the proposed project which should include the following information:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>A summary of the key points and actions of the initiative.</li>
                  <li>The project context and project location.</li>
                  <li>The issue/problem statement to be addressed (the problem/threat) and proposed approach/solution.</li>
                  <li>How will this proposed project directly contribute to the selected Belize Fund Thematic Area (TA)</li>
                </ul>
                <p className="mt-3 text-red-600 font-medium">
                  The Belize Fund will not fund projects that do not respond to or are not directly aligned with a TA.
                </p>
              </div>
            </div>
            
            <textarea
              {...formik.getFieldProps('projectSummary')}
              onChange={(e) => {
                formik.handleChange(e)
                updateWordCount('projectSummary', e.target.value)
              }}
              rows="8"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Provide your project overview here..."
            />
            {formik.touched.projectSummary && formik.errors.projectSummary && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.projectSummary}</p>
            )}
          </div>
        </div>

        {/* Section C: Project Goal and Objectives */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Target className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                C. PROJECT GOAL AND OBJECTIVES
              </h3>
            </div>
            <div className="text-sm text-gray-500">
              ({wordCounts.projectGoalObjectives}/200 words)
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="mb-3">
              <h4 className="font-medium text-gray-700 mb-2">Goals and Objectives (200 words)</h4>
              <div className="text-sm text-gray-600 mb-4">
                <p>In this section, please list and describe the following:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>What is the goal of the proposed project?</li>
                  <li>What are the specific objectives of the proposed project?</li>
                  <li>The potential impact of the project – what might be the longer-term impact of your project?</li>
                </ul>
              </div>
            </div>
            
            <textarea
              {...formik.getFieldProps('projectGoalObjectives')}
              onChange={(e) => {
                formik.handleChange(e)
                updateWordCount('projectGoalObjectives', e.target.value)
              }}
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your project goals and objectives here..."
            />
            {formik.touched.projectGoalObjectives && formik.errors.projectGoalObjectives && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.projectGoalObjectives}</p>
            )}
          </div>
        </div>

        {/* Section D: Project Outputs and Activities */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-orange-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                D. PROJECT OUTPUTS AND ACTIVITIES
              </h3>
            </div>
            <div className="text-sm text-gray-500">
              ({wordCounts.projectOutputsActivities}/500 words)
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="mb-3">
              <h4 className="font-medium text-gray-700 mb-2">Outputs and Activities (500 words)</h4>
              <div className="text-sm text-gray-600 mb-4">
                <p>This section should contain a clear and specific statement of what the proposed project will accomplish. Demonstrate how these activities will lead to the achievement of the project goal. This section should include:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>The specific outputs that the project aims to produce. What outputs are the project intend to design and/or deliver?</li>
                  <li>The specific activities that the project will conduct. How will the activities provide the desired outputs?</li>
                </ul>
              </div>
            </div>
            
            <textarea
              {...formik.getFieldProps('projectOutputsActivities')}
              onChange={(e) => {
                formik.handleChange(e)
                updateWordCount('projectOutputsActivities', e.target.value)
              }}
              rows="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Describe your project outputs and activities here..."
            />
            {formik.touched.projectOutputsActivities && formik.errors.projectOutputsActivities && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.projectOutputsActivities}</p>
            )}
          </div>
        </div>

        {/* Section E: Project Budget Summary */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
          <div className="flex items-center mb-4">
            <DollarSign className="h-6 w-6 text-emerald-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">
              E. PROJECT BUDGET SUMMARY
            </h3>
          </div>

          <div className="bg-white p-4 rounded-lg border space-y-6">
            {/* Co-financing Input */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Co-financing Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="totalBudgetRequested" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget amount requested from Belize Fund (BZ$) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="totalBudgetRequested"
                    {...formik.getFieldProps('totalBudgetRequested')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    min="0"
                  />
                  {formik.values.awardCategory && awardRequirements.fundingText && (
                    <p className="text-xs text-gray-500 mt-1">{awardRequirements.fundingText}</p>
                  )}
                  {formik.touched.totalBudgetRequested && formik.errors.totalBudgetRequested && (
                    <p className="text-xs text-red-600 font-semibold">{formik.errors.totalBudgetRequested}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="totalCoFinancing" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Co-financing (BZ$) 
                    {awardRequirements.coFinRequired && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    id="totalCoFinancing"
                    {...formik.getFieldProps('totalCoFinancing')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    min="0"
                  />
                  {formik.values.awardCategory && awardRequirements.coFinText && (
                    <p className="text-xs text-gray-500 mt-1">{awardRequirements.coFinText}</p>
                  )}
                  {formik.values.awardCategory && awardRequirements.coFinRequired && (
                    <p className="text-xs text-gray-500 mt-1">
                      Current Co-financing: {awardRequirements.actualCoFinPct.toFixed(1)}%
                    </p>
                  )}
                  {formik.touched.totalCoFinancing && formik.errors.totalCoFinancing && (
                    <p className="text-xs text-red-600 font-semibold">{formik.errors.totalCoFinancing}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Budget Breakdown */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Budget Breakdown</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Amount (BZD)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Percentage (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: 'salaryBudget', label: 'Salary' },
                      { key: 'travelBudget', label: 'Travel/accommodation' },
                      { key: 'equipmentBudget', label: 'Equipment/supplies' },
                      { key: 'contractedServicesBudget', label: 'Contracted Services' },
                      { key: 'operationalBudget', label: 'Operational Costs' },
                      { key: 'educationBudget', label: 'Education/outreach' },
                      { key: 'trainingBudget', label: 'Training' },
                      { key: 'administrativeBudget', label: 'Administrative' },
                    ].map(({ key, label }) => (
                      <tr key={key}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{label}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="number"
                            {...formik.getFieldProps(key)}
                            className="w-full px-2 py-1 border border-gray-200 rounded"
                            placeholder="$0"
                            min="0"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {totalBudgetRequested > 0 ? 
                            ((parseFloat(formik.values[key]) || 0) / totalBudgetRequested * 100).toFixed(1) 
                            : 0}%
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-blue-50 font-semibold">
                      <td className="border border-gray-300 px-4 py-2">TOTAL Funds from Belize Fund</td>
                      <td className="border border-gray-300 px-4 py-2">${totalBudgetRequested.toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{requestedPercentage}%</td>
                    </tr>
                    <tr className="bg-green-50 font-semibold">
                      <td className="border border-gray-300 px-4 py-2">Total Co-financing</td>
                      <td className="border border-gray-300 px-4 py-2">${(parseFloat(formik.values.totalCoFinancing) || 0).toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{coFinancingPercentage}%</td>
                    </tr>
                    <tr className="bg-gray-100 font-bold">
                      <td className="border border-gray-300 px-4 py-2">Total Project Estimated Cost</td>
                      <td className="border border-gray-300 px-4 py-2">${totalProjectCost.toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Funding limits and co-financing requirements feedback */}
            {formik.values.awardCategory && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-gray-700 mb-2">Award Category Requirements Summary</h5>
                <div className="space-y-1 text-sm">
                  <p className="text-blue-700">
                    <span className="font-medium">Funding:</span> {awardRequirements.fundingText}
                  </p>
                  <p className="text-blue-700">
                    <span className="font-medium">Duration:</span> {awardRequirements.durationText}
                  </p>
                  <p className="text-blue-700">
                    <span className="font-medium">Co-financing:</span> {awardRequirements.coFinText}
                  </p>
                  {awardRequirements.coFinRequired && (
                    <p className="text-gray-700">
                      <span className="font-medium">Current co-financing:</span> {awardRequirements.actualCoFinPct.toFixed(1)}%
                    </p>
                  )}
                </div>
                {formik.touched.totalBudgetRequested && formik.errors.totalBudgetRequested && (
                  <p className="text-xs text-red-600 font-semibold mt-2">{formik.errors.totalBudgetRequested}</p>
                )}
                {formik.touched.totalCoFinancing && formik.errors.totalCoFinancing && (
                  <p className="text-xs text-red-600 font-semibold mt-2">{formik.errors.totalCoFinancing}</p>
                )}
              </div>
            )}

            {/* Budget Guidelines */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">Budget Guidelines</h5>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Salaries: 100% for exclusive positions, 60% for direct involvement, 20% for admin staff</p>
                <p>• Administrative costs: Up to 10% of overall budget (15% if using intermediary)</p>
                <p>• Co-financing requirements: Community grants (none), Medium (10-25%), Large (25-50%)</p>
                <p>• Private sector: 1:1 co-financing required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Declaration Section */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <FileCheck className="h-6 w-6 text-gray-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">
              DECLARATION
            </h3>
          </div>

          <div className="bg-white p-4 rounded-lg border space-y-4">
            <p className="text-gray-700">
              I hereby declare that all the above information is correct and accurate to the best of my knowledge.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name of Legal Representative <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps('legalRepresentativeName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Full name and signature"
                />
                {formik.touched.legalRepresentativeName && formik.errors.legalRepresentativeName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.legalRepresentativeName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...formik.getFieldProps('declarationDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {formik.touched.declarationDate && formik.errors.declarationDate && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.declarationDate}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Important Note Section */}
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-6">
          <h3 className="text-xl font-semibold text-red-800 mb-4">
            IMPORTANT NOTE
          </h3>
          
          <div className="text-red-700 space-y-4">
            <p>
              A concept paper is not a vague exploration of an idea, but a condensed version of a proposal. 
              It is expected that you have already thought through your proposed project, the budget included, 
              and you are presenting a summary.
            </p>
            
            <div>
              <p className="mb-2">
                The concept paper should not exceed 5 pages (letter size) including the cover page and any charts or diagrams. 
                Use font: Times New Roman, size: 11. Single or double space is acceptable.
              </p>
            </div>

            <div>
              <p className="font-medium mb-2">
                Belize Fund does not have budget limits for each category, but all proposals must adhere to the following criteria:
              </p>
              <div className="ml-4">
                <p className="font-medium mb-2">Salaries:</p>
                <ul className="list-decimal list-inside space-y-1 ml-4">
                  <li>100% of staff salaries can be covered by the Belize Fund, provided that the position is fully and exclusively involved in the implementation of the Belize Fund project activities.</li>
                  <li>Up to 60% of staff salaries can be covered by Belize Fund, provided that they are directly involved in the implementation of Belize Fund project activities.</li>
                  <li>Up to 20% of administrative staff salaries, such as Executive Director, Finance personnel, drivers, accountants, and HR etc, can be covered by the Belize Fund.</li>
                  <li>Up to 10% of the overall project budget can be considered under administrative costs such rent, utilities, office supplies, courier etc (overhead). Up to 15% if using an intermediary.</li>
                  <li>The other budget categories do not have limits, for now, but will only be accepted if they are directly supporting a specific activity.</li>
                </ul>
              </div>
            </div>

            <div>
              <p className="font-medium mb-2">
                Co-financing under the GAP is required based on the size or category of an award:
              </p>
              <ul className="list-decimal list-inside space-y-1 ml-4">
                <li>There is no co-financing requirement for community small grants of up to BZD $75,000.00</li>
                <li>Medium grants between BZ$75,000.00 to BZ$150,000.00 require that 10-25% of the total project cost be co-financed by the applicant or collaborating partners.</li>
                <li>Large grants above BZ$150,000.00 require that between 25-50% of the total project cost be co-financed by the applicant and/or collaborating partners.</li>
              </ul>
            </div>

            <p>
              Private sector applicants will be required to provide a 1:1 co-financing. Co-financing can be in the form of cash or in-kind (combined).
            </p>
          </div>
        </div>

        {/* Important Note Acknowledgment */}
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formik.values.hasReadImportantNote}
              onChange={() => formik.setFieldValue('hasReadImportantNote', !formik.values.hasReadImportantNote)}
              className="mr-2 mt-1"
            />
            <span className="text-sm text-red-700">
              I have read and understood the Important Note in the Concept Paper template, and I confirm that all required documentation has been uploaded.
            </span>
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end items-center pt-6 border-t space-x-4">
          {/* Debug info - remove in production */}
        
          
          <button
            type="button"
            onClick={() => {
              localStorage.setItem('conceptFormData', JSON.stringify(formik.values))
              toast.success('Form saved as draft!')
            }}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </button>
          
          <button
            type="submit"
            disabled={!(formik.values.hasRegistrationCert && formik.values.hasArticles && formik.values.hasCertGoodStanding && formik.values.hasReadImportantNote && formik.isValid) || isSubmitting}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Concept Paper
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConceptForm 