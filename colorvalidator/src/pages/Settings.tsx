import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '../components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Slider } from '../components/ui/slider';
import { 
  Sliders, 
  PlusCircle, 
  Trash2,
  Save,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import ColorCard from '../components/ColorCard';
import { BrandProfile, ColorInfo } from '../types/types';
import { DataService } from '../services/DataService';

const Settings = () => {
  // We'll start with the brand profiles tab by default
  const [activeTab, setActiveTab] = useState('profiles');
  const [profiles, setProfiles] = useState<BrandProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for creating/editing profiles
  const [editingProfile, setEditingProfile] = useState<Partial<BrandProfile> | null>(null);
  const [newColor, setNewColor] = useState<ColorInfo>({ hex: '#000000', rgb: {r: 0, g: 0, b: 0} });
  const [colorName, setColorName] = useState('');
  
  // Fetch profiles when the component mounts
  React.useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await DataService.getBrandProfiles();
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching brand profiles:', error);
        toast.error('Failed to load brand profiles');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfiles();
  }, []);
  
  const createNewProfile = () => {
    setEditingProfile({
      name: '',
      tolerance: 3.0,
      colors: []
    });
  };
  
  const handleAddColor = () => {
    if (!colorName.trim()) {
      toast.error('Please enter a color name');
      return;
    }
    
    if (!editingProfile) return;
    
    const newBrandColor = {
      name: colorName,
      hex: newColor.hex,
      rgb: { ...newColor.rgb }
    };
    
    setEditingProfile({
      ...editingProfile,
      colors: [...(editingProfile.colors || []), newBrandColor]
    });
    
    // Reset the form
    setColorName('');
    setNewColor({ hex: '#000000', rgb: {r: 0, g: 0, b: 0} });
  };
  
  const handleRemoveColor = (index: number) => {
    if (!editingProfile || !editingProfile.colors) return;
    
    const updatedColors = [...editingProfile.colors];
    updatedColors.splice(index, 1);
    
    setEditingProfile({
      ...editingProfile,
      colors: updatedColors
    });
  };
  
  const handleColorHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    // Simple regex to validate hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      // Convert hex to RGB
      const r = parseInt(hex.substring(1, 3), 16);
      const g = parseInt(hex.substring(3, 5), 16);
      const b = parseInt(hex.substring(5, 7), 16);
      
      setNewColor({
        hex,
        rgb: { r, g, b }
      });
    } else {
      setNewColor({
        ...newColor,
        hex
      });
    }
  };
  
  const handleSaveProfile = async () => {
    if (!editingProfile || !editingProfile.name || !editingProfile.colors || editingProfile.colors.length === 0) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    try {
      if (editingProfile.id) {
        // Update existing profile
        await DataService.updateBrandProfile(editingProfile.id, editingProfile);
        toast.success('Profile updated successfully');
      } else {
        // Create new profile
        await DataService.createBrandProfile(editingProfile as Omit<BrandProfile, 'id'>);
        toast.success('Profile created successfully');
      }
      
      // Refresh the profiles list
      const updatedProfiles = await DataService.getBrandProfiles();
      setProfiles(updatedProfiles);
      
      // Reset the editing state
      setEditingProfile(null);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    }
  };
  
  return (
    <main className="min-h-screen flex flex-col bg-muted/30">
      <Header 
        title="Settings" 
        subtitle="Configure app settings and brand profiles"
        backLink="/"
        backLabel="Back to Analyzer"
      />
      
      <div className="flex-grow p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profiles" className="flex items-center gap-2">
                <Sliders className="h-4 w-4" />
                <span>Brand Profiles</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>About</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profiles" className="space-y-6">
              {editingProfile ? (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingProfile.id ? 'Edit Profile' : 'Create New Profile'}
                    </CardTitle>
                    <CardDescription>
                      Configure a brand profile with your official colors and tolerance settings
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="profileName">Profile Name</Label>
                      <Input
                        id="profileName"
                        placeholder="e.g., Brand Name"
                        value={editingProfile.name || ''}
                        onChange={(e) => setEditingProfile({...editingProfile, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tolerance">Color Tolerance (ΔE)</Label>
                        <span className="text-sm">{editingProfile.tolerance?.toFixed(1) || '3.0'}</span>
                      </div>
                      
                      <Slider
                        id="tolerance"
                        min={0.5}
                        max={10}
                        step={0.5}
                        value={[editingProfile.tolerance || 3.0]}
                        onValueChange={(value) => setEditingProfile({...editingProfile, tolerance: value[0]})}
                      />
                      
                      <p className="text-xs text-muted-foreground">
                        Recommended: 2.0 for strict matching, 5.0 for more flexibility
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Brand Colors</h3>
                      
                      {editingProfile.colors && editingProfile.colors.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                          {editingProfile.colors.map((color, index) => (
                            <div key={index} className="relative group">
                              <ColorCard color={color} size="sm" />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveColor(index)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 border border-dashed rounded-lg mb-6">
                          <p className="text-muted-foreground">No colors added yet</p>
                        </div>
                      )}
                      
                      <div className="space-y-4 bg-muted/20 p-4 rounded-lg">
                        <h4 className="text-sm font-medium">Add New Color</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="colorName">Color Name</Label>
                            <Input
                              id="colorName"
                              placeholder="e.g., Brand Blue"
                              value={colorName}
                              onChange={(e) => setColorName(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="colorHex">Color Hex Code</Label>
                            <div className="flex items-center gap-3">
                              <Input
                                id="colorHex"
                                placeholder="#000000"
                                value={newColor.hex}
                                onChange={handleColorHexChange}
                              />
                              <div 
                                className="h-9 w-9 rounded border"
                                style={{ backgroundColor: newColor.hex }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="secondary"
                          className="w-full sm:w-auto"
                          onClick={handleAddColor}
                        >
                          Add Color
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setEditingProfile(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveProfile}
                        className="gap-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Profile</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="flex justify-end mb-4">
                    <Button onClick={createNewProfile} className="gap-2">
                      <PlusCircle className="h-4 w-4" />
                      <span>New Profile</span>
                    </Button>
                  </div>
                  
                  {loading ? (
                    <Card className="flex justify-center items-center py-16">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    </Card>
                  ) : profiles.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <Sliders className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No Brand Profiles</h3>
                        <p className="text-muted-foreground text-center max-w-md mt-1 mb-6">
                          Create your first brand profile to start validating package colors against your brand guidelines.
                        </p>
                        <Button onClick={createNewProfile} className="gap-2">
                          <PlusCircle className="h-4 w-4" />
                          <span>Create Your First Profile</span>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {profiles.map((profile) => (
                        <Card key={profile.id} className="overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{profile.name}</CardTitle>
                                <CardDescription>
                                  Tolerance: ΔE {profile.tolerance.toFixed(1)}
                                </CardDescription>
                              </div>
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingProfile(profile)}
                              >
                                Edit
                              </Button>
                            </div>
                          </CardHeader>
                          
                          <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {profile.colors.map((color, index) => (
                                <ColorCard 
                                  key={index}
                                  color={color}
                                  size="sm"
                                />
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>About Smart Package Color Validator</CardTitle>
                  <CardDescription>
                    Learn more about this application and how to integrate with backend services
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Application Version</h3>
                    <p className="text-sm text-muted-foreground">v1.0.0</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Database Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      This application can be connected to a PostgreSQL database using Prisma ORM.
                      Check the <code className="bg-muted px-1 py-0.5 rounded text-xs">src/services/mockDataService.ts</code> file
                      for implementation details and database schema suggestions.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">API Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      For backend integration, you can implement the following API endpoints:
                    </p>
                    
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-4 mt-2">
                      <li><code className="font-mono text-xs">/api/brands</code> - CRUD operations for brand profiles</li>
                      <li><code className="font-mono text-xs">/api/analysis</code> - Create and retrieve analysis results</li>
                      <li><code className="font-mono text-xs">/api/extract-colors</code> - Extract colors from uploaded images</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Credits</h3>
                    <p className="text-sm text-muted-foreground">
                      Created with React, TypeScript, and Tailwind CSS.
                      Design inspired by modern, minimalist principles.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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

export default Settings;