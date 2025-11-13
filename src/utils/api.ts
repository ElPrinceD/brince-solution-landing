// API utility functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://brincesolutions.com/api' : 'http://localhost:8000/api');

export interface LeadSubmissionData {
  // Basic Information
  businessName?: string;
  contactPerson: string;
  position?: string;
  email: string;
  phone?: string;
  businessAddress?: string;
  
  // Business Details
  natureOfBusiness?: string;
  businessActivities?: string;
  industry?: string;
  productsServices?: string;
  targetMarket?: string;
  
  // Company Information
  yearsOperation: string;
  businessStructure: string;
  employees: string;
  locations: string;
  
  // Goals and Challenges
  shortTermGoals: string;
  longTermGoals: string;
  challenges: string;
  servicesSeeking: string;
  additionalInfo: string;
  
  // Lead Generation Fields
  companySize?: string;
  annualRevenue?: string;
  preferredContactMethod?: string;
  urgencyLevel?: string;
  budgetRange?: string;
}

export const submitLead = async (data: LeadSubmissionData) => {
  const response = await fetch(`${API_BASE_URL}/leads/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      throw new Error(error.errors || error.error || 'Failed to submit lead');
    } else {
      // If not JSON, it's likely an HTML error page
      const text = await response.text();
      throw new Error(`Server error (${response.status}): ${response.statusText}`);
    }
  }

  return response.json();
};

