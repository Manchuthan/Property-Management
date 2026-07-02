import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const kpiData = [
    {
      label: "Total Tickets",
      value: "256",
      change: "+12%",
      icon: Ticket,
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Open Tickets",
      value: "78",
      change: "+5%",
      icon: Clock,
      color: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      label: "In Progress",
      value: "42",
      change: "-3%",
      icon: AlertCircle,
      color: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      label: "Completed",
      value: "114",
      change: "+8%",
      icon: CheckCircle,
      color: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  const ticketTrendData = [
    { month: "Jan", tickets: 65, resolved: 45 },
    { month: "Feb", tickets: 78, resolved: 52 },
    { month: "Mar", tickets: 92, resolved: 68 },
    { month: "Apr", tickets: 85, resolved: 71 },
    { month: "May", tickets: 110, resolved: 89 },
    { month: "Jun", tickets: 256, resolved: 142 },
  ];

  const categoryData = [
    { name: "Plumbing", value: 45, fill: "#1D4ED8" },
    { name: "Electrical", value: 38, fill: "#16A34A" },
    { name: "Heating", value: 32, fill: "#F59E0B" },
    { name: "Cleaning", value: 28, fill: "#EF4444" },
    { name: "General", value: 24, fill: "#8B5CF6" },
    { name: "Other", value: 89, fill: "#06B6D4" },
  ];

  const priorityData = [
    { name: "Urgent", tickets: 45, fill: "#EF4444" },
    { name: "High", tickets: 89, fill: "#F59E0B" },
    { name: "Normal", tickets: 122, fill: "#1D4ED8" },
  ];

  const costData = [
    { property: "Tower A", cost: 12500 },
    { property: "Tower B", cost: 9800 },
    { property: "Tower C", cost: 15200 },
    { property: "Tower D", cost: 8900 },
    { property: "Tower E", cost: 11300 },
  ];

  const recentTickets = [
    {
      id: "MNT-2024-001",
      property: "Tower A, Unit 205",
      category: "Plumbing",
      status: "Open",
      priority: "Urgent",
    },
    {
      id: "MNT-2024-002",
      property: "Tower B, Unit 102",
      category: "Electrical",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "MNT-2024-003",
      property: "Tower C, Unit 501",
      category: "Heating",
      status: "Open",
      priority: "Normal",
    },
    {
      id: "MNT-2024-004",
      property: "Tower D, Unit 308",
      category: "General",
      status: "Completed",
      priority: "Normal",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "text-red-600";
      case "High":
        return "text-orange-600";
      case "Normal":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex h-screen bg-brand-bg">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, Property Manager
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {kpiData.map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-soft p-6 hover:shadow-card transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 font-medium">
                          {kpi.label}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                          {kpi.value}
                        </p>
                        <p className="text-xs text-green-600 mt-2 font-semibold">
                          {kpi.change} from last month
                        </p>
                      </div>
                      <div className={`${kpi.color} p-3 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${kpi.textColor}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Maintenance Trends
                  </h2>
                  <button className="text-sm text-brand-primary hover:text-blue-700 font-semibold">
                    View All
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ticketTrendData}>
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
                      dot={{ fill: "#1D4ED8" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      stroke="#16A34A"
                      strokeWidth={2}
                      dot={{ fill: "#16A34A" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Tickets by Priority
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="tickets"
                    >
                      {priorityData.map((entry, idx) => (
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
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Tickets by Category
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" fill="#1D4ED8" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Maintenance Cost by Property
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" />
                    <YAxis dataKey="property" type="category" width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="cost" fill="#16A34A" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Tickets
                </h2>
                <Link
                  to="/tickets"
                  className="text-sm text-brand-primary hover:text-blue-700 font-semibold"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">
                        Ticket ID
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">
                        Property
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">
                        Category
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">
                        Status
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTickets.map((ticket, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <Link
                            to={`/ticket/${ticket.id}`}
                            className="text-sm font-semibold text-brand-primary hover:text-blue-700"
                          >
                            {ticket.id}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {ticket.property}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {ticket.category}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              ticket.status
                            )}`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className={`py-3 px-4 text-sm font-semibold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
