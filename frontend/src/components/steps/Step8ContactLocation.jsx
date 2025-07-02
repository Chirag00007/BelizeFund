const Step8ContactLocation = ({ register, errors }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="form-label">Position</label>
        <input type="text" {...register('position')} className="form-input" placeholder="Enter position" />
      </div>
      <div>
        <label className="form-label">Mobile Telephone</label>
        <input type="tel" {...register('mobileTelephone')} className="form-input" placeholder="Enter mobile" />
      </div>
      <div>
        <label className="form-label">Office Telephone</label>
        <input type="tel" {...register('officeTelephone')} className="form-input" placeholder="Enter office phone" />
      </div>
      <div>
        <label className="form-label">Village or Town</label>
        <input type="text" {...register('villageOrTown')} className="form-input" placeholder="Enter location" />
      </div>
      <div>
        <label className="form-label">District</label>
        <input type="text" {...register('district')} className="form-input" placeholder="Enter district" />
      </div>
    </div>
  </div>
)

export default Step8ContactLocation 