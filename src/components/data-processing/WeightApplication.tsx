import { useState } from "react";
import { BarChart3, Upload, Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface WeightApplicationProps {
  data: any[];
  onWeightsApply: (weights: Record<string, number>) => void;
}

export function WeightApplication({ data, onWeightsApply }: WeightApplicationProps) {
  const [weights, setWeights] = useState<Record<string, number>>({
    "Uttar Pradesh": 1.2,
    "Maharashtra": 1.0,
    "Bihar": 1.5,
    "West Bengal": 1.1,
    "Madhya Pradesh": 1.3,
    "Tamil Nadu": 0.9,
    "Rajasthan": 1.4,
    "Karnataka": 0.95,
  });

  const [customWeights, setCustomWeights] = useState("");

  const predefinedWeights = {
    population: {
      name: "Population-based Weights",
      description: "Weights based on state population distribution",
      weights: {
        "Uttar Pradesh": 1.2,
        "Maharashtra": 1.0,
        "Bihar": 1.5,
        "West Bengal": 1.1,
        "Madhya Pradesh": 1.3,
        "Tamil Nadu": 0.9,
        "Rajasthan": 1.4,
        "Karnataka": 0.95,
      }
    },
    sampling: {
      name: "Sampling Weights",
      description: "Corrects for sampling design and non-response",
      weights: {
        "Uttar Pradesh": 1.1,
        "Maharashtra": 0.95,
        "Bihar": 1.6,
        "West Bengal": 1.05,
        "Madhya Pradesh": 1.25,
        "Tamil Nadu": 0.85,
        "Rajasthan": 1.35,
        "Karnataka": 0.9,
      }
    }
  };

  const summaryStats = {
    unweighted: {
      totalChildren: 12543,
      avgAge: 8.2,
      schoolEnrollment: 78.5,
      aadhaarCoverage: 89.2
    },
    weighted: {
      totalChildren: 15234,
      avgAge: 8.4,
      schoolEnrollment: 76.8,
      aadhaarCoverage: 87.6
    }
  };

  const marginOfError = {
    "Uttar Pradesh": 2.1,
    "Maharashtra": 1.8,
    "Bihar": 3.2,
    "West Bengal": 2.0,
    "Madhya Pradesh": 2.5,
    "Tamil Nadu": 1.6,
    "Rajasthan": 2.8,
    "Karnataka": 1.7,
  };

  const handleWeightChange = (state: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setWeights(prev => ({
        ...prev,
        [state]: numValue
      }));
    }
  };

  const applyPredefinedWeights = (type: keyof typeof predefinedWeights) => {
    setWeights(predefinedWeights[type].weights);
  };

  const uploadWeights = () => {
    try {
      const parsed = JSON.parse(customWeights);
      setWeights(parsed);
    } catch (error) {
      alert("Invalid JSON format for weights");
    }
  };

  const handleApplyWeights = () => {
    onWeightsApply(weights);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Weight Application & Summary Estimation
          </CardTitle>
          <CardDescription>
            Apply design weights and compute weighted summaries with margins of error
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="predefined" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="predefined">Predefined Weights</TabsTrigger>
              <TabsTrigger value="custom">Custom Weights</TabsTrigger>
              <TabsTrigger value="summary">Summary & Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="predefined" className="space-y-6">
              <div className="grid gap-4">
                {Object.entries(predefinedWeights).map(([key, config]) => (
                  <Card key={key}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{config.name}</h4>
                          <p className="text-sm text-muted-foreground">{config.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => applyPredefinedWeights(key as keyof typeof predefinedWeights)}
                        >
                          Apply Weights
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Current Weights by State</Label>
                <div className="grid gap-3">
                  {Object.entries(weights).map(([state, weight]) => (
                    <div key={state} className="flex items-center gap-3">
                      <Label className="w-32 text-sm">{state}:</Label>
                      <Input
                        type="number"
                        value={weight}
                        onChange={(e) => handleWeightChange(state, e.target.value)}
                        step="0.1"
                        className="w-24"
                      />
                      <Badge variant="outline" className="text-xs">
                        MOE: ±{marginOfError[state as keyof typeof marginOfError]}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Upload Custom Weights (JSON)</Label>
                <textarea
                  className="w-full h-40 p-3 border rounded-md font-mono text-sm"
                  placeholder='{"Uttar Pradesh": 1.2, "Maharashtra": 1.0, ...}'
                  value={customWeights}
                  onChange={(e) => setCustomWeights(e.target.value)}
                />
                <Button onClick={uploadWeights}>
                  <Upload className="w-4 h-4 mr-2" />
                  Apply Custom Weights
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Summary Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metric</TableHead>
                          <TableHead>Unweighted</TableHead>
                          <TableHead>Weighted</TableHead>
                          <TableHead>Difference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Total Children</TableCell>
                          <TableCell>{summaryStats.unweighted.totalChildren.toLocaleString()}</TableCell>
                          <TableCell>{summaryStats.weighted.totalChildren.toLocaleString()}</TableCell>
                          <TableCell className="text-green-600">
                            +{(summaryStats.weighted.totalChildren - summaryStats.unweighted.totalChildren).toLocaleString()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Average Age</TableCell>
                          <TableCell>{summaryStats.unweighted.avgAge}</TableCell>
                          <TableCell>{summaryStats.weighted.avgAge}</TableCell>
                          <TableCell className="text-green-600">
                            +{(summaryStats.weighted.avgAge - summaryStats.unweighted.avgAge).toFixed(1)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>School Enrollment (%)</TableCell>
                          <TableCell>{summaryStats.unweighted.schoolEnrollment}%</TableCell>
                          <TableCell>{summaryStats.weighted.schoolEnrollment}%</TableCell>
                          <TableCell className="text-red-600">
                            {(summaryStats.weighted.schoolEnrollment - summaryStats.unweighted.schoolEnrollment).toFixed(1)}%
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Aadhaar Coverage (%)</TableCell>
                          <TableCell>{summaryStats.unweighted.aadhaarCoverage}%</TableCell>
                          <TableCell>{summaryStats.weighted.aadhaarCoverage}%</TableCell>
                          <TableCell className="text-red-600">
                            {(summaryStats.weighted.aadhaarCoverage - summaryStats.unweighted.aadhaarCoverage).toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button onClick={handleApplyWeights}>
              <Calculator className="w-4 h-4 mr-2" />
              Apply Weights & Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}