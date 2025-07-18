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
        <h3 className="text-2xl font-bold text-gray-900 mb-2">B. Background Information</h3>
        <p className="text-gray-600">Provide comprehensive information about your project and organization</p>
      </div>

      {/* Project Summary Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">1. Summary (max-500 words)</h4>
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
            <h5 className="font-medium text-gray-900 mb-2">The summary should briefly describe:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>The Goal of the proposed project</li>
              <li>Rationale/Justification for the project approach</li>
              <li>Purpose of the project</li>
              <li>Contribution towards the Belize Fund Thematic Area (TA). Focus on the targeted TA only!</li>
              <li>Contribution towards national/local management plans and strategies (if any)</li>
              <li>The issue to be addressed (the problem/threat) and proposed approach/solution (the solution)</li>
              <li>Site description (if relevant)</li>
              <li>Beneficiaries, including the participation of women, men and indigenous people, if any</li>
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
            <h4 className="text-xl font-semibold text-gray-900">2. Organizational Background and Capacity (max-500 words)</h4>
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
            <h5 className="font-medium text-gray-900 mb-2">This section should provide information on the profile of the lead applicant (organization) and main partners (implementing). Furthermore, it should clearly demonstrate that the applicant (supported by partners if appropriate) has the capacity, commitment and experience to successfully implement the proposed project. This section must include:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Organization Mission and Vision (attach supporting document)</li>
              <li>The purpose and day-to-day core activities being carried out by the applying organization</li>
              <li>Organizational legal status, date of registration and governance structure</li>
              <li>Existing capacity and skills to effectively implement and manage the proposed project (including the project implementation team)</li>
              <li>Description of past or current experience(s) and partnership(s), relevant to the present proposal</li>
              <li>Provide examples of relevant projects executed to date, giving a brief description including: project title, period of implementation, project leader, partners, budget, and donor/agency</li>
              <li>Include CV (if applicable) as supporting documents for the Project Manager/project implementation team</li>
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
              placeholder="Describe your organization's background, capacity, experience, and relevant projects. Include details about your team's qualifications and past achievements..."
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

          {/* Project Implementation Team */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-medium text-gray-900 mb-3">Project Implementation Team</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="Brief description of qualifications and experience"
                />
                {errors.projectManagerQualifications && (
                  <p className="form-error">{errors.projectManagerQualifications.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Previous Relevant Projects */}
          <div>
            <label className="form-label">Previous Relevant Projects</label>
            <textarea
              {...register('previousRelevantProjects')}
              className="form-input"
              rows="4"
              placeholder="List and briefly describe relevant projects executed to date, including: project title, period of implementation, project leader, partners, budget, and donor/agency"
            />
            {errors.previousRelevantProjects && (
              <p className="form-error">{errors.previousRelevantProjects.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Important Notes:</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Organization Mission and Vision documents should be attached in the final step</li>
              <li>• CVs for Project Manager and key implementation team members should be attached</li>
              <li>• Ensure all information demonstrates capacity to implement the proposed project</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2BackgroundInfo 