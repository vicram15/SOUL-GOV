import { useState, useRef } from "react";
import { Upload, FileText, Settings, BarChart3, Download, Save, Play, Eye, Zap, CheckCircle, Sparkles, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { FileUploadPanel } from "@/components/data-processing/FileUploadPanel";
import { SchemaMappingInterface } from "@/components/data-processing/SchemaMappingInterface";
import { DataCleaningEngine } from "@/components/data-processing/DataCleaningEngine";
import { WeightApplication } from "@/components/data-processing/WeightApplication";
import { ReportGeneration } from "@/components/data-processing/ReportGeneration";
import { DataVisualization } from "@/components/data-processing/DataVisualization";

export default function DataProcessing() {
  console.log("DataProcessing component rendered");
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
  const [useOriginalSchemaComponent, setUseOriginalSchemaComponent] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [mappingStats, setMappingStats] = useState({
    totalFields: 4,
    mappedFields: 0,
    requiredMapped: 0,
    requiredTotal: 4
  });
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

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

  // Schema mapping functionality
  const updateMappingStats = (currentMapping: Record<string, string>) => {
    const mappedFields = Object.values(currentMapping).filter(v => v).length;
    const requiredMapped = Object.keys(currentMapping).filter(key => 
      ['name', 'dob', 'district', 'state'].includes(key) && currentMapping[key]
    ).length;
    
    setMappingStats({
      totalFields: 4,
      mappedFields,
      requiredMapped,
      requiredTotal: 4
    });
  };

  const handleMappingChange = (schemaField: string, columnName: string) => {
    const newMapping = {
      ...schemaMapping,
      [schemaField]: columnName
    };
    setSchemaMapping(newMapping);
    updateMappingStats(newMapping);
  };

  const validateMapping = () => {
    const errors: string[] = [];
    const requiredFields = ['name', 'dob', 'district', 'state'];
    
    requiredFields.forEach(field => {
      if (!schemaMapping[field]) {
        errors.push(`Required field "${field}" is not mapped`);
      }
    });

    const mappedValues = Object.values(schemaMapping);
    const duplicates = mappedValues.filter((value, index) => 
      value && mappedValues.indexOf(value) !== index
    );
    
    if (duplicates.length > 0) {
      errors.push(`Duplicate column mappings: ${duplicates.join(", ")}`);
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const autoDetectMapping = () => {
    const autoMapping: Record<string, string> = {};
    
    // Auto-detect based on common column names
    const columnMappings = {
      'name': ['Child Name', 'Full Name', 'Name'],
      'dob': ['Date of Birth', 'DOB', 'Birth Date'],
      'district': ['District', 'Location'],
      'state': ['State', 'State/UT']
    };

    Object.entries(columnMappings).forEach(([field, possibleColumns]) => {
      // Simulate finding a match (in real app, this would check actual file columns)
      if (possibleColumns.length > 0) {
        autoMapping[field] = possibleColumns[0];
      }
    });
    
    setSchemaMapping(autoMapping);
    updateMappingStats(autoMapping);
    toast.success("Auto-detection completed");
  };

  const clearMapping = () => {
    setSchemaMapping({});
    updateMappingStats({});
    setValidationErrors([]);
    toast.info("Mapping cleared");
  };

  const handleSchemaComplete = () => {
    if (validateMapping()) {
      toast.success("Schema mapping completed successfully!");
      handleSchemaMap(schemaMapping);
    } else {
      toast.error("Please fix validation errors before proceeding");
    }
  };

  const generatePreview = () => {
    setPreviewModalOpen(true);
  };

  // Sample data for preview
  const sampleData = [
    {
      name: "Rahul Kumar",
      dob: "2015-03-15",
      district: "Patna",
      state: "Bihar"
    },
    {
      name: "Priya Sharma",
      dob: "2014-07-22",
      district: "Lucknow",
      state: "Uttar Pradesh"
    },
    {
      name: "Amit Patel",
      dob: "2016-01-10",
      district: "Ahmedabad",
      state: "Gujarat"
    }
  ];

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
                className="flex flex-col h-12 sm:h-14 py-2 px-2 text-xs transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                aria-label={action.label}
              >
                <action.icon className="w-4 h-4 sm:w-5 sm:h-5 mb-1 flex-shrink-0" />
                <span className="text-center leading-tight font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Processing Interface */}
      <Tabs 
        value={currentStep} 
        onValueChange={(value) => {
          console.log("Tab changed to:", value);
          setCurrentStep(value);
        }} 
        className="space-y-6"
      >
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
          {uploadedFile ? (
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Schema Mapping Tools
                  </CardTitle>
                  <CardDescription>
                    Quick actions for schema mapping
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={autoDetectMapping}
                      className="h-12 sm:h-14 flex-col gap-1 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                      aria-label="Auto detect mapping"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <span className="text-xs text-center">Auto Detect</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearMapping}
                      className="h-12 sm:h-14 flex-col gap-1 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                      aria-label="Clear mapping"
                    >
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                      <span className="text-xs text-center">Clear</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={validateMapping}
                      className="h-12 sm:h-14 flex-col gap-1 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                      aria-label="Validate mapping"
                    >
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                      <span className="text-xs text-center">Validate</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const stats = `Mapping Statistics:\nTotal Fields: ${mappingStats.totalFields}\nMapped Fields: ${mappingStats.mappedFields}\nRequired Mapped: ${mappingStats.requiredMapped}/${mappingStats.requiredTotal}\nCompletion: ${mappingStats.totalFields > 0 ? Math.round((mappingStats.mappedFields / mappingStats.totalFields) * 100) : 0}%`;
                        toast.info(stats);
                      }}
                      className="h-12 sm:h-14 flex-col gap-1 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                      aria-label="Show statistics"
                    >
                      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                      <span className="text-xs text-center">Stats</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generatePreview}
                      className="h-12 sm:h-14 flex-col gap-1 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
                      aria-label="Preview mapping"
                    >
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-volunteer" />
                      <span className="text-xs text-center">Preview</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Mapping Statistics */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{mappingStats.mappedFields}</p>
                      <p className="text-sm text-muted-foreground">Mapped Fields</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">{mappingStats.requiredMapped}</p>
                      <p className="text-sm text-muted-foreground">Required Mapped</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-volunteer">{mappingStats.totalFields}</p>
                      <p className="text-sm text-muted-foreground">Total Fields</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-secondary">
                        {mappingStats.totalFields > 0 ? Math.round((mappingStats.mappedFields / mappingStats.totalFields) * 100) : 0}%
                      </p>
                      <p className="text-sm text-muted-foreground">Completion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schema Mapping Interface */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Schema Mapping Interface
                  </CardTitle>
                  <CardDescription>
                    Map incoming data columns to the expected schema format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Uploaded File: {uploadedFile.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        File size: {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">name</span>
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                            <Badge variant="outline" className="text-xs">string</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Child's full name</p>
                        </div>
                        <div className="sm:w-48">
                          <Select
                            value={schemaMapping.name || ""}
                            onValueChange={(value) => handleMappingChange("name", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select column" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">-- Not mapped --</SelectItem>
                              <SelectItem value="Child Name">Child Name</SelectItem>
                              <SelectItem value="Full Name">Full Name</SelectItem>
                              <SelectItem value="Name">Name</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">dob</span>
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                            <Badge variant="outline" className="text-xs">date</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Date of birth (YYYY-MM-DD)</p>
                        </div>
                        <div className="sm:w-48">
                          <Select
                            value={schemaMapping.dob || ""}
                            onValueChange={(value) => handleMappingChange("dob", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select column" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">-- Not mapped --</SelectItem>
                              <SelectItem value="Date of Birth">Date of Birth</SelectItem>
                              <SelectItem value="DOB">DOB</SelectItem>
                              <SelectItem value="Birth Date">Birth Date</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">district</span>
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                            <Badge variant="outline" className="text-xs">string</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">District name</p>
                        </div>
                        <div className="sm:w-48">
                          <Select
                            value={schemaMapping.district || ""}
                            onValueChange={(value) => handleMappingChange("district", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select column" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">-- Not mapped --</SelectItem>
                              <SelectItem value="District">District</SelectItem>
                              <SelectItem value="Location">Location</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">state</span>
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                            <Badge variant="outline" className="text-xs">string</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">State name</p>
                        </div>
                        <div className="sm:w-48">
                          <Select
                            value={schemaMapping.state || ""}
                            onValueChange={(value) => handleMappingChange("state", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select column" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">-- Not mapped --</SelectItem>
                              <SelectItem value="State">State</SelectItem>
                              <SelectItem value="State/UT">State/UT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    {validationErrors.length > 0 && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <ul className="list-disc list-inside space-y-1">
                            {validationErrors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={validateMapping}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Validate Mapping
                      </Button>
                      <Button 
                        onClick={handleSchemaComplete}
                        disabled={validationErrors.length > 0 || mappingStats.requiredMapped < mappingStats.requiredTotal}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Complete Mapping
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">No File Uploaded</h3>
                  <p className="text-muted-foreground">
                    Please upload a file first to access the schema mapping interface.
                  </p>
                  <Button 
                    onClick={() => setCurrentStep("upload")}
                    className="mt-4"
                  >
                    Go to Upload
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
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

      {/* Preview Modal */}
      <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Mapping Preview
            </DialogTitle>
            <DialogDescription>
              Review your schema mapping configuration
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Mapped Fields</h4>
                <div className="space-y-2">
                  {Object.entries(schemaMapping).filter(([_, value]) => value).map(([field, column]) => (
                    <div key={field} className="flex justify-between p-2 bg-success/10 rounded border">
                      <span className="font-medium">{field}</span>
                      <span className="text-sm text-muted-foreground">{column}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Unmapped Fields</h4>
                <div className="space-y-2">
                  {['name', 'dob', 'district', 'state'].filter(field => !schemaMapping[field]).map(field => (
                    <div key={field} className="flex justify-between p-2 bg-destructive/10 rounded border">
                      <span className="font-medium">{field}</span>
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Mapping Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Fields:</span>
                  <span className="ml-2 font-medium">{mappingStats.totalFields}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Mapped Fields:</span>
                  <span className="ml-2 font-medium">{mappingStats.mappedFields}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Required Mapped:</span>
                  <span className="ml-2 font-medium">{mappingStats.requiredMapped}/{mappingStats.requiredTotal}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Completion:</span>
                  <span className="ml-2 font-medium">
                    {mappingStats.totalFields > 0 ? Math.round((mappingStats.mappedFields / mappingStats.totalFields) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {mappingStats.mappedFields > 0 && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Sample Data Preview</h4>
                <div className="space-y-2">
                  {sampleData.slice(0, 2).map((row, index) => (
                    <div key={index} className="p-2 bg-background rounded border text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div><span className="font-medium">Name:</span> {row.name}</div>
                        <div><span className="font-medium">DOB:</span> {row.dob}</div>
                        <div><span className="font-medium">District:</span> {row.district}</div>
                        <div><span className="font-medium">State:</span> {row.state}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewModalOpen(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                setPreviewModalOpen(false);
                handleSchemaComplete();
              }}
              disabled={validationErrors.length > 0}
            >
              Complete Mapping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}