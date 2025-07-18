import * as yup from 'yup'

// Step 1: Front Page - Remove all required validations
const step1Schema = yup.object().shape({
  // Lead Organization
  projectTitle: yup.string()
    .test('word-count', 'Project title should be 15 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).length
      return wordCount <= 15
    }),
  organizationName: yup.string(),
  organizationAddress: yup.string(),
  organizationType: yup.string(),
  dateOfIncorporation: yup.date(),
  
  // Main Contact
  contactName: yup.string(),
  contactPosition: yup.string(),
  contactEmail: yup.string().email('Invalid email'),
  contactTelephone: yup.string(),
  
  // Project Duration
  proposedStartDate: yup.date(),
  expectedEndDate: yup.date()
    .min(yup.ref('proposedStartDate'), 'End date must be after start date'),
  
  // Project Location
  primaryLocation: yup.string(),
  projectEnvironment: yup.string(),
  detailedLocationDescription: yup.string(),
  
  // Budget Summary
  totalProjectCost: yup.number().positive('Total cost must be positive'),
  amountRequested: yup.number().positive('Amount must be positive'),
  totalCoFinancing: yup.number().min(0, 'Co-financing cannot be negative'),
  partnerOrganizations: yup.string(),
})

// Step 2: Background Information - Remove all required validations
const step2Schema = yup.object().shape({
  // Project Summary
  projectSummary: yup.string()
    .test('word-count', 'Summary should be 500 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 500
    }),
  primaryThematicArea: yup.string(),
  
  // Organizational Background
  organizationMission: yup.string(),
  organizationVision: yup.string(),
  legalStatus: yup.string(),
  registrationDate: yup.date(),
  organizationalBackground: yup.string()
    .test('word-count', 'Background should be 500 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 500
    }),
  projectManagerName: yup.string(),
  projectManagerQualifications: yup.string(),
  previousRelevantProjects: yup.string(),
})

// Step 3: Project Goals & Objectives - Remove all required validations
const step3Schema = yup.object().shape({
  projectGoalObjectives: yup.string()
    .test('word-count', 'Content should be 500 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 500
    }),
  logicalFrameworkGoal: yup.string(),
  objective1: yup.string(),
  outcome1: yup.string(),
  output1_1: yup.string(),
  output1_2: yup.string(),
  indicators1: yup.string(),
  verification1: yup.string(),
  assumptions1: yup.string(),
  objective2: yup.string(),
  outcome2: yup.string(),
  output2_1: yup.string(),
  output2_2: yup.string(),
  indicators2: yup.string(),
  verification2: yup.string(),
  assumptions2: yup.string(),
  objective3: yup.string(),
  outcome3: yup.string(),
  output3_1: yup.string(),
  output3_2: yup.string(),
  indicators3: yup.string(),
  verification3: yup.string(),
  assumptions3: yup.string(),
})

// Step 4: Implementation & Indicators - Remove all required validations
const step4Schema = yup.object().shape({
  selectedBelizeFundIndicators: yup.string(),
  alignmentJustification: yup.string(),
  implementationProjectTitle: yup.string(),
  implementationProjectDuration: yup.string(),
  implementationProjectGoal: yup.string(),
  responsibleParty: yup.string(),
  objective1Title: yup.string(),
  output1_1Title: yup.string(),
  activity1_1_1: yup.string(),
  activity1_1_2: yup.string(),
  // Checkbox fields for timeline
  obj1_q1: yup.boolean(),
  obj1_q2: yup.boolean(),
  obj1_q3: yup.boolean(),
  obj1_q4: yup.boolean(),
  obj1_q5: yup.boolean(),
  obj1_q6: yup.boolean(),
  obj1_q7: yup.boolean(),
  obj1_q8: yup.boolean(),
  obj1_q9: yup.boolean(),
  obj1_q10: yup.boolean(),
  obj1_q11: yup.boolean(),
  obj1_q12: yup.boolean(),
  output1_1_q1: yup.boolean(),
  output1_1_q2: yup.boolean(),
  output1_1_q3: yup.boolean(),
  output1_1_q4: yup.boolean(),
  output1_1_q5: yup.boolean(),
  output1_1_q6: yup.boolean(),
  output1_1_q7: yup.boolean(),
  output1_1_q8: yup.boolean(),
  output1_1_q9: yup.boolean(),
  output1_1_q10: yup.boolean(),
  output1_1_q11: yup.boolean(),
  output1_1_q12: yup.boolean(),
  activity1_1_1_q1: yup.boolean(),
  activity1_1_1_q2: yup.boolean(),
  activity1_1_1_q3: yup.boolean(),
  activity1_1_1_q4: yup.boolean(),
  activity1_1_1_q5: yup.boolean(),
  activity1_1_1_q6: yup.boolean(),
  activity1_1_1_q7: yup.boolean(),
  activity1_1_1_q8: yup.boolean(),
  activity1_1_1_q9: yup.boolean(),
  activity1_1_1_q10: yup.boolean(),
  activity1_1_1_q11: yup.boolean(),
  activity1_1_1_q12: yup.boolean(),
  activity1_1_2_q1: yup.boolean(),
  activity1_1_2_q2: yup.boolean(),
  activity1_1_2_q3: yup.boolean(),
  activity1_1_2_q4: yup.boolean(),
  activity1_1_2_q5: yup.boolean(),
  activity1_1_2_q6: yup.boolean(),
  activity1_1_2_q7: yup.boolean(),
  activity1_1_2_q8: yup.boolean(),
  activity1_1_2_q9: yup.boolean(),
  activity1_1_2_q10: yup.boolean(),
  activity1_1_2_q11: yup.boolean(),
  activity1_1_2_q12: yup.boolean(),
  keyMilestones: yup.string(),
  monitoringIntegration: yup.string(),
})

// Step 5: Risk Screening - Remove all required validations
const step5Schema = yup.object().shape({
  esrstStatus: yup.string(),
  esrmpStatus: yup.string(),
  gapStatus: yup.string(),
  sepStatus: yup.string(),
})

// Step 6: Monitoring & Evaluation - Remove all required validations
const step6Schema = yup.object().shape({
  monitoringEvaluationPlan: yup.string()
    .test('word-count', 'M&E plan should be 500 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 500
    }),
  recipientOrganization: yup.string(),
  meProjectGoal: yup.string(),
  meProjectObjectives: yup.string(),
  endProjectEvaluationPlan: yup.string(),
})

// Step 7: Sustainability - Remove all required validations
const step7Schema = yup.object().shape({
  sustainabilityPlan: yup.string()
    .test('word-count', 'Sustainability plan should be 300 words or less', function(value) {
      if (!value) return true
      const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length
      return wordCount <= 300
    }),
})

// Step 8: Budget - Remove all required validations
const step8Schema = yup.object().shape({
  totalBudgetRequested: yup.number().positive('Budget must be positive'),
  budgetNotes: yup.string(),
})

// Step 9: Risk Management - Remove all required validations
const step9Schema = yup.object().shape({
  // Stakeholder Engagement Plan
  stakeholderEngagementStrategy: yup.string(),
  consultativeProcessPlan: yup.string(),
  grievanceMechanisms: yup.string(),
  
  // Gender Action Plan
  genderAnalysis: yup.string(),
  genderDifferencesGaps: yup.string(),
  genderActionPlan: yup.string(),
  
  // Environmental and Social Risk Management Plan
  esrstStatus: yup.string(),
  esrmpStatus: yup.string(),
  environmentalSocialRiskPlan: yup.string(),
  additionalEnvironmentalSocial: yup.string(),
  
  // Additional Risk Factors
  riskAssessmentOverview: yup.string(),
  overallRiskManagementStrategy: yup.string(),
})

// Step 10: Attachments - Remove all required validations
const step10Schema = yup.object().shape({
  legalRepresentativeName: yup.string(),
  legalRepresentativeTitle: yup.string(),
  declarationDate: yup.date(),
  declarationCheckbox: yup.boolean(),
  videoStatus: yup.string(),
  videoFile: yup.mixed(),
  digitalSignature: yup.mixed(),
})

const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
  5: step5Schema,
  6: step6Schema,
  7: step7Schema,
  8: step8Schema,
  9: step9Schema,
  10: step10Schema,
}

export const getStepSchema = (step) => {
  return stepSchemas[step] || yup.object()
}

export { stepSchemas } 