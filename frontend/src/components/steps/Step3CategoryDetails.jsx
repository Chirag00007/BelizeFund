const Step3CategoryDetails = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Parent Category</label>
          <select {...register('parentCategory')} className="form-input">
            <option value="">Select parent category</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="environment">Environment</option>
            <option value="social">Social Development</option>
            <option value="economic">Economic Development</option>
          </select>
        </div>

        <div>
          <label className="form-label">Category</label>
          <select {...register('category')} className="form-input">
            <option value="">Select category</option>
            <option value="community">Community Development</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="capacity">Capacity Building</option>
            <option value="research">Research</option>
          </select>
        </div>

        <div>
          <label className="form-label">Category ID</label>
          <input
            type="text"
            {...register('categoryId')}
            className="form-input"
            placeholder="Enter category ID"
          />
        </div>
      </div>
    </div>
  )
}

export default Step3CategoryDetails 