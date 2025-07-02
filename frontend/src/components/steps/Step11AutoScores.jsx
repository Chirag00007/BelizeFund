const Step11AutoScores = ({ register, errors, watch }) => {
  const organizationAge = watch('organizationAge')
  const organizationType = watch('organizationType')
  const operationalStatus = watch('operationalStatus')

  // Auto-scoring logic
  const calculateAgeScore = (age) => {
    switch(age) {
      case 'less-than-1': return 1
      case '1-3': return 2
      case '4-7': return 3
      case '8-15': return 4
      case 'more-than-15': return 5
      default: return 0
    }
  }

  const calculateTypeScore = (type) => {
    switch(type) {
      case 'ngo': return 4
      case 'cbo': return 5
      case 'cooperative': return 3
      case 'private': return 2
      default: return 0
    }
  }

  const calculateStatusScore = (status) => {
    switch(status) {
      case 'active': return 5
      case 'inactive': return 2
      case 'suspended': return 1
      default: return 0
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Auto-calculated Scores</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded border">
            <label className="form-label">Organization Age Score</label>
            <div className="text-2xl font-bold text-blue-600">{calculateAgeScore(organizationAge)}</div>
            <input type="hidden" {...register('organizationAgeAutoScore')} value={calculateAgeScore(organizationAge)} />
          </div>
          <div className="bg-white p-3 rounded border">
            <label className="form-label">Organization Type Score</label>
            <div className="text-2xl font-bold text-blue-600">{calculateTypeScore(organizationType)}</div>
            <input type="hidden" {...register('organizationTypeAutoScore')} value={calculateTypeScore(organizationType)} />
          </div>
          <div className="bg-white p-3 rounded border">
            <label className="form-label">Operational Status Score</label>
            <div className="text-2xl font-bold text-blue-600">{calculateStatusScore(operationalStatus)}</div>
            <input type="hidden" {...register('operationalStatusAutoScore')} value={calculateStatusScore(operationalStatus)} />
          </div>
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded">
          <div className="text-lg font-semibold text-green-800">
            Total Score: {calculateAgeScore(organizationAge) + calculateTypeScore(organizationType) + calculateStatusScore(operationalStatus)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step11AutoScores 