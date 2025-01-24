import { useFileHandler } from "6pp";
import { FormEvent, useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import Loader from "../../../components/Loader";
import {transformImage} from "../../../utils/features"
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector(
    (state:RootState) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate()

  const { data, isLoading , isError } = useProductDetailsQuery(params.id!);

  const { photos, category, name, stock, price,description } = data?.product || {
    _id: "",
    photos: [],
    category: "",
    name: "",
    stock: 0,
    price: 0,
    description: "",
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [btnLoading,setBtnLoading] = useState<boolean>(false);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  

  const photosFile = useFileHandler('multiple',10,5)

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true)
    try {
      const formData = new FormData();

    if (nameUpdate) {
      formData.set("name", nameUpdate);
    }
    if (priceUpdate) {
      formData.set("price", priceUpdate.toString());
    }
    if (stockUpdate !== undefined) {
      formData.set("stock", stockUpdate.toString());
    }
    if (categoryUpdate) {
      formData.set("category", categoryUpdate);
    }
    if(photosFile.file && photosFile.file.length>0) {
      photosFile.file.forEach((file)=>{
        formData.append('photos',file)
      })
    }

    const res = await updateProduct({
      formData,
      productId: data?.product._id!,
      UserId: user?._id!,
    });

    responseToast(res,navigate)
    } catch (error) {
      console.log(error);
    }finally{
      setBtnLoading(false)
    }
  };
  const deleteHandler = async () => {

    const res = await deleteProduct({
      productId: data?.product._id!,
      UserId: user?._id!,
    });

    responseToast(res,navigate);
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setCategoryUpdate(data.product.category);
      setStockUpdate(data.product.stock);

    }
  }, [data]);

  if (isError) return <Navigate to={"/404"}/>

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <section>
              <div>
              <strong>ID - {data?.product._id}</strong>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              </div>
              <img
                src={transformImage(photos[0].url)}
                alt="Product"
              />
              <p>{name}</p>
              <h3>₹{price}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <Trash2 />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
              <label>Description</label>
              <input
                type="text"
                placeholder="Description"
                value={descriptionUpdate}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
              />
            </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Photos</label>
                  <input type="file" accept="image/*" multiple onChange={photosFile.changeHandler} />
                </div>

                
                {photosFile.error && <p>{photosFile.error}</p>}

                {photosFile.preview &&
              photosFile.preview.map((img, i) => (
                <img key={i} src={img} alt="New Image" />
              ))}

              
              
            
                <button disabled={btnLoading} type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
