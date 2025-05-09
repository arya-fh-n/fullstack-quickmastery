import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

interface TopNavbarProps {
  title: JSX.Element;
  id: string;
}

function TopNavigationBar({ title, id }: Readonly<TopNavbarProps>) {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4" id={id}>
        <div className="flex items-center justify-between h-16">
        <h1 className="text-3xl font-bold text-green-600">{title}</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/")}
              className={`px-3 py-2 rounded-md text-sm font-medium text-zinc-100 hover:bg-cyan-300 hover:text-black`}
            >
              Home
            </button>
            <button
              onClick={() => () => {}}
              className={`px-3 py-2 rounded-md text-sm font-medium text-zinc-100 hover:bg-cyan-300 hover:text-black`}
            >
              History
            </button>
            <button
              onClick={() => {
                location.href = "/login";
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium text-zinc-100 hover:bg-red-300 hover:text-black`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNavigationBar;
