import { useState, useRef } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, Filter, Loader } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dateRange, setDateRange] = useState("month");
  const [exporting, setExporting] = useState(false);
  const reportContentRef = useRef<HTMLDivElement>(null);

  // Chart Data
  const monthlyData = [
    { month: "Jan", tickets: 65, resolved: 45, cost: 12000 },
    { month: "Feb", tickets: 78, resolved: 52, cost: 14500 },
    { month: "Mar", tickets: 92, resolved: 68, cost: 18200 },
    { month: "Apr", tickets: 85, resolved: 71, cost: 16800 },
    { month: "May", tickets: 110, resolved: 89, cost: 21000 },
    { month: "Jun", tickets: 256, resolved: 142, cost: 32500 },
  ];

  const statusData = [
    { name: "Completed", value: 142, fill: "#16A34A" },
    { name: "In Progress", value: 45, fill: "#F59E0B" },
    { name: "Open", value: 38, fill: "#1D4ED8" },
    { name: "On Hold", value: 15, fill: "#EF4444" },
  ];

  const categoryData = [
    { category: "Plumbing", count: 45, cost: 8500 },
    { category: "Electrical", count: 38, cost: 7200 },
    { category: "Heating", count: 32, cost: 6100 },
    { category: "Cleaning", count: 28, cost: 4200 },
    { category: "General", count: 24, cost: 3800 },
    { category: "Other", count: 89, cost: 11700 },
  ];

  const propertyData = [
    { property: "Tower A", tickets: 45, cost: 12500 },
    { property: "Tower B", tickets: 32, cost: 9800 },
    { property: "Tower C", tickets: 52, cost: 15200 },
    { property: "Tower D", tickets: 28, cost: 8900 },
    { property: "Tower E", tickets: 38, cost: 11300 },
  ];

  const priorityData = [
    { month: "Jan", urgent: 12, high: 28, normal: 25 },
    { month: "Feb", urgent: 18, high: 32, normal: 28 },
    { month: "Mar", urgent: 25, high: 38, normal: 29 },
    { month: "Apr", urgent: 22, high: 35, normal: 28 },
    { month: "May", urgent: 32, high: 45, normal: 33 },
    { month: "Jun", urgent: 68, high: 95, normal: 93 },
  ];

  // KPI Data
  const kpiData = {
    totalTickets: 256,
    resolved: 142,
    resolutionRate: "55.5%",
    totalCost: 103600,
    avgCost: 404,
    avgResponse: "2.4 hrs",
    sla: "94%",
  };

  // Export to PDF
  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const element = reportContentRef.current;
      if (!element) return;

      // Create a canvas from the element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add title page
      pdf.setFontSize(24);
      pdf.text("Maintenance Reports & Analytics", 105, 30, { align: "center" });
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 45, {
        align: "center",
      });

      // Add KPI summary
      pdf.setFontSize(14);
      pdf.text("Key Performance Indicators", 15, 65);
      pdf.setFontSize(10);

      const kpiText = [
        `Total Tickets: ${kpiData.totalTickets}`,
        `Resolved: ${kpiData.resolved}`,
        `Resolution Rate: ${kpiData.resolutionRate}`,
        `Total Cost: $${kpiData.totalCost.toLocaleString()}`,
        `Avg Cost per Ticket: $${kpiData.avgCost}`,
        `Avg Response Time: ${kpiData.avgResponse}`,
        `SLA Compliance: ${kpiData.sla}`,
      ];

      let yPos = 75;
      kpiText.forEach((text) => {
        pdf.text(text, 15, yPos);
        yPos += 6;
      });

      // Add chart content
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.text("Charts & Analytics", 15, 20);

      // Add the main chart image
      pdf.addImage(imgData, "PNG", 0, 30, imgWidth, imgHeight);

      // Add footer
      pdf.setFontSize(8);
      pdf.text(
        "Property Maintenance Ticket Management Platform",
        105,
        pdf.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );

      // Save the PDF
      pdf.save(`maintenance-report-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  // Export to Excel
  const handleExportExcel = () => {
    setExporting(true);
    try {
      const workbook = XLSX.utils.book_new();

      // Sheet 1: Summary
      const summaryData = [
        ["Maintenance Reports & Analytics"],
        [`Generated: ${new Date().toLocaleDateString()}`],
        [],
        ["Key Performance Indicators"],
        ["Metric", "Value"],
        ["Total Tickets", kpiData.totalTickets],
        ["Resolved Tickets", kpiData.resolved],
        ["Resolution Rate", kpiData.resolutionRate],
        ["Total Cost", `$${kpiData.totalCost.toLocaleString()}`],
        ["Average Cost per Ticket", `$${kpiData.avgCost}`],
        ["Average Response Time", kpiData.avgResponse],
        ["SLA Compliance", kpiData.sla],
      ];

      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      summarySheet["A1"].font = { bold: true, size: 14 };
      XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

      // Sheet 2: Monthly Trends
      const monthlySheet = XLSX.utils.json_to_sheet(monthlyData);
      monthlySheet["A1"].font = { bold: true };
      monthlySheet["B1"].font = { bold: true };
      monthlySheet["C1"].font = { bold: true };
      monthlySheet["D1"].font = { bold: true };
      XLSX.utils.book_append_sheet(workbook, monthlySheet, "Monthly Trends");

      // Sheet 3: Status Distribution
      const statusSheet = XLSX.utils.json_to_sheet(statusData);
      XLSX.utils.book_append_sheet(workbook, statusSheet, "Status Distribution");

      // Sheet 4: Category Analysis
      const categorySheet = XLSX.utils.json_to_sheet(categoryData);
      XLSX.utils.book_append_sheet(workbook, categorySheet, "Category Analysis");

      // Sheet 5: Property Costs
      const propertySheet = XLSX.utils.json_to_sheet(propertyData);
      XLSX.utils.book_append_sheet(workbook, propertySheet, "Property Costs");

      // Sheet 6: Priority Distribution
      const prioritySheet = XLSX.utils.json_to_sheet(priorityData);
      XLSX.utils.book_append_sheet(workbook, prioritySheet, "Priority Distribution");

      // Save the workbook
      XLSX.writeFile(
        workbook,
        `maintenance-report-${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Excel export failed:", error);
      alert("Failed to export Excel. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex h-screen bg-brand-bg">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Reports & Analytics
                </h1>
                <p className="text-gray-600 mt-2">
                  Comprehensive maintenance analytics and insights
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleExportPDF}
                  disabled={exporting}
                  className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {exporting ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  disabled={exporting}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {exporting ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  Excel
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <div className="flex gap-4">
                  {["week", "month", "quarter", "year"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setDateRange(range)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                        dateRange === range
                          ? "bg-brand-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div ref={reportContentRef}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Monthly Trends
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="tickets"
                        stroke="#1D4ED8"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="resolved"
                        stroke="#16A34A"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Ticket Status Distribution
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {statusData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Tickets by Category
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="#1D4ED8" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Cost by Category
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="cost" fill="#16A34A" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Top Properties by Cost
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={propertyData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" />
                      <YAxis dataKey="property" type="category" width={80} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="cost" fill="#F59E0B" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Priority Distribution Over Time
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={priorityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="urgent" stackId="a" fill="#EF4444" />
                      <Bar dataKey="high" stackId="a" fill="#F59E0B" />
                      <Bar dataKey="normal" stackId="a" fill="#1D4ED8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 font-semibold uppercase">
                    Total Tickets
                  </p>
                  <p className="text-3xl font-bold text-brand-primary mt-2">
                    {kpiData.totalTickets}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">+12% from last month</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 font-semibold uppercase">
                    Resolved
                  </p>
                  <p className="text-3xl font-bold text-brand-secondary mt-2">
                    {kpiData.resolved}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    {kpiData.resolutionRate} resolution rate
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 font-semibold uppercase">
                    Total Cost
                  </p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    ${(kpiData.totalCost / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Average: ${kpiData.avgCost}/ticket
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 font-semibold uppercase">
                    Avg Response
                  </p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {kpiData.avgResponse}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Within SLA: {kpiData.sla}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
