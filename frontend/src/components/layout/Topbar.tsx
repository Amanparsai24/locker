import { useState, useRef, useEffect } from "react";
import userimg from "../../assets/avatar-8.jpg";
import { Menu, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";

interface TopbarProps {
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  collapsed: boolean;
}

const Topbar = ({ toggleSidebar, toggleCollapse, collapsed }: TopbarProps) => {

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-2">
        <button className="md:hidden mr-2 text-gray-900" onClick={toggleSidebar}>
          <Menu size={28} />
        </button>

        <button className="hidden md:inline-block mr-2 text-gray-900" onClick={toggleCollapse}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <NotificationDropdown />

        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-2 topbar-profile-btn"
            onClick={() => {
              setOpenProfile(!openProfile);
            }}
          >
            <img src={user?.photo || userimg}
              alt={user?.name || "User"}
              className="w-10 h-10 rounded-full border" />
            <span className="hidden md:block text-gray-700 w-20">{user?.name || "User"}</span>
            <ChevronDown size={18} className="text-gray-700 hidden md:block" />
          </button>

          {/* Profile Dropdown */}
          {openProfile && (
            <div className="absolute right-0 top-full mt-2 w-44 topbar-dropdown p-2 z-20 fade-slide">
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded border-b">My Profile</button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded border-b">Settings</button>
              <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;
