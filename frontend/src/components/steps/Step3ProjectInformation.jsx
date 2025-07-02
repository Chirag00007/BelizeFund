import { Target, MapPin, Calendar, FileText, Lightbulb, Trophy } from 'lucide-react'

const Step3ProjectInformation = ({ register, errors, watch, setValue }) => {
  const projectGoal = watch('projectGoal')
  const projectObjectives = watch('projectObjectives')
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center pb-6 border-b border-gray-200">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-purple-100 rounded-full">
            <Target className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Information</h2>
        <p className="text-gray-600">Define your project goals, objectives, and key details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Project ID */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <FileText className="h-4 w-4 mr-2 text-purple-600" />
              Project ID *
            </label>
            <input
              {...register('projectId')}
              type="text"
              placeholder="Enter unique project identifier"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                errors.projectId ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.projectId && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.projectId.message}
              </p>
            )}
          </div>

          {/* Project Title */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Trophy className="h-4 w-4 mr-2 text-purple-600" />
              Project Title *
            </label>
            <input
              {...register('projectTitle')}
              type="text"
              placeholder="Enter descriptive project title"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                errors.projectTitle ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.projectTitle && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.projectTitle.message}
              </p>
            )}
          </div>

          {/* Project Goal */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Target className="h-4 w-4 mr-2 text-purple-600" />
              Project Goal *
            </label>
            <textarea
              {...register('projectGoal')}
              rows={4}
              placeholder="Describe the main goal and expected outcome of your project"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none ${
                errors.projectGoal ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.projectGoal ? (
                <p className="text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.projectGoal.message}
                </p>
              ) : (
                <p className="text-sm text-gray-500">Clearly define your project's primary objective</p>
              )}
              <span className="text-xs text-gray-400">{projectGoal?.length || 0}/500</span>
            </div>
          </div>

          {/* Project Village/Town/City */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="h-4 w-4 mr-2 text-purple-600" />
              Proposal Village, Town, or City *
            </label>
            <input
              {...register('proposalVillageOrCity')}
              type="text"
              placeholder="Enter project location"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                errors.proposalVillageOrCity ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.proposalVillageOrCity && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.proposalVillageOrCity.message}
              </p>
            )}
          </div>

          {/* District */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="h-4 w-4 mr-2 text-purple-600" />
              District *
            </label>
            <select
              {...register('district')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                errors.district ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <option value="">Select District</option>
              <option value="Belize">Belize</option>
              <option value="Cayo">Cayo</option>
              <option value="Corozal">Corozal</option>
              <option value="Orange Walk">Orange Walk</option>
              <option value="Stann Creek">Stann Creek</option>
              <option value="Toledo">Toledo</option>
            </select>
            {errors.district && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.district.message}
              </p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Project Objectives */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Lightbulb className="h-4 w-4 mr-2 text-purple-600" />
              Project Objectives *
            </label>
            <textarea
              {...register('projectObjectives')}
              rows={6}
              placeholder="List the specific objectives and measurable outcomes of your project"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none ${
                errors.projectObjectives ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.projectObjectives ? (
                <p className="text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.projectObjectives.message}
                </p>
              ) : (
                <p className="text-sm text-gray-500">Break down your project into specific, measurable objectives</p>
              )}
              <span className="text-xs text-gray-400">{projectObjectives?.length || 0}/1000</span>
            </div>
          </div>

          {/* Project Location Details */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="h-4 w-4 mr-2 text-purple-600" />
              Proposal Project Location *
            </label>
            <textarea
              {...register('proposalProjectLocation')}
              rows={4}
              placeholder="Provide detailed description of the project location including GPS coordinates if available"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none ${
                errors.proposalProjectLocation ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.proposalProjectLocation && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.proposalProjectLocation.message}
              </p>
            )}
          </div>

          {/* Project Description */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <FileText className="h-4 w-4 mr-2 text-purple-600" />
              Project Description *
            </label>
            <textarea
              {...register('projectDescription')}
              rows={5}
              placeholder="Provide a comprehensive description of your project including methodology, approach, and expected impact"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none ${
                errors.projectDescription ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.projectDescription && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠</span>
                {errors.projectDescription.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-purple-900">Project Information Progress</h3>
          <span className="text-sm text-purple-600 font-medium">Step 3 of 9</span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-2">
          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '33%' }}></div>
        </div>
        <p className="text-sm text-purple-700 mt-2">
          Complete this section to define your project scope and objectives
        </p>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          Tips for Project Information
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Make your project title clear and descriptive</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Define specific, measurable, and achievable objectives</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Include GPS coordinates for precise location identification</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Explain how your project aligns with community needs</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Step3ProjectInformation 