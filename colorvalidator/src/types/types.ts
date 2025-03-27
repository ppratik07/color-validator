// Color types
export interface ColorInfo {
    hex: string;
    rgb: {
      r: number;
      g: number;
      b: number;
    };
    name?: string;
  }
  
  export interface BrandColor extends ColorInfo {
    name: string;
    description?: string;
  }
  
  export interface ExtractedColor extends ColorInfo {
    percentage: number;
  }
  
  export interface ColorComparison {
    extractedColor: ExtractedColor;
    closestBrandColor: BrandColor;
    deltaE: number;
    isWithinTolerance: boolean;
  }
  
  // Analysis types
  export interface AnalysisResult {
    fileName: string;
    imageUrl: string;
    extractedColors: ExtractedColor[];
    comparisons: ColorComparison[];
    overallCompliance: number; // Percentage of colors that match within tolerance
    timestamp: string;
  }
  
  export interface AnalysisHistory {
    id: string;
    name: string;
    imageUrl: string;
    createdAt: string;
    overallCompliance: number;
    status: 'Compliant' | 'Needs Review' | 'Non-Compliant';
  }
  
  // Brand types
  export interface BrandProfile {
    id: string;
    name: string;
    colors: BrandColor[];
    tolerance: number; // DeltaE tolerance level for color matching
  }
  
  // User settings
  export interface UserSettings {
    defaultTolerance: number;
    defaultBrandProfile: string | null;
    darkMode: boolean;
  }