import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewCouponMutation } from "../../../redux/api/paymentAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [isLoading,setIsLoading] = useState<boolean>(false);

  const [code, setCode] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const navigate = useNavigate();

  const [newCoupon] = useNewCouponMutation();


  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!code || !amount) {
        toast.error("Please fill all the fields");
        return;
      }
  
      const res = await newCoupon({ code, amount, id: user?._id! });
      responseToast(res, navigate);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Coupon</h2>
            <div>
              <label>Code</label>
              <input
                required
                type="text"
                placeholder="Coupon Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                required
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <button disabled={isLoading} type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
