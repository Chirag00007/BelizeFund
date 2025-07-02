const Step9ProjectDescription = ({ register, errors }) => (
  <div className="space-y-6">
    <div>
      <label className="form-label">Project Description *</label>
      <textarea {...register('projectDescription')} className="form-input h-32" placeholder="Describe your project in detail" />
      {errors.projectDescription && <p className="form-error">{errors.projectDescription.message}</p>}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="form-label">Incorporation Date</label>
        <input type="date" {...register('incorporationDate')} className="form-input" />
      </div>
      <div>
        <label className="form-label">Organization Legal Status</label>
        <input type="text" {...register('organizationLegalStatus')} className="form-input" placeholder="Enter legal status" />
      </div>
    </div>
    <div>
      <label className="form-label">Purpose and Activities</label>
      <textarea {...register('purposeAndActivities')} className="form-input h-24" placeholder="Describe purpose and activities" />
    </div>
    <div>
      <label className="form-label">Organization Background</label>
      <textarea {...register('orgBackground')} className="form-input h-24" placeholder="Provide organization background" />
    </div>
  </div>
)

export default Step9ProjectDescription 