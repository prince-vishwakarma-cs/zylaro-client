import { useState } from "react";
import Card from "../components/Card";
import { ArrowDown, Filter } from "react-feather";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { customError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartSlice";
import { CartItem } from "../types/types";
import { useSearchParams } from "react-router-dom";

const Search = () => {

  const searchQuery = useSearchParams()[0];
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState(searchQuery.get("category") || "");
  const [page, setPage] = useState(1);
  const isPreviousPage = page > 1;

  const { isLoading: productsLoading, data: searchData ,isError:productIsError,error:productError} =
    useSearchProductsQuery({
      search,
      sort,
      category,
      maxPrice,
      page,
    });


    const isNextPage = page < (searchData?.totalPages ?? 1);

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem))
    toast.success("Added to Cart");
  };

  if (isError) {
    const err = error as customError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as customError;
    toast.error(err.data.message);
  }

  

  return (
    <div className="search-page">
      <aside>
        <div className="headf">
          <Filter />
          <h2>filter</h2>
        </div>
        <div>
          <h4>
            Sort by <ArrowDown />
          </h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Low - High</option>
            <option value="dsc">High - Low</option>
          </select>
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </aside>
      <main>
  <input
    type="text"
    placeholder="Search by name...."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/* Compact Filter and Sort */}
  <div className="filter-contain">
  <div className="filter-sort">
    <div className="filter-item">
      <h4>Sort by</h4>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">None</option>
        <option value="asc">Low - High</option>
        <option value="dsc">High - Low</option>
      </select>
    </div>

    <div className="filter-item">
      <h4>Category</h4>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        {!loadingCategories &&
          categoriesResponse?.categories.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
      </select>
    </div>

    <div className="price-range">
      <h4>Max Price: {maxPrice || ""}</h4>
      <input
        type="range"
        min={100}
        max={100000}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
    </div>
  </div>
  </div>

  <div className="scrollable">
          {
            productsLoading ? <Skeleton/> : (
              <div className="product-list">
            {searchData?.products.map((product) => (
              <Card
                key={product._id}
                productId={product._id}
                price={product.price}
                stock={product.stock}
                name={
                  product.name.length > 15
                    ? product.name.slice(0, 18) + "..."
                    : product.name
                }
                photos={product.photos}
                handler={addToCartHandler}
              />
            ))}
          </div>
            )
          }
          {searchData && searchData.totalPages >= 1 && (
            <article>
              <button
                disabled={!isPreviousPage}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev
              </button>
              <span>
                {page} of {searchData.totalPages}
              </span>
              <button
                disabled={!isNextPage}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </article>
          )}
        </div>
</main>

    </div>
  );
};

export default Search;
