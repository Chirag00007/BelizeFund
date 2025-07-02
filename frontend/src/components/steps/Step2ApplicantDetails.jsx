import { User, Mail, Phone, CreditCard, Calendar, MapPin } from 'lucide-react'

const Step2ApplicantDetails = ({ register, errors, watch }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center pb-6 border-b border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-green-100 rounded-full">
            <User className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Applicant Details</h2>
        <p className="text-gray-600">Provide your personal information as the main applicant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User className="h-4 w-4 mr-2 text-green-600" />
              First Name *
            </label>
            <input
              type="text"
              {...register('firstName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User className="h-4 w-4 mr-2 text-green-600" />
              Last Name *
            </label>
            <input
              type="text"
              {...register('lastName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Mail className="h-4 w-4 mr-2 text-green-600" />
              Email Address *
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Phone className="h-4 w-4 mr-2 text-green-600" />
              Mobile Number *
            </label>
            <input
              type="tel"
              {...register('mobile')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="+501 XXX-XXXX"
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* User ID */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <CreditCard className="h-4 w-4 mr-2 text-green-600" />
              User ID / National ID
            </label>
            <input
              type="text"
              {...register('userId')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter your identification number"
            />
            {errors.userId && (
              <p className="mt-1 text-sm text-red-600">{errors.userId.message}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User className="h-4 w-4 mr-2 text-green-600" />
              Position in Organization *
            </label>
            <input
              type="text"
              {...register('position')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="e.g., Project Manager, Director, Coordinator"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
            )}
          </div>

          {/* Mobile Telephone (Alternative) */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Phone className="h-4 w-4 mr-2 text-green-600" />
              Alternative Mobile Number
            </label>
            <input
              type="tel"
              {...register('mobileTelephone')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="+501 XXX-XXXX"
            />
            {errors.mobileTelephone && (
              <p className="mt-1 text-sm text-red-600">{errors.mobileTelephone.message}</p>
            )}
          </div>

          {/* Office Telephone */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Phone className="h-4 w-4 mr-2 text-green-600" />
              Office Telephone
            </label>
            <input
              type="tel"
              {...register('officeTelephone')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="+501 XXX-XXXX"
            />
            {errors.officeTelephone && (
              <p className="mt-1 text-sm text-red-600">{errors.officeTelephone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Village or Town */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="h-4 w-4 mr-2 text-green-600" />
            Village or Town *
          </label>
          <input
            type="text"
            {...register('villageOrTown')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            placeholder="Enter your village or town"
          />
          {errors.villageOrTown && (
            <p className="mt-1 text-sm text-red-600">{errors.villageOrTown.message}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="h-4 w-4 mr-2 text-green-600" />
            District *
          </label>
          <select
            {...register('contactDistrict')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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

      {/* Application Metadata */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Application Information
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
            >
              <option value="">Select category</option>
              <option value="Community Development">Community Development</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Environment">Environment</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Youth Development">Youth Development</option>
              <option value="Women Empowerment">Women Empowerment</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Season */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="h-4 w-4 mr-2 text-green-600" />
              Application Season
            </label>
            <select
              {...register('season')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
            >
              <option value="">Select season</option>
              <option value="2024-Q1">2024 Quarter 1</option>
              <option value="2024-Q2">2024 Quarter 2</option>
              <option value="2024-Q3">2024 Quarter 3</option>
              <option value="2024-Q4">2024 Quarter 4</option>
              <option value="2025-Q1">2025 Quarter 1</option>
            </select>
            {errors.season && (
              <p className="mt-1 text-sm text-red-600">{errors.season.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Summary Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Phone className="h-5 w-5 mr-2 text-green-600" />
          Contact Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Primary: {watch('email') || 'Not provided'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Mobile: {watch('mobile') || 'Not provided'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Office: {watch('officeTelephone') || 'Not provided'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Location: {watch('villageOrTown') || 'Not provided'}, {watch('contactDistrict') || 'Not provided'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2ApplicantDetails 