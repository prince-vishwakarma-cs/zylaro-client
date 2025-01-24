import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { categories } from "../../../assets/data.json";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import Loader from "../../../components/Loader";
import { usePieQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError } = usePieQuery(user?._id!);

  const CustomerDistribution = data?.charts.CustomerDistribution!;
  const orderFullfillment = data?.charts.orderFullfillment!;
  const productCategories = data?.charts.productCategories!;
  const revenueDistribution = data?.charts.revenueDistribution!;
  const stockAvailablity = data?.charts.stockAvailablity!;
  const userAgeDistribution = data?.charts.userAgeDistribution!;

  if (isError) return <Navigate to={"/admin/dashboard"}/>

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[orderFullfillment.processing,orderFullfillment.shipped,orderFullfillment.delivered]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={productCategories.map((i) => Object.keys(i)[0])}
                  data={productCategories.map((i) => Object.values(i)[0])}
                  backgroundColor={categories.map(
                    (i) => `hsl(${i.value * 4}, ${i.value}%, 50%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[stockAvailablity.inStock, stockAvailablity.outOfStock]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2> Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    revenueDistribution.marketingCost,
                    revenueDistribution.discount,
                    revenueDistribution.burnt,
                    revenueDistribution.productionCost,
                    revenueDistribution.netIncome,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[userAgeDistribution.teen,userAgeDistribution.adult,userAgeDistribution.old]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[CustomerDistribution.admin,CustomerDistribution.customer]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 50]}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
