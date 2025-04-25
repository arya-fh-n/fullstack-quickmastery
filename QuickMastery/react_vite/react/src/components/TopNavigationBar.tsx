import React from 'react';

const TopNavigationBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">LMS</div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              Courses
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNavigationBar;

