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

// Validation Schema
const conceptSchema = yup.object().shape({
  // Background Information
  projectTitle: yup.string()
    .test('word-count', 'Project title should be 15 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).length
      return wordCount <= 15
    }),
  organizationName: yup.string(),
  organizationAddress: yup.string(),
  organizationType: yup.string(),
  dateOfIncorporation: yup.date(),
  
  // Main Contact
  contactName: yup.string(),
  contactPosition: yup.string(),
  contactEmail: yup.string().email('Invalid email'),
  contactTelephone: yup.string(),
  
  // Project Duration
  proposedStartDate: yup.date(),
  durationMonths: yup.number().positive('Duration must be positive'),
  
  // Award Category
  awardCategory: yup.string(),
  thematicArea: yup.string(),
  
  // Content Sections
  projectSummary: yup.string()
    .test('word-count', 'Summary should be 250 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 250
    }),
  
  projectGoalObjectives: yup.string()
    .test('word-count', 'Content should be 200 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 200
    }),
    
  projectOutputsActivities: yup.string()
    .test('word-count', 'Content should be 500 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 500
    }),
  
  // Budget
  totalBudgetRequested: yup.number().min(0),
  totalCoFinancing: yup.number().min(0),
  
  // Declaration
  legalRepresentativeName: yup.string(),
  declarationDate: yup.date(),
})

const ConceptForm = () => {
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
      organizationType: '',
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
      awardCategory: '',
      thematicArea: '',
      
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
      
      // Co-financing entries
      coFinancingEntries: [{ organization: '', contribution: 0, percentage: 0 }],
      
      // Declaration
      legalRepresentativeName: '',
      declarationDate: '',
    },
    validationSchema: conceptSchema,
    onSubmit: async (values) => {
      try {
        console.log('Concept Paper Submitted:', values)
        
        // Show loading toast
        const loadingToast = toast.loading('Submitting concept paper to Zoho Creator...')
        
        // Ensure totalCoFinancing is synced with coFinancingEntries before submission
        const coFinancingTotal = values.coFinancingEntries
          .reduce((sum, entry) => sum + (parseFloat(entry.contribution) || 0), 0)
        
        const submissionData = {
          ...values,
          totalCoFinancing: coFinancingTotal
        }
        
        console.log('Submission data with calculated totals:', submissionData)
        
        // Submit to Zoho Creator via backend API
        const result = await applicationService.submitConceptPaper(submissionData)
        
        toast.dismiss(loadingToast)
        
        if (result.success) {
          toast.success(`Concept paper submitted successfully! Record ID: ${result.data?.recordId || 'N/A'}`)
          console.log('Zoho Creator submission result:', result)
          
          // Clear saved draft
          localStorage.removeItem('conceptFormData')
          
          // Reset form
          formik.resetForm()
          setWordCounts({
            projectSummary: 0,
            projectGoalObjectives: 0,
            projectOutputsActivities: 0
          })
        } else {
          throw new Error(result.message || 'Failed to submit concept paper')
        }
      } catch (error) {
        toast.error(`Error submitting concept paper: ${error.message}`)
        console.error('Submission error:', error)
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

  const awardCategories = [
    'Community Grant',
    'Small Grants',
    'Medium Grant',
    'Large Grant'
  ]

  const thematicAreas = [
    'TA1. Protection of Biodiversity',
    'TA2 Sustainable Fisheries',
    'TA3. Climate Resilience',
    'TA4. Blue Business Innovation'
  ]

  const organizationTypes = [
    'NGO',
    'Private',
    'Community-based organization/association',
    'Academia',
    'Government Agency',
    'International Organization',
    'Other'
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8 text-center border-b-2 border-blue-600 pb-6">
        {/* <div className="flex justify-center mb-4">
          <div className="text-sm text-gray-500">
            Max 5 pages • Times New Roman • Size 11
          </div>
        </div> */}
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          GRANTS AWARD PROGRAM (GAP)
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600">
          CONCEPT PAPER
        </h2>
        <p className="text-gray-600 mt-2">
          Belize Fund Management - Condensed Project Proposal
        </p>
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
                <input
                  type="text"
                  {...formik.getFieldProps('projectTitle')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please limit to 15 words or less"
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps('organizationAddress')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Headquarters/office address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Organization <span className="text-red-500">*</span>
                </label>
                <select
                  {...formik.getFieldProps('organizationType')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select organization type</option>
                  {organizationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
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
                  placeholder="Enter duration in months"
                />
              </div>
            </div>
          </div>

          {/* 4. Award Category */}
          <div className="mb-6 bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-700 mb-3">4. Award Category</h4>
            <p className="text-sm text-gray-600 mb-3">Please select one of the Belize Fund's Award Categories below.</p>
            <div className="grid md:grid-cols-2 gap-2">
              {awardCategories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="awardCategory"
                    value={category}
                    checked={formik.values.awardCategory === category}
                    onChange={formik.handleChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. Thematic Area */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium text-gray-700 mb-3">5. Link to Belize Fund Thematic Area (TA)</h4>
            <p className="text-sm text-gray-600 mb-3">Please select the most relevant Thematic Area (Check only one)</p>
            <div className="grid md:grid-cols-2 gap-2">
              {thematicAreas.map(area => (
                <label key={area} className="flex items-center">
                  <input
                    type="radio"
                    name="thematicArea"
                    value={area}
                    checked={formik.values.thematicArea === area}
                    onChange={formik.handleChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">{area}</span>
                </label>
              ))}
            </div>
          </div>
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
              <h4 className="font-medium text-gray-700 mb-2">Project Overview (250 words max)</h4>
              <div className="text-sm text-gray-600 mb-3">
                <p>Please provide an overview including:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Summary of key points and actions</li>
                  <li>Project context and location</li>
                  <li>Problem statement and proposed solution</li>
                  <li>Direct contribution to selected Thematic Area</li>
                </ul>
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
              placeholder="Describe your project overview here..."
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
              <h4 className="font-medium text-gray-700 mb-2">Goals and Objectives (200 words max)</h4>
              <div className="text-sm text-gray-600 mb-3">
                <p>Please describe:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>What is the goal of the proposed project?</li>
                  <li>What are the specific objectives?</li>
                  <li>The potential longer-term impact of your project</li>
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
              <h4 className="font-medium text-gray-700 mb-2">Outputs and Activities (500 words max)</h4>
              <div className="text-sm text-gray-600 mb-3">
                <p>Please provide a clear statement of what the project will accomplish:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Specific outputs the project aims to produce</li>
                  <li>Specific activities the project will conduct</li>
                  <li>How activities will lead to achieving the project goal</li>
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
            {/* Co-financing Table */}
            {/* <div>
              <h4 className="font-medium text-gray-700 mb-3">Contributing Organizations</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Contributing Organizations</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Total Contribution (BZD)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Percentage (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.coFinancingEntries.map((entry, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            value={entry.organization}
                            onChange={(e) => {
                              const newEntries = [...formik.values.coFinancingEntries]
                              newEntries[index].organization = e.target.value
                              formik.setFieldValue('coFinancingEntries', newEntries)
                            }}
                            className="w-full px-2 py-1 border border-gray-200 rounded"
                            placeholder="Organization name"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="number"
                            value={entry.contribution}
                            onChange={(e) => {
                              const newEntries = [...formik.values.coFinancingEntries]
                              newEntries[index].contribution = parseFloat(e.target.value) || 0
                              // Calculate percentage
                              const total = totalProjectCost
                              newEntries[index].percentage = total > 0 ? ((newEntries[index].contribution / total) * 100).toFixed(1) : 0
                              formik.setFieldValue('coFinancingEntries', newEntries)
                              
                              // Update total co-financing
                              const totalCoFin = newEntries.reduce((sum, e) => sum + e.contribution, 0)
                              formik.setFieldValue('totalCoFinancing', totalCoFin)
                            }}
                            className="w-full px-2 py-1 border border-gray-200 rounded"
                            placeholder="0"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {entry.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  const newEntries = [...formik.values.coFinancingEntries, { organization: '', contribution: 0, percentage: 0 }]
                  formik.setFieldValue('coFinancingEntries', newEntries)
                }}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Add Co-financing Entry
              </button>
            </div> */}

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
              </div>
            </div>
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-gray-700 mb-3">Required Documentation Checklist</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Certificate of Registration</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Articles of Association/Business Extract</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Certificate of Good Standing (BCAAR)</span>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-gray-500">
            Submit to: projectofficer@belizefundmanagement.bz
          </div>
          
                  <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => {
              localStorage.setItem('conceptFormData', JSON.stringify(formik.values))
              toast.success('Form saved as draft!')
            }}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </button>


          
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Concept Paper
          </button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default ConceptForm 