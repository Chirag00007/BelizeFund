import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { 
  Building2, 
  User, 
  Target, 
  MapPin, 
  FileCheck, 
  DollarSign, 
  Shield, 
  MessageSquare,
  BarChart3,
  Save,
  Send,
  CheckCircle,
  Clock,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Globe,
  CreditCard,
  FileText,
  Award,
  ChevronRight,
  Home
} from 'lucide-react'
import { applicationService } from '../services/applicationService'

const schema = yup.object({
  // Organization Details
  organizationName: yup.string().required('Organization name is required'),
  typeOfOrganisation: yup.string().required('Organization type is required'),
  legalRepName: yup.string().required('Legal representative name is required'),
  legalRepPosition: yup.string().required('Legal representative position is required'),
  organizationAge: yup.number().required('Organization age is required').min(0, 'Age cannot be negative'),
  organizationType: yup.string().required('Organization type for scoring is required'),
  operationalStatus: yup.string().required('Operational status is required'),
  emailAddress: yup.string().email('Invalid email').required('Email is required'),
  physicalAddress: yup.string().required('Physical address is required'),
  
  // Applicant Details
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().required('Mobile number is required'),
  position: yup.string().required('Position is required'),
  villageOrTown: yup.string().required('Village or town is required'),
  contactDistrict: yup.string().required('District is required'),
  
  // Project Information
  projectId: yup.string().required('Project ID is required'),
  projectTitle: yup.string().required('Project title is required'),
  projectGoal: yup.string().required('Project goal is required').max(500, 'Project goal cannot exceed 500 characters'),
  projectObjectives: yup.string().required('Project objectives are required').max(1000, 'Project objectives cannot exceed 1000 characters'),
  proposalVillageOrCity: yup.string().required('Project location is required'),
  district: yup.string().required('District is required'),
  proposalProjectLocation: yup.string().required('Detailed project location is required'),
  projectDescription: yup.string().required('Project description is required')
})

const STEPS = [
  { 
    id: 1, 
    title: 'Organization Profile', 
    subtitle: 'Basic organization information',
    icon: Building2,
    color: 'blue',
    fields: ['organizationName', 'typeOfOrganisation', 'legalRepName', 'legalRepPosition', 'organizationAge', 'organizationType', 'operationalStatus', 'emailAddress', 'physicalAddress']
  },
  { 
    id: 2, 
    title: 'Applicant Information', 
    subtitle: 'Personal details of main applicant',
    icon: User,
    color: 'emerald',
    fields: ['firstName', 'lastName', 'email', 'mobile', 'position', 'villageOrTown', 'contactDistrict']
  },
  { 
    id: 3, 
    title: 'Project Details', 
    subtitle: 'Project goals and objectives',
    icon: Target,
    color: 'purple',
    fields: ['projectId', 'projectTitle', 'projectGoal', 'projectObjectives', 'proposalVillageOrCity', 'district', 'proposalProjectLocation', 'projectDescription']
  },
  { 
    id: 4, 
    title: 'Location & Geography', 
    subtitle: 'Detailed location information',
    icon: MapPin,
    color: 'orange',
    fields: []
  },
  { 
    id: 5, 
    title: 'Legal Documentation', 
    subtitle: 'Legal status and compliance',
    icon: FileCheck,
    color: 'red',
    fields: []
  },
  { 
    id: 6, 
    title: 'Financial Planning', 
    subtitle: 'Budget and funding details',
    icon: DollarSign,
    color: 'green',
    fields: []
  },
  { 
    id: 7, 
    title: 'Risk Assessment', 
    subtitle: 'ESRST, ESRMP, GAP, SEP',
    icon: Shield,
    color: 'cyan',
    fields: []
  },
  { 
    id: 8, 
    title: 'Project Description', 
    subtitle: 'Detailed project narrative',
    icon: MessageSquare,
    color: 'pink',
    fields: []
  },
  { 
    id: 9, 
    title: 'Logical Framework', 
    subtitle: 'Project outputs and outcomes',
    icon: BarChart3,
    color: 'indigo',
    fields: []
  }
]

const ProfessionalSidebarForm = () => {
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [applicationId, setApplicationId] = useState(editId || null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    trigger,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const currentStepData = STEPS[currentStep - 1]
  const organizationType = watch('organizationType')
  const organizationAge = watch('organizationAge')
  const operationalStatus = watch('operationalStatus')

  // Load existing application data if editing
  useEffect(() => {
    const loadApplicationData = async () => {
      if (editId) {
        try {
          setIsLoading(true)
          const application = await applicationService.getApplication(editId)
          
          // Populate form with existing data
          reset(application)
          setCurrentStep(application.currentStep || 1)
          setCompletedSteps(application.completedSteps || [])
          setApplicationId(editId)
          
          toast.success('Application loaded for editing')
        } catch (error) {
          toast.error('Failed to load application data')
          console.error('Error loading application:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadApplicationData()
  }, [editId, reset])

  // Show loading state when loading existing application
  if (isLoading && editId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading application data...</p>
        </div>
      </div>
    )
  }

  const saveProgress = async () => {
    try {
      setIsSaving(true)
      const formData = getValues()
      
      if (applicationId) {
        await applicationService.saveProgress(applicationId, {
          currentStep,
          stepData: formData,
          completedSteps
        })
      } else {
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
    const currentFields = currentStepData.fields
    const isValid = await trigger(currentFields)
    
    if (!isValid) {
      toast.error('Please complete all required fields before proceeding')
      return
    }

    await saveProgress()
    
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep])
    }
    
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const goToStep = (stepNumber) => {
    if (stepNumber <= Math.max(...completedSteps, currentStep)) {
      setCurrentStep(stepNumber)
    }
  }

  const submitApplication = async () => {
    try {
      setIsLoading(true)
      const formData = getValues()
      
      let currentApplicationId = applicationId;
      
      // If no applicationId, save progress first to create one
      if (!currentApplicationId) {
        const newApplication = await applicationService.createApplication(formData);
        currentApplicationId = newApplication._id;
        setApplicationId(currentApplicationId);
      }
      
      const result = await applicationService.submitApplication(currentApplicationId, formData)
      
      if (result.zohoSuccess) {
        toast.success('Application submitted successfully and record created in Zoho Creator!')
      } else if (result.zohoError) {
        toast.success('Application submitted successfully!')
        toast.error(`Zoho Creator: ${result.zohoError}`)
      } else {
        toast.success('Application submitted successfully!')
      }
    } catch (error) {
      toast.error('Failed to submit application')
      console.error('Error submitting application:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Organization Profile
              </h3>
              <p className="text-blue-700 text-sm">Provide comprehensive information about your organization</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  {...register('organizationName')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter organization name"
                />
                {errors.organizationName && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizationName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type of Organization *
                </label>
                <select
                  {...register('typeOfOrganisation')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select type</option>
                  <option value="NGO">NGO</option>
                  <option value="CBO">CBO</option>
                  <option value="Cooperative">Cooperative</option>
                  <option value="Private Company">Private Company</option>
                  <option value="Government Agency">Government Agency</option>
                  <option value="Religious Organization">Religious Organization</option>
                  <option value="Educational Institution">Educational Institution</option>
                  <option value="Other">Other</option>
                </select>
                {errors.typeOfOrganisation && (
                  <p className="mt-1 text-sm text-red-600">{errors.typeOfOrganisation.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Legal Representative Name *
                </label>
                <input
                  type="text"
                  {...register('legalRepName')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Full name of legal representative"
                />
                {errors.legalRepName && (
                  <p className="mt-1 text-sm text-red-600">{errors.legalRepName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Legal Representative Position *
                </label>
                <input
                  type="text"
                  {...register('legalRepPosition')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g., Executive Director, President"
                />
                {errors.legalRepPosition && (
                  <p className="mt-1 text-sm text-red-600">{errors.legalRepPosition.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Age (years) *
                </label>
                <input
                  type="number"
                  {...register('organizationAge')}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Years in operation"
                />
                {errors.organizationAge && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizationAge.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Type (for scoring) *
                </label>
                <select
                  {...register('organizationType')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select type</option>
                  <option value="NGO">NGO</option>
                  <option value="CBO">CBO</option>
                  <option value="Cooperative">Cooperative</option>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                </select>
                {errors.organizationType && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizationType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Operational Status *
                </label>
                <select
                  {...register('operationalStatus')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select status</option>
                  <option value="Fully Operational">Fully Operational</option>
                  <option value="Partially Operational">Partially Operational</option>
                  <option value="Starting Operations">Starting Operations</option>
                  <option value="Not Operational">Not Operational</option>
                </select>
                {errors.operationalStatus && (
                  <p className="mt-1 text-sm text-red-600">{errors.operationalStatus.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('emailAddress')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="organization@example.com"
                />
                {errors.emailAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.emailAddress.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Physical Address *
              </label>
              <textarea
                {...register('physicalAddress')}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Complete physical address including street, city, district"
              />
              {errors.physicalAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.physicalAddress.message}</p>
              )}
            </div>

            {/* Auto-Score Display */}
            {(organizationAge || organizationType || operationalStatus) && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Auto-Score Preview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Organization Age</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {organizationAge >= 5 ? '30' : organizationAge >= 3 ? '20' : organizationAge >= 1 ? '10' : '0'} pts
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Organization Type</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {organizationType === 'NGO' ? '25' :
                       organizationType === 'CBO' ? '20' :
                       organizationType === 'Cooperative' ? '15' :
                       organizationType === 'Private' ? '10' :
                       organizationType === 'Government' ? '5' : '0'} pts
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">Operational Status</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {operationalStatus === 'Fully Operational' ? '25' :
                       operationalStatus === 'Partially Operational' ? '15' :
                       operationalStatus === 'Starting Operations' ? '10' : '0'} pts
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-blue-200 text-center">
                  <div className="text-sm text-gray-600 mb-1">Total Auto-Score</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {(organizationAge >= 5 ? 30 : organizationAge >= 3 ? 20 : organizationAge >= 1 ? 10 : 0) +
                     (organizationType === 'NGO' ? 25 : organizationType === 'CBO' ? 20 : organizationType === 'Cooperative' ? 15 : organizationType === 'Private' ? 10 : organizationType === 'Government' ? 5 : 0) +
                     (operationalStatus === 'Fully Operational' ? 25 : operationalStatus === 'Partially Operational' ? 15 : operationalStatus === 'Starting Operations' ? 10 : 0)} / 80 points
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
              <h3 className="text-lg font-bold text-emerald-900 mb-2 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Applicant Information
              </h3>
              <p className="text-emerald-700 text-sm">Personal details of the main applicant</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  {...register('mobile')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="+501 XXX-XXXX"
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Position in Organization *
                </label>
                <input
                  type="text"
                  {...register('position')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="e.g., Project Manager, Director"
                />
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Village or Town *
                </label>
                <input
                  type="text"
                  {...register('villageOrTown')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="Enter village or town"
                />
                {errors.villageOrTown && (
                  <p className="mt-1 text-sm text-red-600">{errors.villageOrTown.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District *
                </label>
                <select
                  {...register('contactDistrict')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                >
                  <option value="">Select district</option>
                  <option value="Belize">Belize</option>
                  <option value="Cayo">Cayo</option>
                  <option value="Corozal">Corozal</option>
                  <option value="Orange Walk">Orange Walk</option>
                  <option value="Stann Creek">Stann Creek</option>
                  <option value="Toledo">Toledo</option>
                </select>
                {errors.contactDistrict && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactDistrict.message}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-2 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Project Details
              </h3>
              <p className="text-purple-700 text-sm">Define your project goals, objectives, and key details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project ID *
                </label>
                <input
                  type="text"
                  {...register('projectId')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Unique project identifier"
                />
                {errors.projectId && (
                  <p className="mt-1 text-sm text-red-600">{errors.projectId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  {...register('projectTitle')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Descriptive project title"
                />
                {errors.projectTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.projectTitle.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Village/Town/City *
                </label>
                <input
                  type="text"
                  {...register('proposalVillageOrCity')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Project location"
                />
                {errors.proposalVillageOrCity && (
                  <p className="mt-1 text-sm text-red-600">{errors.proposalVillageOrCity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District *
                </label>
                <select
                  {...register('district')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                >
                  <option value="">Select district</option>
                  <option value="Belize">Belize</option>
                  <option value="Cayo">Cayo</option>
                  <option value="Corozal">Corozal</option>
                  <option value="Orange Walk">Orange Walk</option>
                  <option value="Stann Creek">Stann Creek</option>
                  <option value="Toledo">Toledo</option>
                </select>
                {errors.district && (
                  <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Goal *
              </label>
              <textarea
                {...register('projectGoal')}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Describe the main goal and expected outcome of your project"
              />
              {errors.projectGoal && (
                <p className="mt-1 text-sm text-red-600">{errors.projectGoal.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Objectives *
              </label>
              <textarea
                {...register('projectObjectives')}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="List specific, measurable objectives"
              />
              {errors.projectObjectives && (
                <p className="mt-1 text-sm text-red-600">{errors.projectObjectives.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Project Location *
              </label>
              <textarea
                {...register('proposalProjectLocation')}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Provide detailed location description including GPS coordinates if available"
              />
              {errors.proposalProjectLocation && (
                <p className="mt-1 text-sm text-red-600">{errors.proposalProjectLocation.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                {...register('projectDescription')}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Comprehensive project description including methodology and expected impact"
              />
              {errors.projectDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.projectDescription.message}</p>
              )}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <div className={`p-6 bg-${currentStepData?.color}-100 rounded-full inline-block mb-6`}>
              <currentStepData.icon className={`h-16 w-16 text-${currentStepData?.color}-600`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {currentStepData?.title}
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              This section is coming soon. We're working on implementing this step.
            </p>
            <div className="text-sm text-gray-500">
              For now, you can navigate to other completed steps or save your progress.
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-white/20 rounded-lg mr-3">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Belize Fund</h1>
              <p className="text-blue-100 text-sm">
                {editId ? 'Edit Application' : 'New Application'}
              </p>
            </div>
          </div>
          <div className="text-sm text-blue-100">
            Overall Progress: {Math.round((completedSteps.length / STEPS.length) * 100)}%
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / STEPS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {STEPS.map((step) => {
              const isCompleted = completedSteps.includes(step.id)
              const isCurrent = currentStep === step.id
              const isAccessible = step.id <= Math.max(...completedSteps, currentStep)
              
              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    isCurrent 
                      ? `bg-${step.color}-50 border-2 border-${step.color}-200` 
                      : isCompleted 
                        ? 'bg-green-50 border border-green-200 hover:bg-green-100' 
                        : isAccessible 
                          ? 'bg-gray-50 border border-gray-200 hover:bg-gray-100' 
                          : 'bg-gray-100 border border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => isAccessible && goToStep(step.id)}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${
                      isCurrent 
                        ? `bg-${step.color}-100` 
                        : isCompleted 
                          ? 'bg-green-100' 
                          : 'bg-gray-200'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <step.icon className={`h-5 w-5 ${
                          isCurrent 
                            ? `text-${step.color}-600` 
                            : 'text-gray-600'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold text-sm ${
                        isCurrent 
                          ? `text-${step.color}-900` 
                          : isCompleted 
                            ? 'text-green-900' 
                            : 'text-gray-700'
                      }`}>
                        {step.title}
                      </div>
                      <div className={`text-xs ${
                        isCurrent 
                          ? `text-${step.color}-700` 
                          : isCompleted 
                            ? 'text-green-700' 
                            : 'text-gray-500'
                      }`}>
                        {step.subtitle}
                      </div>
                    </div>
                    {isAccessible && (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              Auto-save enabled
            </div>
            <div>
              Step {currentStep} of {STEPS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-3 bg-${currentStepData?.color}-100 rounded-lg mr-4`}>
                <currentStepData.icon className={`h-6 w-6 text-${currentStepData?.color}-600`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {currentStepData?.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {currentStepData?.subtitle}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Application ID</div>
              <div className="font-semibold text-gray-900">
                {applicationId || 'Not assigned'}
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {renderStepContent()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={saveProgress}
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

            <div className="flex items-center space-x-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span>Previous</span>
                </button>
              )}
              
              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`flex items-center space-x-2 px-8 py-3 bg-${currentStepData?.color}-600 hover:bg-${currentStepData?.color}-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl`}
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
        </div>
      </div>
    </div>
  )
}

export default ProfessionalSidebarForm 