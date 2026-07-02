import { useState } from "react";
import { Plus, Edit, Trash2, Search, XCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

export default function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Property Manager",
  });

  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Property Manager",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Property Manager",
      status: "Active",
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      role: "Property Manager",
      status: "Active",
      joinDate: "2024-03-10",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "Property Agent/Worker",
      status: "Active",
      joinDate: "2024-04-05",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert.wilson@company.com",
      role: "Property Manager",
      status: "Active",
      joinDate: "2024-05-12",
    },
    {
      id: "6",
      name: "Jennifer Martinez",
      email: "jennifer.martinez@company.com",
      role: "Property Agent/Worker",
      status: "Inactive",
      joinDate: "2024-06-01",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving user:", editingUser ? "update" : "create", formData);
    setShowForm(false);
    setFormData({ name: "", email: "", role: "Property Manager" });
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowForm(true);
  };

  const handleDelete = (userId: string) => {
    console.log("Deleting user:", userId);
  };

  const getRoleColor = (role: string) => {
    return role === "Property Manager"
      ? "bg-blue-100 text-blue-800"
      : "bg-purple-100 text-purple-800";
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
                  User Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage team members and their roles
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ name: "", email: "", role: "Property Manager" });
                  setShowForm(!showForm);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add User
              </button>
            </div>

            {showForm && (
              <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    {editingUser ? "Edit User" : "Create New User"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingUser(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@company.com"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Role *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      >
                        <option>Property Manager</option>
                        <option>Property Agent/Worker</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingUser(null);
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      {editingUser ? "Update User" : "Create User"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
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
                        Name
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Email
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Role
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Status
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-600 py-4 px-6">
                        Join Date
                      </th>
                      <th className="text-center text-xs font-semibold text-gray-600 py-4 px-6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <p className="text-sm font-semibold text-gray-900">
                              {user.name}
                            </p>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {user.email}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                                user.role
                              )}`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {user.joinDate}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleEdit(user)}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <XCircle className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 px-6 text-center text-gray-500">
                          No users found.
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
