import { useState, useEffect } from 'react'
import { Recycle, TrendingUp, Users } from 'lucide-react'

const Step7Sustainability = ({ register, errors, setValue, getValues, watch }) => {
  const [sustainabilityWordCount, setSustainabilityWordCount] = useState(0)

  const countWords = (text) => {
    if (!text) return 0
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  useEffect(() => {
    const sustainabilityText = watch('sustainabilityPlan')
    setSustainabilityWordCount(countWords(sustainabilityText))
  }, [watch('sustainabilityPlan')])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Sustainability & Replication</h3>
        <p className="text-gray-600">Demonstrate how your project will continue beyond funding period</p>
      </div>

      {/* Sustainability Plan */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Recycle className="h-6 w-6 text-green-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">Sustainability Plan</h4>
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            sustainabilityWordCount > 300 ? 'bg-red-100 text-red-700' : 
            sustainabilityWordCount > 270 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {sustainabilityWordCount} / 300 words
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-medium text-gray-900 mb-2">Key sustainability principles:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>How project activities will be sustained beyond the project lifetime</li>
              <li>Transfer of knowledge and learning to stakeholders</li>
              <li>Potential for scaling up or replication</li>
              <li>Built-in sustainability measures in project design</li>
              <li>Continued benefits without additional Belize Fund Management funding</li>
            </ul>
          </div>

          <div>
            <label className="form-label">Sustainability and Replication Plan * (Maximum 300 words)</label>
            <textarea
              {...register('sustainabilityPlan')}
              className="form-input min-h-[250px]"
              placeholder="Explain clearly how the project activities will be sustained beyond the lifetime of the project. Detail how you intend to transfer knowledge and learning to other stakeholders, such as training events, social media, etc. The potential for scaling up or replication should also be explained..."
            />
            {errors.sustainabilityPlan && (
              <p className="form-error">{errors.sustainabilityPlan.message}</p>
            )}
            {sustainabilityWordCount > 300 && (
              <p className="text-red-600 text-sm mt-1">
                ⚠️ Plan exceeds 300-word limit. Please reduce by {sustainabilityWordCount - 300} words.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sustainability Components */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">Sustainability Components</h4>
        </div>

        <div className="space-y-6">
          {/* Financial Sustainability */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Financial Sustainability</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Funding Sources After Project End</label>
                <textarea
                  {...register('postProjectFunding')}
                  className="form-input"
                  rows="3"
                  placeholder="List potential funding sources for continuation of activities"
                />
              </div>
              <div>
                <label className="form-label">Revenue Generation Plans</label>
                <textarea
                  {...register('revenueGeneration')}
                  className="form-input"
                  rows="3"
                  placeholder="Describe any revenue generation plans or income-generating activities"
                />
              </div>
            </div>
          </div>

          {/* Institutional Sustainability */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Institutional Sustainability</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Institutional Capacity Building</label>
                <textarea
                  {...register('capacityBuilding')}
                  className="form-input"
                  rows="3"
                  placeholder="How will you build institutional capacity for continuation?"
                />
              </div>
              <div>
                <label className="form-label">Partner Engagement</label>
                <textarea
                  {...register('partnerEngagement')}
                  className="form-input"
                  rows="3"
                  placeholder="How will partners continue to support the project outcomes?"
                />
              </div>
            </div>
          </div>

          {/* Technical Sustainability */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Technical Sustainability</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Knowledge Transfer Plan</label>
                <textarea
                  {...register('knowledgeTransfer')}
                  className="form-input"
                  rows="3"
                  placeholder="How will technical knowledge be transferred to stakeholders?"
                />
              </div>
              <div>
                <label className="form-label">Training and Capacity Programs</label>
                <textarea
                  {...register('trainingPrograms')}
                  className="form-input"
                  rows="3"
                  placeholder="Describe training programs for stakeholders"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Replication and Scaling */}
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-purple-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">Replication and Scaling</h4>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Replication Potential</label>
              <textarea
                {...register('replicationPotential')}
                className="form-input"
                rows="4"
                placeholder="Describe the potential for replicating this project in other locations or contexts"
              />
            </div>

            <div>
              <label className="form-label">Scaling Strategy</label>
              <textarea
                {...register('scalingStrategy')}
                className="form-input"
                rows="4"
                placeholder="How could this project be scaled up to have broader impact?"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Lesson Learning Mechanisms</label>
              <textarea
                {...register('lessonLearning')}
                className="form-input"
                rows="3"
                placeholder="How will lessons learned be captured and shared?"
              />
            </div>

            <div>
              <label className="form-label">Dissemination Plans</label>
              <textarea
                {...register('disseminationPlans')}
                className="form-input"
                rows="3"
                placeholder="How will you disseminate results and lessons learned?"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Sustainability */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Environmental Sustainability</h4>
        
        <div className="space-y-4">
          <div>
            <label className="form-label">Environmental Impact Continuation</label>
            <textarea
              {...register('environmentalSustainability')}
              className="form-input"
              rows="3"
              placeholder="How will the positive environmental impacts continue after project completion?"
            />
          </div>

          <div>
            <label className="form-label">Ecosystem Service Benefits</label>
            <textarea
              {...register('ecosystemServices')}
              className="form-input"
              rows="3"
              placeholder="Describe how ecosystem service benefits will be maintained"
            />
          </div>

          <div>
            <label className="form-label">Community Stewardship</label>
            <textarea
              {...register('communityStewardship')}
              className="form-input"
              rows="3"
              placeholder="How will communities continue to steward the environmental resources?"
            />
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h5 className="font-medium text-gray-900 mb-3">Sustainability Requirements</h5>
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Belize Fund Management supports projects that ensure the resulting situation produced by the project 
            can carry on without follow-on or additional funding from Belize Fund Management.</strong>
          </p>
          <p className="text-sm text-gray-700">
            Sustainability is not something you could address in one paragraph. Your project's activities 
            and outputs should be designed to be sustainable. Sustainability should be "built-in" to the 
            design of the project itself.
          </p>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Focus on how activities will continue without additional Belize Fund Management support</li>
          <li>Demonstrate transfer of ownership to local stakeholders</li>
          <li>Show how capacity building will enable continuation</li>
          <li>Explain how benefits will be maintained long-term</li>
          <li>Consider economic, social, and environmental sustainability</li>
        </ul>
      </div>
    </div>
  )
}

export default Step7Sustainability 