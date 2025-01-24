interface AccordionProps {
  title: string;
  onclick:()=>void;
}

const ButtonAccordian = ({ title,onclick}: AccordionProps) => {

    
  return (
    <div className={`accordion "open" `} onClick={onclick}>
      <div className="accordion__header">
        <h2 className="accordion_icon">{title}</h2>
      </div>
    </div>
  );
};

export default ButtonAccordian;
