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
};
