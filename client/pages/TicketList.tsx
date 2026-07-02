import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Ticket {
  id: string;
  property: string;
  tenant: string;
  category: string;
  priority: string;
  status: string;
  createdDate: string;
  updatedDate: string;
}

export default function TicketList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    property: "",
    category: "",
    priority: "",
    status: "",
  });

  const properties = ["Tower A", "Tower B", "Tower C", "Tower D", "Tower E"];
  const categories = [
    "Plumbing",
    "Electrical",
    "Heating",
    "Furniture",
    "General Maintenance",
    "Noise Complaint",
    "Cleaning",
    "Others",
  ];
  const priorities = ["Urgent", "High", "Normal"];
  const statuses = ["New", "Open", "In Progress", "On Hold", "Completed", "Cancelled"];

  const allTickets: Ticket[] = [
    {
      id: "MNT-2024-001",
      property: "Tower A",
      tenant: "John Smith",
      category: "Plumbing",
      priority: "Urgent",
      status: "Open",
      createdDate: "2024-06-28",
      updatedDate: "2024-06-30",
    },
    {
      id: "MNT-2024-002",
      property: "Tower B",
      tenant: "Sarah Johnson",
      category: "Electrical",
      priority: "High",
      status: "In Progress",
      createdDate: "2024-06-27",
      updatedDate: "2024-06-29",
    },
    {
      id: "MNT-2024-003",
      property: "Tower C",
      tenant: "Michael Brown",
      category: "Heating",
      priority: "Normal",
      status: "Open",
      createdDate: "2024-06-26",
      updatedDate: "2024-06-30",
    },
    {
      id: "MNT-2024-004",
      property: "Tower A",
      tenant: "Emily Davis",
      category: "General Maintenance",
      priority: "Normal",
      status: "Completed",
      createdDate: "2024-06-25",
      updatedDate: "2024-06-28",
    },
    {
      id: "MNT-2024-005",
      property: "Tower D",
      tenant: "Robert Wilson",
      category: "Cleaning",
      priority: "Normal",
      status: "In Progress",
      createdDate: "2024-06-24",
      updatedDate: "2024-06-30",
    },
    {
      id: "MNT-2024-006",
      property: "Tower E",
      tenant: "Jennifer Martinez",
      category: "Plumbing",
      priority: "Urgent",
      status: "Open",
      createdDate: "2024-06-23",
      updatedDate: "2024-06-30",
    },
    {
      id: "MNT-2024-007",
      property: "Tower B",
      tenant: "David Lee",
      category: "Furniture",
      priority: "High",
      status: "New",
      createdDate: "2024-06-22",
      updatedDate: "2024-06-30",
    },
    {
      id: "MNT-2024-008",
      property: "Tower C",
      tenant: "Linda Garcia",
      category: "Noise Complaint",
      priority: "Normal",
      status: "Completed",
      createdDate: "2024-06-21",
      updatedDate: "2024-06-27",
    },
    {
      id: "MNT-2024-009",
      property: "Tower A",
      tenant: "James Anderson",
      category: "Electrical",
      priority: "High",
      status: "On Hold",
      createdDate: "2024-06-20",
      updatedDate: "2024-06-29",
    },
    {
      id: "MNT-2024-010",
      property: "Tower D",
      tenant: "Patricia Taylor",
      category: "Heating",
      priority: "Urgent",
      status: "In Progress",
      createdDate: "2024-06-19",
      updatedDate: "2024-06-30",
    },
    {
      id: "MNT-2024-011",
      property: "Tower E",
      tenant: "Christopher Thomas",
      category: "General Maintenance",
      priority: "Normal",
      status: "Completed",
      createdDate: "2024-06-18",
      updatedDate: "2024-06-26",
    },
    {
      id: "MNT-2024-012",
      property: "Tower B",
      tenant: "Mary Jackson",
      category: "Cleaning",
      priority: "Normal",
      status: "Open",
      createdDate: "2024-06-17",
      updatedDate: "2024-06-30",
    },
  ];

  const filteredTickets = allTickets.filter((ticket) => {
    const matchSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.tenant.toLowerCase().includes(searchTerm.toLowerCase());

    const matchProperty = !filters.property || ticket.property === filters.property;
    const matchCategory = !filters.category || ticket.category === filters.category;
    const matchPriority = !filters.priority || ticket.priority === filters.priority;
    const matchStatus = !filters.status || ticket.status === filters.status;

    return matchSearch && matchProperty && matchCategory && matchPriority && matchStatus;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-purple-100 text-purple-800";
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "text-red-600 font-bold";
      case "High":
        return "text-orange-600 font-semibold";
      case "Normal":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev] === value ? "" : value,
    }));
    setCurrentPage(1);
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log(`Exporting ${format.toUpperCase()}`);
  };

  return (
    <div className="flex h-screen bg-brand-bg">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Maintenance Tickets
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage and track all maintenance requests
                </p>
              </div>
              <Link
                to="/tickets/create"
                className="px-4 py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                + New Ticket
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by ticket ID, property, or tenant..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-t border-gray-200 pt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Property
                    </label>
                    <div className="space-y-2">
                      {properties.map((prop) => (
                        <label key={prop} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.property === prop}
                            onChange={() => handleFilterChange("property", prop)}
                            className="w-4 h-4 rounded border-gray-200 text-brand-primary"
                          />
                          <span className="text-sm text-gray-700">{prop}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.category === cat}
                            onChange={() => handleFilterChange("category", cat)}
                            className="w-4 h-4 rounded border-gray-200 text-brand-primary"
                          />
                          <span className="text-sm text-gray-700">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Priority
                    </label>
                    <div className="space-y-2">
                      {priorities.map((p) => (
                        <label key={p} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.priority === p}
                            onChange={() => handleFilterChange("priority", p)}
                            className="w-4 h-4 rounded border-gray-200 text-brand-primary"
                          />
                          <span className="text-sm text-gray-700">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {statuses.map((status) => (
                        <label key={status} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.status === status}
                            onChange={() => handleFilterChange("status", status)}
                            className="w-4 h-4 rounded border-gray-200 text-brand-primary"
                          />
                          <span className="text-sm text-gray-700">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredTickets.length)} of{" "}
                  {filteredTickets.length} tickets
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleExport("csv")}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    CSV
                  </button>
                  <button
                    onClick={() => handleExport("pdf")}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        <button className="flex items-center gap-2 hover:text-gray-900">
                          Ticket ID
                          <ArrowUpDown className="w-4 h-4" />
                        </button>
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Property
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Tenant
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Category
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Priority
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Status
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Created
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTickets.length > 0 ? (
                      paginatedTickets.map((ticket) => (
                        <tr
                          key={ticket.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <Link
                              to={`/ticket/${ticket.id}`}
                              className="text-sm font-semibold text-brand-primary hover:text-blue-700"
                            >
                              {ticket.id}
                            </Link>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {ticket.property}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {ticket.tenant}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {ticket.category}
                          </td>
                          <td className={`py-4 px-6 text-sm ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                ticket.status
                              )}`}
                            >
                              {ticket.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {ticket.createdDate}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {ticket.updatedDate}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 px-6 text-center text-gray-500">
                          No tickets found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={() =>
                      setCurrentPage(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                  >
                    Previous
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg transition-colors font-semibold text-sm ${
                            currentPage === page
                              ? "bg-brand-primary text-white"
                              : "border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
