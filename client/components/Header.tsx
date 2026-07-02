import { Menu, Search } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-soft h-[73px] flex items-center">
      <div className="w-full px-6 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-600 hover:text-gray-900"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1 flex items-center justify-between ml-0 md:ml-4">
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets, properties..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-600 hover:text-gray-900">
              <Search className="w-5 h-5" />
            </button>


            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Property Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
