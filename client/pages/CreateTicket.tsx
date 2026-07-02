import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, ArrowLeft, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function CreateTicket() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    property: "",
    unit: "",
    tenantName: "",
    phoneNumber: "",
    source: "phone-call",
    category: "",
    subCategory: "",
    priority: "normal",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Tags Management
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showNewSubcategoryInput, setShowNewSubcategoryInput] = useState(false);
  const [newSubcategoryInput, setNewSubcategoryInput] = useState("");
  const [subcategories, setSubcategories] = useState<Record<string, string[]>>({
    Plumbing: ["Leak", "Clogged Drain", "No Water", "Pipe Burst"],
    Electrical: ["No Power", "Faulty Outlet", "Faulty Switch", "Lighting Issue"],
    Heating: ["No Heat", "Noisy System", "Thermostat Issue", "Radiator Problem"],
    Furniture: ["Broken Chair", "Broken Table", "Cabinet Issue", "Sofa Damage"],
    "General Maintenance": ["Door Lock", "Paint", "Carpet", "Cleaning"],
    "Noise Complaint": ["Neighbors", "Construction", "Music", "Other"],
    Cleaning: ["Room Cleaning", "Common Area", "Carpet Cleaning", "Window Cleaning"],
    Others: [],
  });

  const properties = [
    "Tower A",
    "Tower B",
    "Tower C",
    "Tower D",
    "Tower E",
  ];

  const categories = Object.keys(subcategories);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { subCategory: "" }),
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddSubcategory = () => {
    if (newSubcategoryInput.trim() && formData.category) {
      const category = formData.category as keyof typeof subcategories;
      setSubcategories((prev) => ({
        ...prev,
        [category]: [...(prev[category] || []), newSubcategoryInput.trim()],
      }));
      setFormData((prev) => ({
        ...prev,
        subCategory: newSubcategoryInput.trim(),
      }));
      setNewSubcategoryInput("");
      setShowNewSubcategoryInput(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...images, ...files].slice(0, 5);
    setImages(newFiles);

    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/tickets");
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-brand-bg">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-brand-primary hover:text-blue-700 mb-6 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Create Maintenance Ticket
                </h1>
                <p className="text-gray-600 mt-2">
                  Fill out the form below to create a new maintenance request
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">
                    Property & Tenant Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Property *
                      </label>
                      <select
                        name="property"
                        value={formData.property}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      >
                        <option value="">Select Property</option>
                        {properties.map((prop) => (
                          <option key={prop} value={prop}>
                            {prop}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Unit Number *
                      </label>
                      <input
                        type="text"
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        placeholder="e.g., 205"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tenant Name *
                      </label>
                      <input
                        type="text"
                        name="tenantName"
                        value={formData.tenantName}
                        onChange={handleInputChange}
                        placeholder="e.g., John Smith"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., +1 (555) 123-4567"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">
                    Request Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Source *
                      </label>
                      <select
                        name="source"
                        value={formData.source}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      >
                        <option value="phone-call">Phone Call</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Sub Category
                      </label>
                      <div className="flex gap-2">
                        <select
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          disabled={!formData.category}
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        >
                          <option value="">
                            {formData.category ? "Select Sub Category" : "Select Category First"}
                          </option>
                          {formData.category &&
                            (subcategories[formData.category as keyof typeof subcategories] || []).map(
                              (subCat) => (
                                <option key={subCat} value={subCat}>
                                  {subCat}
                                </option>
                              )
                            )}
                        </select>
                        <button
                          type="button"
                          onClick={() => setShowNewSubcategoryInput(!showNewSubcategoryInput)}
                          disabled={!formData.category}
                          className="px-4 py-2.5 bg-brand-secondary text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Add new subcategory"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      {showNewSubcategoryInput && (
                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            value={newSubcategoryInput}
                            onChange={(e) => setNewSubcategoryInput(e.target.value)}
                            placeholder="New subcategory name"
                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent text-sm"
                          />
                          <button
                            type="button"
                            onClick={handleAddSubcategory}
                            className="px-4 py-2.5 bg-brand-secondary text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Priority *
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      >
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the maintenance issue in detail..."
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Tags</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Add Tags (Press Enter to add)
                      </label>
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="e.g., urgent, water-damage, floor-3"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Create custom tags for better ticket organization. Press Enter to add.
                      </p>
                    </div>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1 bg-brand-primary text-white rounded-full text-sm"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">
                    Attachments
                  </h2>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-primary transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Upload Photos
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      PNG, JPG, GIF up to 10MB (Max 5 files)
                    </p>
                    <label className="inline-block">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={images.length >= 5}
                        className="hidden"
                      />
                      <span className="inline-block px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-blue-700 cursor-pointer font-semibold text-sm transition-colors">
                        {images.length >= 5 ? "Max Files Reached" : "Choose Files"}
                      </span>
                    </label>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {imagePreviews.map((preview, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                        >
                          <img
                            src={preview}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 px-6 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating..." : "Create Ticket"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
