const Step5OrganizationInfo = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Legal Representative Name *</label>
          <input
            type="text"
            {...register('legalRepName')}
            className="form-input"
            placeholder="Enter legal representative name"
          />
          {errors.legalRepName && (
            <p className="form-error">{errors.legalRepName.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Type of Organisation</label>
          <select {...register('typeOfOrganisation')} className="form-input">
            <option value="">Select type</option>
            <option value="ngo">NGO</option>
            <option value="cbo">Community Based Organization</option>
            <option value="cooperative">Cooperative</option>
            <option value="private">Private Company</option>
          </select>
        </div>

        <div>
          <label className="form-label">Website</label>
          <input
            type="url"
            {...register('website')}
            className="form-input"
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="form-error">{errors.website.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Organization Age</label>
          <select {...register('organizationAge')} className="form-input">
            <option value="">Select age range</option>
            <option value="less-than-1">Less than 1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="4-7">4-7 years</option>
            <option value="8-15">8-15 years</option>
            <option value="more-than-15">More than 15 years</option>
          </select>
        </div>

        <div>
          <label className="form-label">Legal Representative Position</label>
          <input
            type="text"
            {...register('legalRepPosition')}
            className="form-input"
            placeholder="Enter position"
          />
        </div>

        <div>
          <label className="form-label">Operational Status</label>
          <select {...register('operationalStatus')} className="form-input">
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Email Address</label>
          <input
            type="email"
            {...register('emailAddress')}
            className="form-input"
            placeholder="organization@email.com"
          />
          {errors.emailAddress && (
            <p className="form-error">{errors.emailAddress.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Office Phone Number</label>
          <input
            type="tel"
            {...register('officePhoneNumber')}
            className="form-input"
            placeholder="Enter office phone"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Physical Address</label>
        <textarea
          {...register('physicalAddressProposal')}
          className="form-input h-24"
          placeholder="Enter physical address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="form-label">Village/Town/City</label>
          <input
            type="text"
            {...register('villageTownCity')}
            className="form-input"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="form-label">District</label>
          <input
            type="text"
            {...register('districtProposal')}
            className="form-input"
            placeholder="Enter district"
          />
        </div>

        <div>
          <label className="form-label">Project Location</label>
          <input
            type="text"
            {...register('projectLocation')}
            className="form-input"
            placeholder="Enter project location"
          />
        </div>
      </div>
    </div>
  )
}

export default Step5OrganizationInfo 