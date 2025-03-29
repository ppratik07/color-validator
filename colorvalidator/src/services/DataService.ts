import { BASE_URL } from "../config";
import { BrandProfile, AnalysisHistory, AnalysisResult } from "../types/types";

export const DataService = {
  async getBrandProfiles(): Promise<BrandProfile[]> {
    const res = await fetch(`${BASE_URL}/profiles`);
    return res.json();
  },
  async getBrandProfileById(id: string): Promise<BrandProfile | null> {
    const res = await fetch(`${BASE_URL}/profiles/${id}`);
    return res.json();
  },
  async createBrandProfile(
    profile: Omit<BrandProfile, "id">
  ): Promise<BrandProfile> {
    try {
      const res = await fetch(`${BASE_URL}/profiles`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(profile),
      });
      
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorData}`);
      }
      
      console.log('Response:', res);
      return res.json();
    } catch (error) {
      console.error('Error in createBrandProfile:', error);
      throw error;
    }
  },
  async updateBrandProfile(
    id: string,
    updates: Partial<BrandProfile>
  ): Promise<BrandProfile | null> {
    const res = await fetch(`${BASE_URL}/profiles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
  
    if (!res.ok) {
      throw new Error(`Failed to update profile: ${res.statusText}`);
    }
  
    return res.json();
  },
  async deleteBrandProfile(id: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/profiles/${id}`, { method: "DELETE" });
    return res.json();
  },
  async getAnalysisHistory(): Promise<AnalysisHistory[]> {
    const res = await fetch(`${BASE_URL}/analysis-history`);
    return res.json();
  },
  async getAnalysisById(id: string): Promise<AnalysisResult | null> {
    const res = await fetch(`${BASE_URL}/analysis/${id}`);
    return res.json();
  },
  async saveAnalysisResult(
    result: Omit<AnalysisResult, "id">
  ): Promise<AnalysisResult> {
    const res = await fetch(`${BASE_URL}/analysis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
    return res.json();
  },
};
