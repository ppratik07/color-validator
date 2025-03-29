import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Calendar, 
  Check, 
  AlertTriangle, 
  X, 
  Search, 
  ChevronRight 
} from 'lucide-react';
import { Separator } from '../components/ui/separator';
import { AnalysisHistory } from '../types/types';
import { DataService } from '../services/DataService';
import Header from '../components/Header';

const History = () => {
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<AnalysisHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await DataService.getAnalysisHistory();
        setHistory(data);
        setFilteredHistory(data);
      } catch (error) {
        console.error('Error fetching analysis history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredHistory(history);
      return;
    }

    const filtered = history.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHistory(filtered);
  }, [searchQuery, history]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'Needs Review':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'Non-Compliant':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant':
        return "bg-green-100 text-green-800";
      case 'Needs Review':
        return "bg-yellow-100 text-yellow-800";
      case 'Non-Compliant':
        return "bg-red-100 text-red-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-muted/30 px-4 sm:px-6">
      <Header 
        title="Analysis History" 
        subtitle="View and manage your past color analyses"
        backLink="/"
        backLabel="Back to Analyzer"
      />

      <div className="flex-grow">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Recent Analyses</h2>

                <div className="relative w-full sm:w-[250px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search analyses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : filteredHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted" />
                  <h3 className="text-lg font-medium">No analyses found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery.trim() !== '' 
                      ? `No results match "${searchQuery}"`
                      : "You haven't analyzed any designs yet"}
                  </p>

                  <Button asChild className="mt-4">
                    <Link to="/">Start Analyzing</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredHistory.map((item, index) => (
                    <div key={item.id} className="animate-appear">
                      <Link to={`/analysis/${item.id}`}>
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-lg border border-border hover:bg-muted/10 transition-all">
                          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg overflow-hidden">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-grow">
                            <h3 className="font-medium text-foreground line-clamp-1">{item.name}</h3>

                            <div className="flex flex-col sm:flex-row justify-between sm:items-center text-sm mt-1">
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1.5" />
                                <span>{formatDate(item.createdAt)}</span>
                              </div>

                              <div className="flex items-center mt-1 sm:mt-0">
                                <div className={`text-xs rounded-full px-2 py-0.5 flex items-center gap-1 ${getStatusColor(item.status)}`}>
                                  {getStatusIcon(item.status)}
                                  <span>{item.status}</span>
                                </div>
                                <ChevronRight className="h-5 w-5 ml-2 text-muted-foreground sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {index < filteredHistory.length - 1 && (
                        <Separator className="my-3" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        Smart Package Color Validator © {new Date().getFullYear()}
      </footer>
    </main>
  );
};

export default History;
