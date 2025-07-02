import { Calendar, Target, CheckCircle } from 'lucide-react'

const Step4ImplementationPlan = ({ register, errors, setValue, getValues, watch }) => {
  const thematicAreas = {
    TA1: {
      name: "Protection for Biodiversity",
      outcomes: [
        "Outcome 2: Increased protection and effective management of coastal and marine areas",
      ],
      outputs: [
        "Output 2.1: Increased medium and high protection for coastal and marine areas",
        "Output 2.2: Improved management effectiveness of marine protected areas",
        "Output 2.3: Ecosystem health in marine protected areas improved",
        "Output 2.4: Improved community stewardship and support for management"
      ]
    },
    TA2: {
      name: "Sustainable Fisheries", 
      outcomes: [
        "Outcome 1: Reduced pressures on Belize's coastal and marine resources"
      ],
      outputs: [
        "Output 1.1: Reduction in destructive fishing practices and use of harmful gears",
        "Output 1.2: Reduction in nutrient pollution and solid waste",
        "Output 1.3: Increased ecotourism and reef friendly tourism",
        "Output 1.4: Marine spatial planning guides responsible development"
      ]
    },
    TA3: {
      name: "Climate Resilience",
      outcomes: [
        "Outcome 4: Resilient coastal and marine ecosystems"
      ],
      outputs: [
        "Output 4.1: Improved coastal and marine ecosystem health",
        "Output 4.2: Restoration programs build coastal and marine ecosystem resilience"
      ]
    },
    TA4: {
      name: "Blue Business Innovation",
      outcomes: [
        "Outcome 3: Secured livelihoods and increased economic benefits"
      ],
      outputs: [
        "Output 3.1: Community-based blue businesses",
        "Output 3.2: Sustainable fisheries programs", 
        "Output 3.3: Increased coastal and marine based livelihoods"
      ]
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Implementation Plan & Indicators</h3>
        <p className="text-gray-600">Define your implementation timeline and align with Belize Fund Management indicators</p>
      </div>

      {/* Belize Fund Management Indicators Alignment */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center mb-4">
          <Target className="h-6 w-6 text-blue-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">1. Project Indicators Alignment to Belize Fund Management Outputs/Outcomes</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700 mb-4">
              Carefully review the Belize Fund Management Outcomes/Outputs and identify those that closely align with your project. 
              Provide detailed description and justification explaining relevance to your project's goals.
            </p>
          </div>

          <div>
            <label className="form-label">Selected Thematic Area</label>
            <select {...register('selectedThematicArea')} className="form-input">
              <option value="">Select your primary thematic area</option>
              {Object.entries(thematicAreas).map(([key, area]) => (
                <option key={key} value={key}>{key}: {area.name}</option>
              ))}
            </select>
          </div>

          {watch('selectedThematicArea') && (
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h5 className="font-medium text-gray-900 mb-3">
                Available Outcomes & Outputs for {thematicAreas[watch('selectedThematicArea')]?.name}
              </h5>
              
              <div className="space-y-4">
                <div>
                  <h6 className="font-medium text-gray-800 mb-2">Outcomes:</h6>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {thematicAreas[watch('selectedThematicArea')]?.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h6 className="font-medium text-gray-800 mb-2">Outputs:</h6>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {thematicAreas[watch('selectedThematicArea')]?.outputs.map((output, index) => (
                      <li key={index}>{output}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="form-label">Selected Belize Fund Management Indicators *</label>
            <textarea
              {...register('selectedBelizeFundIndicators')}
              className="form-input"
              rows="5"
              placeholder="List the specific Belize Fund Management outcomes and outputs that align with your project. For each selected indicator, provide detailed justification of its relevance to your project goals and expected results."
            />
            {errors.selectedBelizeFundIndicators && (
              <p className="form-error">{errors.selectedBelizeFundIndicators.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Alignment Justification *</label>
            <textarea
              {...register('alignmentJustification')}
              className="form-input"
              rows="6"
              placeholder="Provide detailed description and justification explaining how your project's outcomes and outputs align with the selected Belize Fund Management indicators. Explain the specific contribution your project will make to achieving these indicators."
            />
            {errors.alignmentJustification && (
              <p className="form-error">{errors.alignmentJustification.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Implementation Plan */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <div className="flex items-center mb-4">
          <Calendar className="h-6 w-6 text-green-600 mr-2" />
          <h4 className="text-xl font-semibold text-gray-900">2. Implementation Plan</h4>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <p className="text-sm text-gray-700 mb-2">
              Describe the project implementation plan indicating the sequence of all major activities and milestones, 
              including targeted beginning and ending dates for each step.
            </p>
          </div>

          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Project Duration (Months) *</label>
              <input
                type="number"
                {...register('implementationDuration')}
                className="form-input"
                min="1"
                max="60"
                placeholder="Enter project duration in months"
              />
              {errors.implementationDuration && (
                <p className="form-error">{errors.implementationDuration.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Responsible Party/Organization *</label>
              <input
                type="text"
                {...register('responsibleParty')}
                className="form-input"
                placeholder="Lead implementing organization"
              />
              {errors.responsibleParty && (
                <p className="form-error">{errors.responsibleParty.message}</p>
              )}
            </div>
          </div>

          {/* Activities Timeline */}
          <div>
            <label className="form-label">Implementation Timeline and Activities *</label>
            <textarea
              {...register('implementationTimeline')}
              className="form-input"
              rows="8"
              placeholder="Provide a detailed timeline of major activities, organized by objectives and outputs. Include:
- Objective 1 activities with start/end quarters
- Objective 2 activities with start/end quarters  
- Objective 3 activities with start/end quarters
- Key milestones and deliverables
- Monitoring and evaluation activities

Example format:
OBJECTIVE 1: [Insert Objective]
Output 1.1: [Insert Output]
- Activity 1.1.1: Description (Q1-Q2)
- Activity 1.1.2: Description (Q2-Q3)
Output 1.2: [Insert Output]  
- Activity 1.2.1: Description (Q3-Q4)"
            />
            {errors.implementationTimeline && (
              <p className="form-error">{errors.implementationTimeline.message}</p>
            )}
          </div>

          {/* Key Milestones */}
          <div>
            <label className="form-label">Key Project Milestones *</label>
            <textarea
              {...register('keyMilestones')}
              className="form-input"
              rows="5"
              placeholder="List major project milestones with expected completion dates:
- Milestone 1: Description (Month X)
- Milestone 2: Description (Month Y)
- etc."
            />
            {errors.keyMilestones && (
              <p className="form-error">{errors.keyMilestones.message}</p>
            )}
          </div>

          {/* Monitoring Integration */}
          <div>
            <label className="form-label">Monitoring Plan Integration *</label>
            <textarea
              {...register('monitoringIntegration')}
              className="form-input"
              rows="4"
              placeholder="Describe how monitoring and evaluation activities are integrated into the implementation plan. Include frequency of data collection, reporting schedules, and evaluation milestones."
            />
            {errors.monitoringIntegration && (
              <p className="form-error">{errors.monitoringIntegration.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Implementation Considerations */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <div className="flex items-center mb-3">
          <CheckCircle className="h-5 w-5 text-yellow-600 mr-2" />
          <h5 className="font-medium text-gray-900">Implementation Considerations</h5>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Include targeted beginning and ending dates for each major activity</li>
          <li>Ensure monitoring plan is integrated throughout implementation</li>
          <li>Consider seasonal factors that may affect implementation in Belize</li>
          <li>Account for stakeholder engagement and community participation</li>
          <li>Plan for adaptive management and course corrections</li>
        </ul>
      </div>
    </div>
  )
}

export default Step4ImplementationPlan 