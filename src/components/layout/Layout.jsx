import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar, { SidebarItem } from "./Sidebar";
import { LuLayoutDashboard, LuStickyNote, LuCalendar, LuLayers, LuSettings } from "react-icons/lu";

const items = [
  { type: 'item', name: 'Dashboard', to: '/dashboard', 'isActive': '/dashboard', 'icon': LuLayoutDashboard },
  { type: 'divider', name: 'div1', margin: 'my-5' },
  { type: 'item', name: 'Projects', to: '/projects', 'isActive': '/projects', 'icon': LuStickyNote },
  { type: 'item', name: 'Calendar', to: '/calendar', 'isActive': '/calendar', 'icon': LuCalendar },
  { type: 'item', name: 'Tasks', to: '/tasks', 'isActive': '/tasks', 'icon': LuLayers },
  { type: 'divider', name: 'div2', margin: 'my-3' },
  { type: 'item', name: 'Settings', to: '/settings', 'isActive': '/settings', 'icon': LuSettings },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="flex">
        <Sidebar>
          <div className='mt-5' />
          {
            items.map((item) => (
              item.type === 'divider' ? (
                <hr key={item.name} className={item.margin} />
              ) : (
                <Link key={item.name} to={item.to}>
                  <SidebarItem icon={<item.icon size={20} />} text={item.name} active={isActive(item.isActive)} />
                </Link>
              )
            ))
          }
        </Sidebar>
        <div className='w-screen'>
          {children}
        </div>
      </div >
    </>
  )
}

export default Layout;
