const Step6GrantProposal = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="form-label">Project Title *</label>
        <input
          type="text"
          {...register('projectTitleProposal')}
          className="form-input"
          placeholder="Enter project title"
        />
        {errors.projectTitleProposal && (
          <p className="form-error">{errors.projectTitleProposal.message}</p>
        )}
      </div>

      <div>
        <label className="form-label">Project Goal *</label>
        <textarea
          {...register('projectGoal')}
          className="form-input h-32"
          placeholder="Describe the main goal of your project"
        />
        {errors.projectGoal && (
          <p className="form-error">{errors.projectGoal.message}</p>
        )}
      </div>

      <div>
        <label className="form-label">Project Objectives *</label>
        <textarea
          {...register('projectObjectives')}
          className="form-input h-32"
          placeholder="List the specific objectives of your project"
        />
        {errors.projectObjectives && (
          <p className="form-error">{errors.projectObjectives.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Grant Amount Requested *</label>
          <input
            type="number"
            {...register('grantAmountRequested')}
            className="form-input"
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
          {errors.grantAmountRequested && (
            <p className="form-error">{errors.grantAmountRequested.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Co-Financing Amount</label>
          <input
            type="number"
            {...register('coFinancing')}
            className="form-input"
            placeholder="Enter co-financing amount"
            min="0"
            step="0.01"
          />
          {errors.coFinancing && (
            <p className="form-error">{errors.coFinancing.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="form-label">Bank Details</label>
        <textarea
          {...register('bankDetails')}
          className="form-input h-24"
          placeholder="Enter bank account details"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Award Agreement Signed</label>
          <select {...register('awardAgreementSigned')} className="form-input">
            <option value="">Select status</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label className="form-label">Completed GAP Application Form</label>
          <select {...register('completedGAPApplicationForm')} className="form-input">
            <option value="">Select status</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Step6GrantProposal 