import { useState, useEffect } from 'react'
import { FileText, Building, Info, Users } from 'lucide-react'

const Step2BackgroundInfo = ({ register, errors, setValue, getValues, watch }) => {
  const [summaryWordCount, setSummaryWordCount] = useState(0)
  const [orgBackgroundWordCount, setOrgBackgroundWordCount] = useState(0)

  // Word count helper function
  const countWords = (text) => {
    if (!text) return 0
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  // Monitor word counts
  useEffect(() => {
    const summary = watch('projectSummary')
    const orgBackground = watch('organizationalBackground')
    
    setSummaryWordCount(countWords(summary))
    setOrgBackgroundWordCount(countWords(orgBackground))
  }, [watch('projectSummary'), watch('organizationalBackground')])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Background Information</h3>
        <p className="text-gray-600">Provide comprehensive information about your project and organization</p>
      </div>

      {/* Project Summary Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">1. Project Summary</h4>
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            summaryWordCount > 500 ? 'bg-red-100 text-red-700' : 
            summaryWordCount > 450 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {summaryWordCount} / 500 words
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h5 className="font-medium text-gray-900 mb-2">Your summary should include:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>The Goal of the proposed project</li>
              <li>Rationale/Justification for the project approach</li>
              <li>Purpose of the project</li>
              <li>Contribution towards the Belize Fund Thematic Area (Focus on targeted TA only!)</li>
              <li>Contribution towards national/local management plans and strategies (if any)</li>
              <li>The issue to be addressed (problem/threat) and proposed solution</li>
              <li>Site description (if relevant)</li>
              <li>Beneficiaries, including participation of women, men and indigenous people</li>
            </ul>
          </div>

          <div>
            <label className="form-label">Project Summary * (Maximum 500 words)</label>
            <textarea
              {...register('projectSummary')}
              className="form-input min-h-[300px]"
              placeholder="Provide a comprehensive summary of your project covering all the points listed above..."
            />
            {errors.projectSummary && (
              <p className="form-error">{errors.projectSummary.message}</p>
            )}
            {summaryWordCount > 500 && (
              <p className="text-red-600 text-sm mt-1">
                ⚠️ Summary exceeds 500-word limit. Please reduce by {summaryWordCount - 500} words.
              </p>
            )}
          </div>

          {/* Thematic Area Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Primary Belize Fund Thematic Area *</label>
              <select {...register('primaryThematicArea')} className="form-input">
                <option value="">Select primary thematic area</option>
                <option value="TA1">TA 1: Protection for Biodiversity</option>
                <option value="TA2">TA 2: Sustainable Fisheries</option>
                <option value="TA3">TA 3: Climate Resilience</option>
                <option value="TA4">TA 4: Blue Business Innovation</option>
              </select>
              {errors.primaryThematicArea && (
                <p className="form-error">{errors.primaryThematicArea.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Secondary Thematic Area (if applicable)</label>
              <select {...register('secondaryThematicArea')} className="form-input">
                <option value="">Select secondary thematic area</option>
                <option value="TA1">TA 1: Protection for Biodiversity</option>
                <option value="TA2">TA 2: Sustainable Fisheries</option>
                <option value="TA3">TA 3: Climate Resilience</option>
                <option value="TA4">TA 4: Blue Business Innovation</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Organizational Background Section */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Building className="h-6 w-6 text-green-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">2. Organizational Background and Capacity</h4>
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            orgBackgroundWordCount > 500 ? 'bg-red-100 text-red-700' : 
            orgBackgroundWordCount > 450 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {orgBackgroundWordCount} / 500 words
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-medium text-gray-900 mb-2">This section must include:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Organization Mission and Vision</li>
              <li>Purpose and day-to-day core activities</li>
              <li>Organizational legal status, date of registration and governance structure</li>
              <li>Existing capacity and skills to implement the project</li>
              <li>Past/current relevant experience and partnerships</li>
              <li>Examples of relevant projects with details (title, period, leader, partners, budget, donor)</li>
            </ul>
          </div>

          {/* Organization Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Organization Mission *</label>
              <textarea
                {...register('organizationMission')}
                className="form-input"
                rows="3"
                placeholder="State your organization's mission statement"
              />
              {errors.organizationMission && (
                <p className="form-error">{errors.organizationMission.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Organization Vision *</label>
              <textarea
                {...register('organizationVision')}
                className="form-input"
                rows="3"
                placeholder="State your organization's vision statement"
              />
              {errors.organizationVision && (
                <p className="form-error">{errors.organizationVision.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Legal Status *</label>
              <select {...register('legalStatus')} className="form-input">
                <option value="">Select legal status</option>
                <option value="Registered NGO">Registered NGO</option>
                <option value="Non-profit Organization">Non-profit Organization</option>
                <option value="Community-based Organization">Community-based Organization</option>
                <option value="Private Company">Private Company</option>
                <option value="Government Agency">Government Agency</option>
                <option value="Academic Institution">Academic Institution</option>
                <option value="International Organization">International Organization</option>
              </select>
              {errors.legalStatus && (
                <p className="form-error">{errors.legalStatus.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Registration Date *</label>
              <input
                type="date"
                {...register('registrationDate')}
                className="form-input"
              />
              {errors.registrationDate && (
                <p className="form-error">{errors.registrationDate.message}</p>
              )}
            </div>
          </div>

          {/* Organizational Background Narrative */}
          <div>
            <label className="form-label">Organizational Background and Capacity * (Maximum 500 words)</label>
            <textarea
              {...register('organizationalBackground')}
              className="form-input min-h-[300px]"
              placeholder="Provide detailed information about your organization's background, capacity, governance structure, core activities, and relevant experience..."
            />
            {errors.organizationalBackground && (
              <p className="form-error">{errors.organizationalBackground.message}</p>
            )}
            {orgBackgroundWordCount > 500 && (
              <p className="text-red-600 text-sm mt-1">
                ⚠️ Background exceeds 500-word limit. Please reduce by {orgBackgroundWordCount - 500} words.
              </p>
            )}
          </div>

          {/* Team and Partnerships */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Project Manager Name *</label>
              <input
                type="text"
                {...register('projectManagerName')}
                className="form-input"
                placeholder="Full name of project manager"
              />
              {errors.projectManagerName && (
                <p className="form-error">{errors.projectManagerName.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Project Manager Qualifications *</label>
              <textarea
                {...register('projectManagerQualifications')}
                className="form-input"
                rows="3"
                placeholder="Brief summary of project manager's relevant qualifications and experience"
              />
              {errors.projectManagerQualifications && (
                <p className="form-error">{errors.projectManagerQualifications.message}</p>
              )}
            </div>
          </div>

          {/* Partner Organizations */}
          <div>
            <label className="form-label">Partner Organizations (if applicable)</label>
            <textarea
              {...register('partnerOrganizations')}
              className="form-input"
              rows="4"
              placeholder="List and describe any partner organizations involved in project implementation, including their roles and contributions"
            />
          </div>

          {/* Previous Projects */}
          <div>
            <label className="form-label">Relevant Previous Projects *</label>
            <textarea
              {...register('previousRelevantProjects')}
              className="form-input"
              rows="5"
              placeholder="Provide examples of relevant projects executed by your organization. Include: project title, implementation period, project leader, partners, budget, and donor/funding agency"
            />
            {errors.previousRelevantProjects && (
              <p className="form-error">{errors.previousRelevantProjects.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Supporting Documents Reminder */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <div className="flex items-center mb-3">
          <Info className="h-5 w-5 text-yellow-600 mr-2" />
          <h5 className="font-medium text-gray-900">Supporting Documents Required</h5>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Organization Mission and Vision statements (official document)</li>
          <li>Certificate of registration/incorporation</li>
          <li>Project Manager CV</li>
          <li>Key project implementation team CVs</li>
          <li>Organizational chart/governance structure</li>
        </ul>
        <p className="text-sm text-gray-600 mt-2">
          These documents will be uploaded in the final step of the application.
        </p>
      </div>
    </div>
  )
}

export default Step2BackgroundInfo 