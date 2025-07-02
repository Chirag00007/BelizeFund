import { useState, useEffect } from 'react'
import { BarChart3, Target, Clock } from 'lucide-react'

const Step6MonitoringEvaluation = ({ register, errors, setValue, getValues, watch }) => {
  const [meWordCount, setMeWordCount] = useState(0)

  const countWords = (text) => {
    if (!text) return 0
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  useEffect(() => {
    const meText = watch('monitoringEvaluationPlan')
    setMeWordCount(countWords(meText))
  }, [watch('monitoringEvaluationPlan')])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Monitoring and Evaluation</h3>
        <p className="text-gray-600">Define how you will track and evaluate project progress and impact</p>
      </div>

      {/* M&E Plan Overview */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">Monitoring and Evaluation Plan</h4>
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            meWordCount > 500 ? 'bg-red-100 text-red-700' : 
            meWordCount > 450 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {meWordCount} / 500 words
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h5 className="font-medium text-gray-900 mb-2">Key issues to address:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>How and at what frequency will project performance be monitored</li>
              <li>How project impact will be assessed in terms of achieving desired outcomes and objectives</li>
              <li>Alignment with Belize Fund Management's programmatic metrics</li>
              <li>Include indicators from your Logical Framework and selected Belize Fund Management indicators</li>
            </ul>
          </div>

          <div>
            <label className="form-label">Monitoring and Evaluation Plan * (Maximum 500 words)</label>
            <textarea
              {...register('monitoringEvaluationPlan')}
              className="form-input min-h-[300px]"
              placeholder="Explain how your project team will track progress, including monitoring frequency, impact assessment methods, and alignment with Belize Fund Management programmatic metrics..."
            />
            {errors.monitoringEvaluationPlan && (
              <p className="form-error">{errors.monitoringEvaluationPlan.message}</p>
            )}
            {meWordCount > 500 && (
              <p className="text-red-600 text-sm mt-1">
                ⚠️ M&E Plan exceeds 500-word limit. Please reduce by {meWordCount - 500} words.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* M&E Framework */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <Target className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">Project M&E Framework</h4>
        </div>

        <div className="space-y-6">
          {/* Basic Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Recipient Organization *</label>
              <input
                type="text"
                {...register('recipientOrganization')}
                className="form-input"
                placeholder="Lead implementing organization"
              />
              {errors.recipientOrganization && (
                <p className="form-error">{errors.recipientOrganization.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Project Goal *</label>
              <textarea
                {...register('meProjectGoal')}
                className="form-input"
                rows="2"
                placeholder="State the project goal for M&E tracking"
              />
              {errors.meProjectGoal && (
                <p className="form-error">{errors.meProjectGoal.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Project Objectives *</label>
            <textarea
              {...register('meProjectObjectives')}
              className="form-input"
              rows="3"
              placeholder="List the main project objectives:
1. Objective 1
2. Objective 2
3. Objective 3"
            />
            {errors.meProjectObjectives && (
              <p className="form-error">{errors.meProjectObjectives.message}</p>
            )}
          </div>

          {/* Indicator 1 */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-semibold text-gray-900 mb-4">Key Indicator 1</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Outcome/Output</label>
                <textarea
                  {...register('indicator1Outcome')}
                  className="form-input"
                  rows="2"
                  placeholder="Describe the outcome or output being measured"
                />
              </div>
              <div>
                <label className="form-label">Indicator</label>
                <textarea
                  {...register('indicator1Description')}
                  className="form-input"
                  rows="2"
                  placeholder="Specific indicator (should be SMART)"
                />
              </div>
              <div>
                <label className="form-label">Baseline</label>
                <input
                  type="text"
                  {...register('indicator1Baseline')}
                  className="form-input"
                  placeholder="Current baseline value"
                />
              </div>
              <div>
                <label className="form-label">Target</label>
                <input
                  type="text"
                  {...register('indicator1Target')}
                  className="form-input"
                  placeholder="Target value to achieve"
                />
              </div>
              <div>
                <label className="form-label">Responsible Party</label>
                <input
                  type="text"
                  {...register('indicator1Responsible')}
                  className="form-input"
                  placeholder="Who is responsible for tracking"
                />
              </div>
              <div>
                <label className="form-label">Means of Verification</label>
                <input
                  type="text"
                  {...register('indicator1Verification')}
                  className="form-input"
                  placeholder="How will you verify/measure this"
                />
              </div>
              <div>
                <label className="form-label">Monitoring Frequency</label>
                <select {...register('indicator1Frequency')} className="form-input">
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-annually">Semi-annually</option>
                  <option value="Annually">Annually</option>
                  <option value="End of project">End of project</option>
                </select>
              </div>
            </div>
          </div>

          {/* Indicator 2 */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-semibold text-gray-900 mb-4">Key Indicator 2</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Outcome/Output</label>
                <textarea
                  {...register('indicator2Outcome')}
                  className="form-input"
                  rows="2"
                  placeholder="Describe the outcome or output being measured"
                />
              </div>
              <div>
                <label className="form-label">Indicator</label>
                <textarea
                  {...register('indicator2Description')}
                  className="form-input"
                  rows="2"
                  placeholder="Specific indicator (should be SMART)"
                />
              </div>
              <div>
                <label className="form-label">Baseline</label>
                <input
                  type="text"
                  {...register('indicator2Baseline')}
                  className="form-input"
                  placeholder="Current baseline value"
                />
              </div>
              <div>
                <label className="form-label">Target</label>
                <input
                  type="text"
                  {...register('indicator2Target')}
                  className="form-input"
                  placeholder="Target value to achieve"
                />
              </div>
              <div>
                <label className="form-label">Responsible Party</label>
                <input
                  type="text"
                  {...register('indicator2Responsible')}
                  className="form-input"
                  placeholder="Who is responsible for tracking"
                />
              </div>
              <div>
                <label className="form-label">Means of Verification</label>
                <input
                  type="text"
                  {...register('indicator2Verification')}
                  className="form-input"
                  placeholder="How will you verify/measure this"
                />
              </div>
              <div>
                <label className="form-label">Monitoring Frequency</label>
                <select {...register('indicator2Frequency')} className="form-input">
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-annually">Semi-annually</option>
                  <option value="Annually">Annually</option>
                  <option value="End of project">End of project</option>
                </select>
              </div>
            </div>
          </div>

          {/* Indicator 3 */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-semibold text-gray-900 mb-4">Key Indicator 3</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Outcome/Output</label>
                <textarea
                  {...register('indicator3Outcome')}
                  className="form-input"
                  rows="2"
                  placeholder="Describe the outcome or output being measured"
                />
              </div>
              <div>
                <label className="form-label">Indicator</label>
                <textarea
                  {...register('indicator3Description')}
                  className="form-input"
                  rows="2"
                  placeholder="Specific indicator (should be SMART)"
                />
              </div>
              <div>
                <label className="form-label">Baseline</label>
                <input
                  type="text"
                  {...register('indicator3Baseline')}
                  className="form-input"
                  placeholder="Current baseline value"
                />
              </div>
              <div>
                <label className="form-label">Target</label>
                <input
                  type="text"
                  {...register('indicator3Target')}
                  className="form-input"
                  placeholder="Target value to achieve"
                />
              </div>
              <div>
                <label className="form-label">Responsible Party</label>
                <input
                  type="text"
                  {...register('indicator3Responsible')}
                  className="form-input"
                  placeholder="Who is responsible for tracking"
                />
              </div>
              <div>
                <label className="form-label">Means of Verification</label>
                <input
                  type="text"
                  {...register('indicator3Verification')}
                  className="form-input"
                  placeholder="How will you verify/measure this"
                />
              </div>
              <div>
                <label className="form-label">Monitoring Frequency</label>
                <select {...register('indicator3Frequency')} className="form-input">
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-annually">Semi-annually</option>
                  <option value="Annually">Annually</option>
                  <option value="End of project">End of project</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Activities */}
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-center mb-4">
          <Clock className="h-6 w-6 text-purple-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">Evaluation Activities</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="form-label">Mid-term Evaluation Plan</label>
            <textarea
              {...register('midTermEvaluationPlan')}
              className="form-input"
              rows="3"
              placeholder="Describe plans for mid-term evaluation (timing, scope, methodology)"
            />
          </div>

          <div>
            <label className="form-label">End-of-Project Evaluation Plan *</label>
            <textarea
              {...register('endProjectEvaluationPlan')}
              className="form-input"
              rows="3"
              placeholder="Describe plans for end-of-project evaluation (required for all projects)"
            />
            {errors.endProjectEvaluationPlan && (
              <p className="form-error">{errors.endProjectEvaluationPlan.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Evaluation Budget Allocation</label>
            <input
              type="number"
              {...register('evaluationBudget')}
              className="form-input"
              placeholder="Amount allocated for M&E activities (BZD)"
              step="0.01"
              min="0"
            />
            <p className="text-sm text-gray-500 mt-1">
              Recommended: 5-10% of total project budget for M&E activities
            </p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h5 className="font-medium text-gray-900 mb-3">M&E Requirements</h5>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Ensure indicators are aligned with both your Logical Framework and selected Belize Fund Management indicators</li>
          <li>All indicators should be SMART (Specific, Measurable, Achievable, Relevant, Time-bound)</li>
          <li>Include baseline data collection activities in your implementation plan</li>
          <li>Plan for end-of-project evaluation (budget should include evaluation costs)</li>
          <li>Consider external evaluation for projects over BZD 100,000</li>
        </ul>
      </div>
    </div>
  )
}

export default Step6MonitoringEvaluation 