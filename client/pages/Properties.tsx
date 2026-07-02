import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, DollarSign, AlertCircle, Building2, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Property {
  id: string;
  name: string;
  address: string;
  owner: string;
  manager: string;
  totalTickets: number;
  openTickets: number;
  totalCost: string;
}

export default function Properties() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);

  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      name: "Tower A",
      address: "123 Main Street, New York, NY 10001",
      owner: "Smith Properties LLC",
      manager: "Sarah Johnson",
      totalTickets: 45,
      openTickets: 8,
      totalCost: "$12,500",
    },
    {
      id: "2",
      name: "Tower B",
      address: "456 Oak Avenue, New York, NY 10002",
      owner: "Brown Real Estate",
      manager: "Mike Johnson",
      totalTickets: 32,
      openTickets: 5,
      totalCost: "$9,800",
    },
    {
      id: "3",
      name: "Tower C",
      address: "789 Pine Road, New York, NY 10003",
      owner: "Davis Investments",
      manager: "Emily Davis",
      totalTickets: 52,
      openTickets: 12,
      totalCost: "$15,200",
    },
    {
      id: "4",
      name: "Tower D",
      address: "321 Elm Street, New York, NY 10004",
      owner: "Wilson Management Co",
      manager: "Robert Wilson",
      totalTickets: 28,
      openTickets: 3,
      totalCost: "$8,900",
    },
    {
      id: "5",
      name: "Tower E",
      address: "654 Maple Drive, New York, NY 10005",
      owner: "Garcia Properties",
      manager: "Jennifer Martinez",
      totalTickets: 38,
      openTickets: 7,
      totalCost: "$11,300",
    },
  ]);

  const [newProperty, setNewProperty] = useState({
    name: "",
    address: "",
    owner: "",
    manager: "",
  });

  const filteredProperties = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProperty = () => {
    if (newProperty.name && newProperty.address && newProperty.owner && newProperty.manager) {
      setProperties([
        ...properties,
        {
          id: Date.now().toString(),
          ...newProperty,
          totalTickets: 0,
          openTickets: 0,
          totalCost: "$0",
        },
      ]);
      setNewProperty({ name: "", address: "", owner: "", manager: "" });
      setShowAddProperty(false);
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
                <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
                <p className="text-gray-600 mt-2">
                  Manage all your properties and view maintenance costs
                </p>
              </div>
              <button
                onClick={() => setShowAddProperty(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Property
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-3">
                    {filteredProperties.length > 0 ? (
                      filteredProperties.map((property) => (
                        <button
                          key={property.id}
                          onClick={() => setSelectedProperty(property)}
                          className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                            selectedProperty?.id === property.id
                              ? "border-brand-primary bg-blue-50"
                              : "border-gray-200 hover:border-brand-primary hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-6 h-6 text-brand-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900">
                                {property.name}
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {property.address}
                              </p>
                              <div className="flex gap-4 mt-2 text-xs">
                                <span className="text-gray-600">
                                  {property.totalTickets} tickets
                                </span>
                                <span className="text-red-600 font-semibold">
                                  {property.openTickets} open
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        No properties found
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedProperty && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-soft p-6 sticky top-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                      {selectedProperty.name}
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">
                          Address
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {selectedProperty.address}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">
                          Owner
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {selectedProperty.owner}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">
                          Property Manager
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          {selectedProperty.manager}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-xs text-gray-600 font-semibold">
                              Total Tickets
                            </p>
                            <p className="text-2xl font-bold text-brand-primary mt-2">
                              {selectedProperty.totalTickets}
                            </p>
                          </div>
                          <div className="bg-red-50 rounded-lg p-4">
                            <p className="text-xs text-gray-600 font-semibold">
                              Open Tickets
                            </p>
                            <p className="text-2xl font-bold text-red-600 mt-2">
                              {selectedProperty.openTickets}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                          <DollarSign className="w-6 h-6 text-brand-secondary" />
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">
                              Total Maintenance Cost
                            </p>
                            <p className="text-xl font-bold text-brand-secondary mt-1">
                              {selectedProperty.totalCost}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/property/${selectedProperty.id}`}
                        className="w-full block text-center mt-4 px-4 py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details & Tenants
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Property Modal */}
      {showAddProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Property</h2>
              <button
                onClick={() => setShowAddProperty(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Name *
                </label>
                <input
                  type="text"
                  value={newProperty.name}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, name: e.target.value })
                  }
                  placeholder="e.g., Tower A"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={newProperty.address}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, address: e.target.value })
                  }
                  placeholder="Full address"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Owner Name *
                </label>
                <input
                  type="text"
                  value={newProperty.owner}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, owner: e.target.value })
                  }
                  placeholder="Property owner name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Manager *
                </label>
                <input
                  type="text"
                  value={newProperty.manager}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, manager: e.target.value })
                  }
                  placeholder="Manager name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddProperty(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProperty}
                className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Add Property
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
