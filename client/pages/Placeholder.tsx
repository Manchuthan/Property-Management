import { useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";

const Placeholder = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getPageName = (pathname: string) => {
    const parts = pathname.split("/").filter(Boolean);
    return parts[0]
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <div className="flex h-screen bg-brand-bg">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🛠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {getPageName(location.pathname)}
            </h2>
            <p className="text-gray-600 mb-6">
              This page is coming soon. Continue prompting to have this feature
              built out.
            </p>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <p className="text-sm text-gray-500 font-mono mb-2">
                Current path:
              </p>
              <p className="text-sm font-bold text-gray-700 break-words">
                {location.pathname}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Placeholder;
