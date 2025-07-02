const Step10LogicalFramework = ({ register, errors }) => (
  <div className="space-y-6">
    <div>
      <label className="form-label">Logical Framework</label>
      <textarea {...register('logicalFramework')} className="form-input h-24" placeholder="Enter logical framework" />
    </div>
    <div>
      <label className="form-label">Project Goal</label>
      <textarea {...register('projectGoalLogical')} className="form-input h-20" placeholder="Enter project goal" />
    </div>
    <div>
      <label className="form-label">Purpose</label>
      <textarea {...register('purpose')} className="form-input h-20" placeholder="Enter purpose" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="form-label">Output 1.1</label>
        <input type="text" {...register('output1_1')} className="form-input" placeholder="Output 1.1" />
      </div>
      <div>
        <label className="form-label">Output 1.2</label>
        <input type="text" {...register('output1_2')} className="form-input" placeholder="Output 1.2" />
      </div>
      <div>
        <label className="form-label">Output 1.3</label>
        <input type="text" {...register('output1_3')} className="form-input" placeholder="Output 1.3" />
      </div>
    </div>
    <div>
      <label className="form-label">Specific Objective 2</label>
      <input type="text" {...register('specificObjective2')} className="form-input" placeholder="Specific Objective 2" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="form-label">Output 2.1</label>
        <input type="text" {...register('output2_1')} className="form-input" placeholder="Output 2.1" />
      </div>
      <div>
        <label className="form-label">Output 2.2</label>
        <input type="text" {...register('output2_2')} className="form-input" placeholder="Output 2.2" />
      </div>
      <div>
        <label className="form-label">Output 2.3</label>
        <input type="text" {...register('output2_3')} className="form-input" placeholder="Output 2.3" />
      </div>
    </div>
  </div>
)

export default Step10LogicalFramework 