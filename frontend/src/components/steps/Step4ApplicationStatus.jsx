const Step4ApplicationStatus = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="form-label">Application Comments</label>
        <textarea
          {...register('applicationComments')}
          className="form-input h-24"
          placeholder="Enter any comments about the application"
        />
      </div>

      <div>
        <label className="form-label">Contributors</label>
        <input
          type="text"
          {...register('contributors')}
          className="form-input"
          placeholder="Enter contributors (comma-separated)"
        />
      </div>

      <div>
        <label className="form-label">Related Links</label>
        <input
          type="text"
          {...register('links')}
          className="form-input"
          placeholder="Enter related links (comma-separated)"
        />
      </div>
    </div>
  )
}

export default Step4ApplicationStatus 