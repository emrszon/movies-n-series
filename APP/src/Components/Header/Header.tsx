import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { routes } from "../../Routes/Routes";
import menu from "../../assets/images/menu.png"
import "./Header.scss"


const Header = ({ }) => {
  const { signout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<any>();

  const handleToggle = () => {
    setOpen(!open);
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  const handleClickOutside = (e: any) => {
    if (!menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  }
  return (
    <header className={`navbar `}>
      <div className={`container ${open ? "show" : "hidden"}`}>
        <div className="header-links">
          <a href="" className="icon" ref={menuRef} onClick={(e) => { e.preventDefault(); handleToggle(); }}>
            <img src={menu} alt="" />
          </a>
          {//@ts-ignore
            Object.keys(routes).map((route, i) => (routes[route].path !== "*" ? <NavLink key={i} className="nav-link" to={routes[route].path}>{routes[route].label}</NavLink> : null
            ))
          }
        </div>
        <div className="header-actions">
          <button  className="sign-out" onClick={signout}> Cerrar Sesión</button>
        </div>
      </div>
    </header>
  );
}

export default Header;