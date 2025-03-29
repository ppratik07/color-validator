import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';
import { BrandProfile } from '../types/types';
import { DataService } from '../services/DataService';
import ColorCard from './ColorCard';

interface BrandProfileSelectorProps {
  onProfileSelected: (profile: BrandProfile) => void;
  selectedProfileId?: string;
}

const BrandProfileSelector: React.FC<BrandProfileSelectorProps> = ({ 
  onProfileSelected, 
  selectedProfileId 
}) => {
  const [profiles, setProfiles] = useState<BrandProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch brand profiles on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await DataService.getBrandProfiles();
        setProfiles(fetchedProfiles);
        
        // If selectedProfileId is provided, select that profile
        if (selectedProfileId) {
          const profile = fetchedProfiles.find(p => p.id === selectedProfileId);
          if (profile && profile.id !== selectedProfile?.id) {
            setSelectedProfile(profile);
            onProfileSelected(profile);
          }
        } else if (!selectedProfile && fetchedProfiles.length > 0) {
          // Select the first profile only if no profile is currently selected
          setSelectedProfile(fetchedProfiles[0]);
          onProfileSelected(fetchedProfiles[0]);
        }
      } catch (error) {
        console.error('Error fetching brand profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [selectedProfileId]);

  const handleProfileChange = (value: string) => {
    const profile = profiles.find(p => p.id === value);
    if (profile) {
      setSelectedProfile(profile);
      onProfileSelected(profile);
    }
  };

  if (loading) {
    return (
      <Card className="w-full bg-white shadow-sm">
        <CardContent className="p-6 flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (profiles.length === 0) {
    return (
      <Card className="w-full bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No brand profiles found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Brand Profile</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="space-y-6">
          <Select
            value={selectedProfile?.id || ''}
            onValueChange={handleProfileChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a brand profile" />
            </SelectTrigger>
            <SelectContent>
              {profiles.map(profile => (
                <SelectItem key={profile.id} value={profile.id}>
                  {profile.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedProfile && (
            <div className="animate-fade-in">
              <div className="mb-3">
                <h3 className="text-sm font-medium">Color Palette</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Color tolerance: ΔE {selectedProfile.tolerance.toFixed(1)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedProfile.colors.map((color, index) => (
                  <ColorCard 
                    key={`brand-${index}`}
                    color={color}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandProfileSelector;