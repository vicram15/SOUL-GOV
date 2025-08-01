import { useState, useEffect } from "react";
import { Settings, CheckCircle, AlertTriangle, Download, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

interface SchemaMappingInterfaceProps {
  file: File | null;
  onMappingComplete: (mapping: Record<string, string>) => void;
}

const expectedSchema = [
  { field: "name", description: "Child's full name", required: true },
  { field: "dob", description: "Date of birth (YYYY-MM-DD)", required: true },
  { field: "district", description: "District name", required: true },
  { field: "state", description: "State name", required: true },
  { field: "education_status", description: "Current education status", required: true },
  { field: "aadhaar_status", description: "Aadhaar card status", required: true },
  { field: "gender", description: "Gender (M/F/Other)", required: true },
  { field: "guardian_name", description: "Guardian's name", required: false },
  { field: "contact_number", description: "Contact phone number", required: false },
  { field: "address", description: "Full address", required: false },
];

const sampleColumns = [
  "Child Name", "Date of Birth", "DOB", "Full Name", "District", "State/UT", 
  "Education", "School Status", "Aadhaar", "ID Status", "Gender", "Sex",
  "Guardian", "Parent", "Phone", "Mobile", "Address", "Location"
];

export function SchemaMappingInterface({ file, onMappingComplete }: SchemaMappingInterfaceProps) {
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [jsonConfig, setJsonConfig] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [useJsonMode, setUseJsonMode] = useState(false);

  useEffect(() => {
    if (file) {
      // Auto-suggest mappings based on column names
      const autoMapping: Record<string, string> = {};
      expectedSchema.forEach(schema => {
        const matchingColumn = sampleColumns.find(col => 
          col.toLowerCase().includes(schema.field.split('_')[0]) ||
          schema.field.split('_')[0].includes(col.toLowerCase().replace(/[^a-z]/g, ''))
        );
        if (matchingColumn) {
          autoMapping[schema.field] = matchingColumn;
        }
      });
      setMapping(autoMapping);
    }
  }, [file]);

  const handleMappingChange = (schemaField: string, columnName: string) => {
    setMapping(prev => ({
      ...prev,
      [schemaField]: columnName
    }));
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
      onMappingComplete(mapping);
    }
  };

  const exportConfig = () => {
    const config = {
      mapping,
      timestamp: new Date().toISOString(),
      filename: file?.name
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema-mapping.json";
    a.click();
  };

  const importConfig = () => {
    try {
      const config = JSON.parse(jsonConfig);
      if (config.mapping) {
        setMapping(config.mapping);
        setUseJsonMode(false);
      }
    } catch (error) {
      alert("Invalid JSON configuration");
    }
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
          <div className="flex flex-wrap gap-2">
            <Button
              variant={useJsonMode ? "outline" : "default"}
              size="sm"
              onClick={() => setUseJsonMode(false)}
            >
              UI Mapping
            </Button>
            <Button
              variant={useJsonMode ? "default" : "outline"}
              size="sm"
              onClick={() => setUseJsonMode(true)}
            >
              JSON Config
            </Button>
            <Button variant="outline" size="sm" onClick={exportConfig}>
              <Download className="w-4 h-4 mr-1" />
              Export Config
            </Button>
          </div>

          {useJsonMode ? (
            <div className="space-y-4">
              <Textarea
                placeholder="Paste JSON configuration here..."
                value={jsonConfig}
                onChange={(e) => setJsonConfig(e.target.value)}
                rows={10}
              />
              <Button onClick={importConfig}>
                <Upload className="w-4 h-4 mr-2" />
                Import Configuration
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4">
                {expectedSchema.map((schema) => (
                  <div key={schema.field} className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{schema.field}</span>
                        {schema.required && (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{schema.description}</p>
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

          <div className="flex justify-between">
            <Button variant="outline" onClick={validateMapping}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Validate Mapping
            </Button>
            <Button 
              onClick={handleComplete}
              disabled={validationErrors.length > 0}
            >
              Complete Mapping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}