import { useState } from "react";
import { Plus, Edit, Trash2, Search, Download } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Invoice {
  id: string;
  invoiceNumber: string;
  description: string;
  amount: string;
  date: string;
  vendor: string;
  property: string;
  ticket: string;
}

export default function Invoices() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      description: "Plumbing repair - pipe replacement",
      amount: "$450.00",
      date: "2024-06-30",
      vendor: "ABC Plumbing Services",
      property: "Tower A",
      ticket: "MNT-2024-001",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      description: "Electrical wiring fix",
      amount: "$320.00",
      date: "2024-06-28",
      vendor: "Elite Electrical",
      property: "Tower B",
      ticket: "MNT-2024-002",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      description: "HVAC system maintenance",
      amount: "$580.00",
      date: "2024-06-26",
      vendor: "Climate Control Inc",
      property: "Tower C",
      ticket: "MNT-2024-003",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      description: "General maintenance supplies",
      amount: "$125.50",
      date: "2024-06-24",
      vendor: "Building Supplies Co",
      property: "Tower A",
      ticket: "MNT-2024-004",
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-005",
      description: "Cleaning services",
      amount: "$200.00",
      date: "2024-06-22",
      vendor: "Professional Cleaning Ltd",
      property: "Tower D",
      ticket: "MNT-2024-005",
    },
    {
      id: "6",
      invoiceNumber: "INV-2024-006",
      description: "Plumbing inspection and repair",
      amount: "$380.00",
      date: "2024-06-20",
      vendor: "ABC Plumbing Services",
      property: "Tower E",
      ticket: "MNT-2024-006",
    },
  ];

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = invoices
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.]/g, "")), 0)
    .toFixed(2);

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
                  Invoices & Costs
                </h1>
                <p className="text-gray-600 mt-2">
                  Track and manage maintenance expenses
                </p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Invoice
              </button>
            </div>

            {showForm && (
              <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Add New Invoice
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Invoice Number *
                    </label>
                    <input
                      type="text"
                      placeholder="INV-2024-007"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Vendor *
                    </label>
                    <input
                      type="text"
                      placeholder="Vendor name"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Property *
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent">
                      <option>Select Property</option>
                      <option>Tower A</option>
                      <option>Tower B</option>
                      <option>Tower C</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ticket
                    </label>
                    <input
                      type="text"
                      placeholder="MNT-2024-XXX"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      placeholder="Invoice description"
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Save Invoice
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-semibold uppercase">
                    Total Invoices
                  </p>
                  <p className="text-2xl font-bold text-brand-primary mt-2">
                    {invoices.length}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-semibold uppercase">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-brand-secondary mt-2">
                    ${totalAmount}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-semibold uppercase">
                    Average Invoice
                  </p>
                  <p className="text-2xl font-bold text-orange-600 mt-2">
                    ${(parseFloat(totalAmount) / invoices.length).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Invoice #
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Description
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Vendor
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Property
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Ticket
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Date
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Amount
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-600 py-4 px-6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <span className="text-sm font-semibold text-brand-primary">
                              {invoice.invoiceNumber}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {invoice.description}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {invoice.vendor}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {invoice.property}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {invoice.ticket}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {invoice.date}
                          </td>
                          <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                            {invoice.amount}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex gap-2 justify-center">
                              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 px-6 text-center text-gray-500">
                          No invoices found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
