import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { 
  Save, 
  Send, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  CheckCircle, 
  Clock,
  Building2,
  User,
  Target,
  MapPin,
  FileCheck,
  DollarSign,
  Shield,
  MessageSquare,
  BarChart3
} from 'lucide-react'

import { applicationService } from '../services/applicationService'
import Step1OrganizationDetails from './steps/Step1OrganizationDetails'
import Step2ApplicantDetails from './steps/Step2ApplicantDetails'
import Step3ProjectInformation from './steps/Step3ProjectInformation'

// Validation schemas for each step
import * as yup from 'yup'

const stepSchemas = {
  1: yup.object({
    organizationName: yup.string().required('Organization name is required'),
    typeOfOrganisation: yup.string().required('Organization type is required'),
    legalRepName: yup.string().required('Legal representative name is required'),
    legalRepPosition: yup.string().required('Legal representative position is required'),
    organizationAge: yup.number().required('Organization age is required').min(0, 'Age cannot be negative'),
    organizationType: yup.string().required('Organization type for scoring is required'),
    operationalStatus: yup.string().required('Operational status is required'),
    emailAddress: yup.string().email('Invalid email').required('Email is required'),
    physicalAddress: yup.string().required('Physical address is required')
  }),
  2: yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    mobile: yup.string().required('Mobile number is required'),
    position: yup.string().required('Position is required'),
    villageOrTown: yup.string().required('Village or town is required'),
    contactDistrict: yup.string().required('District is required')
  }),
  3: yup.object({
    projectId: yup.string().required('Project ID is required'),
    projectTitle: yup.string().required('Project title is required'),
    projectGoal: yup.string().required('Project goal is required').max(500, 'Project goal cannot exceed 500 characters'),
    projectObjectives: yup.string().required('Project objectives are required').max(1000, 'Project objectives cannot exceed 1000 characters'),
    proposalVillageOrCity: yup.string().required('Project location is required'),
    district: yup.string().required('District is required'),
    proposalProjectLocation: yup.string().required('Detailed project location is required'),
    projectDescription: yup.string().required('Project description is required')
  })
}

const STEPS = [
  { 
    id: 1, 
    title: 'Organization Details', 
    description: 'Basic organization information and contact details',
    icon: Building2,
    component: Step1OrganizationDetails,
    color: 'blue'
  },
  { 
    id: 2, 
    title: 'Applicant Details', 
    description: 'Personal information of the main applicant',
    icon: User,
    component: Step2ApplicantDetails,
    color: 'green'
  },
  { 
    id: 3, 
    title: 'Project Information', 
    description: 'Project goals, objectives, and location details',
    icon: Target,
    component: Step3ProjectInformation,
    color: 'purple'
  },
  { 
    id: 4, 
    title: 'Project Location', 
    description: 'Detailed location and geographical information',
    icon: MapPin,
    component: null,
    color: 'orange'
  },
  { 
    id: 5, 
    title: 'Legal Documentation', 
    description: 'Legal status, incorporation, and compliance documents',
    icon: FileCheck,
    component: null,
    color: 'red'
  },
  { 
    id: 6, 
    title: 'Financial Information', 
    description: 'Budget, funding requirements, and bank details',
    icon: DollarSign,
    component: null,
    color: 'emerald'
  },
  { 
    id: 7, 
    title: 'Assessments', 
    description: 'ESRST, ESRMP, GAP, and SEP assessments',
    icon: Shield,
    component: null,
    color: 'cyan'
  },
  { 
    id: 8, 
    title: 'Project Description', 
    description: 'Detailed project description and background',
    icon: MessageSquare,
    component: null,
    color: 'pink'
  },
  { 
    id: 9, 
    title: 'Logical Framework', 
    description: 'Project logical framework and outputs',
    icon: BarChart3,
    component: null,
    color: 'indigo'
  }
]

const ModernMultiStepForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [applicationId, setApplicationId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    trigger,
    watch
  } = useForm({
    resolver: yupResolver(stepSchemas[currentStep] || yup.object()),
    mode: 'onChange'
  })

  // Load existing application if editing
  useEffect(() => {
    if (id) {
      loadApplication(id)
    }
  }, [id])

  const loadApplication = async (appId) => {
    try {
      setIsLoading(true)
      const application = await applicationService.getApplication(appId)
      
      // Populate form with existing data
      Object.keys(application).forEach(key => {
        setValue(key, application[key])
      })
      
      setApplicationId(appId)
      setCurrentStep(application.currentStep || 1)
      setCompletedSteps(application.completedSteps || [])
    } catch (error) {
      toast.error('Failed to load application')
      console.error('Error loading application:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveProgress = async (stepData = null) => {
    try {
      setIsSaving(true)
      const formData = stepData || getValues()
      
      if (applicationId) {
        // Update existing application
        await applicationService.saveProgress(applicationId, {
          currentStep,
          stepData: formData,
          completedSteps
        })
      } else {
        // Create new application
        const newApplication = await applicationService.createApplication(formData)
        setApplicationId(newApplication._id)
      }
      
      toast.success('Progress saved successfully!')
    } catch (error) {
      toast.error('Failed to save progress')
      console.error('Error saving progress:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const nextStep = async () => {
    const isValid = await trigger()
    if (!isValid) {
      toast.error('Please fix the errors before proceeding')
      return
    }

    const formData = getValues()
    await saveProgress(formData)
    
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep])
    }
    
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const goToStep = (stepNumber) => {
    if (stepNumber <= Math.max(...completedSteps, currentStep)) {
      setCurrentStep(stepNumber)
    }
  }

  const submitApplication = async () => {
    console.log('submitApplication function called');
    console.log('applicationId:', applicationId);
    console.log('current form data:', getValues());
    
    try {
      setIsLoading(true)
      const formData = getValues()
      
      // Collect file inputs from the form data and format them for submission
      const filesToUpload = [];
      // Example: If 'proofOfRegistration' is a file input field
      if (formData.proofOfRegistration instanceof File) {
        filesToUpload.push({
          file: formData.proofOfRegistration,
          zohoFieldName: 'Proof_of_Registration_for_Organization',
          fileName: formData.proofOfRegistration.name,
        });
      }
      // Add other file fields here following the same pattern:
      // Example for ESRMP:
      if (formData.environmentalSocialRiskManagementPlan instanceof File) {
        filesToUpload.push({
          file: formData.environmentalSocialRiskManagementPlan,
          zohoFieldName: 'Environmental_and_Social_Risk_Management_Plan_ESRMP',
          fileName: formData.environmentalSocialRiskManagementPlan.name,
        });
      }
      // Example for GAP:
      if (formData.grantAgreementProposal instanceof File) {
        filesToUpload.push({
          file: formData.grantAgreementProposal,
          zohoFieldName: 'Grant_Agreement_Proposal_GAP',
          fileName: formData.grantAgreementProposal.name,
        });
      }
      // Example for SEP:
      if (formData.stakeholderEngagementPlan instanceof File) {
        filesToUpload.push({
          file: formData.stakeholderEngagementPlan,
          zohoFieldName: 'Stakeholder_Engagement_Plan_SEP',
          fileName: formData.stakeholderEngagementPlan.name,
        });
      }
      // Example for Legal documents
      if (formData.certificateOfIncorporation instanceof File) {
        filesToUpload.push({
          file: formData.certificateOfIncorporation,
          zohoFieldName: 'Certificate_of_Incorporation',
          fileName: formData.certificateOfIncorporation.name,
        });
      }
      if (formData.articlesOfAssociation instanceof File) {
        filesToUpload.push({
          file: formData.articlesOfAssociation,
          zohoFieldName: 'Articles_of_Association',
          fileName: formData.articlesOfAssociation.name,
        });
      }
      if (formData.boardResolutionAuthorization instanceof File) {
        filesToUpload.push({
          file: formData.boardResolutionAuthorization,
          zohoFieldName: 'Board_Resolution_Authorization',
          fileName: formData.boardResolutionAuthorization.name,
        });
      }
      if (formData.threeYearsFinancialAuditReport instanceof File) {
        filesToUpload.push({
          file: formData.threeYearsFinancialAuditReport,
          zohoFieldName: 'Three_Years_Financial_Audit_Report',
          fileName: formData.threeYearsFinancialAuditReport.name,
        });
      }
      if (formData.latestBankStatement instanceof File) {
        filesToUpload.push({
          file: formData.latestBankStatement,
          zohoFieldName: 'Latest_Bank_Statement',
          fileName: formData.latestBankStatement.name,
        });
      }
      if (formData.financialSustainabilityPlan instanceof File) {
        filesToUpload.push({
          file: formData.financialSustainabilityPlan,
          zohoFieldName: 'Financial_Sustainability_Plan',
          fileName: formData.financialSustainabilityPlan.name,
        });
      }
      if (formData.environmentalSocialImpactAssessment instanceof File) {
        filesToUpload.push({
          file: formData.environmentalSocialImpactAssessment,
          zohoFieldName: 'Environmental_Social_Impact_Assessment',
          fileName: formData.environmentalSocialImpactAssessment.name,
        });
      }
      if (formData.digitalSignatureImage instanceof File) {
        filesToUpload.push({
          file: formData.digitalSignatureImage,
          zohoFieldName: 'Digital_Signature_Image',
          fileName: formData.digitalSignatureImage.name,
        });
      }

      // Add the files to the form data for submission
      formData.files = filesToUpload;

      let currentApplicationId = applicationId;
      
      // If no applicationId, save progress first to create one
      if (!currentApplicationId) {
        console.log('No applicationId, saving progress first...');
        // The createApplication function might not be used if we go directly to Zoho
        // Consider if createApplication is still necessary for local storage or other reasons
        // For now, assuming it creates a local record if needed
        const newApplication = await applicationService.createApplication(formData);
        currentApplicationId = newApplication._id;
        setApplicationId(currentApplicationId);
        console.log('Created new application with ID:', currentApplicationId);
      }
      
      console.log('Calling applicationService.submitGapProposal...');
      const result = await applicationService.submitGapProposal(formData)
      console.log('submitGapProposal result:', result);
      
      if (result.success) {
        toast.success('GAP Proposal submitted successfully and record created in Zoho Creator!')
      } else if (result.error) {
        toast.success('GAP Proposal submitted, but with errors:')
        toast.error(`Zoho Creator: ${result.message}`)
      } else {
        toast.success('GAP Proposal submitted successfully!')
      }
      
      navigate('/applications')
    } catch (error) {
      console.error('Error in submitApplication:', error);
      toast.error('Failed to submit GAP Proposal')
      console.error('Error submitting GAP Proposal:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const CurrentStepComponent = STEPS[currentStep - 1]?.component
  const currentStepInfo = STEPS[currentStep - 1]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading application...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-t-xl shadow-2xl px-8 py-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Grant Application Portal</h1>
              <p className="text-blue-100 text-lg">Professional Grant Management System</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100 mb-1">Overall Progress</div>
            <div className="text-3xl font-bold">
              {Math.round((completedSteps.length / STEPS.length) * 100)}%
            </div>
            <div className="w-32 bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps.length / STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white shadow-xl border-x border-gray-200">
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex justify-between items-center overflow-x-auto pb-4">
            {STEPS.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id)
              const isCurrent = currentStep === step.id
              const isAccessible = step.id <= Math.max(...completedSteps, currentStep)
              
              return (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      isAccessible ? 'hover:scale-105' : 'cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => isAccessible && goToStep(step.id)}
                  >
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 shadow-lg
                      ${isCurrent ? `bg-${step.color}-600 ring-4 ring-${step.color}-200 scale-110` : 
                        isCompleted ? 'bg-green-500 hover:bg-green-600' : 
                        isAccessible ? 'bg-gray-400 hover:bg-gray-500' : 'bg-gray-300'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="h-8 w-8" />
                      ) : (
                        <step.icon className="h-8 w-8" />
                      )}
                    </div>
                    <div className="mt-3 text-center max-w-24">
                      <div className={`text-sm font-semibold ${
                        isCurrent ? `text-${step.color}-600` : 
                        isCompleted ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  
                  {index < STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded transition-all duration-300 ${
                      completedSteps.includes(step.id) ? 'bg-green-400' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Current Step Info */}
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-${currentStepInfo?.color}-100 rounded-lg`}>
                <currentStepInfo.icon className={`h-8 w-8 text-${currentStepInfo?.color}-600`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentStepInfo?.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  {currentStepInfo?.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Step Progress</div>
              <div className="text-xl font-bold text-blue-600">
                {currentStep} of {STEPS.length}
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 min-h-[600px]">
          <form onSubmit={handleSubmit(nextStep)} className="space-y-8">
            {CurrentStepComponent ? (
              <CurrentStepComponent
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                watch={watch}
              />
            ) : (
              <div className="text-center py-20">
                <div className={`p-6 bg-${currentStepInfo?.color}-100 rounded-full inline-block mb-6`}>
                  <currentStepInfo.icon className={`h-16 w-16 text-${currentStepInfo?.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentStepInfo?.title}
                </h3>
                <p className="text-gray-600 text-lg mb-8">
                  This step is coming soon. We're working on implementing this section.
                </p>
                <div className="text-sm text-gray-500">
                  For now, you can navigate to other completed steps or save your progress.
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200 bg-gray-50 -mx-8 px-8 py-6 -mb-8">
              <div className="flex items-center space-x-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Previous</span>
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => saveProgress()}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <Clock className="h-5 w-5 animate-spin" />
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Progress'}</span>
                </button>
              </div>

              <div>
                {currentStep < STEPS.length ? (
                  <button
                    type="submit"
                    className={`flex items-center space-x-2 px-8 py-3 bg-${currentStepInfo?.color}-600 hover:bg-${currentStepInfo?.color}-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl`}
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitApplication}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                    <span>{isLoading ? 'Submitting...' : 'Submit Application'}</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-800 text-white rounded-b-xl shadow-2xl px-8 py-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Auto-save enabled</span>
            </div>
            <div>
              Last saved: {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>
              Fields marked with <span className="text-red-400">*</span> are required
            </span>
            <div className="text-gray-400">|</div>
            <span>Application ID: {applicationId || 'Not assigned'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernMultiStepForm 