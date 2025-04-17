import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Main from './Main';

function Header() {
  const location = useLocation();

  const navLinks = [
    { path: '/todo/taskList', label: 'Task List' },
    { path: '/todo/completedTask', label: 'Completed' },
    { path: '/todo/deletedTask', label: 'Deleted' },
  ];

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4 w-100 px-4 rounded'>
      <div className='container-fluid d-flex justify-content-between align-items-center'>

        {/* Left - App name or Main component */}
        <div className='navbar-brand d-flex align-items-center'>
          <Main />
          <span className='ms-2 fw-bold text-primary'>Todo Manager</span>
        </div>

        {/* Right - Navigation Links */}
        <div className='d-flex gap-2'>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`btn btn-sm ${
                location.pathname === link.path ? 'btn-primary' : 'btn-outline-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Header;
