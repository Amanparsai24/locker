import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

export default function NotificationDropdown() {
    const [openNotify, setOpenNotify] = useState(false);
    const notifyRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (notifyRef.current && !notifyRef.current.contains(e.target as Node)) {
                setOpenNotify(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative" ref={notifyRef}>
            <button
                className="text-gray-700 hover:text-gray-900 relative"
                onClick={() => setOpenNotify(!openNotify)}
            >
                <Bell size={22} />
                <span className="absolute top-0 right-0 block w-2 h-2 bg-red-600 rounded-full" />
            </button>

            {openNotify && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-white shadow-lg rounded-lg border p-2 z-20 fade-slide">
                    <p className="text-sm text-gray-500 px-2 mb-1">Notifications</p>
                    <div className="flex flex-col gap-1">
                        <div className="p-2 hover:bg-gray-100 rounded border-b">No new notifications</div>
                        <div className="p-2 hover:bg-gray-100 rounded">No new notifications</div>
                    </div>
                </div>
            )}
        </div>
    );
}
