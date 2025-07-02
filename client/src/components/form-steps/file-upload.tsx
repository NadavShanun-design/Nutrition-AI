import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Loader2, Check } from 'lucide-react';
import { cn } from "@/lib/utils";

interface FileUploadFormProps {
  onBack: () => void;
  onSubmit: (file?: File) => void;
  isLoading?: boolean;
}

export function FileUploadForm({ onBack, onSubmit, isLoading }: FileUploadFormProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onSubmit(acceptedFiles[0]);
    }
  }, [onSubmit]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isLoading
  });

  const hasFile = acceptedFiles.length > 0;

  return (
    <div className="space-y-6">
      <Card
        {...getRootProps()}
        className={cn(
          "p-8 border-2 border-dashed transition-colors relative",
          isDragActive ? "border-primary bg-primary/5" : "border-muted",
          isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          hasFile ? "border-green-500 bg-green-50/10" : ""
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          {hasFile ? (
            <Check className="h-12 w-12 text-green-500" />
          ) : (
            <Upload className="h-12 w-12 text-muted-foreground" />
          )}
          <div className="text-center">
            {hasFile ? (
              <p className="text-sm text-green-600">
                PDF uploaded successfully: {acceptedFiles[0].name}
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Optional: Drop your DNA or blood test results (PDF)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max file size: 5MB
                </p>
              </>
            )}
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={() => onSubmit(acceptedFiles[0])}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Diet Plan'
          )}
        </Button>
      </div>
    </div>
  );
}