import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Lock.png";
import logo2 from "../../assets/Locker.png";
import { Home, User , DollarSign, CreditCard, CheckSquare } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  closeSidebar?: () => void;   // Only for mobile
  collapsed?: boolean;
}

const Sidebar = ({ closeSidebar, collapsed }: SidebarProps) => {

  const location = useLocation();
  const [openParent, setOpenParent] = useState<string | null>(null);

  const toggleParent = (name: string) => {
    setOpenParent(openParent === name ? null : name);
  };

  const menuIcons = {
    Dashboard: Home,
    Users: User,
    Expenses: DollarSign,
    Assets: CreditCard,
    "Daily Tasks": CheckSquare,
  };

  const menus = [
    { name: 'Dashboard', path: '/' },
    { name: 'Users', path: '/users' },
    {
      name: 'Expenses',
      icon: 'Expenses',
      children: [
        { name: 'Daily Expense', path: '/expenses' },
        { name: 'Monthly Expense', path: '/expenses/monthly' }
      ]
    },
    { name: 'Assets', path: '/assets' },
    { name: 'Daily Tasks', path: '/tasks' }
  ];

  return (
    <div className={`h-full bg-white text-gray-900 transition-all duration-300 p-5 flex flex-col ${collapsed ? 'w-20' : 'w-60'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Locker Logo" className="w-8 h-8" style={{ marginLeft: "7px" }} />
          {!collapsed && <img src={logo2} alt="Locker Logo" className="w-30 h-8 hidden md:flex" />}
        </div>
        <div className="flex gap-2">
          {closeSidebar && <button className="md:hidden text-gray-900" onClick={closeSidebar}>✕</button>}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col">

        {menus.map((menu, index) => {
          const Icon = menuIcons[menu.name as keyof typeof menuIcons];

          const isActive =
            (menu.path && location.pathname === menu.path) ||
            (menu.children && menu.children.some(c => c.path === location.pathname));

          return (
            <div key={index} className="border-b border-gray-200 pb-1">

              {/* ----------- PARENT WITH CHILDREN ----------- */}
              {menu.children ? (
                <>
                  <button
                    onClick={() => toggleParent(menu.name)}
                    className={`flex items-center justify-between w-full p-2 rounded transition-all 
                    ${isActive ? "bg-blue-100 border-blue-500 text-blue-700" : "border-transparent hover:bg-gray-100"}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      {!collapsed && <span>{menu.name}</span>}
                    </div>

                    {!collapsed && (
                      <svg
                        className={`w-4 h-4 transition-transform ${openParent === menu.name ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Submenu */}
                  {openParent === menu.name && !collapsed && (
                    <div className="ml-3 mt-1 flex flex-col">
                      {menu.children.map((child, i) => {
                        const childActive = location.pathname === child.path;

                        return (
                          <Link
                            key={i}
                            to={child.path}
                            className={`p-2 text-sm rounded border-gray-200 transition-all
                             ${childActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
                          >
                            <span className="me-2"> {"-"}</span>{child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                /* ----------- NORMAL MENU ----------- */
                <Link
                  to={menu.path!}
                  className={`flex items-center gap-3 p-2 rounded transition-all
                  ${isActive ? "border-blue-500 text-blue-700" : "border-transparent hover:bg-gray-100"}`}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{menu.name}</span>}
                </Link>
              )}
            </div>
          );
        })}

      </nav>

    </div>
  );
};

export default Sidebar;
