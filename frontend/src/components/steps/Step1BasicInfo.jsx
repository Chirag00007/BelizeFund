const Step1BasicInfo = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Organization Name *</label>
          <input
            type="text"
            {...register('organizationName')}
            className="form-input"
            placeholder="Enter organization name"
          />
          {errors.organizationName && (
            <p className="form-error">{errors.organizationName.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Category Shortcode</label>
          <input
            type="text"
            {...register('categoryShortcode')}
            className="form-input"
            placeholder="Enter category shortcode"
          />
          {errors.categoryShortcode && (
            <p className="form-error">{errors.categoryShortcode.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Season</label>
          <select {...register('season')} className="form-input">
            <option value="">Select season</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
          {errors.season && (
            <p className="form-error">{errors.season.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Form Type</label>
          <select {...register('form')} className="form-input">
            <option value="">Select form type</option>
            <option value="standard">Standard Application</option>
            <option value="simplified">Simplified Application</option>
            <option value="emergency">Emergency Application</option>
          </select>
          {errors.form && (
            <p className="form-error">{errors.form.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Application ID</label>
          <input
            type="text"
            {...register('id')}
            className="form-input"
            placeholder="Auto-generated"
            readOnly
          />
        </div>

        <div>
          <label className="form-label">Slug</label>
          <input
            type="text"
            {...register('slug')}
            className="form-input"
            placeholder="URL-friendly identifier"
          />
        </div>
      </div>
    </div>
  )
}

export default Step1BasicInfo 