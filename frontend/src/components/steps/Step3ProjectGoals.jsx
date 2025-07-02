import { useState, useEffect } from 'react'
import { Target, List, AlertCircle } from 'lucide-react'

const Step3ProjectGoals = ({ register, errors, setValue, getValues, watch }) => {
  const [goalWordCount, setGoalWordCount] = useState(0)

  const countWords = (text) => {
    if (!text) return 0
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  useEffect(() => {
    const goalText = watch('projectGoalObjectives')
    setGoalWordCount(countWords(goalText))
  }, [watch('projectGoalObjectives')])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Project Layout</h3>
        <p className="text-gray-600">Define your project goals, objectives, and expected outputs</p>
      </div>

      {/* Project Goals Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Target className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">1. Project Goal, Objectives and Expected Outputs</h4>
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            goalWordCount > 500 ? 'bg-red-100 text-red-700' : 
            goalWordCount > 450 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            {goalWordCount} / 500 words
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h5 className="font-medium text-gray-900 mb-2">This section should include:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Detailed presentation and analysis of the problem/threats</li>
              <li>The rationale of the project and reasoning behind the need</li>
              <li>The Goal - desired state the project aims to achieve</li>
              <li>The Impact - long-term and overarching benefits</li>
              <li>The Objectives - what you plan to achieve by project end</li>
              <li>The Outcomes - intended short/medium-term changes</li>
              <li>The Outputs - specific products, goods, and services</li>
              <li>The Activities - how activities provide desired solutions</li>
            </ul>
          </div>

          <div>
            <label className="form-label">Project Goal, Objectives and Expected Outputs * (Maximum 500 words)</label>
            <textarea
              {...register('projectGoalObjectives')}
              className="form-input min-h-[400px]"
              placeholder="Provide a comprehensive description covering all the points listed above..."
            />
            {errors.projectGoalObjectives && (
              <p className="form-error">{errors.projectGoalObjectives.message}</p>
            )}
            {goalWordCount > 500 && (
              <p className="text-red-600 text-sm mt-1">
                ⚠️ Content exceeds 500-word limit. Please reduce by {goalWordCount - 500} words.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Logical Framework Section */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <List className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">2. Logical Framework</h4>
        </div>

        <div className="space-y-6">
          {/* Project Goal */}
          <div>
            <label className="form-label">Project Goal *</label>
            <textarea
              {...register('logicalFrameworkGoal')}
              className="form-input"
              rows="3"
              placeholder="State the overall goal your project aims to achieve"
            />
            {errors.logicalFrameworkGoal && (
              <p className="form-error">{errors.logicalFrameworkGoal.message}</p>
            )}
          </div>

          {/* Objective 1 */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-semibold text-gray-900 mb-4">Objective 1</h5>
            <div className="space-y-4">
              <div>
                <label className="form-label">Objective 1 *</label>
                <textarea
                  {...register('objective1')}
                  className="form-input"
                  rows="2"
                  placeholder="Insert Objective 1"
                />
                {errors.objective1 && (
                  <p className="form-error">{errors.objective1.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Outcome 1</label>
                <textarea
                  {...register('outcome1')}
                  className="form-input"
                  rows="2"
                  placeholder="Expected outcome for Objective 1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Output 1.1</label>
                  <textarea
                    {...register('output1_1')}
                    className="form-input"
                    rows="2"
                    placeholder="First output for Objective 1"
                  />
                </div>
                <div>
                  <label className="form-label">Output 1.2</label>
                  <textarea
                    {...register('output1_2')}
                    className="form-input"
                    rows="2"
                    placeholder="Second output for Objective 1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Indicators (SMART)</label>
                  <textarea
                    {...register('indicators1')}
                    className="form-input"
                    rows="2"
                    placeholder="Specific, Measurable, Achievable, Relevant, Time-bound indicators"
                  />
                </div>
                <div>
                  <label className="form-label">Means of Verification</label>
                  <textarea
                    {...register('verification1')}
                    className="form-input"
                    rows="2"
                    placeholder="How will you verify achievement?"
                  />
                </div>
                <div>
                  <label className="form-label">Assumptions</label>
                  <textarea
                    {...register('assumptions1')}
                    className="form-input"
                    rows="2"
                    placeholder="Key assumptions for success"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Objective 2 */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-semibold text-gray-900 mb-4">Objective 2</h5>
            <div className="space-y-4">
              <div>
                <label className="form-label">Objective 2</label>
                <textarea
                  {...register('objective2')}
                  className="form-input"
                  rows="2"
                  placeholder="Insert Objective 2 (if applicable)"
                />
              </div>

              <div>
                <label className="form-label">Outcome 2</label>
                <textarea
                  {...register('outcome2')}
                  className="form-input"
                  rows="2"
                  placeholder="Expected outcome for Objective 2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Output 2.1</label>
                  <textarea
                    {...register('output2_1')}
                    className="form-input"
                    rows="2"
                    placeholder="First output for Objective 2"
                  />
                </div>
                <div>
                  <label className="form-label">Output 2.2</label>
                  <textarea
                    {...register('output2_2')}
                    className="form-input"
                    rows="2"
                    placeholder="Second output for Objective 2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Indicators (SMART)</label>
                  <textarea
                    {...register('indicators2')}
                    className="form-input"
                    rows="2"
                    placeholder="Specific, Measurable, Achievable, Relevant, Time-bound indicators"
                  />
                </div>
                <div>
                  <label className="form-label">Means of Verification</label>
                  <textarea
                    {...register('verification2')}
                    className="form-input"
                    rows="2"
                    placeholder="How will you verify achievement?"
                  />
                </div>
                <div>
                  <label className="form-label">Assumptions</label>
                  <textarea
                    {...register('assumptions2')}
                    className="form-input"
                    rows="2"
                    placeholder="Key assumptions for success"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Objective 3 */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-semibold text-gray-900 mb-4">Objective 3</h5>
            <div className="space-y-4">
              <div>
                <label className="form-label">Objective 3</label>
                <textarea
                  {...register('objective3')}
                  className="form-input"
                  rows="2"
                  placeholder="Insert Objective 3 (if applicable)"
                />
              </div>

              <div>
                <label className="form-label">Outcome 3</label>
                <textarea
                  {...register('outcome3')}
                  className="form-input"
                  rows="2"
                  placeholder="Expected outcome for Objective 3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Output 3.1</label>
                  <textarea
                    {...register('output3_1')}
                    className="form-input"
                    rows="2"
                    placeholder="First output for Objective 3"
                  />
                </div>
                <div>
                  <label className="form-label">Output 3.2</label>
                  <textarea
                    {...register('output3_2')}
                    className="form-input"
                    rows="2"
                    placeholder="Second output for Objective 3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Indicators (SMART)</label>
                  <textarea
                    {...register('indicators3')}
                    className="form-input"
                    rows="2"
                    placeholder="Specific, Measurable, Achievable, Relevant, Time-bound indicators"
                  />
                </div>
                <div>
                  <label className="form-label">Means of Verification</label>
                  <textarea
                    {...register('verification3')}
                    className="form-input"
                    rows="2"
                    placeholder="How will you verify achievement?"
                  />
                </div>
                <div>
                  <label className="form-label">Assumptions</label>
                  <textarea
                    {...register('assumptions3')}
                    className="form-input"
                    rows="2"
                    placeholder="Key assumptions for success"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <div className="flex items-center mb-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
          <h5 className="font-medium text-gray-900">Logical Framework Tips</h5>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>The table can be adapted to correspond to the number of objectives and outputs based on your project design</li>
          <li>SMART indicators should be Specific, Measurable, Achievable, Relevant, and Time-bound</li>
          <li>Means of verification should clearly state how you will measure and document progress</li>
          <li>Assumptions are external factors that could affect project success but are beyond your control</li>
        </ul>
      </div>
    </div>
  )
}

export default Step3ProjectGoals 