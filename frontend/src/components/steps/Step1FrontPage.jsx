import { useState, useEffect } from 'react'
import { Calendar, MapPin, DollarSign, Building2, User, Clock } from 'lucide-react'

const Step1FrontPage = ({ register, errors, setValue, getValues, watch }) => {
  const [projectDuration, setProjectDuration] = useState('')
  
  // Calculate project duration in months
  useEffect(() => {
    const startDate = watch('proposedStartDate')
    const endDate = watch('expectedEndDate')
    
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      setProjectDuration(monthsDiff)
      setValue('projectDurationMonths', monthsDiff)
    }
  }, [watch('proposedStartDate'), watch('expectedEndDate'), setValue])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Belize Fund Management
        </h3>
        <p className="text-lg text-gray-600">Grant Award Program Proposal - Front Page</p>
      </div>

      {/* Lead Organization Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center mb-4">
          <Building2 className="h-6 w-6 text-blue-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">1. Lead Organization</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="form-label">Project Title * (max 15 words)</label>
            <input
              type="text"
              {...register('projectTitle')}
              className="form-input"
              placeholder="Enter project title (keep it concise)"
              maxLength="100"
            />
            {errors.projectTitle && (
              <p className="form-error">{errors.projectTitle.message}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {watch('projectTitle')?.split(' ').length || 0} / 15 words
            </p>
          </div>

          <div>
            <label className="form-label">Organization Name *</label>
            <input
              type="text"
              {...register('organizationName')}
              className="form-input"
              placeholder="Name of applying/lead organization"
            />
            {errors.organizationName && (
              <p className="form-error">{errors.organizationName.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Organization Address *</label>
            <textarea
              {...register('organizationAddress')}
              className="form-input"
              rows="3"
              placeholder="Headquarters/office address"
            />
            {errors.organizationAddress && (
              <p className="form-error">{errors.organizationAddress.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Type of Organization *</label>
            <select {...register('organizationType')} className="form-input">
              <option value="">Select organization type</option>
              <option value="NGO">NGO</option>
              <option value="Private">Private</option>
              <option value="Community-based Organization">Community-based Organization/Association</option>
              <option value="Government Agency">Government Agency</option>
              <option value="Academic Institution">Academic Institution</option>
              <option value="Other">Other</option>
            </select>
            {errors.organizationType && (
              <p className="form-error">{errors.organizationType.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Date of Incorporation *</label>
            <input
              type="date"
              {...register('dateOfIncorporation')}
              className="form-input"
            />
            {errors.dateOfIncorporation && (
              <p className="form-error">{errors.dateOfIncorporation.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <User className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">2. Main Contact</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Contact Name *</label>
            <input
              type="text"
              {...register('contactName')}
              className="form-input"
              placeholder="Full name of main contact person"
            />
            {errors.contactName && (
              <p className="form-error">{errors.contactName.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Position *</label>
            <input
              type="text"
              {...register('contactPosition')}
              className="form-input"
              placeholder="Job title/position in organization"
            />
            {errors.contactPosition && (
              <p className="form-error">{errors.contactPosition.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Email *</label>
            <input
              type="email"
              {...register('contactEmail')}
              className="form-input"
              placeholder="primary.contact@organization.com"
            />
            {errors.contactEmail && (
              <p className="form-error">{errors.contactEmail.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Telephone *</label>
            <input
              type="tel"
              {...register('contactTelephone')}
              className="form-input"
              placeholder="Include country code (e.g., +501-123-4567)"
            />
            {errors.contactTelephone && (
              <p className="form-error">{errors.contactTelephone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Project Duration Section */}
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-center mb-4">
          <Clock className="h-6 w-6 text-purple-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">3. Project Duration</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="form-label">Proposed Start Date *</label>
            <input
              type="date"
              {...register('proposedStartDate')}
              className="form-input"
            />
            {errors.proposedStartDate && (
              <p className="form-error">{errors.proposedStartDate.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Expected End Date *</label>
            <input
              type="date"
              {...register('expectedEndDate')}
              className="form-input"
            />
            {errors.expectedEndDate && (
              <p className="form-error">{errors.expectedEndDate.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Duration (Months)</label>
            <input
              type="number"
              value={projectDuration}
              className="form-input bg-gray-100"
              readOnly
              placeholder="Auto-calculated"
            />
            {projectDuration > 36 && (
              <p className="text-amber-600 text-sm mt-1">
                ⚠️ Projects longer than 36 months may require additional justification
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Project Location Section */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <div className="flex items-center mb-4">
          <MapPin className="h-6 w-6 text-yellow-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">4. Project Location</h4>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Belize Fund Management can fund projects in any part of Belize (coastal, marine, and terrestrial) 
              provided that there is a direct link to and impact on the Belize Fund Management Thematic Areas and/or key priorities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Primary Location *</label>
              <select {...register('primaryLocation')} className="form-input">
                <option value="">Select primary location</option>
                <option value="Corozal District">Corozal District</option>
                <option value="Orange Walk District">Orange Walk District</option>
                <option value="Belize District">Belize District</option>
                <option value="Cayo District">Cayo District</option>
                <option value="Stann Creek District">Stann Creek District</option>
                <option value="Toledo District">Toledo District</option>
                <option value="Marine Areas">Marine Areas</option>
                <option value="Multiple Districts">Multiple Districts</option>
              </select>
              {errors.primaryLocation && (
                <p className="form-error">{errors.primaryLocation.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Project Environment *</label>
              <select {...register('projectEnvironment')} className="form-input">
                <option value="">Select environment type</option>
                <option value="Coastal">Coastal</option>
                <option value="Marine">Marine</option>
                <option value="Terrestrial">Terrestrial</option>
                <option value="Coastal-Marine">Coastal-Marine</option>
                <option value="Terrestrial-Coastal">Terrestrial-Coastal</option>
                <option value="All Environments">All Environments</option>
              </select>
              {errors.projectEnvironment && (
                <p className="form-error">{errors.projectEnvironment.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Detailed Location Description *</label>
            <textarea
              {...register('detailedLocationDescription')}
              className="form-input"
              rows="4"
              placeholder="Provide specific details about project location, including communities, protected areas, or specific sites that will be impacted"
            />
            {errors.detailedLocationDescription && (
              <p className="form-error">{errors.detailedLocationDescription.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Project Budget Summary Section */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <div className="flex items-center mb-4">
          <DollarSign className="h-6 w-6 text-red-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">5. Project Budget Summary</h4>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Total Project Cost (BZD) *</label>
              <input
                type="number"
                {...register('totalProjectCost')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.totalProjectCost && (
                <p className="form-error">{errors.totalProjectCost.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Amount Requested from Belize Fund Management (BZD) *</label>
              <input
                type="number"
                {...register('amountRequested')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.amountRequested && (
                <p className="form-error">{errors.amountRequested.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Co-financing Sources and Amounts</label>
            <textarea
              {...register('coFinancingSources')}
              className="form-input"
              rows="4"
              placeholder="List all partner organizations and their cash/in-kind contributions. Include organization name, contribution type (cash/in-kind), and amount."
            />
            <p className="text-sm text-gray-500 mt-1">
              Include all cash and in-kind contributions made by your organization and partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Total Co-financing (BZD)</label>
              <input
                type="number"
                {...register('totalCoFinancing')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="form-label">Co-financing Percentage</label>
              <input
                type="text"
                value={watch('totalProjectCost') && watch('totalCoFinancing') 
                  ? `${((watch('totalCoFinancing') / watch('totalProjectCost')) * 100).toFixed(1)}%`
                  : '0%'
                }
                className="form-input bg-gray-100"
                readOnly
              />
              <p className="text-sm text-gray-500 mt-1">
                Higher co-financing percentages strengthen applications
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Important Notes</h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>Refer to the accepted concept paper when completing this proposal</li>
          <li>Visit the Belize Fund Management website for general information</li>
          <li>Review the Call for Proposals for specific requirements</li>
          <li>Ensure you meet all eligibility criteria before submitting</li>
          <li>Contact projectofficer@belizefundmanagement.bz for specific questions</li>
        </ul>
      </div>
    </div>
  )
}

export default Step1FrontPage 