import { ReactNode, useEffect, useState } from "react";
import { MinusCircle, PlusCircle } from "react-feather";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setIsDrawer } from "../redux/reducer/miscSlice";

interface AccordionProps {
  title: string;
  children?: ReactNode;
  link: string;
}

const Accordion = ({ title, children,link}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
 const dispatch = useDispatch()
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Link to={link} className={`accordion ${isOpen ? "open" : ""}`} onClick={()=> dispatch(setIsDrawer(false))}>
      <div className="accordion__header">
            <h2 className="accordion_icon">{title}</h2>
        {children && <span>{isOpen ? <MinusCircle /> : <PlusCircle />}</span>}
      </div>
      {children && isOpen && <div className="accordion__content">{children}</div>}
    </Link>
  ); 
};

export default Accordion;
