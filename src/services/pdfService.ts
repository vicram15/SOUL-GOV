import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

interface ChartData {
  title: string;
  data: any[];
  type: 'bar' | 'pie' | 'line';
}

interface ReportData {
  title: string;
  subtitle: string;
  charts: ChartData[];
  summaryStats: {
    label: string;
    value: string | number;
    trend?: string;
  }[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export class PDFService {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
  }

  async generateDetailedReport(reportData: ReportData): Promise<void> {
    // Add header
    this.addHeader(reportData.title, reportData.subtitle);

    let yPosition = 50;

    // Add summary statistics
    yPosition = this.addSummaryStats(reportData.summaryStats, yPosition);

    // Add charts (capture from DOM)
    for (const chart of reportData.charts) {
      yPosition = await this.addChartFromDOM(chart, yPosition);
    }

    // Add table data if provided
    if (reportData.tableData) {
      yPosition = this.addTable(reportData.tableData, yPosition);
    }

    // Add footer
    this.addFooter();

    // Save the PDF
    this.doc.save(`${reportData.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  private addHeader(title: string, subtitle: string): void {
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, 20, 25);

    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(subtitle, 20, 35);

    this.doc.setFontSize(10);
    this.doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 150, 35);

    // Add a line
    this.doc.setLineWidth(0.5);
    this.doc.line(20, 40, 190, 40);
  }

  private addSummaryStats(stats: ReportData['summaryStats'], yPosition: number): number {
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Key Statistics', 20, yPosition);

    yPosition += 10;
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');

    const columns = Math.min(stats.length, 4);
    const columnWidth = 170 / columns;

    stats.forEach((stat, index) => {
      const x = 20 + (index % columns) * columnWidth;
      const y = yPosition + Math.floor(index / columns) * 20;

      this.doc.setFont('helvetica', 'bold');
      this.doc.text(stat.value.toString(), x, y);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(stat.label, x, y + 5);
      if (stat.trend) {
        this.doc.setFontSize(8);
        this.doc.text(stat.trend, x, y + 10);
        this.doc.setFontSize(10);
      }
    });

    return yPosition + Math.ceil(stats.length / columns) * 20 + 10;
  }

  private async addChartFromDOM(chart: ChartData, yPosition: number): Promise<number> {
    // Check if we need a new page
    if (yPosition > 200) {
      this.doc.addPage();
      yPosition = 20;
    }

    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(chart.title, 20, yPosition);

    yPosition += 10;

    // Try to capture chart from DOM
    const chartElement = document.querySelector(`[data-chart-title="${chart.title}"]`) as HTMLElement;
    
    if (chartElement) {
      try {
        const canvas = await html2canvas(chartElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 150;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        this.doc.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 10;
      } catch (error) {
        console.warn('Could not capture chart, adding data table instead:', error);
        yPosition = this.addChartDataTable(chart, yPosition);
      }
    } else {
      // Fallback: Add chart data as table
      yPosition = this.addChartDataTable(chart, yPosition);
    }

    return yPosition + 10;
  }

  private addChartDataTable(chart: ChartData, yPosition: number): number {
    if (chart.data && chart.data.length > 0) {
      const headers = Object.keys(chart.data[0]);
      const rows = chart.data.map(item => headers.map(header => item[header]));

      autoTable(this.doc, {
        head: [headers],
        body: rows,
        startY: yPosition,
        margin: { left: 20, right: 20 },
        styles: { fontSize: 8 },
        headStyles: { fillColor: [66, 139, 202] }
      });

      return (this.doc as any).lastAutoTable.finalY + 10;
    }
    return yPosition;
  }

  private addTable(tableData: ReportData['tableData'], yPosition: number): number {
    if (!tableData) return yPosition;

    // Check if we need a new page
    if (yPosition > 200) {
      this.doc.addPage();
      yPosition = 20;
    }

    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Detailed Data', 20, yPosition);

    yPosition += 10;

    autoTable(this.doc, {
      head: [tableData.headers],
      body: tableData.rows,
      startY: yPosition,
      margin: { left: 20, right: 20 },
      styles: { fontSize: 9 },
      headStyles: { fillColor: [66, 139, 202] },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    return (this.doc as any).lastAutoTable.finalY + 10;
  }

  private addFooter(): void {
    const pageCount = this.doc.internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(8);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(
        `Child Impact Hub - Page ${i} of ${pageCount}`,
        20,
        290
      );
      this.doc.text(
        'Generated by Child Impact Hub Analytics System',
        150,
        290
      );
    }
  }
}

// Report data generators
export const generateStateWiseReport = (): ReportData => ({
  title: 'State-wise Performance Analysis',
  subtitle: 'Comprehensive analysis of child onboarding and verification across states',
  charts: [
    {
      title: 'State-wise Performance Analysis',
      data: [
        { state: 'Uttar Pradesh', children: 4200, verified: 3360, enrolled: 3150 },
        { state: 'Maharashtra', children: 3800, verified: 3040, enrolled: 2850 },
        { state: 'Bihar', children: 3200, verified: 2400, enrolled: 2240 },
        { state: 'West Bengal', children: 2800, verified: 2240, enrolled: 2100 },
        { state: 'Rajasthan', children: 2400, verified: 1920, enrolled: 1800 }
      ],
      type: 'bar'
    }
  ],
  summaryStats: [
    { label: 'Total States Active', value: '28', trend: '↑ 3 new states' },
    { label: 'Average Verification Rate', value: '78%', trend: '↑ 8.2% from last month' },
    { label: 'Top Performing State', value: 'UP', trend: '4,200 children onboarded' },
    { label: 'Total Children Onboarded', value: '16,400', trend: '↑ 12.5% growth' }
  ],
  tableData: {
    headers: ['State', 'Total Children', 'Verified', 'School Enrolled', 'Verification Rate'],
    rows: [
      ['Uttar Pradesh', 4200, 3360, 3150, '80%'],
      ['Maharashtra', 3800, 3040, 2850, '80%'],
      ['Bihar', 3200, 2400, 2240, '75%'],
      ['West Bengal', 2800, 2240, 2100, '80%'],
      ['Rajasthan', 2400, 1920, 1800, '80%']
    ]
  }
});

export const generateMonthlyTrendsReport = (): ReportData => ({
  title: 'Monthly Activity Trends',
  subtitle: 'Time-based analysis showing growth patterns and seasonal trends',
  charts: [
    {
      title: 'Monthly Activity Trends',
      data: [
        { month: 'Jan', children: 1200, verified: 960, enrolled: 900 },
        { month: 'Feb', children: 1450, verified: 1160, enrolled: 1088 },
        { month: 'Mar', children: 1600, verified: 1280, enrolled: 1200 },
        { month: 'Apr', children: 1750, verified: 1400, enrolled: 1313 },
        { month: 'May', children: 1900, verified: 1520, enrolled: 1425 },
        { month: 'Jun', children: 2100, verified: 1680, enrolled: 1575 }
      ],
      type: 'line'
    }
  ],
  summaryStats: [
    { label: 'Monthly Growth Rate', value: '15.2%', trend: 'Consistent upward trend' },
    { label: 'Peak Month', value: 'June', trend: '2,100 children added' },
    { label: 'Average Monthly Additions', value: '1,633', trend: 'Above target' },
    { label: 'Verification Efficiency', value: '80%', trend: 'Stable performance' }
  ],
  tableData: {
    headers: ['Month', 'Children Added', 'Verified', 'School Enrolled', 'Growth Rate'],
    rows: [
      ['January', 1200, 960, 900, '-'],
      ['February', 1450, 1160, 1088, '20.8%'],
      ['March', 1600, 1280, 1200, '10.3%'],
      ['April', 1750, 1400, 1313, '9.4%'],
      ['May', 1900, 1520, 1425, '8.6%'],
      ['June', 2100, 1680, 1575, '10.5%']
    ]
  }
});

export const generateImpactAssessmentReport = (): ReportData => ({
  title: 'Impact Assessment Report',
  subtitle: 'Detailed impact analysis with CSR contribution correlation',
  charts: [
    {
      title: 'Process Completion Status',
      data: [
        { category: 'Completed Process', value: 68 },
        { category: 'In Progress', value: 22 },
        { category: 'Not Started', value: 10 }
      ],
      type: 'pie'
    }
  ],
  summaryStats: [
    { label: 'Total Impact Score', value: '8.7/10', trend: '↑ 0.3 from last quarter' },
    { label: 'Children Benefited', value: '16,400', trend: 'Across 28 states' },
    { label: 'CSR Investment', value: '₹2.4 Cr', trend: 'From 15 corporates' },
    { label: 'Cost per Child', value: '₹1,463', trend: '↓ 12% optimization' }
  ],
  tableData: {
    headers: ['Impact Area', 'Target', 'Achieved', 'Success Rate', 'CSR Investment'],
    rows: [
      ['Child Verification', '20000', '16400', '82%', '₹80L'],
      ['School Enrollment', '15000', '12288', '82%', '₹60L'],
      ['ID Documentation', '18000', '16560', '92%', '₹40L'],
      ['Health Checkups', '12000', '9840', '82%', '₹50L'],
      ['Nutrition Programs', '10000', '8500', '85%', '₹10L']
    ]
  }
});