import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { ReactElement, useEffect, useState } from "react";
import { Bell, Loader, Search } from "react-feather";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../components/admin/AdminSidebar";
import TableHOC from "../components/admin/TableHOC";
import { useCouponQuery } from "../redux/api/paymentAPI";
import { setIsDashboardDrawer } from "../redux/reducer/miscSlice";
import { RootState } from "../redux/store";

interface DataType {
  code: string;
  amount: number;
  _id: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Discount = () => {
  const [rows, setRows] = useState<DataType[]>([]);
  const dispatch = useDispatch();
  const { isDashboardDrawer } = useSelector((state: RootState) => state.misc);
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading} = useCouponQuery(user?._id!);

  const userImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";


  useEffect(() => {
    if (data)
      setRows(
        data.coupons.map((i) => ({
          _id: i._id,
          code: i.code,
          amount: i.amount,
          action: <Link to={`/admin/coupon/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      {<AdminSidebar />}
      <div className="dashboard">
        <div className="bar">
          {isDashboardDrawer && (
            <div
              className={`close-sidebar ${
                isDashboardDrawer ? "no-scroll" : ""
              }`}
            >
              {" "}
              <Bars3CenterLeftIcon
                className="nav-icon"
                onClick={() => dispatch(setIsDashboardDrawer(false))}
              />
            </div>
          )}
          <div className="info-dash">
            <Bars3CenterLeftIcon
              className="nav-icon"
              onClick={() => dispatch(setIsDashboardDrawer(true))}
            />
            <img src={user?.photo || userImg} alt="User" />
            <Bell />
          </div>
          <div className="input-dash">
            <Search />
            <input type="text" placeholder="Search for data, users, docs" />
          </div>
        </div>
        {isDashboardDrawer && (
          <div
            className={`close-sidebar ${isDashboardDrawer ? "no-scroll" : ""}`}
          >
            {" "}
            <Bars3CenterLeftIcon
              className="nav-icon"
              onClick={() => dispatch(setIsDashboardDrawer(false))}
            />
          </div>
        )}
        <main>{isLoading ? <Loader /> : Table}</main>
        <Link to="/admin/coupon/new" className="create-product-btn">
          <FaPlus />
        </Link>
      </div>
    </div>
  );
};

export default Discount;
