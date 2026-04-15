import React from "react";
import { Link } from "react-router";

function NavTitle() {
  return (
    <Link to={"/"} className={
      "flex items-center " +
      "ml-2 sm:ml-4 p-4 " +
      "hover:bg-[var(--bg-color-2)] transition-colors duration-200 "
    }>
      <h1 className="text-lg sm:text-2xl font-bold">thoron</h1>
    </Link>
  );
}

export default NavTitle;