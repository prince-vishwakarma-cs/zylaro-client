import { ReactElement, useEffect, useState } from "react";
import { Bell, Loader, Search } from "react-feather";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { RootState } from "../../redux/store";
import { customError } from "../../types/api-types";
import { setIsDashboardDrawer } from "../../redux/reducer/miscSlice";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { transformImage } from "../../utils/features";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];



const Products = () => {
  const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

  const {user} = useSelector((state:RootState) => state.userReducer)
  const { data ,isLoading , isError,error} = useAllProductsQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  const dispatch = useDispatch()
  const {isDashboardDrawer} = useSelector((state: RootState) => state.misc)

  if(isError) {
    const err=error as customError;
    toast.error(err.data.message)
  }

  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: <img src={transformImage(i.photos[0].url)} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data])
  
  

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
       {<AdminSidebar/>}
       <div className ="dashboard">
       <div className="bar">
             {isDashboardDrawer && <div className={`close-sidebar ${isDashboardDrawer ? "no-scroll" : ""}`}> <Bars3CenterLeftIcon className="nav-icon" onClick={()=> dispatch(setIsDashboardDrawer(false))}/></div>}
              <div className="info-dash">
                <Bars3CenterLeftIcon className="nav-icon" onClick={()=> dispatch(setIsDashboardDrawer(true))}/>
                <img src={user?.photo || userImg} alt="User" />
                <Bell/>
              </div>
              <div className="input-dash">
                <Search />
                <input type="text" placeholder="Search for data, users, docs" />
              </div>
            </div>
      {isDashboardDrawer && <div className={`close-sidebar ${isDashboardDrawer ? "no-scroll" : ""}`}> <Bars3CenterLeftIcon className="nav-icon" onClick={()=> dispatch(setIsDashboardDrawer(false))}/></div>}
      <main>{isLoading? <Loader/> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
    </div>
  );
};

export default Products;
