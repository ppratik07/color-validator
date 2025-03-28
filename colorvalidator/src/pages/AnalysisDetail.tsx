import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button} from '../components/ui/button'
import { Download, Share, ArrowLeftRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header'
import { AnalysisResult } from '../types/types';
import { DataService } from '../services/DataService';
import AnalysisResults from '../components/AnalysisResults';


const AnalysisDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await DataService.getAnalysisById(id);
        
        if (!data) {
          setError('Analysis not found');
          return;
        }
        
        setAnalysis(data);
      } catch (err) {
        console.error('Error fetching analysis:', err);
        setError('Failed to load analysis data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalysis();
  }, [id]);
  
  const handleDownload = () => {
    // This would normally generate a PDF or image report
    toast.success('Report downloaded successfully');
  };
  
  const handleShare = () => {
    // This would normally open a sharing dialog
    toast.success('Sharing options opened');
  };
  
  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-muted/30">
        <Header 
          title="Analysis Details" 
          backLink="/history"
          backLabel="Back to History"
        />
        
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading analysis data...</p>
          </div>
        </div>
      </main>
    );
  }
  
  if (error || !analysis) {
    return (
      <main className="min-h-screen flex flex-col bg-muted/30">
        <Header 
          title="Analysis Details" 
          backLink="/history"
          backLabel="Back to History"
        />
        
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
            <p className="text-muted-foreground mb-6">{error || 'Failed to load analysis'}</p>
            <Link to="/history">
              <Button variant="default">Return to History</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen flex flex-col bg-muted/30">
      <Header 
        title={analysis.fileName} 
        subtitle={`Analyzed on ${new Date(analysis.timestamp).toLocaleString()}`}
        backLink="/history"
        backLabel="Back to History"
      />
      
      <div className="flex-grow p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img 
                src={analysis.imageUrl} 
                alt={analysis.fileName} 
                className="w-full h-[300px] sm:h-[400px] object-contain bg-muted/20 p-4" 
              />
              
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="bg-white/80 backdrop-blur hover:bg-white"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" />
                </Button>
                
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="bg-white/80 backdrop-blur hover:bg-white"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <AnalysisResults result={analysis} />
          
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/">
                <ArrowLeftRight className="h-4 w-4" />
                <span>Analyze Another Design</span>
              </Link>
            </Button>
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

export default AnalysisDetails;