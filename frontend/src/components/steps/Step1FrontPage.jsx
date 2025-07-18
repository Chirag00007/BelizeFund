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
          Belize Fund For A Sustainable Future (Belize Fund)
        </h3>
        <p className="text-lg text-gray-600">Community Grants Proposal Template - Front Page</p>
        <p className="text-sm text-gray-500 mt-2">(max 1 page)</p>
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
              placeholder="Please limit to 15 words or less"
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
              placeholder="Headquarters/office"
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
              <option value="Community-based Organization">Community-based organization/association</option>
              <option value="Government Agency">Government Agency</option>
              <option value="Academic Institution">Academic Institution</option>
              <option value="Other">Other</option>
            </select>
            {errors.organizationType && (
              <p className="form-error">{errors.organizationType.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Date of Incorporation of Organization *</label>
            <input
              type="date"
              {...register('dateOfIncorporation')}
              className="form-input"
              placeholder="(mm/dd/yyyy)"
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

          <div className="md:col-span-2">
            <label className="form-label">Contact Info (Email and Telephone) *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                {...register('contactEmail')}
                className="form-input"
                placeholder="primary.contact@organization.com"
              />
              <input
                type="tel"
                {...register('contactTelephone')}
                className="form-input"
                placeholder="Include country code (e.g., +501-123-4567)"
              />
            </div>
            {errors.contactEmail && (
              <p className="form-error">{errors.contactEmail.message}</p>
            )}
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
              placeholder="(mm/dd/yyyy)"
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
              placeholder="(mm/dd/yyyy)"
            />
            {errors.expectedEndDate && (
              <p className="form-error">{errors.expectedEndDate.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Project Duration</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={projectDuration}
                readOnly
                className="form-input bg-gray-100"
                placeholder="Months"
              />
              <span className="text-gray-600">Months</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Location Section */}
      <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
        <div className="flex items-center mb-4">
          <MapPin className="h-6 w-6 text-orange-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">4. Project Location</h4>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            The Belize Fund can fund projects in any part of Belize (coastal, marine, and terrestrial) 
            provided that there is a direct link to and impact on the Belize Fund Thematic Areas and/or key priorities.
          </p>
          
          <div>
            <label className="form-label">Primary Project Location *</label>
            <input
              type="text"
              {...register('primaryLocation')}
              className="form-input"
              placeholder="e.g., Belize City, Caye Caulker, Toledo District"
            />
            {errors.primaryLocation && (
              <p className="form-error">{errors.primaryLocation.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Project Environment Type *</label>
            <select {...register('projectEnvironment')} className="form-input">
              <option value="">Select environment type</option>
              <option value="Coastal">Coastal</option>
              <option value="Marine">Marine</option>
              <option value="Terrestrial">Terrestrial</option>
              <option value="Mixed">Mixed (Multiple environments)</option>
            </select>
            {errors.projectEnvironment && (
              <p className="form-error">{errors.projectEnvironment.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Detailed Location Description</label>
            <textarea
              {...register('detailedLocationDescription')}
              className="form-input"
              rows="3"
              placeholder="Provide specific details about the project location, including coordinates if applicable"
            />
            {errors.detailedLocationDescription && (
              <p className="form-error">{errors.detailedLocationDescription.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Project Budget Summary Section */}
      <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
        <div className="flex items-center mb-4">
          <DollarSign className="h-6 w-6 text-indigo-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">5. Project Budget Summary</h4>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Please provide a list of partner organizations and the total contribution towards the project. 
            Refer to the Belize Fund Award Category of the Call for Proposals for guidance on budget and co-financing. 
            Include all cash and in-kind contributions made by the organization(s).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <label className="form-label">Amount Requested from Belize Fund (BZD) *</label>
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

            <div>
              <label className="form-label">Total Co-Financing (BZD) *</label>
              <input
                type="number"
                {...register('totalCoFinancing')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.totalCoFinancing && (
                <p className="form-error">{errors.totalCoFinancing.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Partner Organizations and Contributions</label>
            <textarea
              {...register('partnerOrganizations')}
              className="form-input"
              rows="4"
              placeholder="List partner organizations and their contributions (cash and in-kind) to the project"
            />
            {errors.partnerOrganizations && (
              <p className="form-error">{errors.partnerOrganizations.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1FrontPage 