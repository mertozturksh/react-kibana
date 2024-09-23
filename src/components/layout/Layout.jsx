import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from "./Navbar";
import Sidebar, { SidebarItem } from "./Sidebar";
import { LuLayoutDashboard, LuStickyNote, LuCalendar, LuLayers, LuFlag, LuSettings, LuLifeBuoy } from "react-icons/lu";

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="flex">
        <Sidebar>
          <div className='mt-5' />

          <Link to="/dashboard">
            <SidebarItem icon={<LuLayoutDashboard size={20} />} text="Dashboard" active={isActive('/') || isActive('/dashboard')} />
          </Link>

          <hr className="my-5" />

          <Link to="/projects">
            <SidebarItem icon={<LuStickyNote size={20} />} text="Projects" alert active={isActive('/projects')} />
          </Link>

          <Link to="/calendar">
            <SidebarItem icon={<LuCalendar size={20} />} text="Calendar" active={isActive('/calendar')} />
          </Link>

          <Link to="/tasks">
            <SidebarItem icon={<LuLayers size={20} />} text="Tasks" active={isActive('/tasks')} />
          </Link>

          <Link to="/reporting">
            <SidebarItem icon={<LuFlag size={20} />} text="Reporting" active={isActive('/reporting')} />
          </Link>

          <hr className="my-3" />

          <Link to="/settings">
            <SidebarItem icon={<LuSettings size={20} />} text="Settings" active={isActive('/settings')} />
          </Link>

          <Link to="/help">
            <SidebarItem icon={<LuLifeBuoy size={20} />} text="Help" active={isActive('/help')} />
          </Link>

        </Sidebar>

        <NavBar />

        <div className='w-screen'>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout;
