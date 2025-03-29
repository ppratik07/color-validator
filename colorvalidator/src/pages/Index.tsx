import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Loader2, ScanSearch } from 'lucide-react';
import Header from '../components/Header';
import { UploadDesign } from '../components/UploadDesign';
import BrandProfileSelector from '../components/BrandProfileSelector';
import AnalysisResults from '../components/AnalysisResults';
import { BrandProfile, AnalysisResult, ColorComparison } from '../types/types';
import { mockExtractColorsFromImage, compareColors } from '../utils/colorUtils';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<BrandProfile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleImageSelected = (file: File, preview: string) => {
    setSelectedFile(file);
    setPreviewUrl(preview);
  };

  const handleProfileSelected = (profile: BrandProfile) => {
    setSelectedProfile(profile);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !previewUrl || !selectedProfile) {
      toast.error('Please upload an image and select a brand profile');
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalysisError(null);

      console.log("Starting color extraction from:", previewUrl);
      const extractedColors = await mockExtractColorsFromImage(previewUrl);

      if (!extractedColors || extractedColors.length === 0) {
        throw new Error('No colors could be extracted from the image');
      }

      console.log("Successfully extracted colors:", extractedColors);
      console.log("Selected brand profile:", selectedProfile);

      const comparisons: ColorComparison[] = extractedColors.map(color => {
        const comparison = compareColors(color, selectedProfile.colors, selectedProfile.tolerance);
        console.log(`Color comparison for ${color.hex}:`, comparison);
        return comparison;
      });

      const compliantColors = comparisons.filter(c => c.isWithinTolerance).length;
      const overallCompliance = comparisons.length > 0 
        ? Math.round((compliantColors / comparisons.length) * 100)
        : 0;

      console.log(`Compliance: ${compliantColors} out of ${comparisons.length} colors (${overallCompliance}%)`);

      const result: AnalysisResult = {
        fileName: selectedFile.name,
        imageUrl: previewUrl,
        extractedColors,
        comparisons,
        overallCompliance,
        timestamp: new Date().toISOString()
      };

      setAnalysisResult(result);

      if (overallCompliance >= 80) {
        toast.success(`Analysis complete - ${overallCompliance}% color compliance`);
      } else if (overallCompliance >= 50) {
        toast.warning(`Analysis complete - ${overallCompliance}% color compliance`);
      } else {
        toast.error(`Analysis complete - Only ${overallCompliance}% color compliance`);
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysisError(error instanceof Error ? error.message : 'Failed to analyze image');
      toast.error('Failed to analyze image: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    console.log("Analysis result updated:", analysisResult);
  }, [analysisResult]);

  useEffect(() => {
    console.log("Selected profile updated:", selectedProfile);
  }, [selectedProfile]);

  return (
    <main className="min-h-screen flex flex-col bg-muted/30 px-4 sm:px-8">
      <Header 
        title="Smart Package Color Validator" 
        subtitle="Upload a design and analyze color compliance"
      />

      <div className="flex-grow py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <UploadDesign onImageSelected={handleImageSelected} />

              <BrandProfileSelector 
                onProfileSelected={handleProfileSelected} 
                selectedProfileId={selectedProfile?.id} 
              />

              <div className="flex justify-center">
                <Button 
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={!selectedFile || !selectedProfile || isAnalyzing}
                  className="w-full sm:w-auto min-w-[200px] text-sm sm:text-base gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <ScanSearch className="h-5 w-5" />
                      <span>Analyze Colors</span>
                    </>
                  )}
                </Button>
              </div>

              {analysisError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  <p className="font-medium">Error analyzing image:</p>
                  <p>{analysisError}</p>
                </div>
              )}
            </div>

            <div>
              {analysisResult ? (
                <AnalysisResults result={analysisResult} />
              ) : (
                <div className="h-full flex items-center justify-center p-8 bg-white border border-border rounded-lg">
                  <div className="text-center max-w-md">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <ScanSearch className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Analysis Yet</h3>
                    <p className="text-muted-foreground text-sm">
                      Upload a package design and select a brand profile, then click "Analyze Colors" to get started.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 px-6 border-t border-border bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Smart Package Color Validator
          </p>
          <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
