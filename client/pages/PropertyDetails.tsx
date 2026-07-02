import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  X,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  moveInDate: string;
  lease: string;
}

// Property Data Map
const propertyDataMap: Record<string, any> = {
  "1": {
    id: "1",
    name: "Tower A",
    address: "123 Main Street, New York, NY 10001",
    owner: "Smith Properties LLC",
    ownerEmail: "owner@smithproperties.com",
    ownerPhone: "+1 (555) 111-2222",
    manager: "Sarah Johnson",
    managerEmail: "sarah.johnson@company.com",
    managerPhone: "+1 (555) 222-3333",
    totalTickets: 45,
    openTickets: 8,
    totalCost: "$12,500",
    description: "Modern residential complex with 50 units across 5 floors. Built in 2015 with regular maintenance.",
  },
  "2": {
    id: "2",
    name: "Tower B",
    address: "456 Oak Avenue, New York, NY 10002",
    owner: "Brown Real Estate",
    ownerEmail: "owner@brownrealty.com",
    ownerPhone: "+1 (555) 222-3333",
    manager: "Mike Johnson",
    managerEmail: "mike.johnson@company.com",
    managerPhone: "+1 (555) 333-4444",
    totalTickets: 32,
    openTickets: 5,
    totalCost: "$9,800",
    description: "Contemporary office complex with flexible workspace solutions. 40 units available.",
  },
  "3": {
    id: "3",
    name: "Tower C",
    address: "789 Pine Road, New York, NY 10003",
    owner: "Davis Investments",
    ownerEmail: "owner@davisinvest.com",
    ownerPhone: "+1 (555) 333-4444",
    manager: "Emily Davis",
    managerEmail: "emily.davis@company.com",
    managerPhone: "+1 (555) 444-5555",
    totalTickets: 52,
    openTickets: 12,
    totalCost: "$15,200",
    description: "Premium residential building with luxury amenities. 55 units with modern facilities.",
  },
  "4": {
    id: "4",
    name: "Tower D",
    address: "321 Elm Street, New York, NY 10004",
    owner: "Wilson Management Co",
    ownerEmail: "owner@wilsonmgt.com",
    ownerPhone: "+1 (555) 444-5555",
    manager: "Robert Wilson",
    managerEmail: "robert.wilson@company.com",
    managerPhone: "+1 (555) 555-6666",
    totalTickets: 28,
    openTickets: 3,
    totalCost: "$8,900",
    description: "Well-maintained mid-rise property with excellent tenant retention. 35 units.",
  },
  "5": {
    id: "5",
    name: "Tower E",
    address: "654 Maple Drive, New York, NY 10005",
    owner: "Garcia Properties",
    ownerEmail: "owner@garciaprops.com",
    ownerPhone: "+1 (555) 555-6666",
    manager: "Jennifer Martinez",
    managerEmail: "jennifer.martinez@company.com",
    managerPhone: "+1 (555) 666-7777",
    totalTickets: 38,
    openTickets: 7,
    totalCost: "$11,300",
    description: "Eco-friendly sustainable building with green certifications. 45 units.",
  },
};

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [property, setProperty] = useState({
    ...(propertyDataMap[id || "1"] || propertyDataMap["1"]),
  });

  // Tenant Data Map by Property
  const tenantDataMap: Record<string, Tenant[]> = {
    "1": [
      {
        id: "1",
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        unit: "205",
        moveInDate: "2022-03-15",
        lease: "2024-03-15",
      },
      {
        id: "2",
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "+1 (555) 234-5678",
        unit: "308",
        moveInDate: "2021-08-20",
        lease: "2025-08-20",
      },
      {
        id: "3",
        name: "Robert Wilson",
        email: "robert.wilson@email.com",
        phone: "+1 (555) 345-6789",
        unit: "412",
        moveInDate: "2023-01-10",
        lease: "2025-01-10",
      },
    ],
    "2": [
      {
        id: "1",
        name: "Lisa Anderson",
        email: "lisa.anderson@email.com",
        phone: "+1 (555) 456-7890",
        unit: "101",
        moveInDate: "2023-06-01",
        lease: "2025-06-01",
      },
      {
        id: "2",
        name: "Mark Johnson",
        email: "mark.johnson@email.com",
        phone: "+1 (555) 567-8901",
        unit: "202",
        moveInDate: "2022-09-10",
        lease: "2024-09-10",
      },
    ],
    "3": [
      {
        id: "1",
        name: "Sarah Williams",
        email: "sarah.williams@email.com",
        phone: "+1 (555) 678-9012",
        unit: "301",
        moveInDate: "2021-12-15",
        lease: "2024-12-15",
      },
      {
        id: "2",
        name: "Michael Brown",
        email: "michael.brown@email.com",
        phone: "+1 (555) 789-0123",
        unit: "402",
        moveInDate: "2023-02-20",
        lease: "2025-02-20",
      },
      {
        id: "3",
        name: "Jessica Garcia",
        email: "jessica.garcia@email.com",
        phone: "+1 (555) 890-1234",
        unit: "503",
        moveInDate: "2022-05-05",
        lease: "2024-05-05",
      },
    ],
    "4": [
      {
        id: "1",
        name: "David Lee",
        email: "david.lee@email.com",
        phone: "+1 (555) 901-2345",
        unit: "101",
        moveInDate: "2023-01-15",
        lease: "2025-01-15",
      },
      {
        id: "2",
        name: "Amanda Martinez",
        email: "amanda.martinez@email.com",
        phone: "+1 (555) 012-3456",
        unit: "205",
        moveInDate: "2022-10-20",
        lease: "2024-10-20",
      },
    ],
    "5": [
      {
        id: "1",
        name: "Jennifer White",
        email: "jennifer.white@email.com",
        phone: "+1 (555) 123-5678",
        unit: "101",
        moveInDate: "2023-03-10",
        lease: "2025-03-10",
      },
      {
        id: "2",
        name: "Christopher Davis",
        email: "chris.davis@email.com",
        phone: "+1 (555) 234-6789",
        unit: "202",
        moveInDate: "2022-08-15",
        lease: "2024-08-15",
      },
      {
        id: "3",
        name: "Nicole Taylor",
        email: "nicole.taylor@email.com",
        phone: "+1 (555) 345-7890",
        unit: "303",
        moveInDate: "2021-11-01",
        lease: "2024-11-01",
      },
      {
        id: "4",
        name: "Daniel Harris",
        email: "daniel.harris@email.com",
        phone: "+1 (555) 456-8901",
        unit: "404",
        moveInDate: "2023-04-20",
        lease: "2025-04-20",
      },
    ],
  };

  const [tenants, setTenants] = useState<Tenant[]>(
    tenantDataMap[id || "1"] || tenantDataMap["1"]
  );

  const [showAddTenant, setShowAddTenant] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [tenantForm, setTenantForm] = useState({
    name: "",
    email: "",
    phone: "",
    unit: "",
    moveInDate: "",
    lease: "",
  });

  const [editingProperty, setEditingProperty] = useState(false);
  const [propertyForm, setPropertyForm] = useState(property);

  const propertyTicketsMap: Record<string, any[]> = {
    "1": [
      { id: "MNT-2024-001", unit: "205", status: "Open", priority: "Urgent" },
      { id: "MNT-2024-004", unit: "308", status: "In Progress", priority: "High" },
      { id: "MNT-2024-007", unit: "412", status: "Completed", priority: "Normal" },
      { id: "MNT-2024-010", unit: "205", status: "Open", priority: "Normal" },
      { id: "MNT-2024-013", unit: "308", status: "On Hold", priority: "High" },
    ],
    "2": [
      { id: "MNT-2024-002", unit: "101", status: "In Progress", priority: "High" },
      { id: "MNT-2024-005", unit: "202", status: "Completed", priority: "Normal" },
      { id: "MNT-2024-008", unit: "101", status: "Open", priority: "Normal" },
    ],
    "3": [
      { id: "MNT-2024-003", unit: "301", status: "Open", priority: "Urgent" },
      { id: "MNT-2024-006", unit: "402", status: "In Progress", priority: "High" },
      { id: "MNT-2024-009", unit: "503", status: "Completed", priority: "Normal" },
      { id: "MNT-2024-011", unit: "301", status: "Open", priority: "High" },
      { id: "MNT-2024-012", unit: "402", status: "On Hold", priority: "Normal" },
    ],
    "4": [
      { id: "MNT-2024-014", unit: "101", status: "Completed", priority: "Normal" },
      { id: "MNT-2024-015", unit: "205", status: "Open", priority: "High" },
    ],
    "5": [
      { id: "MNT-2024-016", unit: "101", status: "In Progress", priority: "High" },
      { id: "MNT-2024-017", unit: "202", status: "Open", priority: "Normal" },
      { id: "MNT-2024-018", unit: "303", status: "Completed", priority: "Normal" },
      { id: "MNT-2024-019", unit: "404", status: "Open", priority: "Urgent" },
    ],
  };

  const propertyTickets = propertyTicketsMap[id || "1"] || propertyTicketsMap["1"];

  const handleAddTenant = () => {
    if (
      tenantForm.name &&
      tenantForm.email &&
      tenantForm.phone &&
      tenantForm.unit
    ) {
      if (editingTenant) {
        setTenants(
          tenants.map((t) =>
            t.id === editingTenant.id ? { ...tenantForm, id: t.id } : t
          )
        );
        setEditingTenant(null);
      } else {
        setTenants([
          ...tenants,
          {
            ...tenantForm,
            id: Date.now().toString(),
          },
        ]);
      }
      setTenantForm({
        name: "",
        email: "",
        phone: "",
        unit: "",
        moveInDate: "",
        lease: "",
      });
      setShowAddTenant(false);
    }
  };

  const handleEditTenant = (tenant: Tenant) => {
    setEditingTenant(tenant);
    setTenantForm(tenant);
    setShowAddTenant(true);
  };

  const handleDeleteTenant = (tenantId: string) => {
    setTenants(tenants.filter((t) => t.id !== tenantId));
  };

  const handleSaveProperty = () => {
    setProperty(propertyForm);
    setEditingProperty(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-brand-bg">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            <button
              onClick={() => navigate("/properties")}
              className="flex items-center gap-2 text-brand-primary hover:text-blue-700 mb-6 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Properties
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Property Overview */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      {editingProperty ? (
                        <input
                          type="text"
                          value={propertyForm.name}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              name: e.target.value,
                            })
                          }
                          className="text-2xl font-bold text-gray-900 border-b-2 border-brand-primary pb-2"
                        />
                      ) : (
                        <h1 className="text-2xl font-bold text-gray-900">
                          {property.name}
                        </h1>
                      )}
                    </div>
                    {editingProperty ? (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveProperty}
                          className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setPropertyForm(property);
                            setEditingProperty(false);
                          }}
                          className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setPropertyForm(property);
                          setEditingProperty(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">
                        Address
                      </p>
                      {editingProperty ? (
                        <input
                          type="text"
                          value={propertyForm.address}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              address: e.target.value,
                            })
                          }
                          className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                      ) : (
                        <p className="text-sm text-gray-700 mt-1">
                          {property.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">
                        Description
                      </p>
                      {editingProperty ? (
                        <textarea
                          value={propertyForm.description}
                          onChange={(e) =>
                            setPropertyForm({
                              ...propertyForm,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                          className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                      ) : (
                        <p className="text-sm text-gray-700 mt-1">
                          {property.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Owner & Manager Info */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">
                    Owner & Manager Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase mb-2">
                        Property Owner
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {property.owner}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <Mail className="w-4 h-4" />
                        {property.ownerEmail}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Phone className="w-4 h-4" />
                        {property.ownerPhone}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase mb-2">
                        Property Manager
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {property.manager}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <Mail className="w-4 h-4" />
                        {property.managerEmail}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Phone className="w-4 h-4" />
                        {property.managerPhone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tenants List */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">
                      Tenants ({tenants.length})
                    </h2>
                    <button
                      onClick={() => {
                        setEditingTenant(null);
                        setTenantForm({
                          name: "",
                          email: "",
                          phone: "",
                          unit: "",
                          moveInDate: "",
                          lease: "",
                        });
                        setShowAddTenant(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Tenant
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tenants.map((tenant) => (
                      <div
                        key={tenant.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-soft transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {tenant.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Unit {tenant.unit}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditTenant(tenant)}
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteTenant(tenant.id)}
                              className="p-2 hover:bg-red-100 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 truncate">
                              {tenant.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{tenant.phone}</span>
                          </div>
                          {tenant.moveInDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                Move in: {new Date(tenant.moveInDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {tenant.lease && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                Lease end: {new Date(tenant.lease).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Tickets */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">
                    Recent Tickets
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-600">
                            Ticket ID
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-600">
                            Unit
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-600">
                            Status
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-600">
                            Priority
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {propertyTickets.map((ticket) => (
                          <tr
                            key={ticket.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-3">
                              <span className="text-brand-primary font-semibold">
                                {ticket.id}
                              </span>
                            </td>
                            <td className="py-3 px-3">{ticket.unit}</td>
                            <td className="py-3 px-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                  ticket.status
                                )}`}
                              >
                                {ticket.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-semibold">
                              {ticket.priority}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Statistics
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 font-semibold uppercase">
                        Total Tickets
                      </p>
                      <p className="text-2xl font-bold text-brand-primary mt-2">
                        {property.totalTickets}
                      </p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 font-semibold uppercase">
                        Open Tickets
                      </p>
                      <p className="text-2xl font-bold text-red-600 mt-2">
                        {property.openTickets}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 font-semibold uppercase">
                        Total Cost
                      </p>
                      <p className="text-2xl font-bold text-brand-secondary mt-2">
                        {property.totalCost}
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 font-semibold uppercase">
                        Total Units
                      </p>
                      <p className="text-2xl font-bold text-purple-600 mt-2">
                        {tenants.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Tenant Modal */}
      {showAddTenant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingTenant ? "Edit Tenant" : "Add New Tenant"}
              </h2>
              <button
                onClick={() => {
                  setShowAddTenant(false);
                  setEditingTenant(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={tenantForm.name}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, name: e.target.value })
                  }
                  placeholder="Full name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={tenantForm.email}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, email: e.target.value })
                  }
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={tenantForm.phone}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, phone: e.target.value })
                  }
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Unit Number *
                </label>
                <input
                  type="text"
                  value={tenantForm.unit}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, unit: e.target.value })
                  }
                  placeholder="e.g., 205"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Move In Date
                </label>
                <input
                  type="date"
                  value={tenantForm.moveInDate}
                  onChange={(e) =>
                    setTenantForm({
                      ...tenantForm,
                      moveInDate: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lease End Date
                </label>
                <input
                  type="date"
                  value={tenantForm.lease}
                  onChange={(e) =>
                    setTenantForm({ ...tenantForm, lease: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddTenant(false);
                  setEditingTenant(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTenant}
                className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {editingTenant ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
