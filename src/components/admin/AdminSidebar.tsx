
import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <>
      <aside
        // style={
        //   phoneActive
        //     ? {
        //         width: "20rem",
        //         height: "calc(100vh - 3.8rem)",
        //         position: "fixed",
        //         top: "3.8rem",
        //         left:  "0",
        //         transition: "all 0.5s",
        //       }
        //     : {}
        // }
      >
        <DivOne location={location} />
        <DivTwo location={location} />
        <DivThree location={location} />
      </aside>
    </>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <h5>Dashboard</h5>
    <ul>
      <Li
        url="/admin/dashboard"
        text="Dashboard"
        Icon={RiDashboardFill}
        location={location}
      />
      <Li
        url="/admin/product"
        text="Product"
        Icon={RiShoppingBag3Fill}
        location={location}
      />
      <Li
        url="/admin/customer"
        text="Customer"
        Icon={IoIosPeople}
        location={location}
      />
      <Li
        url="/admin/transaction"
        text="Transaction"
        Icon={AiFillFileText}
        location={location}
      />
      <Li
        url="/admin/coupons"
        text="Coupons"
        Icon={RiCoupon3Fill}
        location={location}
      />
    </ul>
  </div>
);

const DivTwo = ({ location }: { location: Location }) => (
  <div>
    <h5>Charts</h5>
    <ul>
      <Li
        url="/admin/chart/bar"
        text="Bar"
        Icon={FaChartBar}
        location={location}
      />
      <Li
        url="/admin/chart/pie"
        text="Pie"
        Icon={FaChartPie}
        location={location}
      />
      <Li
        url="/admin/chart/line"
        text="Line"
        Icon={FaChartLine}
        location={location}
      />
    </ul>
  </div>
);

const DivThree = ({ location }: { location: Location }) => (
  <div>
    <h5>Apps</h5>
    <ul>
      <Li
        url="/admin/app/coupon"
        text="Coupon"
        Icon={RiCoupon3Fill}
        location={location}
      />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    // style={{
    //   backgroundColor: location.pathname.includes(url)
    //     ? "rgb(56, 203, 137,0.1)"
    //     : "white",
    // }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgb(56, 203, 137)" : "var(--black-100)",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
