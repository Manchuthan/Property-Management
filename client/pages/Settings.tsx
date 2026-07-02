import { useState } from "react";
import { Save, Settings as SettingsIcon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "profile" | "categories" | "priority" | "notifications" | "whatsapp"
  >("profile");

  const [companyData, setCompanyData] = useState({
    name: "Property Maintenance Inc",
    email: "support@propmaint.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, New York, NY 10001",
  });

  const [categories, setCategories] = useState([
    "Plumbing",
    "Electrical",
    "Heating",
    "Furniture",
    "General Maintenance",
    "Noise Complaint",
    "Cleaning",
    "Others",
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [priorities, setPriorities] = useState([
    { level: "Urgent", color: "#EF4444" },
    { level: "High", color: "#F59E0B" },
    { level: "Normal", color: "#1D4ED8" },
  ]);

  const [notifications, setNotifications] = useState({
    emailOnNewTicket: true,
    emailOnStatusChange: true,
    emailOnAssignment: true,
    dailySummary: true,
    whatsappNotifications: true,
  });

  const [whatsappConfig, setWhatsappConfig] = useState({
    phoneNumber: "+1 (555) 987-6543",
    businessId: "XXXXXXXXXXXXXXXXXXXX",
    accessToken: "••••••••••••••••••••",
    isConfigured: true,
  });

  const handleCompanyChange = (field: string, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications],
    }));
  };

  const handleSave = () => {
    console.log("Saving settings...");
  };

  return (
    <div className="flex h-screen bg-brand-bg">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <SettingsIcon className="w-8 h-8 text-brand-primary" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">
                  Configure your application preferences
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="flex flex-col h-full">
                  <nav className="space-y-1 p-4">
                    {[
                      { id: "profile", label: "Company Profile" },
                      { id: "categories", label: "Categories" },
                      { id: "priority", label: "Priority Levels" },
                      { id: "whatsapp", label: "WhatsApp Config" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() =>
                          setActiveTab(
                            item.id as typeof activeTab
                          )
                        }
                        className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                          activeTab === item.id
                            ? "bg-blue-50 text-brand-primary border-l-4 border-brand-primary"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  {activeTab === "profile" && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-6">
                        Company Profile
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={companyData.name}
                            onChange={(e) =>
                              handleCompanyChange("name", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={companyData.email}
                            onChange={(e) =>
                              handleCompanyChange("email", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={companyData.phone}
                            onChange={(e) =>
                              handleCompanyChange("phone", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address
                          </label>
                          <input
                            type="text"
                            value={companyData.address}
                            onChange={(e) =>
                              handleCompanyChange("address", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "categories" && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-6">
                        Maintenance Categories
                      </h2>
                      <div className="mb-6">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Add new category"
                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                          <button
                            onClick={handleAddCategory}
                            className="px-6 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div
                            key={category}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <p className="font-semibold text-gray-900">
                              {category}
                            </p>
                            <button
                              onClick={() => handleRemoveCategory(category)}
                              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "priority" && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-6">
                        Priority Levels
                      </h2>
                      <div className="space-y-4">
                        {priorities.map((priority, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div
                                className="w-8 h-8 rounded-lg"
                                style={{ backgroundColor: priority.color }}
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">
                                  {priority.level}
                                </p>
                              </div>
                              <input
                                type="color"
                                value={priority.color}
                                disabled
                                className="w-12 h-10 rounded-lg cursor-pointer"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "notifications" && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-6">
                        Notification Settings
                      </h2>
                      <div className="space-y-4">
                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.emailOnNewTicket}
                            onChange={() =>
                              handleNotificationChange("emailOnNewTicket")
                            }
                            className="w-5 h-5 rounded border-gray-200 text-brand-primary"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Email on New Ticket
                            </p>
                            <p className="text-sm text-gray-600">
                              Get notified when a new ticket is created
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.emailOnStatusChange}
                            onChange={() =>
                              handleNotificationChange("emailOnStatusChange")
                            }
                            className="w-5 h-5 rounded border-gray-200 text-brand-primary"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Email on Status Change
                            </p>
                            <p className="text-sm text-gray-600">
                              Get notified when ticket status changes
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.emailOnAssignment}
                            onChange={() =>
                              handleNotificationChange("emailOnAssignment")
                            }
                            className="w-5 h-5 rounded border-gray-200 text-brand-primary"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Email on Assignment
                            </p>
                            <p className="text-sm text-gray-600">
                              Get notified when a ticket is assigned to you
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.dailySummary}
                            onChange={() =>
                              handleNotificationChange("dailySummary")
                            }
                            className="w-5 h-5 rounded border-gray-200 text-brand-primary"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              Daily Summary Email
                            </p>
                            <p className="text-sm text-gray-600">
                              Receive a daily summary of all activities
                            </p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.whatsappNotifications}
                            onChange={() =>
                              handleNotificationChange("whatsappNotifications")
                            }
                            className="w-5 h-5 rounded border-gray-200 text-brand-primary"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              WhatsApp Notifications
                            </p>
                            <p className="text-sm text-gray-600">
                              Receive important updates via WhatsApp
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {activeTab === "whatsapp" && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-6">
                        WhatsApp Business Configuration
                      </h2>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm font-semibold text-green-800">
                            ✓ WhatsApp is configured and active
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={whatsappConfig.phoneNumber}
                            disabled
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Business ID
                          </label>
                          <input
                            type="text"
                            value={whatsappConfig.businessId}
                            disabled
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Access Token
                          </label>
                          <input
                            type="password"
                            value={whatsappConfig.accessToken}
                            disabled
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
                          />
                        </div>

                        <button className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                          Regenerate Access Token
                        </button>

                        <button className="w-full px-4 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold">
                          Disconnect WhatsApp
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
