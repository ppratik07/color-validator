import {
  BrandProfile,
  AnalysisHistory,
  AnalysisResult,
  BrandColor,
} from "../types/types";

const BASE_URL = "http://localhost:3000";
export const DataService = {
  async getBrandProfiles(): Promise<BrandProfile[]> {
    const res = await fetch(`${BASE_URL}/profiles`);
    return res.json();
  },
  async getBrandProfileById(id: string): Promise<BrandProfile | null> {
    const res = await fetch(`${BASE_URL}/profiles/${id}`);
    return res.json();
  },
  async createBrandProfile(profile: Omit<BrandProfile, 'id'>): Promise<BrandProfile> {
    const res = await fetch(`${BASE_URL}/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    return res.json();
  },
  async updateBrandProfile(id: string, updates: Partial<BrandProfile>): Promise<BrandProfile | null> {
    const res = await fetch(`${BASE_URL}/profiles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
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
};
