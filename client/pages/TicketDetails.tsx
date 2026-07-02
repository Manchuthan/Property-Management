import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  User,
  MapPin,
  Phone,
  MessageSquare,
  Paperclip,
  FileText,
  Edit,
  X,
  Send,
  Upload,
  DollarSign,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Cost {
  id: string;
  amount: number;
  description: string;
  date: string;
  vendor?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  date: string;
  vendor: string;
  description: string;
}

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"timeline" | "notes" | "attachments">(
    "timeline"
  );

  // State Management
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([
    {
      author: "Mike Johnson",
      date: "2024-06-29 14:45",
      text: "Initial assessment completed. Confirmed leak from 3rd floor pipe. Will coordinate with building maintenance for 3rd floor inspection.",
    },
    {
      author: "John Doe",
      date: "2024-06-28 16:20",
      text: "Tenant has requested an estimate before proceeding with repairs.",
    },
  ]);

  const [status, setStatus] = useState("Open");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusModalValue, setStatusModalValue] = useState("Open");

  const [costs, setCosts] = useState<Cost[]>([
    { id: "1", amount: 450, description: "Pipe replacement labor", date: "2024-06-30", vendor: "ABC Plumbing" },
  ]);
  const [showCostModal, setShowCostModal] = useState(false);
  const [costFormData, setCostFormData] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    vendor: "",
  });
  const [editingCostId, setEditingCostId] = useState<string | null>(null);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      amount: 450,
      date: "2024-06-30",
      vendor: "ABC Plumbing Services",
      description: "Plumbing repair - pipe replacement",
    },
  ]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceFormData, setInvoiceFormData] = useState({
    invoiceNumber: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    vendor: "",
    description: "",
  });
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);

  const [attachments, setAttachments] = useState([
    {
      name: "Ceiling_Leak_Photo_1.jpg",
      size: "2.4 MB",
      date: "2024-06-30",
      type: "image",
    },
    {
      name: "Plumber_Invoice.pdf",
      size: "450 KB",
      date: "2024-06-30",
      type: "document",
    },
  ]);

  const [showPriority, setShowPriority] = useState(false);
  const [priority, setPriority] = useState("Urgent");
  const [newPriority, setNewPriority] = useState("Urgent");

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignedTo, setAssignedTo] = useState("Mike Johnson");
  const [newAssignee, setNewAssignee] = useState("Mike Johnson");

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Tags Management
  const [ticketTags, setTicketTags] = useState<string[]>(["urgent", "water-damage", "3rd-floor"]);
  const [tagInput, setTagInput] = useState("");
  const [editingTags, setEditingTags] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!ticketTags.includes(tagInput.trim())) {
        setTicketTags([...ticketTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTicketTags(ticketTags.filter((tag) => tag !== tagToRemove));
  };

  // Mock Data
  const ticket = {
    id: id || "MNT-2024-001",
    property: "Tower A",
    unit: "205",
    status,
    priority,
    category: "Plumbing",
    subCategory: "Leak",
    description:
      "There is a water leak coming from the ceiling in the living room. It started leaking around 2 PM. The tenant noticed water stains on the ceiling and is concerned about structural damage.",
    tenant: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
    },
    createdDate: "2024-06-28 14:30",
    updatedDate: "2024-06-30 09:15",
    assignedTo,
    photos: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
    ],
  };

  const timeline = [
    {
      date: "2024-06-30 09:15",
      action: "Status Updated",
      description: "Status changed from New to Open",
      by: "Sarah Manager",
      type: "status-change",
    },
    {
      date: "2024-06-29 14:45",
      action: "Assignment",
      description: "Assigned to Mike Johnson (Plumber)",
      by: "System",
      type: "assignment",
    },
    {
      date: "2024-06-28 16:20",
      action: "Note Added",
      description: "Initial assessment completed. Confirmed leak from 3rd floor pipe.",
      by: "Mike Johnson",
      type: "note",
    },
    {
      date: "2024-06-28 14:30",
      action: "Ticket Created",
      description: "Maintenance ticket created from phone call",
      by: "John Doe",
      type: "created",
    },
  ];

  const availableUsers = [
    "Mike Johnson",
    "Sarah Johnson",
    "Emily Davis",
    "Robert Wilson",
    "Jennifer Martinez",
  ];

  const totalCost = costs.reduce((sum, c) => sum + c.amount, 0);
  const totalInvoiced = invoices.reduce((sum, i) => sum + i.amount, 0);

  // Handlers
  const handleAddNote = () => {
    if (noteText.trim()) {
      const newNote = {
        author: "John Doe",
        date: new Date().toLocaleString(),
        text: noteText,
      };
      setNotes([newNote, ...notes]);
      setNoteText("");
    }
  };

  const handleStatusChange = () => {
    setStatus(statusModalValue);
    setShowStatusModal(false);
  };

  const handlePriorityChange = () => {
    setPriority(newPriority);
    setShowPriority(false);
  };

  const handleAssignChange = () => {
    setAssignedTo(newAssignee);
    setShowAssignModal(false);
  };

  const handleAddCost = () => {
    if (costFormData.amount && costFormData.description && costFormData.date) {
      if (editingCostId) {
        setCosts(
          costs.map((c) =>
            c.id === editingCostId
              ? {
                  ...c,
                  amount: parseFloat(costFormData.amount),
                  description: costFormData.description,
                  date: costFormData.date,
                  vendor: costFormData.vendor,
                }
              : c
          )
        );
        setEditingCostId(null);
      } else {
        setCosts([
          ...costs,
          {
            id: Date.now().toString(),
            amount: parseFloat(costFormData.amount),
            description: costFormData.description,
            date: costFormData.date,
            vendor: costFormData.vendor,
          },
        ]);
      }
      setCostFormData({ amount: "", description: "", date: new Date().toISOString().split("T")[0], vendor: "" });
      setShowCostModal(false);
    }
  };

  const handleEditCost = (cost: Cost) => {
    setEditingCostId(cost.id);
    setCostFormData({
      amount: cost.amount.toString(),
      description: cost.description,
      date: cost.date,
      vendor: cost.vendor || "",
    });
    setShowCostModal(true);
  };

  const handleDeleteCost = (costId: string) => {
    setCosts(costs.filter((c) => c.id !== costId));
  };

  const handleAddInvoice = () => {
    if (invoiceFormData.invoiceNumber && invoiceFormData.amount && invoiceFormData.vendor) {
      if (editingInvoiceId) {
        setInvoices(
          invoices.map((inv) =>
            inv.id === editingInvoiceId
              ? {
                  ...inv,
                  invoiceNumber: invoiceFormData.invoiceNumber,
                  amount: parseFloat(invoiceFormData.amount),
                  date: invoiceFormData.date,
                  vendor: invoiceFormData.vendor,
                  description: invoiceFormData.description,
                }
              : inv
          )
        );
        setEditingInvoiceId(null);
      } else {
        setInvoices([
          ...invoices,
          {
            id: Date.now().toString(),
            invoiceNumber: invoiceFormData.invoiceNumber,
            amount: parseFloat(invoiceFormData.amount),
            date: invoiceFormData.date,
            vendor: invoiceFormData.vendor,
            description: invoiceFormData.description,
          },
        ]);
      }
      setInvoiceFormData({
        invoiceNumber: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        vendor: "",
        description: "",
      });
      setShowInvoiceModal(false);
    }
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoiceId(invoice.id);
    setInvoiceFormData({
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.amount.toString(),
      date: invoice.date,
      vendor: invoice.vendor,
      description: invoice.description,
    });
    setShowInvoiceModal(true);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== invoiceId));
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

  return (
    <div className="flex h-screen bg-brand-bg">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            <button
              onClick={() => navigate("/tickets")}
              className="flex items-center gap-2 text-brand-primary hover:text-blue-700 mb-6 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Tickets
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {ticket.id}
                      </h1>
                      <p className="text-gray-600 mt-1">{ticket.category} - {ticket.subCategory}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getStatusColor(status)}`}>
                        {status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Priority</p>
                      <p className={`mt-2 text-sm ${getPriorityColor(priority)}`}>
                        {priority}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Created</p>
                      <p className="text-sm text-gray-700 mt-2">{ticket.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">Assigned To</p>
                      <p className="text-sm text-gray-700 mt-2">{ticket.assignedTo}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Location</p>
                        <p className="text-sm text-gray-700">{ticket.property}, Unit {ticket.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Tenant</p>
                        <p className="text-sm text-gray-700">{ticket.tenant.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Contact</p>
                        <p className="text-sm text-gray-700">{ticket.tenant.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{ticket.description}</p>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Tags</h2>
                    <button
                      onClick={() => setEditingTags(!editingTags)}
                      className="text-sm text-brand-primary hover:text-blue-700 font-semibold"
                    >
                      {editingTags ? "Done" : "Edit"}
                    </button>
                  </div>

                  {editingTags ? (
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder="Add new tag (Press Enter)"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {ticketTags.map((tag, idx) => (
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
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {ticketTags.length > 0 ? (
                        ticketTags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No tags added yet</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Photos */}
                {ticket.photos.length > 0 && (
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Photos</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {ticket.photos.map((photo, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedPhoto(photo);
                            setShowPhotoModal(true);
                          }}
                          className="aspect-video rounded-lg overflow-hidden border border-gray-200 hover:shadow-hover transition-shadow cursor-pointer"
                        >
                          <img
                            src={photo}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tabs Section */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex gap-4 mb-6 border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab("timeline")}
                      className={`pb-3 text-sm font-semibold transition-colors ${
                        activeTab === "timeline"
                          ? "text-brand-primary border-b-2 border-brand-primary"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      Timeline
                    </button>
                    <button
                      onClick={() => setActiveTab("notes")}
                      className={`pb-3 text-sm font-semibold transition-colors ${
                        activeTab === "notes"
                          ? "text-brand-primary border-b-2 border-brand-primary"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Notes ({notes.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("attachments")}
                      className={`pb-3 text-sm font-semibold transition-colors ${
                        activeTab === "attachments"
                          ? "text-brand-primary border-b-2 border-brand-primary"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Paperclip className="w-4 h-4 inline mr-2" />
                      Attachments
                    </button>
                  </div>

                  {activeTab === "timeline" && (
                    <div className="space-y-6">
                      {timeline.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-4 h-4 bg-brand-primary rounded-full border-4 border-white" />
                            {idx < timeline.length - 1 && (
                              <div className="w-0.5 h-12 bg-gray-200 mt-2" />
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {item.date} by {item.by}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "notes" && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {notes.map((note, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-semibold text-gray-900">{note.author}</p>
                              <p className="text-xs text-gray-500">{note.date}</p>
                            </div>
                            <p className="text-sm text-gray-700">{note.text}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-900 mb-3">Add Note</p>
                        <div className="flex gap-2">
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Type your note here..."
                            rows={3}
                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          />
                          <button
                            onClick={handleAddNote}
                            disabled={!noteText.trim()}
                            className="px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "attachments" && (
                    <div className="space-y-4">
                      {attachments.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <FileText className="w-8 h-8 text-blue-600" />
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-brand-primary hover:bg-blue-50 transition-colors">
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-700">Upload Files</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Actions Card */}
                <div className="bg-white rounded-xl shadow-soft p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setStatusModalValue(status);
                        setShowStatusModal(true);
                      }}
                      className="w-full px-4 py-2.5 bg-brand-secondary text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
                    >
                      <Check className="w-4 h-4 inline mr-2" />
                      Update Status
                    </button>
                    <button
                      onClick={() => {
                        setNewPriority(priority);
                        setShowPriority(true);
                      }}
                      className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
                    >
                      <AlertCircle className="w-4 h-4 inline mr-2" />
                      Set Priority
                    </button>
                    <button
                      onClick={() => {
                        setNewAssignee(assignedTo);
                        setShowAssignModal(true);
                      }}
                      className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
                    >
                      <User className="w-4 h-4 inline mr-2" />
                      Reassign
                    </button>
                    <button
                      onClick={() => setShowCostModal(true)}
                      className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
                    >
                      <Plus className="w-4 h-4 inline mr-2" />
                      Add Cost
                    </button>
                    <button className="w-full px-4 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold text-sm">
                      Close Ticket
                    </button>
                  </div>
                </div>

                {/* Cost Tracking */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Cost Tracking</h3>
                    <button
                      onClick={() => {
                        setEditingCostId(null);
                        setCostFormData({
                          amount: "",
                          description: "",
                          date: new Date().toISOString().split("T")[0],
                          vendor: "",
                        });
                        setShowCostModal(true);
                      }}
                      className="text-brand-primary hover:text-blue-700"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    {costs.map((cost) => (
                      <div key={cost.id} className="flex items-between justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{cost.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{cost.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-gray-900">${cost.amount.toFixed(2)}</p>
                          <button
                            onClick={() => handleEditCost(cost)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteCost(cost.id)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Total Costs:</p>
                      <p className="text-lg font-bold text-brand-primary">${totalCost.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Invoices */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Invoices</h3>
                    <button
                      onClick={() => {
                        setEditingInvoiceId(null);
                        setInvoiceFormData({
                          invoiceNumber: "",
                          amount: "",
                          date: new Date().toISOString().split("T")[0],
                          vendor: "",
                          description: "",
                        });
                        setShowInvoiceModal(true);
                      }}
                      className="text-brand-primary hover:text-blue-700"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {invoice.invoiceNumber}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{invoice.vendor}</p>
                            <p className="text-xs text-gray-600 mt-1">{invoice.date}</p>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                              ${invoice.amount.toFixed(2)}
                            </p>
                            <button
                              onClick={() => handleEditInvoice(invoice)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Edit className="w-3 h-3 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteInvoice(invoice.id)}
                              className="p-1 hover:bg-red-100 rounded transition-colors"
                            >
                              <Trash2 className="w-3 h-3 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Total Invoiced:</p>
                      <p className="text-lg font-bold text-brand-secondary">${totalInvoiced.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-600">Balance:</p>
                      <p
                        className={`text-lg font-bold ${
                          totalCost - totalInvoiced > 0
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        ${Math.abs(totalCost - totalInvoiced).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 max-w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Update Status</h2>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2 mb-6">
              {["New", "Open", "In Progress", "On Hold", "Completed", "Cancelled"].map((s) => (
                <label key={s} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={statusModalValue === s}
                    onChange={(e) => setStatusModalValue(e.target.value)}
                    className="w-4 h-4 text-brand-primary"
                  />
                  <span className="text-gray-700 font-semibold">{s}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Priority Modal */}
      {showPriority && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 max-w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Set Priority</h2>
              <button
                onClick={() => setShowPriority(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2 mb-6">
              {["Urgent", "High", "Normal"].map((p) => (
                <label key={p} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={newPriority === p}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-4 h-4 text-brand-primary"
                  />
                  <span className={`font-semibold ${getPriorityColor(p)}`}>{p}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPriority(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handlePriorityChange}
                className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 max-w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Reassign Ticket</h2>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2 mb-6">
              {availableUsers.map((user) => (
                <label key={user} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="assignee"
                    value={user}
                    checked={newAssignee === user}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-4 h-4 text-brand-primary"
                  />
                  <span className="text-gray-700 font-semibold">{user}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignChange}
                className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cost Modal */}
      {showCostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCostId ? "Edit Cost" : "Add Cost"}
              </h2>
              <button
                onClick={() => setShowCostModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount *
                </label>
                <input
                  type="number"
                  value={costFormData.amount}
                  onChange={(e) =>
                    setCostFormData({ ...costFormData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  value={costFormData.description}
                  onChange={(e) =>
                    setCostFormData({ ...costFormData, description: e.target.value })
                  }
                  placeholder="e.g., Pipe replacement labor"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vendor
                </label>
                <input
                  type="text"
                  value={costFormData.vendor}
                  onChange={(e) =>
                    setCostFormData({ ...costFormData, vendor: e.target.value })
                  }
                  placeholder="e.g., ABC Plumbing"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={costFormData.date}
                  onChange={(e) =>
                    setCostFormData({ ...costFormData, date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCostModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCost}
                className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {editingCostId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingInvoiceId ? "Edit Invoice" : "Add Invoice"}
              </h2>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Invoice Number *
                </label>
                <input
                  type="text"
                  value={invoiceFormData.invoiceNumber}
                  onChange={(e) =>
                    setInvoiceFormData({
                      ...invoiceFormData,
                      invoiceNumber: e.target.value,
                    })
                  }
                  placeholder="INV-2024-001"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vendor *
                </label>
                <input
                  type="text"
                  value={invoiceFormData.vendor}
                  onChange={(e) =>
                    setInvoiceFormData({ ...invoiceFormData, vendor: e.target.value })
                  }
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
                  value={invoiceFormData.amount}
                  onChange={(e) =>
                    setInvoiceFormData({ ...invoiceFormData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={invoiceFormData.date}
                  onChange={(e) =>
                    setInvoiceFormData({ ...invoiceFormData, date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={invoiceFormData.description}
                  onChange={(e) =>
                    setInvoiceFormData({
                      ...invoiceFormData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Invoice description"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddInvoice}
                className="flex-1 px-4 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {editingInvoiceId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {showPhotoModal && selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowPhotoModal(false)}
        >
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedPhoto}
              alt="Full size"
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
