import React, { useState, useRef, useCallback } from 'react';
import { Upload, ImagePlus, X, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useDropzone } from "react-dropzone";

interface UploadDesignProps {
  onImageSelected: (file: File, previewUrl: string) => void;
}

export const UploadDesign: React.FC<UploadDesignProps> = ({ onImageSelected }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);   // Reffering to the hidden file input i.e file

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setFileName(file.name);
    onImageSelected(file, previewUrl);
  }, [onImageSelected]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const clearSelection = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`relative flex flex-col items-center justify-center 
            border-2 border-dashed rounded-lg p-8 
            transition-all duration-300 ease-in-out 
            ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"} 
            ${previewImage ? "bg-muted/5" : "bg-muted/10 hover:bg-muted/5"} 
            cursor-pointer`}
        >
          {/* Hiding the file */}
          <input {...getInputProps()} ref={fileInputRef} accept="image/*" className="hidden" />
          {previewImage ? (
            <div className="w-full space-y-4">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-lg">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-auto w-full object-cover animate-fade-in"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full opacity-90"
                  onClick={clearSelection}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center animate-slide-up">
                <p className="text-sm font-medium text-foreground">{fileName}</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-muted-foreground">Ready for analysis</span>
                </div>
              </div>
            </div>
          ) : (
            <>
            
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <ImagePlus className="h-10 w-10 text-primary" />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground">Upload Package Design</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Drag and drop your design file, or click to browse
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button onClick={triggerFileInput} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span>Select File</span>
                  </Button>

                  <div className="text-xs text-muted-foreground">
                    Supports JPG, PNG, and PDF
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 flex items-center text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>Max file size: 10MB</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};