import { ReactElement, useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import Loader from "../../components/Loader";
import {
  useAllusersQuery,
  useDeleteUsersMutation,
} from "../../redux/api/userAPI";
import { RootState } from "../../redux/store";
import { customError } from "../../types/api-types";
import { responseToast } from "../../utils/features";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { setIsDashboardDrawer } from "../../redux/reducer/miscSlice";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError, error } = useAllusersQuery(user?._id!);

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }

  const dispatch = useDispatch()
  const {isDashboardDrawer} = useSelector((state: RootState) => state.misc)

  const [rows, setRows] = useState<DataType[]>([]);

  const [deleteUser] = useDeleteUsersMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminId: user?._id! });
    responseToast(res, null);
  };

  useEffect(() => {
    if (data && data.user) {
      setRows(
        data.user.map((i) => ({
          avatar: (
            <img
              style={{
                borderRadius: "4rem",
                width:"4rem",
                height:"4rem",
                overflow:"hidden",
              }}
              src={i.photo || `https://avatar.iran.liara.run/username?username=${i.name}`}
              alt={i.name}
            />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <Trash2
                style={user?._id === i._id ? { color: "var(--black-100)" } : {}}
              />
            </button>
          ),
        }))
      );
    }
  }, [data, user?._id]);
  
  

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar/>
      <div className="dashboard">
      {isDashboardDrawer && <div className={`close-sidebar ${isDashboardDrawer ? "no-scroll" : ""}`}> <Bars3CenterLeftIcon className="nav-icon" onClick={()=> dispatch(setIsDashboardDrawer(false))}/></div>}
      <main>{isLoading ? <Loader /> : Table}</main>
      </div>
    </div>
  );
};

export default Customers;
