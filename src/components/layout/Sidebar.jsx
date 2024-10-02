import { createContext, useContext, useState } from "react";
import { LuMoreVertical, LuChevronLast, LuChevronFirst } from "react-icons/lu";
import logo from "../../assets/logo.png";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
          .custom-scrollbar {
            scrollbar-width: none;
            scrollbar-color: transparent transparent;
          }
        `}
      </style>
      <aside className="sticky top-0 left-0 h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm overflow-y-auto custom-scrollbar">
          <div className="p-4 pb-2 flex justify-between items-center">
            {/* <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} /> */}
            <span className={`font-semibold text-xl overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}>Filter Data</span>
            <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
              {expanded ? <LuChevronFirst size={20} /> : <LuChevronLast size={20} />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 overflow-y-auto">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img src={logo} className="w-10 h-10 rounded-md" />
            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
              <div className="leading-4">
                <h4 className="font-semibold">mertozturksh</h4>
                <span className="text-xs text-gray-600">mertozturksh@gmail.com</span>
              </div>
              <LuMoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>

    </>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext)
  return (
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

        </div>
      )}

      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
    </li>
  )
}