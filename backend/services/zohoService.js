const axios = require('axios');
require('dotenv').config({ path: './config.env' });

class ZohoService {
  constructor() {
    this.tokenUrl = process.env.ZOHO_TOKEN_URL;
    this.clientId = process.env.ZOHO_CLIENT_ID;
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET;
    this.redirectUri = process.env.ZOHO_REDIRECT_URI;
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    this.orgId = process.env.ZOHO_CREATOR_ORG_ID;
    this.appId = process.env.ZOHO_CREATOR_APP_ID;
    this.formName = process.env.ZOHO_CREATOR_FORM_NAME;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async fetchAccessToken() {
    try {
      const url = `${this.tokenUrl}?grant_type=refresh_token&client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=${this.redirectUri}&refresh_token=${this.refreshToken}`;
      const response = await axios.post(url);
      
      if (response.data && response.data.access_token) {
        console.log("Access token generated: ", response.data.access_token);
        this.accessToken = response.data.access_token;
        // Set token expiry (Zoho tokens typically expire in 1 hour)
        this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
        return response.data.access_token;
      } else {
        throw new Error("Access token not found in the response.");
      }
    } catch (error) {
      console.error("Error fetching access token:", error.message);
      throw error;
    }
  }

  async getValidAccessToken() {
    // Check if we have a valid token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }
    
    // Fetch new token if expired or not available
    return await this.fetchAccessToken();
  }

  async createProposalRecord(proposalData) {
    try {
      const accessToken = await this.getValidAccessToken();
      
      // Map frontend data to Zoho Creator field names
      const zohoData = this.mapToZohoFields(proposalData);
      
      const url = `https://creator.zoho.com/api/v2/${this.orgId}/${this.appId}/form/${this.formName}`;
      
      const headers = {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      };

      const payload = {
        data: zohoData
      };

      console.log('Creating Zoho Creator record with data:', JSON.stringify(payload, null, 2));
      console.log('Zoho Creator URL:', url);
      console.log('Zoho Creator Headers:', headers);
      console.log('Raw request payload:', payload);

      const response = await axios.post(url, payload, { headers });
      
      console.log('Zoho Creator Response Status:', response.status);
      console.log('Zoho Creator Response Data:', JSON.stringify(response.data, null, 2));
      
      // Check for validation errors (code 3002 indicates validation errors)
      if (response.data && response.data.code === 3002 && response.data.error) {
        console.error('Zoho Creator validation errors:', response.data.error);
        const errorMessages = Object.values(response.data.error).join(', ');
        throw new Error(`Zoho Creator validation failed: ${errorMessages}`);
      }
      
      // Check for invalid column values (code 3001 indicates invalid field values)
      if (response.data && response.data.code === 3001 && response.data.error) {
        console.error('Zoho Creator invalid column values:', response.data.error);
        const errorMessages = Array.isArray(response.data.error) ? response.data.error.join(', ') : response.data.error;
        throw new Error(`Zoho Creator invalid field values: ${errorMessages}`);
      }
      
      // Check for successful response
      if (response.data && response.data.data) {
        console.log('Record created successfully in Zoho Creator:', response.data.data);
        return {
          success: true,
          recordId: response.data.data.ID,
          message: 'Record created successfully in Zoho Creator'
        };
      } else {
        console.error('Zoho Creator response structure:', response.data);
        throw new Error('Invalid response from Zoho Creator');
      }
    } catch (error) {
      console.error('Error creating record in Zoho Creator:', error.message);
      if (error.response) {
        console.error('Zoho Creator Error Response Status:', error.response.status);
        console.error('Zoho Creator Error Response Data:', JSON.stringify(error.response.data, null, 2));
        console.error('Zoho Creator Error Response Headers:', error.response.headers);
      }
      throw error;
    }
  }

  mapToZohoFields(proposalData) {
    // Map frontend form data to Zoho Creator field names
    // Only including the specific fields provided by user
    const mappedData = {};

    // Helper function to format dates for Zoho Creator (DD-MMM-YYYY format)
    const formatDateForZoho = (dateString) => {
      if (!dateString) return null;
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        const zohoFormat = `${day}-${month}-${year}`;
        
        console.log(`Date formatting: ${dateString} -> Zoho format: ${zohoFormat}`);
        
        return zohoFormat;
      } catch (error) {
        console.warn('Error formatting date:', dateString, error);
        return null;
      }
    };

    // Helper function to check if value is a BigInt or likely a lookup field
    const isLookupField = (value) => {
      if (value === null || value === undefined) return true;
      if (typeof value === 'number' && (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER)) return true;
      if (typeof value === 'string' && /^\d{15,}$/.test(value)) return true; // Very long numbers are likely BigInt
      return false;
    };

    // Helper function to safely add field if it's not a lookup
    const addFieldIfNotLookup = (value, fieldName) => {
      if (!isLookupField(value) && value !== '') {
        mappedData[fieldName] = value;
      }
    };

    // Map only to the specific fields provided by user
    // Project_Title (text)
    addFieldIfNotLookup(proposalData.projectTitle, 'Project_Title');
    
    // Project_title1 (text) - alternative project title field
    addFieldIfNotLookup(proposalData.projectTitle, 'Project_title1');
    
    // Proposed_Start_Date (date-time)
    if (proposalData.proposedStartDate && !isLookupField(proposalData.proposedStartDate)) {
      const formattedStartDate = formatDateForZoho(proposalData.proposedStartDate);
      if (formattedStartDate) mappedData.Proposed_Start_Date = formattedStartDate;
    }
    
    // Recipient_Organization (text)
    addFieldIfNotLookup(proposalData.organizationName, 'Recipient_Organization');
    
    // Stakeholder_Engagement_Plan_SEP (text)
    addFieldIfNotLookup(proposalData.sep, 'Stakeholder_Engagement_Plan_SEP');
    
    // SUMMARY (text)
    addFieldIfNotLookup(proposalData.projectDescription, 'SUMMARY');
    
    // SUSTAINABILITY_REPLICATION1 (text)
    addFieldIfNotLookup(proposalData.sustainabilityReplication, 'SUSTAINABILITY_REPLICATION1');
    
    // Project_Duration1 (text)
    if (proposalData.proposedStartDate && proposalData.expectedEndDate && !isLookupField(proposalData.proposedStartDate) && !isLookupField(proposalData.expectedEndDate)) {
      const startDate = new Date(proposalData.proposedStartDate);
      const endDate = new Date(proposalData.expectedEndDate);
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        mappedData.Project_Duration1 = `${durationInDays} days`;
      }
    }
    
    // Project_Goal (text)
    addFieldIfNotLookup(proposalData.projectGoal, 'Project_Goal');
    
    // Project_Goal1 (text) - alternative project goal field
    addFieldIfNotLookup(proposalData.projectGoal, 'Project_Goal1');
    
    // Project_Location (text)
    let projectLocation = '';
    if (proposalData.proposalVillageOrCity && !isLookupField(proposalData.proposalVillageOrCity)) {
      projectLocation += proposalData.proposalVillageOrCity;
    }
    if (proposalData.district && !isLookupField(proposalData.district)) {
      projectLocation += projectLocation ? `, ${proposalData.district}` : proposalData.district;
    }
    if (proposalData.proposalProjectLocation && !isLookupField(proposalData.proposalProjectLocation)) {
      projectLocation += projectLocation ? `, ${proposalData.proposalProjectLocation}` : proposalData.proposalProjectLocation;
    }
    if (projectLocation) {
      mappedData.Project_Location = projectLocation;
    }

    console.log('Filtered Zoho data (only specified fields):', mappedData);
    return mappedData;
  }

  async createConceptRecord(conceptData) {
    try {
      const accessToken = await this.getValidAccessToken();
      
      // Map frontend data to Zoho Creator field names for concept paper
      const zohoData = this.mapConceptToZohoFields(conceptData);
      
      // Use the concept paper form name from environment
      const conceptFormName = process.env.ZOHO_CREATOR_FORM2_NAME;
      const url = `https://creator.zoho.com/api/v2/${this.orgId}/${this.appId}/form/${conceptFormName}`;
      
      const headers = {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      };

      const payload = {
        data: zohoData
      };

      console.log('Creating Zoho Creator concept record with data:', JSON.stringify(payload, null, 2));
      console.log('Zoho Creator Concept URL:', url);
      console.log('Zoho Creator Headers:', headers);
      console.log('Raw concept request payload:', payload);

      const response = await axios.post(url, payload, { headers });
      
      console.log('Zoho Creator Concept Response Status:', response.status);
      console.log('Zoho Creator Concept Response Data:', JSON.stringify(response.data, null, 2));
      
      // Check for validation errors (code 3002 indicates validation errors)
      if (response.data && response.data.code === 3002 && response.data.error) {
        console.error('Zoho Creator concept validation errors:', response.data.error);
        const errorMessages = Object.values(response.data.error).join(', ');
        throw new Error(`Zoho Creator concept validation failed: ${errorMessages}`);
      }
      
      // Check for invalid column values (code 3001 indicates invalid field values)
      if (response.data && response.data.code === 3001 && response.data.error) {
        console.error('Zoho Creator concept invalid column values:', response.data.error);
        const errorMessages = Array.isArray(response.data.error) ? response.data.error.join(', ') : response.data.error;
        throw new Error(`Zoho Creator concept invalid field values: ${errorMessages}`);
      }
      
      // Check for successful response
      if (response.data && response.data.data) {
        console.log('Concept record created successfully in Zoho Creator:', response.data.data);
        return {
          success: true,
          recordId: response.data.data.ID,
          message: 'Concept record created successfully in Zoho Creator'
        };
      } else {
        console.error('Zoho Creator concept response structure:', response.data);
        throw new Error('Invalid response from Zoho Creator for concept paper');
      }
    } catch (error) {
      console.error('Error creating concept record in Zoho Creator:', error.message);
      if (error.response) {
        console.error('Zoho Creator Concept Error Response Status:', error.response.status);
        console.error('Zoho Creator Concept Error Response Data:', JSON.stringify(error.response.data, null, 2));
        console.error('Zoho Creator Concept Error Response Headers:', error.response.headers);
      }
      throw error;
    }
  }

  mapConceptToZohoFields(conceptData) {
    // Map frontend concept form data to Zoho Creator field names
    // Using exact field names from the provided JSON structure
    const mappedData = {};

    // Helper function to format dates for Zoho Creator (DD-MMM-YYYY format)
    const formatDateForZoho = (dateString) => {
      if (!dateString) return null;
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${day}-${month}-${year}`;
      } catch (error) {
        console.warn('Error formatting date:', dateString, error);
        return null;
      }
    };

    // Helper function to check if value is valid and not empty
    const addFieldIfValid = (value, fieldName) => {
      if (value !== null && value !== undefined && value !== '') {
        mappedData[fieldName] = value;
      }
    };

    // Helper function to create Project Budget Summary subform data
    const createProjectBudgetSummary = (conceptData) => {
      const budgetSummary = [];
      
      // Define budget categories with their corresponding form fields
      const budgetCategories = [
        { key: 'salaryBudget', category: 'Salary' },
        { key: 'travelBudget', category: 'Travel/accommodation' },
        { key: 'equipmentBudget', category: 'Equipment/supplies' },
        { key: 'contractedServicesBudget', category: 'Contracted Services' },
        { key: 'operationalBudget', category: 'Operational Costs' },
        { key: 'educationBudget', category: 'Education/outreach' },
        { key: 'trainingBudget', category: 'Training' },
        { key: 'administrativeBudget', category: 'Administrative' }
      ];

      // Calculate total budget
      const totalBudget = budgetCategories.reduce((total, cat) => {
        return total + (parseFloat(conceptData[cat.key]) || 0);
      }, 0);

      // Create subform entries for non-zero budget items
      budgetCategories.forEach(({ key, category }) => {
        const amount = parseFloat(conceptData[key]) || 0;
        if (amount > 0) {
          const percentage = totalBudget > 0 ? ((amount / totalBudget) * 100).toFixed(2) : "0.00";
          budgetSummary.push({
            Categories: category,
            Total_Contribution_BZD: amount.toFixed(2),
            Percentage: percentage
          });
        }
      });

      console.log('Generated Project Budget Summary:', budgetSummary);
      return budgetSummary;
    };

    // Background Information Mapping - using exact Zoho field names
    addFieldIfValid(conceptData.projectTitle, 'Project_Title');
    addFieldIfValid(conceptData.organizationName, 'Organization_Name');
    addFieldIfValid(conceptData.organizationAddress, 'Organization_Address');
    addFieldIfValid(conceptData.organizationType, 'Type_of_Organization');
    
    if (conceptData.dateOfIncorporation) {
      const formattedIncorporationDate = formatDateForZoho(conceptData.dateOfIncorporation);
      if (formattedIncorporationDate) mappedData.Date_of_Incorporation_of_Organization = formattedIncorporationDate;
    }

    // Main Contact Information - using exact Zoho field names
    addFieldIfValid(conceptData.contactName, 'Contact_Name');
    addFieldIfValid(conceptData.contactPosition, 'Position');
    addFieldIfValid(conceptData.contactEmail, 'Email');
    addFieldIfValid(conceptData.contactTelephone, 'Telephone');

    // Project Duration - using exact Zoho field names
    if (conceptData.proposedStartDate) {
      const formattedStartDate = formatDateForZoho(conceptData.proposedStartDate);
      if (formattedStartDate) mappedData.Proposed_Start_Date = formattedStartDate;
    }
    addFieldIfValid(conceptData.durationMonths, 'Duration_Months');

    // Award Category and Thematic Area - now single line text fields
    addFieldIfValid(conceptData.awardCategory, 'Award_Category1');
    addFieldIfValid(conceptData.thematicArea, 'Project_Theme');

    // Content Sections - using exact Zoho field names
    addFieldIfValid(conceptData.projectSummary, 'Project_Summary');
    addFieldIfValid(conceptData.projectGoalObjectives, 'Project_Goal_and_Objectives');
    addFieldIfValid(conceptData.projectOutputsActivities, 'Project_Outputs_and_Activities');

    // Budget Information - Calculate totals
    const totalBudgetRequested = 
      (parseFloat(conceptData.salaryBudget) || 0) +
      (parseFloat(conceptData.travelBudget) || 0) +
      (parseFloat(conceptData.equipmentBudget) || 0) +
      (parseFloat(conceptData.contractedServicesBudget) || 0) +
      (parseFloat(conceptData.operationalBudget) || 0) +
      (parseFloat(conceptData.educationBudget) || 0) +
      (parseFloat(conceptData.trainingBudget) || 0) +
      (parseFloat(conceptData.administrativeBudget) || 0);

    // Co-financing information
    const totalCoFinancing = parseFloat(conceptData.totalCoFinancing) || 0;
    
    // Calculate total project cost
    const totalProjectCost = totalBudgetRequested + totalCoFinancing;

    // Add budget fields with exact Zoho field names
    if (totalCoFinancing > 0) {
      mappedData.Total_Co_Financing = totalCoFinancing.toFixed(2);
    }

    if (totalProjectCost > 0) {
      mappedData.Total_Project_Estimated_Cost = totalProjectCost.toFixed(2);
      mappedData.Total_Project_Estimated_Cost_Percentage = "100.00";
    }

    // Add Total2 field (appears to be the requested amount from fund)
    if (totalBudgetRequested > 0) {
      mappedData.Total2 = totalBudgetRequested.toFixed(2);
    }

    // Calculate and add percentage fields
    if (totalProjectCost > 0) {
      const coFinancingPercentage = ((totalCoFinancing / totalProjectCost) * 100).toFixed(2);
      mappedData.Total_Co_Financing_Percentage = coFinancingPercentage;
    }

    // Project Budget Summary Subform - create subform entries for budget breakdown
    const projectBudgetSummary = createProjectBudgetSummary(conceptData);
    if (projectBudgetSummary.length > 0) {
      mappedData.Project_Budget_Summary = projectBudgetSummary;
    }

    // Co-financing entries as text summary (if needed)
    if (conceptData.coFinancingEntries && conceptData.coFinancingEntries.length > 0) {
      const coFinancingSummary = conceptData.coFinancingEntries
        .filter(entry => entry.organization && entry.contribution > 0)
        .map(entry => `${entry.organization}: $${entry.contribution} (${entry.percentage}%)`)
        .join('; ');
      
      if (coFinancingSummary) {
        mappedData.Co_Financing_Details = coFinancingSummary;
      }
    }

    // Declaration fields (if needed)
    addFieldIfValid(conceptData.legalRepresentativeName, 'Legal_Representative_Name');
    
    if (conceptData.declarationDate) {
      const formattedDeclarationDate = formatDateForZoho(conceptData.declarationDate);
      if (formattedDeclarationDate) mappedData.Declaration_Date = formattedDeclarationDate;
    }

    console.log('Mapped concept data for Zoho (updated with exact field names):', mappedData);
    console.log('Critical field values:', {
      Project_Theme: mappedData.Project_Theme,
      Award_Category1: mappedData.Award_Category1,
      Type_of_Organization: mappedData.Type_of_Organization,
      Project_Budget_Summary_Count: mappedData.Project_Budget_Summary?.length || 0
    });
    
    return mappedData;
  }
}

module.exports = new ZohoService(); 