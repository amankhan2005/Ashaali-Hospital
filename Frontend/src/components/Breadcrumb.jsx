import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Optional: you can pass custom labels for routes as a prop 'labels'

const Breadcrumb = ({ labels = {} }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex text-gray-600 text-sm font-medium mb-6" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-gray-900">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label = labels[to] || value.replace(/-/g, " ");

        return (
          <div key={to} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2" />
            {isLast ? (
              <span className="text-gray-900">{label}</span>
            ) : (
              <Link to={to} className="hover:text-gray-900">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
