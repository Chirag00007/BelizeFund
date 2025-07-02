const Step7Compliance = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">ESRST Result</label>
          <input
            type="text"
            {...register('esrstResult')}
            className="form-input"
            placeholder="Enter ESRST result"
          />
        </div>

        <div>
          <label className="form-label">ESRST</label>
          <input
            type="text"
            {...register('esrst')}
            className="form-input"
            placeholder="Enter ESRST details"
          />
        </div>

        <div>
          <label className="form-label">ESRMP</label>
          <input
            type="text"
            {...register('esrmp')}
            className="form-input"
            placeholder="Enter ESRMP details"
          />
        </div>

        <div>
          <label className="form-label">GAP</label>
          <input
            type="text"
            {...register('gap')}
            className="form-input"
            placeholder="Enter GAP details"
          />
        </div>

        <div>
          <label className="form-label">SEP</label>
          <input
            type="text"
            {...register('sep')}
            className="form-input"
            placeholder="Enter SEP details"
          />
        </div>
      </div>
    </div>
  )
}

export default Step7Compliance 