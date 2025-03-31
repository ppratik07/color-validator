import { BASE_URL } from "../config";
import { BrandProfile, AnalysisHistory, AnalysisResult } from "../types/types";

export const DataService = {
  async getBrandProfiles(): Promise<BrandProfile[]> {
    try {
      const res = await fetch(`${BASE_URL}/profiles`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error("Error fetching profiles:", error);
      throw error;
    }
  },
  
  async getBrandProfileById(id: string): Promise<BrandProfile | null> {
    try {
      const res = await fetch(`${BASE_URL}/profiles/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error(`Error fetching profile with id ${id}:`, error);
      throw error;
    }
  },
  
  async createBrandProfile(profile: Omit<BrandProfile, "id">): Promise<BrandProfile> {
    try {
      const res = await fetch(`${BASE_URL}/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error("Error in createBrandProfile:", error);
      throw error;
    }
  },
  
  async updateBrandProfile(id: string, updates: Partial<BrandProfile>): Promise<BrandProfile | null> {
    try {
      const res = await fetch(`${BASE_URL}/profiles/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(updates),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update profile: ${res.status}, message: ${errorText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error(`Error updating profile with id ${id}:`, error);
      throw error;
    }
  },
  
  async deleteBrandProfile(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/profiles/${id}`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete profile: ${res.status}, message: ${errorText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error(`Error deleting profile with id ${id}:`, error);
      throw error;
    }
  },
  
  async getAnalysisHistory(): Promise<AnalysisHistory[]> {
    try {
      const res = await fetch(`${BASE_URL}/analysis-history`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error("Error fetching analysis history:", error);
      throw error;
    }
  },
  
  async getAnalysisById(id: string): Promise<AnalysisResult | null> {
    try {
      const res = await fetch(`${BASE_URL}/analysis/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error(`Error fetching analysis with id ${id}:`, error);
      throw error;
    }
  },
  
  async saveAnalysisResult(result: Omit<AnalysisResult, "id">): Promise<AnalysisResult> {
    try {
      const res = await fetch(`${BASE_URL}/analysis`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(result),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      
      return res.json();
    } catch (error) {
      console.error("Error saving analysis result:", error);
      throw error;
    }
  },
};