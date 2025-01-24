import { FormEvent, useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import Loader from "../../../components/Loader";
import {
  useCouponDetailsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} from "../../../redux/api/paymentAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import toast from "react-hot-toast";

const Couponmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useCouponDetailsQuery(params.id!);

  const { code, amount } = data?.coupon || {
    _id: "",
    code: "",
    amount: 0,
  };

  const [codeUpdate, setCodeUpdate] = useState<string>(code);
  const [amountUpdate, setAmountUpdate] = useState<number>(amount);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [deleteCoupon] = useDeleteCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      if (!codeUpdate || !amountUpdate) {
        toast.error("Please fill all the fields");
        return;
      }
  
      const payload = {
        code: codeUpdate,
        amount: amountUpdate,
      };
  
      const res = await updateCoupon({
        payload,
        couponId: data?.coupon._id!,
        UserId: user?._id!,
      });
  
      responseToast(res, navigate);
    } catch (error) {
      console.error("Error updating coupon:", error);
    } finally {
      setBtnLoading(false);
    }
  };
  

  
  const deleteHandler = async () => {
    const res = await deleteCoupon({
      couponId: data?.coupon._id!,
      UserId: user?._id!,
    });

    responseToast(res, navigate);
  };

  useEffect(() => {
    if (data) {
      setCodeUpdate(data.coupon.code);
      setAmountUpdate(data.coupon.amount);
    }
  }, [data]);
  

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <Trash2 />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Code</label>
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={codeUpdate}
                    onChange={(e) => setCodeUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Amount</label>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amountUpdate}
                    onChange={(e) => setAmountUpdate(Number(e.target.value))}
                  />
                </div>

                <button disabled={btnLoading} type="submit">
                  Update
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Couponmanagement;
