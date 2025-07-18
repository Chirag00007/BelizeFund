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
        <h3 className="text-2xl font-bold text-gray-900 mb-2">C. Project Layout</h3>
        <p className="text-gray-600">Define your project goals, objectives, and expected outputs</p>
      </div>

      {/* Project Goals Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Target className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="text-xl font-semibold text-gray-900">1. Project Goal, Objectives and Expected Outputs (max-500 words)</h4>
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
            <h5 className="font-medium text-gray-900 mb-2">This section should contain a clear and specific statement of what the proposed project will accomplish. This section should include:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>A detailed presentation and analysis of the problem/threats or issue to be addressed (problem statement)</li>
              <li>The rationale of the project. This should explain the reasoning behind the need for the project. Demonstrate the relevance of the project to the threats identified. It should also explain the reasons and interest of developing a partnership with other organizations such as government agencies, NGO's, or community organizations for the project implementation</li>
              <li>The Goal - The desired state the project is aiming to achieve</li>
              <li>The Impact of the project – What will be the long–term and overarching benefits of your project?</li>
              <li>The Objectives - What do you plan to achieve by the end of your project?</li>
              <li>The Outcomes of the project - What are the intended short and medium-term changes that can be directly attributed to the project and result from the achievement of the planned outputs?</li>
              <li>The Outputs - What are specific products, goods, and services created through the implementation of several project activities?</li>
              <li>The Activities that the project will conduct. How will the activities provide the desired solutions?</li>
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
          <h4 className="text-xl font-semibold text-gray-900">LOGICAL FRAMEWORK</h4>
        </div>

        <div className="space-y-6">
          {/* Project Goal */}
          <div>
            <label className="form-label">Goal:</label>
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

          {/* Logical Framework Table Structure */}
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">Intervention Logic</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">Indicators (SMART)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">Means of Verification</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">Assumptions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Objective 1 Row */}
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 bg-blue-50">
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm font-medium">Objective 1:</label>
                          <textarea
                            {...register('objective1')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Insert Objective 1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Outcome:</label>
                          <textarea
                            {...register('outcome1')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Expected outcome"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Output 1.1:</label>
                          <textarea
                            {...register('output1_1')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Output 1.1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Output 1.2:</label>
                          <textarea
                            {...register('output1_2')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Output 1.2"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('indicators1')}
                        className="w-full p-1 text-sm border border-gray-200 rounded"
                        rows="8"
                        placeholder="SMART indicators for Objective 1"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('verification1')}
                        className="w-full p-1 text-sm border border-gray-200 rounded"
                        rows="8"
                        placeholder="Means of verification for Objective 1"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('assumptions1')}
                        className="w-full p-1 text-sm border border-gray-200 rounded"
                        rows="8"
                        placeholder="Assumptions for Objective 1"
                      />
                    </td>
                  </tr>

                  {/* Objective 2 Row */}
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 bg-blue-50">
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm font-medium">Objective 2:</label>
                          <textarea
                            {...register('objective2')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Insert Objective 2"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Outcome:</label>
                          <textarea
                            {...register('outcome2')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Expected outcome"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Output 2.1:</label>
                          <textarea
                            {...register('output2_1')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Output 2.1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Output 2.2:</label>
                          <textarea
                            {...register('output2_2')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Output 2.2"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('indicators2')}
                        className="w-full p-1 text-sm border border-gray-200 rounded"
                        rows="8"
                        placeholder="SMART indicators for Objective 2"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('verification2')}
                        className="w-full p-1 text-sm border border-gray-200 rounded"
                        rows="8"
                        placeholder="Means of verification for Objective 2"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('assumptions2')}
                        className="w-full p-1 text-sm border border-gray-200 rounded"
                        rows="8"
                        placeholder="Assumptions for Objective 2"
                      />
                    </td>
                  </tr>

                  {/* Objective 3 Row */}
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 bg-blue-50">
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm font-medium">Objective 3:</label>
                          <textarea
                            {...register('objective3')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Insert Objective 3"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Outcome:</label>
                          <textarea
                            {...register('outcome3')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Expected outcome"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Output 3.1:</label>
                          <textarea
                            {...register('output3_1')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Output 3.1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Output 3.2:</label>
                          <textarea
                            {...register('output3_2')}
                            className="w-full p-1 text-sm border border-gray-200 rounded"
                            rows="2"
                            placeholder="Output 3.2"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('indicators3')}
                        className="w-full p-1 text-sm border border-gray-200 rounded"
                        rows="8"
                        placeholder="SMART indicators for Objective 3"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('verification3')}
                        className="w-full p-1 text-sm border border-gray-200 rounded"
                        rows="8"
                        placeholder="Means of verification for Objective 3"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <textarea
                        {...register('assumptions3')}
                        className="w-full p-1 text-sm border border-gray-200 rounded"
                        rows="8"
                        placeholder="Assumptions for Objective 3"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Note: The table can be adapted to correspond to the number of objectives and outputs based on the project design.
            </p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Important Notes:</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Ensure all objectives are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)</li>
              <li>• Indicators should be quantifiable and verifiable</li>
              <li>• The logical framework should align with your project's thematic area</li>
              <li>• Adapt the number of objectives and outputs based on your project design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3ProjectGoals 