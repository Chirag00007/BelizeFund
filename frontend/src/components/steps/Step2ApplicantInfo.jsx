const Step2ApplicantInfo = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">First Name *</label>
          <input
            type="text"
            {...register('firstName')}
            className="form-input"
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="form-error">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Last Name *</label>
          <input
            type="text"
            {...register('lastName')}
            className="form-input"
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="form-error">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            {...register('email')}
            className="form-input"
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Mobile Number *</label>
          <input
            type="tel"
            {...register('mobile')}
            className="form-input"
            placeholder="Enter mobile number"
          />
          {errors.mobile && (
            <p className="form-error">{errors.mobile.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">User ID</label>
          <input
            type="text"
            {...register('userId')}
            className="form-input"
            placeholder="Enter user ID"
          />
          {errors.userId && (
            <p className="form-error">{errors.userId.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step2ApplicantInfo 