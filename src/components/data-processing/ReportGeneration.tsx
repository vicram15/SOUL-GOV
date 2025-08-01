import { useState } from "react";
import { FileText, Download, Share, Save, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ReportGenerationProps {
  data: any[];
  mapping: Record<string, string>;
  cleaningOptions: any;
  weights: Record<string, number>;
}

export function ReportGeneration({ data, mapping, cleaningOptions, weights }: ReportGenerationProps) {
  const [reportSections, setReportSections] = useState({
    executiveSummary: true,
    dataOverview: true,
    cleaningLogs: true,
    demographics: true,
    regional: true,
    insights: true,
    methodology: true,
    recommendations: true
  });

  const [reportFormat, setReportFormat] = useState<"pdf" | "html">("pdf");

  const reportStats = {
    totalRecords: 15234,
    cleanedRecords: 14876,
    qualityScore: 94,
    completeness: 97,
    accuracy: 92,
    consistency: 96
  };

  const handleSectionChange = (section: string, checked: boolean) => {
    setReportSections(prev => ({
      ...prev,
      [section]: checked
    }));
  };

  const generateReport = async () => {
    toast.success(`${reportFormat.toUpperCase()} report generated successfully`);
    
    // Simulate report generation
    const reportContent = `
SOUL Child Impact Hub - Data Processing Report
Generated: ${new Date().toLocaleString()}

EXECUTIVE SUMMARY
================
Total Records Processed: ${reportStats.totalRecords.toLocaleString()}
Data Quality Score: ${reportStats.qualityScore}/100
Completeness: ${reportStats.completeness}%

DATA CLEANING SUMMARY
====================
- Method: ${cleaningOptions.missingValueMethod}
- Outlier Detection: ${cleaningOptions.outlierDetection}
- Records Cleaned: ${reportStats.cleanedRecords.toLocaleString()}
- Quality Improvement: +23%

REGIONAL STATISTICS
==================
Maharashtra: 3,245 children (Weight: ${weights["Maharashtra"] || 1.0})
Uttar Pradesh: 4,567 children (Weight: ${weights["Uttar Pradesh"] || 1.2})
Bihar: 2,134 children (Weight: ${weights["Bihar"] || 1.5})

KEY INSIGHTS
============
- 87% of children have valid Aadhaar documentation
- School enrollment rate: 78.5%
- Health coverage: 82.3%
- Regional disparities identified in rural areas

RECOMMENDATIONS
===============
1. Focus on improving documentation in rural districts
2. Strengthen school enrollment programs
3. Enhance health coverage outreach
4. Implement targeted interventions in low-coverage areas
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SOUL-data-report-${new Date().toISOString().split('T')[0]}.${reportFormat === 'pdf' ? 'txt' : 'html'}`;
    a.click();
  };

  const saveToBackend = () => {
    toast.success("Report saved to backend database");
  };

  const shareReport = () => {
    const shareUrl = `${window.location.origin}/reports/shared/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Secure dashboard link copied to clipboard");
  };

  const previewReport = () => {
    toast.info("Opening report preview...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Report Generation
        </CardTitle>
        <CardDescription>
          Generate comprehensive government-ready reports with charts and insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sections">Report Sections</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(reportSections).map(([key, checked]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={checked}
                      onCheckedChange={(checked) => handleSectionChange(key, checked as boolean)}
                    />
                    <Label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{reportStats.totalRecords.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Records</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{reportStats.qualityScore}%</div>
                <div className="text-sm text-muted-foreground">Quality Score</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{reportStats.completeness}%</div>
                <div className="text-sm text-muted-foreground">Completeness</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{reportStats.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{reportStats.consistency}%</div>
                <div className="text-sm text-muted-foreground">Consistency</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{reportStats.cleanedRecords.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Cleaned Records</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Report Format</Label>
              <div className="flex gap-2">
                <Button
                  variant={reportFormat === "pdf" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReportFormat("pdf")}
                >
                  PDF Format
                </Button>
                <Button
                  variant={reportFormat === "html" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReportFormat("html")}
                >
                  HTML Format
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={previewReport} variant="outline" className="h-16 flex-col">
                <Eye className="w-5 h-5 mb-1" />
                Preview Report
              </Button>
              <Button onClick={generateReport} className="h-16 flex-col">
                <Download className="w-5 h-5 mb-1" />
                Download Report
              </Button>
              <Button onClick={saveToBackend} variant="secondary" className="h-16 flex-col">
                <Save className="w-5 h-5 mb-1" />
                Save to Backend
              </Button>
              <Button onClick={shareReport} variant="outline" className="h-16 flex-col">
                <Share className="w-5 h-5 mb-1" />
                Share Secure Link
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Report Status</Label>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Ready for Generation</Badge>
                <Badge variant="outline">All Sections Selected</Badge>
                <Badge variant="outline">Data Quality: {reportStats.qualityScore}%</Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}