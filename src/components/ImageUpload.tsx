import { useState, useRef, useCallback } from "react";
import { Upload, Camera, Image as ImageIcon, X, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface DetectionResult {
  disease: string;
  confidence: number;
  isHealthy: boolean;
}

const diseaseDatabase: Record<string, { description: string; remedies: string[] }> = {
  "Northern Leaf Blight": {
    description: "Caused by the fungus Exserohilum turcicum. Shows as long, cigar-shaped gray-green lesions on leaves.",
    remedies: [
      "Apply fungicides containing azoxystrobin or propiconazole",
      "Remove and destroy infected plant debris",
      "Use resistant maize varieties next season",
      "Ensure proper plant spacing for air circulation",
    ],
  },
  "Common Rust": {
    description: "Caused by Puccinia sorghi fungus. Appears as small, circular to elongate cinnamon-brown pustules on leaves.",
    remedies: [
      "Apply foliar fungicides if infection is severe",
      "Plant rust-resistant hybrid varieties",
      "Early planting can help avoid peak rust periods",
      "Monitor fields regularly for early detection",
    ],
  },
  "Gray Leaf Spot": {
    description: "Caused by Cercospora zeae-maydis. Shows as rectangular, grayish-tan lesions between leaf veins.",
    remedies: [
      "Rotate crops to break disease cycle",
      "Apply strobilurin or triazole fungicides",
      "Avoid continuous maize cropping",
      "Use tolerant hybrids in affected areas",
    ],
  },
  "Healthy": {
    description: "Your maize plant appears healthy with no visible signs of disease.",
    remedies: [
      "Continue regular monitoring of your crops",
      "Maintain proper irrigation practices",
      "Apply balanced fertilizers as needed",
      "Keep the field free from weeds",
    ],
  },
};

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in production, this would call an actual ML model)
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    // Mock result - randomly select a disease for demo
    const diseases = Object.keys(diseaseDatabase);
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    const isHealthy = randomDisease === "Healthy";
    
    setResult({
      disease: randomDisease,
      confidence: isHealthy ? 98 : 75 + Math.floor(Math.random() * 20),
      isHealthy,
    });
    
    setIsAnalyzing(false);
    
    toast({
      title: isHealthy ? "Good news!" : "Analysis Complete",
      description: isHealthy 
        ? "Your maize plant appears to be healthy."
        : `Detected: ${randomDisease}`,
    });
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const diseaseInfo = result ? diseaseDatabase[result.disease] : null;

  return (
    <section id="detect" className="py-16 md:py-24 bg-gradient-nature">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Detect Maize Disease
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a clear photo of the affected maize leaf. Our AI will analyze it and provide accurate disease detection.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <div className="space-y-6">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                  isDragging
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : selectedImage
                    ? "border-muted bg-card"
                    : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected maize leaf"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={resetUpload}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-foreground font-medium mb-2">
                      Drop your image here
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse files
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!selectedImage ? (
                  <>
                    <Button
                      variant="upload"
                      className="flex-1"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Photo
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        toast({
                          title: "Camera Access",
                          description: "Camera feature coming soon!",
                        });
                      }}
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Use Camera
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full"
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Tips */}
              <div className="bg-muted rounded-xl p-4">
                <h4 className="font-medium text-foreground mb-2">Tips for best results:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use natural daylight when taking the photo</li>
                  <li>• Focus on the affected area of the leaf</li>
                  <li>• Avoid blurry or dark images</li>
                  <li>• Include both healthy and affected parts if possible</li>
                </ul>
              </div>
            </div>

            {/* Results Area */}
            <div id="remedies">
              {result ? (
                <div className="bg-card rounded-2xl p-6 shadow-elevated animate-scale-in">
                  {/* Result Header */}
                  <div className={`flex items-start gap-4 p-4 rounded-xl mb-6 ${
                    result.isHealthy ? "bg-primary/10" : "bg-secondary/10"
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      result.isHealthy ? "bg-primary" : "bg-secondary"
                    }`}>
                      {result.isHealthy ? (
                        <CheckCircle className="w-6 h-6 text-primary-foreground" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-secondary-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        {result.disease}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Confidence: {result.confidence}%
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {diseaseInfo && (
                    <>
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2">About</h4>
                        <p className="text-muted-foreground">{diseaseInfo.description}</p>
                      </div>

                      {/* Remedies */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">
                          {result.isHealthy ? "Maintenance Tips" : "Recommended Remedies"}
                        </h4>
                        <ul className="space-y-3">
                          {diseaseInfo.remedies.map((remedy, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                            >
                              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-foreground text-sm">{remedy}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Upload to see results
                  </h3>
                  <p className="text-muted-foreground max-w-xs">
                    Disease detection results and treatment recommendations will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;
