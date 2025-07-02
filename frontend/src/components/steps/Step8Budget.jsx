import { DollarSign, Calculator, AlertCircle, FileSpreadsheet } from 'lucide-react'

const Step8Budget = ({ register, errors, setValue, getValues, watch }) => {
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (parseFloat(item) || 0), 0)
  }

  const watchedValues = watch()
  
  // Calculate totals for different categories
  const personnelCosts = [
    watchedValues.projectManagerSalary,
    watchedValues.fieldStaffSalary,
    watchedValues.consultantFees,
    watchedValues.otherPersonnelCosts
  ]
  
  const equipmentCosts = [
    watchedValues.equipmentPurchase,
    watchedValues.vehiclesCosts,
    watchedValues.equipmentRental,
    watchedValues.maintenanceCosts
  ]
  
  const operationalCosts = [
    watchedValues.travelCosts,
    watchedValues.trainingCosts,
    watchedValues.materialsCosts,
    watchedValues.communicationCosts
  ]
  
  const overheadCosts = [
    watchedValues.administrativeCosts,
    watchedValues.utilitiesCosts,
    watchedValues.insuranceCosts,
    watchedValues.auditCosts
  ]

  const totalPersonnel = calculateTotal(personnelCosts)
  const totalEquipment = calculateTotal(equipmentCosts)
  const totalOperational = calculateTotal(operationalCosts)
  const totalOverhead = calculateTotal(overheadCosts)
  const grandTotal = totalPersonnel + totalEquipment + totalOperational + totalOverhead

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Project Budget</h3>
        <p className="text-gray-600">Provide detailed breakdown of funds requested from Belize Fund Management</p>
      </div>

      {/* Budget Overview */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center mb-4">
          <Calculator className="h-6 w-6 text-blue-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">Budget Summary</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Total Amount Requested from Belize Fund Management (BZD) *</label>
            <input
              type="number"
              {...register('totalBudgetRequested')}
              className="form-input text-lg font-semibold"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.totalBudgetRequested && (
              <p className="form-error">{errors.totalBudgetRequested.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Project Duration (Months)</label>
            <input
              type="number"
              {...register('budgetDuration')}
              className="form-input"
              placeholder="Enter duration"
              min="1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Cost per month: BZD {watchedValues.totalBudgetRequested && watchedValues.budgetDuration 
                ? (watchedValues.totalBudgetRequested / watchedValues.budgetDuration).toFixed(2) 
                : '0.00'}
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
          <h5 className="font-medium text-gray-900 mb-3">Budget Calculation Summary</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Personnel:</p>
              <p className="font-semibold">BZD {totalPersonnel.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Equipment:</p>
              <p className="font-semibold">BZD {totalEquipment.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Operational:</p>
              <p className="font-semibold">BZD {totalOperational.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Overhead:</p>
              <p className="font-semibold">BZD {totalOverhead.toFixed(2)}</p>
            </div>
            <div className="col-span-2 md:col-span-4 border-t pt-2">
              <p className="text-gray-600">Calculated Total:</p>
              <p className="font-bold text-lg">BZD {grandTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personnel Costs */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <DollarSign className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">Personnel Costs</h4>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <h5 className="font-medium text-gray-900 mb-2">Salary Guidelines:</h5>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>100% of salaries for positions fully and exclusively involved in project activities</li>
              <li>Up to 60% of salaries for positions directly but not exclusively involved</li>
              <li>Up to 20% of administrative staff salaries (Executive Director, Finance, HR, etc.)</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Project Manager Salary *</label>
              <input
                type="number"
                {...register('projectManagerSalary')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Include percentage of time and duration</p>
            </div>

            <div>
              <label className="form-label">Field Staff Salaries</label>
              <input
                type="number"
                {...register('fieldStaffSalary')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="form-label">Consultant Fees</label>
              <input
                type="number"
                {...register('consultantFees')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="form-label">Other Personnel Costs</label>
              <input
                type="number"
                {...register('otherPersonnelCosts')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Personnel Costs Justification *</label>
            <textarea
              {...register('personnelJustification')}
              className="form-input"
              rows="3"
              placeholder="Provide detailed justification for personnel costs, including roles, responsibilities, and time allocation"
            />
          </div>
        </div>
      </div>

      {/* Equipment and Supplies */}
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Equipment and Supplies</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Equipment Purchase</label>
            <input
              type="number"
              {...register('equipmentPurchase')}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="form-label">Vehicles/Transportation</label>
            <input
              type="number"
              {...register('vehiclesCosts')}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="form-label">Equipment Rental</label>
            <input
              type="number"
              {...register('equipmentRental')}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="form-label">Maintenance Costs</label>
            <input
              type="number"
              {...register('maintenanceCosts')}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="form-label">Equipment Justification</label>
          <textarea
            {...register('equipmentJustification')}
            className="form-input"
            rows="3"
            placeholder="List and justify all equipment purchases and rentals"
          />
        </div>
      </div>

      {/* Operational Costs */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Operational Costs</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Travel Costs</label>
            <input
              type="number"
              {...register('travelCosts')}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="form-label">Training Costs</label>
            <input
              type="number"
              {...register('trainingCosts')}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="form-label">Materials and Supplies</label>
            <input
              type="number"
              {...register('materialsCosts')}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="form-label">Communication Costs</label>
            <input
              type="number"
              {...register('communicationCosts')}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="form-label">Operational Costs Justification</label>
          <textarea
            {...register('operationalJustification')}
            className="form-input"
            rows="3"
            placeholder="Provide detailed breakdown of operational costs"
          />
        </div>
      </div>

      {/* Administrative and Overhead */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Administrative and Overhead Costs</h4>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-red-100">
            <p className="text-sm text-gray-700">
              <strong>Administrative Costs Guidelines:</strong><br/>
              • Up to 10% of overall project budget for general administrative costs<br/>
              • Up to 15% if project is implemented via an intermediary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Administrative Costs</label>
              <input
                type="number"
                {...register('administrativeCosts')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current: {grandTotal > 0 ? ((watchedValues.administrativeCosts || 0) / grandTotal * 100).toFixed(1) : 0}% of total budget
              </p>
            </div>

            <div>
              <label className="form-label">Utilities and Office Costs</label>
              <input
                type="number"
                {...register('utilitiesCosts')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="form-label">Insurance Costs</label>
              <input
                type="number"
                {...register('insuranceCosts')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="form-label">Audit and Evaluation Costs</label>
              <input
                type="number"
                {...register('auditCosts')}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Notes */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Budget Notes and Justification</h4>
        
        <div>
          <label className="form-label">Detailed Budget Notes *</label>
          <textarea
            {...register('budgetNotes')}
            className="form-input"
            rows="6"
            placeholder="Provide well-detailed description for each line-item cost. Explain how costs relate to project activities and outputs. Include any assumptions or calculations used."
          />
          {errors.budgetNotes && (
            <p className="form-error">{errors.budgetNotes.message}</p>
          )}
        </div>
      </div>

      {/* Excel Template Reminder */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center mb-3">
          <FileSpreadsheet className="h-5 w-5 text-blue-600 mr-2" />
          <h5 className="font-medium text-gray-900">Excel Budget Template</h5>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Use the Excel spreadsheet template provided to complete the detailed budget breakdown. 
          This will be uploaded as a supporting document.
        </p>
        <div>
          <label className="form-label">Excel Budget Template Status</label>
          <select {...register('excelBudgetStatus')} className="form-input">
            <option value="">Select status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>

      {/* Important Budget Principles */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <div className="flex items-center mb-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
          <h5 className="font-medium text-gray-900">Important Budget Principles</h5>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Only include costs that directly relate to efficiently carrying out activities</li>
          <li>Budget should be realistic - find out what activities actually cost</li>
          <li>Include all costs for managing and administering the project</li>
          <li>Include cost for end-of-project evaluation</li>
          <li>Figures must agree with those on the proposal cover sheet</li>
          <li>Only costs directly linked to Belize Fund Management Thematic Areas will be considered</li>
          <li>No expenses that result in negative environmental/social impacts</li>
          <li>All financial records must be available for independent audit</li>
        </ul>
      </div>
    </div>
  )
}

export default Step8Budget 