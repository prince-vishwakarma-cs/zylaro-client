import { ReactNode, useState } from "react";
import { MinusCircle, PlusCircle } from "react-feather";

interface AccordionProps {
  title: string;
  children?: ReactNode;
}

const ExpandableAccordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <div className="accordion__header" onClick={toggleAccordion}>
        <h2 className="accordion_icon">{title}</h2>
        {children && <span>{isOpen ? <MinusCircle /> : <PlusCircle />}</span>}
      </div>
      {children && isOpen && <div className="accordion__content">{children}</div>}
    </div>
  );
};

export default ExpandableAccordion;
