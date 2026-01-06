import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);   // Mobile overlay
  const [collapsed, setCollapsed] = useState(false);       // Desktop collapse

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex transition-all duration-300 ${collapsed ? 'w-20' : 'w-60'}`}>
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 z-20 md:hidden">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Topbar
          toggleSidebar={toggleSidebar}
          toggleCollapse={toggleCollapse}
          collapsed={collapsed}
        />
        <main className="flex-1 p-6 overflow-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
