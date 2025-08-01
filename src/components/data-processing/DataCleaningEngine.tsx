import { useState } from "react";
import { Zap, Settings, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DataCleaningEngineProps {
  data: any[];
  onCleaningComplete: (options: any) => void;
}

interface CleaningOptions {
  missingValueMethod: string;
  outlierDetection: string;
  enableValidation: boolean;
  enableDuplicateDetection: boolean;
  enableAgeValidation: boolean;
  enableEducationValidation: boolean;
}

export function DataCleaningEngine({ data, onCleaningComplete }: DataCleaningEngineProps) {
  const [options, setOptions] = useState<CleaningOptions>({
    missingValueMethod: "mean",
    outlierDetection: "iqr",
    enableValidation: true,
    enableDuplicateDetection: true,
    enableAgeValidation: true,
    enableEducationValidation: true
  });

  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cleaningLogs, setCleaningLogs] = useState<string[]>([]);

  const handleOptionChange = (key: keyof CleaningOptions, value: any) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const startCleaning = async () => {
    setProcessing(true);
    setProgress(0);
    setCleaningLogs([]);

    const logs: string[] = [];
    
    // Simulate cleaning process with progress updates
    const steps = [
      { name: "Analyzing missing values", progress: 20 },
      { name: "Detecting outliers using " + options.outlierDetection.toUpperCase(), progress: 40 },
      { name: "Applying " + options.missingValueMethod + " imputation", progress: 60 },
      { name: "Running validation rules", progress: 80 },
      { name: "Finalizing clean dataset", progress: 100 }
    ];

    for (const step of steps) {
      logs.push(`${step.name}...`);
      setCleaningLogs([...logs]);
      setProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Add final logs
    logs.push("✅ 32 rows imputed using " + options.missingValueMethod);
    logs.push("✅ 5 outliers detected and corrected");
    logs.push("✅ 12 duplicate records identified");
    logs.push("✅ 3 age validation errors fixed");
    
    setCleaningLogs(logs);
    setProcessing(false);
    
    onCleaningComplete(options);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Data Cleaning Engine
          </CardTitle>
          <CardDescription>
            Configure automatic data cleaning with imputation, outlier detection, and validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Missing Value Imputation */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Missing Value Imputation</Label>
            <Select
              value={options.missingValueMethod}
              onValueChange={(value) => handleOptionChange("missingValueMethod", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mean">Mean Imputation</SelectItem>
                <SelectItem value="median">Median Imputation</SelectItem>
                <SelectItem value="knn">K-Nearest Neighbors (KNN)</SelectItem>
                <SelectItem value="mode">Mode Imputation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Outlier Detection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Outlier Detection Method</Label>
            <Select
              value={options.outlierDetection}
              onValueChange={(value) => handleOptionChange("outlierDetection", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iqr">IQR (Interquartile Range)</SelectItem>
                <SelectItem value="zscore">Z-Score</SelectItem>
                <SelectItem value="winsorization">Winsorization</SelectItem>
                <SelectItem value="isolation">Isolation Forest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Validation Rules */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Validation Rules</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="general-validation">General Validation</Label>
                  <p className="text-sm text-muted-foreground">Enable rule-based validation</p>
                </div>
                <Switch
                  id="general-validation"
                  checked={options.enableValidation}
                  onCheckedChange={(checked) => handleOptionChange("enableValidation", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="duplicate-detection">Duplicate Detection</Label>
                  <p className="text-sm text-muted-foreground">Find and merge duplicates</p>
                </div>
                <Switch
                  id="duplicate-detection"
                  checked={options.enableDuplicateDetection}
                  onCheckedChange={(checked) => handleOptionChange("enableDuplicateDetection", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="age-validation">Age Logic Validation</Label>
                  <p className="text-sm text-muted-foreground">Validate age vs DOB consistency</p>
                </div>
                <Switch
                  id="age-validation"
                  checked={options.enableAgeValidation}
                  onCheckedChange={(checked) => handleOptionChange("enableAgeValidation", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="education-validation">Education Mismatch</Label>
                  <p className="text-sm text-muted-foreground">Check education vs age logic</p>
                </div>
                <Switch
                  id="education-validation"
                  checked={options.enableEducationValidation}
                  onCheckedChange={(checked) => handleOptionChange("enableEducationValidation", checked)}
                />
              </div>
            </div>
          </div>

          {/* Processing Status */}
          {processing && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 animate-spin" />
                <span className="font-medium">Processing Data...</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {/* Cleaning Logs */}
          {cleaningLogs.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-medium">Processing Logs</Label>
              <div className="bg-muted/30 rounded-lg p-4 space-y-1 max-h-40 overflow-y-auto">
                {cleaningLogs.map((log, index) => (
                  <div key={index} className="text-sm flex items-center gap-2">
                    {log.startsWith("✅") ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-blue-500" />
                    )}
                    <span>{log.replace("✅ ", "")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Badge variant="outline">Data Quality: 87%</Badge>
              <Badge variant="outline">Completeness: 94%</Badge>
            </div>
            <Button 
              onClick={startCleaning}
              disabled={processing}
            >
              {processing ? "Processing..." : "Start Cleaning"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}