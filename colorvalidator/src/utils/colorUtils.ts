import { ColorInfo, ExtractedColor, BrandColor, ColorComparison } from '../types/types';

/**
 * Converts a hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove the # if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
}

/**
 * Converts RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Converts RGB to LAB color space
 * LAB is better for calculating perceptual differences between colors
 */
export function rgbToLab(rgb: { r: number; g: number; b: number }): { l: number; a: number; b: number } {
  // First convert RGB to XYZ
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  // Apply gamma correction
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Scale values
  r = r * 100;
  g = g * 100;
  b = b * 100;

  // Observer= 2°, Illuminant= D65
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  // Convert XYZ to Lab
  const xRef = 95.047;
  const yRef = 100.000;
  const zRef = 108.883;

  let x1 = x / xRef;
  let y1 = y / yRef;
  let z1 = z / zRef;

  x1 = x1 > 0.008856 ? Math.pow(x1, 1/3) : (7.787 * x1) + (16 / 116);
  y1 = y1 > 0.008856 ? Math.pow(y1, 1/3) : (7.787 * y1) + (16 / 116);
  z1 = z1 > 0.008856 ? Math.pow(z1, 1/3) : (7.787 * z1) + (16 / 116);

  const l = (116 * y1) - 16;
  const a = 500 * (x1 - y1);
  const b1 = 200 * (y1 - z1);

  return { l, a, b: b1 };
}

/**
 * Calculates the Delta E (CIE 2000) between two colors
 * This is a more accurate implementation of Delta E calculation
 */
export function calculateDeltaE(color1: ColorInfo, color2: ColorInfo): number {
  const lab1 = rgbToLab(color1.rgb);
  const lab2 = rgbToLab(color2.rgb);
  
  // Calculate Delta E using CIE2000 formula (simplified version)
  const kL = 1;
  const kC = 1;
  const kH = 1;
  
  const L1 = lab1.l;
  const a1 = lab1.a;
  const b1 = lab1.b;
  
  const L2 = lab2.l;
  const a2 = lab2.a;
  const b2 = lab2.b;
  
  // Calculate C1, C2 (Chroma)
  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  
  // Calculate mean C
  const Cmean = (C1 + C2) / 2;
  
  // Calculate G
  const G = 0.5 * (1 - Math.sqrt(Math.pow(Cmean, 7) / (Math.pow(Cmean, 7) + Math.pow(25, 7))));
  
  // Calculate a' (adjusted a values)
  const a1Prime = a1 * (1 + G);
  const a2Prime = a2 * (1 + G);
  
  // Calculate C' (adjusted Chroma values)
  const C1Prime = Math.sqrt(a1Prime * a1Prime + b1 * b1);
  const C2Prime = Math.sqrt(a2Prime * a2Prime + b2 * b2);
  
  // Calculate h' (adjusted hue angles)
  let h1Prime = Math.atan2(b1, a1Prime) * 180 / Math.PI;
  if (h1Prime < 0) h1Prime += 360;
  
  let h2Prime = Math.atan2(b2, a2Prime) * 180 / Math.PI;
  if (h2Prime < 0) h2Prime += 360;
  
  // Calculate ΔL', ΔC', ΔH'
  const deltaLPrime = L2 - L1;
  const deltaCPrime = C2Prime - C1Prime;
  
  let deltahPrime;
  if (C1Prime * C2Prime === 0) {
    deltahPrime = 0;
  } else if (Math.abs(h2Prime - h1Prime) <= 180) {
    deltahPrime = h2Prime - h1Prime;
  } else if (h2Prime - h1Prime > 180) {
    deltahPrime = h2Prime - h1Prime - 360;
  } else {
    deltahPrime = h2Prime - h1Prime + 360;
  }
  
  const deltaHPrime = 2 * Math.sqrt(C1Prime * C2Prime) * Math.sin(deltahPrime * Math.PI / 360);
  
  // Calculate CIEDE2000 components
  const LPrimeMean = (L1 + L2) / 2;
  const CPrimeMean = (C1Prime + C2Prime) / 2;
  
  let hPrimeMean;
  if (C1Prime * C2Prime === 0) {
    hPrimeMean = h1Prime + h2Prime;
  } else if (Math.abs(h1Prime - h2Prime) <= 180) {
    hPrimeMean = (h1Prime + h2Prime) / 2;
  } else if (h1Prime + h2Prime < 360) {
    hPrimeMean = (h1Prime + h2Prime + 360) / 2;
  } else {
    hPrimeMean = (h1Prime + h2Prime - 360) / 2;
  }
  
  const T = 1 - 0.17 * Math.cos((hPrimeMean - 30) * Math.PI / 180)
             + 0.24 * Math.cos((2 * hPrimeMean) * Math.PI / 180)
             + 0.32 * Math.cos((3 * hPrimeMean + 6) * Math.PI / 180)
             - 0.20 * Math.cos((4 * hPrimeMean - 63) * Math.PI / 180);
  
  const SL = 1 + (0.015 * Math.pow(LPrimeMean - 50, 2)) / Math.sqrt(20 + Math.pow(LPrimeMean - 50, 2));
  const SC = 1 + 0.045 * CPrimeMean;
  const SH = 1 + 0.015 * CPrimeMean * T;
  
  const RT = -2 * Math.sqrt(Math.pow(CPrimeMean, 7) / (Math.pow(CPrimeMean, 7) + Math.pow(25, 7)))
            * Math.sin((60 * Math.exp(-Math.pow((hPrimeMean - 275) / 25, 2))) * Math.PI / 180);
  
  // Calculate the final Delta E value
  const deltaE = Math.sqrt(
    Math.pow(deltaLPrime / (kL * SL), 2) +
    Math.pow(deltaCPrime / (kC * SC), 2) +
    Math.pow(deltaHPrime / (kH * SH), 2) +
    RT * (deltaCPrime / (kC * SC)) * (deltaHPrime / (kH * SH))
  );
  
  return deltaE;
}

/**
 * Find the closest brand color to an extracted color
 * This function also considers color perceived importance based on area coverage (percentage)
 */
export function findClosestBrandColor(
  extractedColor: ExtractedColor, 
  brandColors: BrandColor[]
): { brandColor: BrandColor; deltaE: number } {
  let closestColor = brandColors[0];
  let smallestDeltaE = calculateDeltaE(extractedColor, brandColors[0]);

  brandColors.forEach(brandColor => {
    const deltaE = calculateDeltaE(extractedColor, brandColor);
    if (deltaE < smallestDeltaE) {
      smallestDeltaE = deltaE;
      closestColor = brandColor;
    }
  });

  return { brandColor: closestColor, deltaE: smallestDeltaE };
}

/**
 * Determines if a color is within tolerance of another
 * Adjusts tolerance based on color perception and importance
 */
export function isWithinTolerance(deltaE: number, tolerance: number): boolean {
  // More forgiving tolerance for less noticeable color differences
  // DeltaE of 2.0 is generally considered a just noticeable difference
  return deltaE <= tolerance;
}

/**
 * Creates a comparison between an extracted color and the closest brand color
 */
export function compareColors(
  extractedColor: ExtractedColor, 
  brandColors: BrandColor[], 
  tolerance: number
): ColorComparison {
  const { brandColor, deltaE } = findClosestBrandColor(extractedColor, brandColors);
  
  // Adjust tolerance based on color's importance (percentage)
  // Colors that cover more area get stricter tolerance
  const adjustedTolerance = tolerance * (extractedColor.percentage >= 30 ? 0.9 : 1.1);
  
  return {
    extractedColor,
    closestBrandColor: brandColor,
    deltaE,
    isWithinTolerance: isWithinTolerance(deltaE, adjustedTolerance)
  };
}

/**
 * Determines if a color is light or dark for choosing contrasting text
 */
export function isColorLight(color: ColorInfo): boolean {
  const { r, g, b } = color.rgb;
  // Calculate the perceptive luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

/**
 * Returns a contrasting text color (black or white) based on the background color
 */
export function getContrastingTextColor(backgroundColor: ColorInfo): string {
  return isColorLight(backgroundColor) ? '#000000' : '#FFFFFF';
}

/**
 * Groups similar colors together and calculates their percentage
 */
function groupSimilarColors(colors: Array<{r: number; g: number; b: number}>, threshold: number = 20): Array<{color: {r: number; g: number; b: number}, count: number}> {
  const result: Array<{color: {r: number; g: number; b: number}, count: number}> = [];
  
  for (const color of colors) {
    let found = false;
    
    for (const group of result) {
      const dr = Math.abs(color.r - group.color.r);
      const dg = Math.abs(color.g - group.color.g);
      const db = Math.abs(color.b - group.color.b);
      
      // If colors are similar, group them
      if (dr + dg + db < threshold) {
        // Update the group's color to the weighted average
        const totalCount = group.count + 1;
        group.color.r = Math.round((group.color.r * group.count + color.r) / totalCount);
        group.color.g = Math.round((group.color.g * group.count + color.g) / totalCount);
        group.color.b = Math.round((group.color.b * group.count + color.b) / totalCount);
        group.count++;
        found = true;
        break;
      }
    }
    
    if (!found) {
      result.push({
        color: { ...color },
        count: 1
      });
    }
  }
  
  return result;
}

/**
 * Extract colors from an image using Canvas
 */
export function extractColorsFromImage(imageUrl: string): Promise<ExtractedColor[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      try {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Set canvas size to full image size for better color extraction
        const maxSize = 200; // Increased from 100 for better sampling
        const ratio = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Get pixel data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Extract colors from pixels
        const colors: Array<{r: number; g: number; b: number}> = [];
        for (let i = 0; i < data.length; i += 4) {
          // Skip transparent or near-transparent pixels
          if (data[i + 3] < 200) continue;
          
          colors.push({
            r: data[i],
            g: data[i + 1],
            b: data[i + 2]
          });
        }
        
        // Group similar colors and get their percentages
        // Lower threshold (25 instead of 30) to detect more subtle color differences
        const groupedColors = groupSimilarColors(colors, 25); 
        
        // Sort by count (most frequent first)
        groupedColors.sort((a, b) => b.count - a.count);
        
        // Take top 5 colors (increased from 4 to get more color diversity)
        const topColors = groupedColors.slice(0, 5);
        
        // Convert to ExtractedColor format with percentages
        const totalCount = topColors.reduce((sum, group) => sum + group.count, 0);
        const extractedColors: ExtractedColor[] = topColors.map(group => {
          const { r, g, b } = group.color;
          const percentage = Math.round((group.count / totalCount) * 100);
          
          return {
            hex: rgbToHex(r, g, b),
            rgb: { r, g, b },
            percentage
          };
        });
        
        console.log("Extracted colors:", extractedColors);
        resolve(extractedColors);
      } catch (error) {
        console.error('Error extracting colors:', error);
        reject(error);
      }
    };
    
    img.onerror = (error) => {
      console.error('Error loading image:', error);
      reject(new Error('Failed to load image'));
    };
    
    img.src = imageUrl;
  });
}

/**
 * For backward compatibility and testing, we keep the mock function
 * but make it call the real implementation
 */
export function mockExtractColorsFromImage(imageUrl: string): Promise<ExtractedColor[]> {
  return extractColorsFromImage(imageUrl);
}