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
    const res = await fetch('http://localhost/3000/profiles', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    return res.json();
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
