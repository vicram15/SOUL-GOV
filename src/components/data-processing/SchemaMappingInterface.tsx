import { useState, useEffect } from "react";
import { Settings, CheckCircle, AlertTriangle, Download, Upload, Eye, Sparkles, RefreshCw, FileText, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface SchemaMappingInterfaceProps {
  file: File | null;
  onMappingComplete: (mapping: Record<string, string>) => void;
}

const expectedSchema = [
  { field: "name", description: "Child's full name", required: true, type: "string" },
  { field: "dob", description: "Date of birth (YYYY-MM-DD)", required: true, type: "date" },
  { field: "district", description: "District name", required: true, type: "string" },
  { field: "state", description: "State name", required: true, type: "string" },
  { field: "education_status", description: "Current education status", required: true, type: "string" },
  { field: "aadhaar_status", description: "Aadhaar card status", required: true, type: "string" },
  { field: "gender", description: "Gender (M/F/Other)", required: true, type: "string" },
  { field: "guardian_name", description: "Guardian's name", required: false, type: "string" },
  { field: "contact_number", description: "Contact phone number", required: false, type: "string" },
  { field: "address", description: "Full address", required: false, type: "string" },
];

const sampleColumns = [
  "Child Name", "Date of Birth", "DOB", "Full Name", "District", "State/UT", 
  "Education", "School Status", "Aadhaar", "ID Status", "Gender", "Sex",
  "Guardian", "Parent", "Phone", "Mobile", "Address", "Location"
];

export function SchemaMappingInterface({ file, onMappingComplete }: SchemaMappingInterfaceProps) {
  console.log("SchemaMappingInterface rendered with file:", file);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [jsonConfig, setJsonConfig] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [useJsonMode, setUseJsonMode] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [autoDetectEnabled, setAutoDetectEnabled] = useState(true);
  const [smartSuggestions, setSmartSuggestions] = useState<Record<string, string[]>>({});
  const [mappingStats, setMappingStats] = useState({
    totalFields: expectedSchema.length,
    mappedFields: 0,
    requiredMapped: 0,
    requiredTotal: expectedSchema.filter(s => s.required).length
  });

  useEffect(() => {
    if (file && autoDetectEnabled) {
      // Enhanced auto-suggest mappings based on column names
      const autoMapping: Record<string, string> = {};
      const suggestions: Record<string, string[]> = {};
      
      expectedSchema.forEach(schema => {
        const fieldWords = schema.field.split('_');
        const matchingColumns = sampleColumns.filter(col => {
          const colLower = col.toLowerCase();
          return fieldWords.some(word => 
            colLower.includes(word) || 
            word.includes(colLower.replace(/[^a-z]/g, ''))
          );
        });
        
        if (matchingColumns.length > 0) {
          autoMapping[schema.field] = matchingColumns[0];
          suggestions[schema.field] = matchingColumns;
        }
      });
      
      setMapping(autoMapping);
      setSmartSuggestions(suggestions);
      updateMappingStats(autoMapping);
    }
  }, [file, autoDetectEnabled]);

  const updateMappingStats = (currentMapping: Record<string, string>) => {
    const mappedFields = Object.values(currentMapping).filter(v => v).length;
    const requiredMapped = expectedSchema
      .filter(s => s.required && currentMapping[s.field])
      .length;
    
    setMappingStats({
      totalFields: expectedSchema.length,
      mappedFields,
      requiredMapped,
      requiredTotal: expectedSchema.filter(s => s.required).length
    });
  };

  const handleMappingChange = (schemaField: string, columnName: string) => {
    const newMapping = {
      ...mapping,
      [schemaField]: columnName
    };
    setMapping(newMapping);
    updateMappingStats(newMapping);
  };

  const validateMapping = () => {
    const errors: string[] = [];
    const requiredFields = expectedSchema.filter(s => s.required);
    
    requiredFields.forEach(field => {
      if (!mapping[field.field]) {
        errors.push(`Required field "${field.field}" is not mapped`);
      }
    });

    const mappedValues = Object.values(mapping);
    const duplicates = mappedValues.filter((value, index) => 
      value && mappedValues.indexOf(value) !== index
    );
    
    if (duplicates.length > 0) {
      errors.push(`Duplicate column mappings: ${duplicates.join(", ")}`);
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleComplete = () => {
    if (validateMapping()) {
      toast.success("Schema mapping completed successfully!");
      onMappingComplete(mapping);
    } else {
      toast.error("Please fix validation errors before proceeding");
    }
  };

  const exportConfig = () => {
    const config = {
      mapping,
      timestamp: new Date().toISOString(),
      filename: file?.name,
      stats: mappingStats
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema-mapping.json";
    a.click();
    toast.success("Configuration exported successfully");
  };

  const importConfig = () => {
    try {
      const config = JSON.parse(jsonConfig);
      if (config.mapping) {
        setMapping(config.mapping);
        updateMappingStats(config.mapping);
        setUseJsonMode(false);
        toast.success("Configuration imported successfully");
      }
    } catch (error) {
      toast.error("Invalid JSON configuration");
    }
  };

  const autoDetectMapping = () => {
    const autoMapping: Record<string, string> = {};
    expectedSchema.forEach(schema => {
      const fieldWords = schema.field.split('_');
      const matchingColumn = sampleColumns.find(col => {
        const colLower = col.toLowerCase();
        return fieldWords.some(word => 
          colLower.includes(word) || 
          word.includes(colLower.replace(/[^a-z]/g, ''))
        );
      });
      if (matchingColumn) {
        autoMapping[schema.field] = matchingColumn;
      }
    });
    setMapping(autoMapping);
    updateMappingStats(autoMapping);
    toast.success("Auto-detection completed");
  };

  const clearMapping = () => {
    setMapping({});
    updateMappingStats({});
    toast.info("Mapping cleared");
  };

  const generatePreview = () => {
    setPreviewModalOpen(true);
  };

  return (
    <div className="space-y-6">
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
        <CardContent className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
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
              onClick={generatePreview}
              className="h-12 sm:h-14 flex-col gap-1 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
              aria-label="Preview mapping"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-volunteer" />
              <span className="text-xs text-center">Preview</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportConfig}
              className="h-12 sm:h-14 flex-col gap-1 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
              aria-label="Export configuration"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              <span className="text-xs text-center">Export</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseJsonMode(!useJsonMode)}
              className="h-12 sm:h-14 flex-col gap-1 p-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md focus:ring-2 focus:ring-primary/20 touch-manipulation"
              aria-label="Toggle JSON mode"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-child-care" />
              <span className="text-xs text-center">{useJsonMode ? "UI Mode" : "JSON Mode"}</span>
            </Button>
          </div>

          {/* Mapping Statistics */}
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

          {/* Auto-detect toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="auto-detect" 
              checked={autoDetectEnabled}
              onCheckedChange={setAutoDetectEnabled}
            />
            <Label htmlFor="auto-detect" className="text-sm">Enable automatic field detection</Label>
          </div>

          {useJsonMode ? (
            <div className="space-y-4">
              <Textarea
                placeholder="Paste JSON configuration here..."
                value={jsonConfig}
                onChange={(e) => setJsonConfig(e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
              <Button onClick={importConfig} className="w-full sm:w-auto">
                <Upload className="w-4 h-4 mr-2" />
                Import Configuration
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4">
                {expectedSchema.map((schema) => (
                  <div key={schema.field} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{schema.field}</span>
                        {schema.required && (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{schema.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{schema.description}</p>
                      {smartSuggestions[schema.field] && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {smartSuggestions[schema.field].slice(0, 3).map((suggestion, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary" 
                              className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                              onClick={() => handleMappingChange(schema.field, suggestion)}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="sm:w-48">
                      <Select
                        value={mapping[schema.field] || ""}
                        onValueChange={(value) => handleMappingChange(schema.field, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">-- Not mapped --</SelectItem>
                          {sampleColumns.map((column) => (
                            <SelectItem key={column} value={column}>
                              {column}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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

          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="flex gap-2">
              <Button variant="outline" onClick={validateMapping}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Validate Mapping
              </Button>
              <Button variant="outline" onClick={generatePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
            <Button 
              onClick={handleComplete}
              disabled={validationErrors.length > 0 || mappingStats.requiredMapped < mappingStats.requiredTotal}
              className="bg-primary hover:bg-primary/90"
            >
              <Zap className="w-4 h-4 mr-2" />
              Complete Mapping
            </Button>
          </div>
        </CardContent>
      </Card>

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
                  {Object.entries(mapping).filter(([_, value]) => value).map(([field, column]) => (
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
                  {expectedSchema.filter(schema => !mapping[schema.field]).map(schema => (
                    <div key={schema.field} className="flex justify-between p-2 bg-destructive/10 rounded border">
                      <span className="font-medium">{schema.field}</span>
                      {schema.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
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
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewModalOpen(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                setPreviewModalOpen(false);
                handleComplete();
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