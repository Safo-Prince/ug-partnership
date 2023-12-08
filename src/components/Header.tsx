import React from "react";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const headerNavigation = [
  { name: "Home", href: "#" },
  { name: "TTIPS Home", href: "#" },
  { name: "Contact Us", href: "#" },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full  mx-auto max-w-7xl  px-6 lg:px-8 flex justify-between items-center py-5">
      <img
        src={logo}
        className=" cursor-pointer"
        onClick={() => navigate("/")}
      />
      {location.pathname === "/" && (
        <ul className="flex items-center gap-x-3 font-lato font-medium text-lg  text-[#f2f2f2 ] border-red-200 ">
          {headerNavigation.map((item) => (
            <li>
              <a
                href={item.href}
                className="text-gray-600 hover:text-gray-400 cursor-pointer "
              >
                {item.name}
              </a>
            </li>
          ))}

          <li>
            <button
              onClick={() => navigate("/login")}
              className="rounded-full px-3.5 py-2 bg-[#324c6d] hover:bg-[#536c8e] text-white "
            >
              Administrator
            </button>
          </li>
        </ul>
      )}

      {location.pathname === "/admin" && (
        <div className="flex items-center justify-center space-x-3">
          <h1 className="font-lato font-medium text-lg  ">Administrator</h1>
          <button
            onClick={() => navigate("/")}
            className="rounded-full px-3.5 py-2 bg-[#324c6d] hover:bg-[#536c8e] text-white "
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
