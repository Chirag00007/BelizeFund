import { Upload, FileText, CheckCircle2, Video, AlertTriangle } from 'lucide-react'

const Step9Attachments = ({ register, errors, setValue, getValues, watch }) => {
  const generalDocs = [
    { name: 'Letters of support from relevant stakeholders/Partners', required: true },
    { name: 'Commitment letters from contributing organization(s)', required: true },
    { name: 'Key Project implementation personnel CVs (project manager, Financial Administrator etc.)', required: true },
    { name: 'Feasibility study (if applicable)', required: false },
    { name: 'Plan/Design (if applicable)', required: false },
    { name: 'Maps (if applicable)', required: false },
    { name: 'Environmental Clearance letter (if applicable)', required: false },
    { name: 'Any supporting documentation pending submission to Belize Fund Management', required: false }
  ]

  const essDocs = [
    { name: 'Environmental and Social Risk Screening Tool ESRST Results', required: true },
    { name: 'Environmental and Social Risk Management Plan ESRMP', required: true },
    { name: 'Gender Action Plan GAP', required: true },
    { name: 'Stakeholder Engagement Plan SEP', required: true }
  ]

  const checklist = [
    'Project Title',
    'Organizational background',
    'Summary of the project',
    'Annexed budget (Excel sheet)',
    'Project location description',
    'Completed Logical framework',
    'Name and Address of Organization',
    'List of previous projects',
    'Main contact information',
    'ESS Plans',
    'Duration of Project',
    'Required supporting documents',
    'Complete budget summary',
    'M&E Plan',
    'Contribution to Belize Fund Management Thematic Area',
    'Implementation Plan',
    'Contribution to Belize Fund Management Indicators',
    'Signed proposal template'
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Attachments & Documents</h3>
        <p className="text-gray-600">Upload all required supporting documents</p>
      </div>

      {/* General Required Documents */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center mb-4">
          <FileText className="h-6 w-6 text-blue-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">General Required Documents</h4>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700 mb-4">
              The following documents MUST be uploaded to the online platform upon submission.
            </p>
          </div>

          {generalDocs.map((doc, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 flex items-center">
                    {doc.name}
                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                  </h5>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Document Status</label>
                  <select {...register(`generalDoc${index}Status`)} className="form-input">
                    <option value="">Select status</option>
                    <option value="Ready">Ready to Upload</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Not Available">Not Available</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label">File Upload</label>
                  <input
                    type="file"
                    {...register(`generalDoc${index}File`)}
                    className="form-input"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>
                
                <div>
                  <label className="form-label">Notes</label>
                  <input
                    type="text"
                    {...register(`generalDoc${index}Notes`)}
                    className="form-input"
                    placeholder="Additional notes about this document"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Declaration */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Legal Declaration</h4>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700 mb-4">
              I hereby declare that all the above information is correct and accurate to the best of my knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Name of Legal Representative *</label>
              <input
                type="text"
                {...register('legalRepresentativeName')}
                className="form-input"
                placeholder="Full name of authorized legal representative"
              />
              {errors.legalRepresentativeName && (
                <p className="form-error">{errors.legalRepresentativeName.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Title/Position *</label>
              <input
                type="text"
                {...register('legalRepresentativeTitle')}
                className="form-input"
                placeholder="Title or position in organization"
              />
              {errors.legalRepresentativeTitle && (
                <p className="form-error">{errors.legalRepresentativeTitle.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Date of Declaration *</label>
              <input
                type="date"
                {...register('declarationDate')}
                className="form-input"
              />
              {errors.declarationDate && (
                <p className="form-error">{errors.declarationDate.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Digital Signature Upload</label>
              <input
                type="file"
                {...register('digitalSignature')}
                className="form-input"
                accept=".png,.jpg,.jpeg,.pdf"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload scanned signature or digital signature file
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('declarationCheckbox')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <label className="text-sm text-gray-700">
              I confirm that I am authorized to submit this application on behalf of the organization 
              and that all information provided is true and accurate. I understand that providing false 
              information may result in rejection of the application or termination of funding.
            </label>
          </div>
          {errors.declarationCheckbox && (
            <p className="form-error">{errors.declarationCheckbox.message}</p>
          )}
        </div>
      </div>

      {/* Submission Notes */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h5 className="font-medium text-gray-900 mb-3">Important Submission Notes</h5>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>All documents must be in PDF format unless otherwise specified</li>
          <li>Maximum file size per document: 10MB</li>
          <li>Ensure all documents are clearly labeled and readable</li>
          <li>Only proposals submitted during the open window will be accepted</li>
          <li>Keep copies of all submitted documents for your records</li>
          <li>You will receive a confirmation email upon successful submission</li>
        </ul>
      </div>
    </div>
  )
}

export default Step9Attachments 