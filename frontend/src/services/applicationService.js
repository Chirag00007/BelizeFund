const API_BASE_URL = 'http://localhost:5000/api';

// Mock mode for testing without backend
const MOCK_MODE = false; // Set to false when backend is available

class ApplicationService {
  // Mock data storage
  getMockApplications() {
    const stored = localStorage.getItem('mockApplications');
    return stored ? JSON.parse(stored) : [];
  }

  saveMockApplications(applications) {
    localStorage.setItem('mockApplications', JSON.stringify(applications));
  }

  generateMockId() {
    return 'APP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  }

  async createApplication(applicationData) {
    if (MOCK_MODE) {
      // Mock implementation
      const mockApplication = {
        _id: this.generateMockId(),
        applicationId: this.generateMockId(),
        ...applicationData,
        applicationStatus: 'draft',
        currentStep: 1,
        completedSteps: [],
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      };
      
      const applications = this.getMockApplications();
      applications.push(mockApplication);
      this.saveMockApplications(applications);
      
      return mockApplication;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create application');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  }

  async getApplications() {
    if (MOCK_MODE) {
      return this.getMockApplications();
    }

    try {
      const response = await fetch(`${API_BASE_URL}/applications`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch applications');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }

  // Alias for getApplications to match ApplicationsList component expectations
  async getAllApplications() {
    return this.getApplications();
  }

  async getApplication(id) {
    if (MOCK_MODE) {
      const applications = this.getMockApplications();
      const application = applications.find(app => app._id === id || app.applicationId === id);
      if (!application) {
        throw new Error('Application not found');
      }
      return application;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch application');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  }

  async saveProgress(id, progressData) {
    if (MOCK_MODE) {
      const applications = this.getMockApplications();
      const index = applications.findIndex(app => app._id === id || app.applicationId === id);
      
      if (index === -1) {
        throw new Error('Application not found');
      }
      
      applications[index] = {
        ...applications[index],
        ...progressData.stepData,
        currentStep: progressData.currentStep,
        completedSteps: progressData.completedSteps,
        updated: new Date().toISOString()
      };
      
      this.saveMockApplications(applications);
      return applications[index];
    }

    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save progress');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  }

  async submitApplication(id, applicationData) {
    console.log('submitApplication called with:', { id, applicationData });
    
    if (MOCK_MODE) {
      console.log('Running in MOCK_MODE');
      const applications = this.getMockApplications();
      const index = applications.findIndex(app => app._id === id || app.applicationId === id);
      
      if (index === -1) {
        throw new Error('Application not found');
      }
      
      applications[index] = {
        ...applications[index],
        ...applicationData,
        applicationStatus: 'submitted',
        submitted: new Date().toISOString(),
        updated: new Date().toISOString()
      };
      
      this.saveMockApplications(applications);
      return applications[index];
    }

    try {
      console.log('Making API call to:', `${API_BASE_URL}/applications/${id}/submit`);
      console.log('Request payload:', applicationData);
      
      // First, submit to backend
      const response = await fetch(`${API_BASE_URL}/applications/${id}/submit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const error = await response.json();
        console.error('Response error:', error);
        throw new Error(error.message || 'Failed to submit application');
      }

      const submittedApplication = await response.json();
      console.log('Backend submission successful:', submittedApplication);

      // Then, create record in Zoho Creator
      try {
        const zohoResult = await this.createZohoRecord(applicationData);
        console.log('Zoho Creator record created:', zohoResult);
        
        // Return the submitted application with Zoho info
        return {
          ...submittedApplication,
          zohoRecordId: zohoResult.data?.recordId,
          zohoSuccess: zohoResult.success
        };
      } catch (zohoError) {
        console.error('Error creating Zoho Creator record:', zohoError);
        // Still return the submitted application, but with Zoho error info
        return {
          ...submittedApplication,
          zohoError: zohoError.message,
          zohoSuccess: false
        };
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  }

  async updateApplication(id, applicationData) {
    if (MOCK_MODE) {
      const applications = this.getMockApplications();
      const index = applications.findIndex(app => app._id === id || app.applicationId === id);
      
      if (index === -1) {
        throw new Error('Application not found');
      }
      
      applications[index] = {
        ...applications[index],
        ...applicationData,
        updated: new Date().toISOString()
      };
      
      this.saveMockApplications(applications);
      return applications[index];
    }

    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update application');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  }

  async deleteApplication(id) {
    if (MOCK_MODE) {
      const applications = this.getMockApplications();
      const filteredApps = applications.filter(app => app._id !== id && app.applicationId !== id);
      this.saveMockApplications(filteredApps);
      return { message: 'Application deleted successfully' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete application');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }

  // Auto-scoring functions
  calculateOrganizationAgeScore(age) {
    if (age >= 10) return 100;
    if (age >= 5) return 80;
    if (age >= 2) return 60;
    if (age >= 1) return 40;
    return 20;
  }

  calculateOrganizationTypeScore(type) {
    const scores = {
      'NGO': 100,
      'CBO': 90,
      'Cooperative': 85,
      'Religious Organization': 80,
      'Educational Institution': 75,
      'Private Company': 60,
      'Government Agency': 50,
      'Other': 40
    };
    return scores[type] || 40;
  }

  calculateOperationalStatusScore(status) {
    const scores = {
      'Fully Operational': 100,
      'Partially Operational': 70,
      'Starting Operations': 50,
      'Not Operational': 20
    };
    return scores[status] || 20;
  }

  calculateAutoScore(applicationData) {
    let totalScore = 0;
    let maxScore = 0;

    // Organization age score (weight: 30%)
    if (applicationData.organizationAge) {
      const ageScore = this.calculateOrganizationAgeScore(applicationData.organizationAge);
      totalScore += ageScore * 0.3;
      maxScore += 100 * 0.3;
    }

    // Organization type score (weight: 35%)
    if (applicationData.organizationType) {
      const typeScore = this.calculateOrganizationTypeScore(applicationData.organizationType);
      totalScore += typeScore * 0.35;
      maxScore += 100 * 0.35;
    }

    // Operational status score (weight: 35%)
    if (applicationData.operationalStatus) {
      const statusScore = this.calculateOperationalStatusScore(applicationData.operationalStatus);
      totalScore += statusScore * 0.35;
      maxScore += 100 * 0.35;
    }

    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  }

  // Zoho Creator Integration Methods
  async createZohoRecord(proposalData) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/zoho/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create record in Zoho Creator');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating record in Zoho Creator:', error);
      throw error;
    }
  }

  async testZohoConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/zoho/test`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to test Zoho connection');
      }

      return await response.json();
    } catch (error) {
      console.error('Error testing Zoho connection:', error);
      throw error;
    }
  }

  // Concept Paper Submission Methods
  async submitConceptPaper(conceptData) {
    if (MOCK_MODE) {
      // Mock implementation for concept paper
      console.log('Mock concept paper submission:', conceptData);
      return {
        success: true,
        message: 'Concept paper submitted successfully (mock)',
        recordId: 'MOCK-CONCEPT-' + Date.now()
      };
    }

    try {
      console.log('Submitting concept paper to:', `${API_BASE_URL}/applications/concept/zoho/create`);
      console.log('Concept data payload:', conceptData);
      
      const response = await fetch(`${API_BASE_URL}/applications/concept/zoho/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conceptData),
      });

      console.log('Concept submission response status:', response.status);
      console.log('Concept submission response ok:', response.ok);

      if (!response.ok) {
        const error = await response.json();
        console.error('Concept submission error:', error);
        throw new Error(error.message || 'Failed to submit concept paper');
      }

      const result = await response.json();
      console.log('Concept paper submission successful:', result);
      return result;
    } catch (error) {
      console.error('Error submitting concept paper:', error);
      throw error;
    }
  }

  async createConceptZohoRecord(conceptData) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/concept/zoho/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conceptData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create concept record in Zoho Creator');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating concept record in Zoho Creator:', error);
      throw error;
    }
  }


}

export const applicationService = new ApplicationService(); 