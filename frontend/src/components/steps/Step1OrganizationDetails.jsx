import { Building2, Globe, User, Calendar, MapPin, Phone, Mail } from 'lucide-react'

const Step1OrganizationDetails = ({ register, errors, watch, setValue }) => {
  const organizationType = watch('organizationType')
  const organizationAge = watch('organizationAge')
  const operationalStatus = watch('operationalStatus')

  const organizationTypes = [
    'NGO',
    'CBO',
    'Cooperative',
    'Private Company',
    'Government Agency',
    'Religious Organization',
    'Educational Institution',
    'Other'
  ]

  const operationalStatuses = [
    'Fully Operational',
    'Partially Operational',
    'Starting Operations',
    'Not Operational'
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center pb-6 border-b border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Organization Details</h2>
        <p className="text-gray-600">Tell us about your organization and its operations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Organization Name */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Building2 className="h-4 w-4 mr-2 text-blue-600" />
              Organization Name *
            </label>
            <input
              type="text"
              {...register('organizationName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your organization name"
            />
            {errors.organizationName && (
              <p className="mt-1 text-sm text-red-600">{errors.organizationName.message}</p>
            )}
          </div>

          {/* Type of Organization */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Building2 className="h-4 w-4 mr-2 text-blue-600" />
              Type of Organization *
            </label>
            <select
              {...register('typeOfOrganisation')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select organization type</option>
              {organizationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.typeOfOrganisation && (
              <p className="mt-1 text-sm text-red-600">{errors.typeOfOrganisation.message}</p>
            )}
          </div>

          {/* Website */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Globe className="h-4 w-4 mr-2 text-blue-600" />
              Website
            </label>
            <input
              type="url"
              {...register('website')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://www.example.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>

          {/* Legal Representative Name */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              Legal Representative Name *
            </label>
            <input
              type="text"
              {...register('legalRepName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter legal representative's full name"
            />
            {errors.legalRepName && (
              <p className="mt-1 text-sm text-red-600">{errors.legalRepName.message}</p>
            )}
          </div>

          {/* Legal Representative Position */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              Legal Representative's Position *
            </label>
            <input
              type="text"
              {...register('legalRepPosition')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="e.g., Executive Director, President, CEO"
            />
            {errors.legalRepPosition && (
              <p className="mt-1 text-sm text-red-600">{errors.legalRepPosition.message}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Organization Age */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              How old is your organization? (years) *
            </label>
            <input
              type="number"
              {...register('organizationAge')}
              min="0"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter number of years"
            />
            {errors.organizationAge && (
              <p className="mt-1 text-sm text-red-600">{errors.organizationAge.message}</p>
            )}
            {organizationAge && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Auto-score:</strong> {organizationAge >= 5 ? '30 points' : organizationAge >= 3 ? '20 points' : '10 points'}
                </p>
              </div>
            )}
          </div>

          {/* Organization Type (for scoring) */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Building2 className="h-4 w-4 mr-2 text-blue-600" />
              Organization Type (for scoring) *
            </label>
            <select
              {...register('organizationType')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select organization type</option>
              <option value="NGO">NGO</option>
              <option value="CBO">CBO</option>
              <option value="Cooperative">Cooperative</option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>
            {errors.organizationType && (
              <p className="mt-1 text-sm text-red-600">{errors.organizationType.message}</p>
            )}
            {organizationType && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Auto-score:</strong> {
                    organizationType === 'NGO' ? '25 points' :
                    organizationType === 'CBO' ? '20 points' :
                    organizationType === 'Cooperative' ? '15 points' :
                    organizationType === 'Private' ? '10 points' :
                    organizationType === 'Government' ? '5 points' : '0 points'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Operational Status */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Building2 className="h-4 w-4 mr-2 text-blue-600" />
              Operational Status *
            </label>
            <select
              {...register('operationalStatus')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select operational status</option>
              {operationalStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            {errors.operationalStatus && (
              <p className="mt-1 text-sm text-red-600">{errors.operationalStatus.message}</p>
            )}
            {operationalStatus && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Auto-score:</strong> {
                    operationalStatus === 'Fully Operational' ? '25 points' :
                    operationalStatus === 'Partially Operational' ? '15 points' :
                    operationalStatus === 'Starting Operations' ? '10 points' : '0 points'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Mail className="h-4 w-4 mr-2 text-blue-600" />
              Email Address *
            </label>
            <input
              type="email"
              {...register('emailAddress')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="organization@example.com"
            />
            {errors.emailAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.emailAddress.message}</p>
            )}
          </div>

          {/* Office Phone Number */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Phone className="h-4 w-4 mr-2 text-blue-600" />
              Office Phone Number
            </label>
            <input
              type="tel"
              {...register('officePhoneNumber')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="+501 XXX-XXXX"
            />
            {errors.officePhoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.officePhoneNumber.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Physical Address */}
      <div>
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <MapPin className="h-4 w-4 mr-2 text-blue-600" />
          Physical Address *
        </label>
        <textarea
          {...register('physicalAddress')}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter complete physical address including street, city, district"
        />
        {errors.physicalAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.physicalAddress.message}</p>
        )}
      </div>

      {/* Auto-Score Summary */}
      {(organizationAge || organizationType || operationalStatus) && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Auto-Score Preview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-sm text-gray-600">Organization Age</div>
              <div className="text-2xl font-bold text-blue-600">
                {organizationAge >= 5 ? '30' : organizationAge >= 3 ? '20' : organizationAge >= 1 ? '10' : '0'} pts
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-sm text-gray-600">Organization Type</div>
              <div className="text-2xl font-bold text-blue-600">
                {organizationType === 'NGO' ? '25' :
                 organizationType === 'CBO' ? '20' :
                 organizationType === 'Cooperative' ? '15' :
                 organizationType === 'Private' ? '10' :
                 organizationType === 'Government' ? '5' : '0'} pts
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-sm text-gray-600">Operational Status</div>
              <div className="text-2xl font-bold text-blue-600">
                {operationalStatus === 'Fully Operational' ? '25' :
                 operationalStatus === 'Partially Operational' ? '15' :
                 operationalStatus === 'Starting Operations' ? '10' : '0'} pts
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border-2 border-blue-200">
            <div className="text-sm text-gray-600">Total Auto-Score</div>
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
}

export default Step1OrganizationDetails 