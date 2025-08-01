import { useState, useRef } from "react";
import { Upload, FileText, Settings, BarChart3, Download, Save, Play, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileUploadPanel } from "@/components/data-processing/FileUploadPanel";
import { SchemaMappingInterface } from "@/components/data-processing/SchemaMappingInterface";
import { DataCleaningEngine } from "@/components/data-processing/DataCleaningEngine";
import { WeightApplication } from "@/components/data-processing/WeightApplication";
import { ReportGeneration } from "@/components/data-processing/ReportGeneration";
import { DataVisualization } from "@/components/data-processing/DataVisualization";

export default function DataProcessing() {
  const [currentStep, setCurrentStep] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [schemaMapping, setSchemaMapping] = useState<Record<string, string>>({});
  const [cleaningOptions, setCleaningOptions] = useState({
    missingValueMethod: "mean",
    outlierDetection: "iqr",
    enableValidation: true
  });
  const [weights, setWeights] = useState<Record<string, number>>({});
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentStep("mapping");
    toast.success(`File "${file.name}" uploaded successfully`);
  };

  const handleSchemaMap = (mapping: Record<string, string>) => {
    setSchemaMapping(mapping);
    setCurrentStep("cleaning");
    toast.success("Schema mapping configured");
  };

  const handleDataCleaning = async (options: any) => {
    setCleaningOptions(options);
    setProcessingProgress(25);
    
    // Simulate processing
    setTimeout(() => {
      setProcessingProgress(100);
      setCurrentStep("weights");
      toast.success("Data cleaning completed");
    }, 2000);
  };

  const handleWeightsApply = (appliedWeights: Record<string, number>) => {
    setWeights(appliedWeights);
    setCurrentStep("visualization");
    toast.success("Weights applied successfully");
  };

  const quickActions = [
    {
      label: "Validate & Preview",
      icon: Eye,
      action: () => {
        toast.info("Validating data...");
        setCurrentStep("mapping");
      },
      variant: "outline" as const
    },
    {
      label: "Process & Clean",
      icon: Play,
      action: () => {
        toast.info("Processing data...");
        setCurrentStep("cleaning");
      },
      variant: "default" as const
    },
    {
      label: "Apply Weights",
      icon: BarChart3,
      action: () => {
        toast.info("Applying weights...");
        setCurrentStep("weights");
      },
      variant: "outline" as const
    },
    {
      label: "Generate Report",
      icon: FileText,
      action: () => {
        toast.success("Report generated successfully");
      },
      variant: "secondary" as const
    },
    {
      label: "Download Logs",
      icon: Download,
      action: () => {
        const logs = "Processing completed successfully\n32 rows imputed using KNN\n5 outliers detected and corrected";
        const blob = new Blob([logs], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "processing-logs.txt";
        a.click();
        toast.success("Processing logs downloaded");
      },
      variant: "outline" as const
    },
    {
      label: "Save to DB",
      icon: Save,
      action: () => {
        toast.success("Data saved to database");
      },
      variant: "outline" as const
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Upload & Process Data</h1>
          <p className="text-muted-foreground">
            Bulk survey and field data ingestion, cleaning, and reporting for government administrators
          </p>
        </div>
        <Badge variant="secondary" className="w-fit">
          Admin Access Required
        </Badge>
      </div>

      {/* Progress Indicator */}
      {processingProgress > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing Data</span>
                <span>{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common data processing operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                onClick={action.action}
                className="flex flex-col h-auto py-3 px-2 text-xs"
              >
                <action.icon className="w-4 h-4 mb-1" />
                <span className="text-center leading-tight">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Processing Interface */}
      <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="mapping">Schema</TabsTrigger>
          <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
          <TabsTrigger value="weights">Weights</TabsTrigger>
          <TabsTrigger value="visualization">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <FileUploadPanel onFileUpload={handleFileUpload} />
        </TabsContent>

        <TabsContent value="mapping" className="space-y-6">
          <SchemaMappingInterface 
            file={uploadedFile}
            onMappingComplete={handleSchemaMap}
          />
        </TabsContent>

        <TabsContent value="cleaning" className="space-y-6">
          <DataCleaningEngine
            data={processedData}
            onCleaningComplete={handleDataCleaning}
          />
        </TabsContent>

        <TabsContent value="weights" className="space-y-6">
          <WeightApplication
            data={processedData}
            onWeightsApply={handleWeightsApply}
          />
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DataVisualization data={processedData} />
            <ReportGeneration 
              data={processedData}
              mapping={schemaMapping}
              cleaningOptions={cleaningOptions}
              weights={weights}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}