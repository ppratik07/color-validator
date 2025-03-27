import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Check, AlertTriangle, X } from 'lucide-react';
import { AnalysisResult, ColorComparison } from '../types/types';
import ColorCard from './ColorCard';

interface AnalysisResultsProps {
  result: AnalysisResult;
  className?: string;
}

// Function to get description based on deltaE
const getDeltaEDescription = (deltaE: number) => {
  if (deltaE < 1) return "Perfect match";
  if (deltaE < 2) return "Almost indistinguishable";
  if (deltaE < 3.5) return "Acceptable match";
  if (deltaE < 5) return "Noticeable difference";
  return "Significant mismatch";
};

// Helper function to get status icon
const getStatusIcon = (isWithinTolerance: boolean) => {
  if (isWithinTolerance) {
    return <Check className="h-5 w-5 text-green-500" />;
  } else {
    return <X className="h-5 w-5 text-red-500" />;
  }
};

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="overflow-hidden bg-white shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg font-semibold">Analysis Results</CardTitle>
              <CardDescription>
                {new Date(result.timestamp).toLocaleString()}
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  Overall Compliance
                </span>
                <span className="text-2xl font-bold">
                  {result.overallCompliance}%
                </span>
              </div>
              
              <div className="h-12 w-12 rounded-full flex items-center justify-center">
                {result.overallCompliance >= 90 ? (
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                ) : result.overallCompliance >= 75 ? (
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Progress 
            value={result.overallCompliance} 
            className="h-2 mt-3"
            style={{
              backgroundColor: "hsl(var(--muted))",
              "--progress-color": result.overallCompliance >= 90 
                ? "hsl(142.1 76.2% 36.3%)" 
                : result.overallCompliance >= 75 
                  ? "hsl(47.9 95.8% 53.1%)" 
                  : "hsl(0 84.2% 60.2%)",
              "--progress-background": "var(--progress-color)",
            } as React.CSSProperties}
            aria-label={`Compliance: ${result.overallCompliance}%`}
          />
        </CardHeader>
        
        <Separator />
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium mb-3">Extracted Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {result.extractedColors.map((color, index) => (
                  <ColorCard 
                    key={`extracted-${index}`}
                    color={color}
                    showPercentage
                    size="sm"
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Color Analysis</h3>
              <div className="space-y-4">
                {result.comparisons.map((comparison, index) => (
                  <div key={`comparison-${index}`} className="animate-appear" style={{animationDelay: `${index * 0.1}s`}}>
                    <ComparisonRow comparison={comparison} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for each color comparison row
const ComparisonRow: React.FC<{ comparison: ColorComparison }> = ({ comparison }) => {
  const { extractedColor, closestBrandColor, deltaE, isWithinTolerance } = comparison;
  
  return (
    <div className="flex items-center p-3 rounded-lg border border-border bg-muted/5 hover:bg-muted/10 transition-colors">
      <div className="flex-shrink-0">
        {getStatusIcon(isWithinTolerance)}
      </div>
      
      <div className="ml-3 flex-grow">
        <div className="flex items-center">
          <div 
            className="w-5 h-5 rounded-full mr-2" 
            style={{ backgroundColor: extractedColor.hex }}
          />
          <span className="text-sm font-mono">{extractedColor.hex}</span>
          <div className="mx-2 text-muted-foreground">→</div>
          <div 
            className="w-5 h-5 rounded-full mr-2" 
            style={{ backgroundColor: closestBrandColor.hex }}
          />
          <span className="text-sm font-mono">{closestBrandColor.hex}</span>
          <span className="text-xs text-muted-foreground ml-2">
            ({closestBrandColor.name})
          </span>
        </div>
        
        <div className="flex items-center mt-1">
          <Badge 
            variant={isWithinTolerance ? "secondary" : "destructive"}
            className="text-xs"
          >
            ΔE: {deltaE.toFixed(1)}
          </Badge>
          <span className="text-xs text-muted-foreground ml-2">
            {getDeltaEDescription(deltaE)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;