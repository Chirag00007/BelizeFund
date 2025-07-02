import { Shield, AlertTriangle, FileCheck } from 'lucide-react'

const Step5RiskScreening = ({ register, errors, setValue, getValues, watch }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Environmental and Social Risk Screening</h3>
        <p className="text-gray-600">Identify and plan mitigation for environmental and social risks</p>
      </div>

      {/* Environmental and Social Risk Tools */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center mb-4">
          <FileCheck className="h-6 w-6 text-blue-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">1. Environmental and Social Risk Management Tools</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700 mb-4">
              Complete the following environmental and social risk management tools as part of your application. 
              These will be submitted as separate documents with your application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Environmental and Social Risk Screening Tool (ESRST) Status *</label>
              <select {...register('esrstStatus')} className="form-input">
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
              </select>
              {errors.esrstStatus && (
                <p className="form-error">{errors.esrstStatus.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">ESRST Risk Level Result</label>
              <select {...register('esrstRiskLevel')} className="form-input">
                <option value="">Select risk level</option>
                <option value="Low Risk">Low Risk</option>
                <option value="Medium Risk">Medium Risk</option>
                <option value="High Risk">High Risk</option>
              </select>
            </div>

            <div>
              <label className="form-label">Environmental and Social Risk Management Plan (ESRMP) Status *</label>
              <select {...register('esrmpStatus')} className="form-input">
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Required">Not Required</option>
              </select>
              {errors.esrmpStatus && (
                <p className="form-error">{errors.esrmpStatus.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Gender Action Plan (GAP) Status *</label>
              <select {...register('gapStatus')} className="form-input">
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Required">Not Required</option>
              </select>
              {errors.gapStatus && (
                <p className="form-error">{errors.gapStatus.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Stakeholder Engagement Plan (SEP) Status *</label>
            <select {...register('sepStatus')} className="form-input">
              <option value="">Select status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Required">Not Required</option>
            </select>
            {errors.sepStatus && (
              <p className="form-error">{errors.sepStatus.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Environmental and Social Risk Summary</label>
            <textarea
              {...register('environmentalSocialRiskSummary')}
              className="form-input"
              rows="5"
              placeholder="Provide a summary of the key environmental and social risks identified through the screening process and how they will be managed."
            />
          </div>
        </div>
      </div>

      {/* Other Risk Factors */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">2. Other Risks to Project Implementation</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-red-100">
            <p className="text-sm text-gray-700">
              Identify and list the major risk factors that could result in the project not producing the expected outputs. 
              Include both internal factors (e.g., technology fails to work as projected) and external factors 
              (e.g., changes to laws or regulations).
            </p>
          </div>

          {/* Risk Table */}
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900">Risk Assessment Matrix</h5>
            
            {/* Risk 1 */}
            <div className="bg-white p-4 rounded-lg border border-red-100">
              <h6 className="font-medium text-gray-800 mb-3">Risk 1</h6>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Risk/Factor Description</label>
                  <textarea
                    {...register('risk1Description')}
                    className="form-input"
                    rows="3"
                    placeholder="Describe the risk factor"
                  />
                </div>
                <div>
                  <label className="form-label">Risk Category</label>
                  <select {...register('risk1Category')} className="form-input">
                    <option value="">Select category</option>
                    <option value="Political">Political</option>
                    <option value="Economic">Economic</option>
                    <option value="Technological">Technological</option>
                    <option value="Legal">Legal</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Social">Social</option>
                    <option value="Operational">Operational</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Potential Impact Level</label>
                  <select {...register('risk1Impact')} className="form-input">
                    <option value="">Select impact level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="form-label">Risk Mitigation Measures</label>
                <textarea
                  {...register('risk1Mitigation')}
                  className="form-input"
                  rows="3"
                  placeholder="Describe how this risk will be mitigated or managed"
                />
              </div>
            </div>

            {/* Risk 2 */}
            <div className="bg-white p-4 rounded-lg border border-red-100">
              <h6 className="font-medium text-gray-800 mb-3">Risk 2</h6>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Risk/Factor Description</label>
                  <textarea
                    {...register('risk2Description')}
                    className="form-input"
                    rows="3"
                    placeholder="Describe the risk factor"
                  />
                </div>
                <div>
                  <label className="form-label">Risk Category</label>
                  <select {...register('risk2Category')} className="form-input">
                    <option value="">Select category</option>
                    <option value="Political">Political</option>
                    <option value="Economic">Economic</option>
                    <option value="Technological">Technological</option>
                    <option value="Legal">Legal</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Social">Social</option>
                    <option value="Operational">Operational</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Potential Impact Level</label>
                  <select {...register('risk2Impact')} className="form-input">
                    <option value="">Select impact level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="form-label">Risk Mitigation Measures</label>
                <textarea
                  {...register('risk2Mitigation')}
                  className="form-input"
                  rows="3"
                  placeholder="Describe how this risk will be mitigated or managed"
                />
              </div>
            </div>

            {/* Risk 3 */}
            <div className="bg-white p-4 rounded-lg border border-red-100">
              <h6 className="font-medium text-gray-800 mb-3">Risk 3</h6>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Risk/Factor Description</label>
                  <textarea
                    {...register('risk3Description')}
                    className="form-input"
                    rows="3"
                    placeholder="Describe the risk factor"
                  />
                </div>
                <div>
                  <label className="form-label">Risk Category</label>
                  <select {...register('risk3Category')} className="form-input">
                    <option value="">Select category</option>
                    <option value="Political">Political</option>
                    <option value="Economic">Economic</option>
                    <option value="Technological">Technological</option>
                    <option value="Legal">Legal</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Social">Social</option>
                    <option value="Operational">Operational</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Potential Impact Level</label>
                  <select {...register('risk3Impact')} className="form-input">
                    <option value="">Select impact level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="form-label">Risk Mitigation Measures</label>
                <textarea
                  {...register('risk3Mitigation')}
                  className="form-input"
                  rows="3"
                  placeholder="Describe how this risk will be mitigated or managed"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="form-label">Additional Risks and Mitigation Strategies</label>
            <textarea
              {...register('additionalRisks')}
              className="form-input"
              rows="4"
              placeholder="List any additional risks not covered above and their mitigation strategies"
            />
          </div>
        </div>
      </div>

      {/* Environmental Clearance */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <Shield className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">3. Environmental Clearance</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="form-label">Environmental Clearance Required?</label>
            <select {...register('environmentalClearanceRequired')} className="form-input">
              <option value="">Select option</option>
              <option value="Yes">Yes - Required</option>
              <option value="No">No - Not Required</option>
              <option value="Pending">Pending Assessment</option>
            </select>
          </div>

          {watch('environmentalClearanceRequired') === 'Yes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Environmental Clearance Status</label>
                <select {...register('environmentalClearanceStatus')} className="form-input">
                  <option value="">Select status</option>
                  <option value="Obtained">Obtained</option>
                  <option value="Applied">Applied For</option>
                  <option value="Pending">Pending Application</option>
                </select>
              </div>

              <div>
                <label className="form-label">Expected Date of Clearance</label>
                <input
                  type="date"
                  {...register('environmentalClearanceDate')}
                  className="form-input"
                />
              </div>
            </div>
          )}

          <div>
            <label className="form-label">Environmental Clearance Notes</label>
            <textarea
              {...register('environmentalClearanceNotes')}
              className="form-input"
              rows="3"
              placeholder="Provide additional details about environmental clearance requirements or status"
            />
          </div>
        </div>
      </div>

      {/* Required Documents Reminder */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h5 className="font-medium text-gray-900 mb-3">Required Environmental and Social Documents</h5>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Environmental and Social Risk Screening Tool (ESRST) Results</li>
          <li>Environmental and Social Risk Management Plan (ESRMP)</li>
          <li>Gender Action Plan (GAP)</li>
          <li>Stakeholder Engagement Plan (SEP)</li>
          <li>Environmental Clearance letter (if applicable)</li>
        </ul>
        <p className="text-sm text-gray-600 mt-2">
          These documents will be uploaded in the final step of the application.
        </p>
      </div>
    </div>
  )
}

export default Step5RiskScreening 