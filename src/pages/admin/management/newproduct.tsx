import { useFileHandler } from "6pp";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [isLoading,setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const [newproduct] = useNewProductMutation();

  const photos = useFileHandler("multiple", 10, 5);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      if (!name || !category || !price || stock < 0 || !description) {
        toast.error("Please fill all the fields");
        return;
      }
      if(!photos.file || photos.file.length<1) {
        toast.error("Please upload photos");
        return;
      }
  
      const formData = new FormData();
  
      formData.set("name", name);
      formData.set("description", description);
      formData.set("category", category);
      formData.set("price", price.toString());
      formData.set("stock", stock.toString());
  
      photos.file.forEach((file)=>{
        formData.append('photos',file)
      })
  
      const res = await newproduct({ formData, id: user?._id! });
  
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
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                required
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input
                required
                type="file"
                accept="image/*"
                multiple
                onChange={photos.changeHandler}
              />
            </div>

            {photos.error && <p>{photos.error}</p>}

            {photos.preview &&
              photos.preview.map((img, i) => (
                <img key={i} src={img} alt="New Image" />
              ))}

            <button disabled={isLoading} type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
