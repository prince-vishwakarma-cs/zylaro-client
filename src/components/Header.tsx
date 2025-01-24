import { Link } from "react-router-dom";
import { User as UserIcon, LogOut, LogIn, ShoppingCart, Search } from "react-feather";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType{
  user:User | null
 }

const Header = ({user}: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const logoutHandler = async() => {
    setIsOpen(false);
    try {
      await signOut(auth)
      toast.success("Signed out Successfully")
    } catch (error) {
      toast.error("Sign out failed")
    }
  };
  return (
    <nav className="header">
      <div className="logo">
      <NavLink onClick={() => setIsOpen(false)} to="/">3 <span style={{color:"var(--black-100)"}} >legant</span><span style={{color:"var(--black-40)"}}>.</span></NavLink>
      </div>
      <div className="icons">
      <NavLink onClick={() => setIsOpen(false)} to="/search"><Search/></NavLink>
      <NavLink onClick={() => setIsOpen(false)} to="/cart"><ShoppingCart/></NavLink>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <UserIcon />
          </button> 
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
              )}
              <Link to="/orders" onClick={() => setIsOpen(false)}>Orders</Link>
              <button onClick={logoutHandler}>
                <LogOut />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to="/login">
          <LogIn />
        </Link>
      )}
      </div>
    </nav>
  );
};

export default Header;