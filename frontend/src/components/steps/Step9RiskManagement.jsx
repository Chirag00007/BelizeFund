import { useState } from 'react'
import { Users, Shield, AlertTriangle, FileText } from 'lucide-react'

const Step9RiskManagement = ({ register, errors, setValue, getValues, watch }) => {
  const [riskFactors, setRiskFactors] = useState([
    { risk: '', category: '', impact: '', mitigation: '' }
  ])

  const addRiskFactor = () => {
    setRiskFactors([...riskFactors, { risk: '', category: '', impact: '', mitigation: '' }])
  }

  const removeRiskFactor = (index) => {
    if (riskFactors.length > 1) {
      const newRiskFactors = riskFactors.filter((_, i) => i !== index)
      setRiskFactors(newRiskFactors)
    }
  }

  const updateRiskFactor = (index, field, value) => {
    const newRiskFactors = [...riskFactors]
    newRiskFactors[index][field] = value
    setRiskFactors(newRiskFactors)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">H. Risk Management</h3>
        <p className="text-gray-600">Stakeholder engagement, gender action, and risk management plans</p>
      </div>

      {/* Stakeholder Engagement Plan */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-blue-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">1. Stakeholder Engagement Plan</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700 mb-4">
              In this section describe how the stakeholders will be involved and participate in the project and activities. 
              How does this partnership involve and includes stakeholders in the implementation of this partnership.
            </p>
            <p className="text-sm text-gray-700">
              List and present a plan to ensure that a consultative process with relevant stakeholders is conducted before, 
              during and after the completion of this partnership, to ensure proper disclosure of information. 
              Describe the grievance mechanisms that are currently in place to provide a clear and transparent framework 
              for addressing grievances related to the planning and implementation process.
            </p>
          </div>

          <div>
            <label className="form-label">Stakeholder Engagement Strategy *</label>
            <textarea
              {...register('stakeholderEngagementStrategy')}
              className="form-input min-h-[200px]"
              placeholder="Describe how stakeholders will be involved and participate in the project and activities. Include specific mechanisms for stakeholder engagement throughout the project lifecycle."
            />
            {errors.stakeholderEngagementStrategy && (
              <p className="form-error">{errors.stakeholderEngagementStrategy.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Consultative Process Plan *</label>
            <textarea
              {...register('consultativeProcessPlan')}
              className="form-input min-h-[200px]"
              placeholder="Detail the consultative process with relevant stakeholders before, during and after project completion. Include methods for ensuring proper disclosure of information."
            />
            {errors.consultativeProcessPlan && (
              <p className="form-error">{errors.consultativeProcessPlan.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Grievance Mechanisms *</label>
            <textarea
              {...register('grievanceMechanisms')}
              className="form-input min-h-[200px]"
              placeholder="Describe the grievance mechanisms currently in place to provide a clear and transparent framework for addressing grievances related to the planning and implementation process."
            />
            {errors.grievanceMechanisms && (
              <p className="form-error">{errors.grievanceMechanisms.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Gender Action Plan */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">2. Gender Action Plan</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <p className="text-sm text-gray-700 mb-4">
              In the development and formulation of this partnership, a gender analysis must be conducted to identify, 
              understand, and ensure the inclusion of both men and women.
            </p>
            <p className="text-sm text-gray-700">
              The analysis should also identify gender differentiated impacts and risk and identify the factors that 
              limit or facilitate equal participation of women and men in the strategic partnership. It should also 
              identify any specific gender differences and gaps, including women and men's different roles, needs, 
              priorities, capacities, and vulnerabilities relevant to this partnership.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Explain the proposed plan, mechanisms, or appropriate ways to ensure that both men and women are given 
              fair and equal participation.
            </p>
          </div>

          <div>
            <label className="form-label">Gender Analysis *</label>
            <textarea
              {...register('genderAnalysis')}
              className="form-input min-h-[200px]"
              placeholder="Conduct a gender analysis to identify, understand, and ensure the inclusion of both men and women. Include gender differentiated impacts, risks, and factors affecting equal participation."
            />
            {errors.genderAnalysis && (
              <p className="form-error">{errors.genderAnalysis.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Gender Differences and Gaps *</label>
            <textarea
              {...register('genderDifferencesGaps')}
              className="form-input min-h-[200px]"
              placeholder="Identify specific gender differences and gaps, including women and men's different roles, needs, priorities, capacities, and vulnerabilities relevant to this partnership."
            />
            {errors.genderDifferencesGaps && (
              <p className="form-error">{errors.genderDifferencesGaps.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Gender Action Plan *</label>
            <textarea
              {...register('genderActionPlan')}
              className="form-input min-h-[200px]"
              placeholder="Explain the proposed plan, mechanisms, or appropriate ways to ensure that both men and women are given fair and equal participation in the project."
            />
            {errors.genderActionPlan && (
              <p className="form-error">{errors.genderActionPlan.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Environmental and Social Risk Management Plan */}
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-center mb-4">
          <Shield className="h-6 w-6 text-purple-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">3. Environmental and Social Risk Management Plan</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-700">
              The Environmental and Social Risk Screening Tool (ESRST) needs to be completed along with the ESRMP 
              and submitted along with this application. To be reviewed by the Belize Fund or conducted jointly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">ESRST Status *</label>
              <select {...register('esrstStatus')} className="form-input">
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
                <option value="To be conducted jointly">To be conducted jointly</option>
              </select>
              {errors.esrstStatus && (
                <p className="form-error">{errors.esrstStatus.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">ESRMP Status *</label>
              <select {...register('esrmpStatus')} className="form-input">
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
                <option value="To be conducted jointly">To be conducted jointly</option>
              </select>
              {errors.esrmpStatus && (
                <p className="form-error">{errors.esrmpStatus.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Environmental and Social Risk Management Plan *</label>
            <textarea
              {...register('environmentalSocialRiskPlan')}
              className="form-input min-h-[200px]"
              placeholder="Describe your environmental and social risk management plan. Include key environmental and social risks identified and mitigation measures planned."
            />
            {errors.environmentalSocialRiskPlan && (
              <p className="form-error">{errors.environmentalSocialRiskPlan.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Additional Environmental and Social Considerations</label>
            <textarea
              {...register('additionalEnvironmentalSocial')}
              className="form-input min-h-[150px]"
              placeholder="Any additional environmental and social considerations or specific requirements for your project."
            />
            {errors.additionalEnvironmentalSocial && (
              <p className="form-error">{errors.additionalEnvironmentalSocial.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Risk Factors */}
      <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">4. Additional Risk Factors</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-orange-100">
            <p className="text-sm text-gray-700">
              Identify both internal (for example, the technology involved fails to work as projected) and external 
              (for example, changes to laws or regulations) risk factors that could result in the proposed partnership 
              failing to meet its expected results (outputs). Include and, if necessary, add a table to present the 
              risk management and mitigation measures planned to address the identified risks.
            </p>
          </div>

          <div>
            <label className="form-label">Risk Assessment Overview *</label>
            <textarea
              {...register('riskAssessmentOverview')}
              className="form-input min-h-[200px]"
              placeholder="Provide an overview of the key risk factors that could impact your project's success. Include both internal and external risks."
            />
            {errors.riskAssessmentOverview && (
              <p className="form-error">{errors.riskAssessmentOverview.message}</p>
            )}
          </div>

          {/* Risk Factors Table */}
          <div className="bg-white p-4 rounded-lg border border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium text-gray-900">Risk Management and Mitigation Measures</h5>
              <button
                type="button"
                onClick={addRiskFactor}
                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm hover:bg-orange-200 transition-colors"
              >
                Add Risk Factor
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">Risk/Factors</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">Risk Category</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">Potential Level of Impact</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">Risk Mitigation Measures</th>
                    <th className="border border-gray-300 px-3 py-2 text-center font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riskFactors.map((factor, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-3 py-2">
                        <textarea
                          value={factor.risk}
                          onChange={(e) => updateRiskFactor(index, 'risk', e.target.value)}
                          className="w-full p-1 text-xs border border-gray-200 rounded"
                          rows="2"
                          placeholder="Describe the risk factor"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <select
                          value={factor.category}
                          onChange={(e) => updateRiskFactor(index, 'category', e.target.value)}
                          className="w-full p-1 text-xs border border-gray-200 rounded"
                        >
                          <option value="">Select category</option>
                          <option value="Political">Political</option>
                          <option value="Economic">Economic</option>
                          <option value="Technological">Technological</option>
                          <option value="Legal">Legal</option>
                          <option value="Environmental">Environmental</option>
                          <option value="Social">Social</option>
                          <option value="Operational">Operational</option>
                          <option value="Financial">Financial</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <select
                          value={factor.impact}
                          onChange={(e) => updateRiskFactor(index, 'impact', e.target.value)}
                          className="w-full p-1 text-xs border border-gray-200 rounded"
                        >
                          <option value="">Select impact</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <textarea
                          value={factor.mitigation}
                          onChange={(e) => updateRiskFactor(index, 'mitigation', e.target.value)}
                          className="w-full p-1 text-xs border border-gray-200 rounded"
                          rows="2"
                          placeholder="Describe mitigation measures"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeRiskFactor(index)}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
                          disabled={riskFactors.length === 1}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <label className="form-label">Overall Risk Management Strategy *</label>
            <textarea
              {...register('overallRiskManagementStrategy')}
              className="form-input min-h-[200px]"
              placeholder="Describe your overall approach to risk management and how you will monitor and address risks throughout the project lifecycle."
            />
            {errors.overallRiskManagementStrategy && (
              <p className="form-error">{errors.overallRiskManagementStrategy.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start">
          <FileText className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Important Notes:</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• ESRST and ESRMP documents should be attached in the final step</li>
              <li>• Ensure all risk mitigation measures are realistic and achievable</li>
              <li>• Gender analysis should be comprehensive and address specific project context</li>
              <li>• Stakeholder engagement should be ongoing throughout the project</li>
              <li>• Risk factors should be regularly reviewed and updated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step9RiskManagement 