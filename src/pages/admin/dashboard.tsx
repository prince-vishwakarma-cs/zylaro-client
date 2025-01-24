import { Bell, Search, TrendingDown, TrendingUp, Users } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import Table from "../../components/admin/DashboardTable";
import Loader from "../../components/Loader";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { setIsDashboardDrawer } from "../../redux/reducer/miscSlice";

const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError } = useStatsQuery(user?._id!);
  
  const dispatch = useDispatch()
  const {isDashboardDrawer} = useSelector((state: RootState) => state.misc)

  const stats = data?.stats!;

  if (isError) return <Navigate to={"/"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="bar">
             {isDashboardDrawer && <div className={`close-sidebar ${isDashboardDrawer ? "no-scroll" : ""}`}> <Bars3CenterLeftIcon className="nav-icon" onClick={()=> dispatch(setIsDashboardDrawer(false))}/></div>}
              <div className="info-dash">
                <Bars3CenterLeftIcon className="nav-icon" onClick={()=> dispatch(setIsDashboardDrawer(true))}/>
                <img src={user?.photo || userImg} alt="User" />
                <Bell />
              </div>
              <div className="input-dash">
                <Search />
                <input type="text" placeholder="Search for data, users, docs" />
              </div>
            </div>
            <div className="widgets-dash">
              <div className="dash-home-head">Overview</div>
              <section className="widget-container">
                <WidgetItem
                  percent={stats.changePercent.revenue}
                  amount={true}
                  value={stats.count.revenue}
                  heading="Revenue"
                  backgroundColor="var(--primary-blue)"
                />
                <WidgetItem
                  percent={stats.changePercent.user}
                  value={stats.count.user}
                  heading="Users"
                  backgroundColor="var(--primary-purple)"
                />
                <WidgetItem
                  percent={stats.changePercent.order}
                  value={stats.count.order}
                  heading="Transactions"
                  backgroundColor="var(--primary-blue)"
                />

                <WidgetItem
                  percent={stats.changePercent.product}
                  value={stats.count.Product}
                  heading="Products"
                  backgroundColor="var(--primary-purple)"
                />
              </section>
            </div>

            <section className="graph-container">
              <div className="revenue-chart">
                <h2 className="dash-home-head">Revenue and transactions</h2>
                <BarChart
                  data_1={stats.chart.revenue}
                   data_2={stats.chart.order}
                  title_1="Revenue"
                  title_2="Transaction"
                  bgColor_1="rgb(0, 115, 255)"
                  bgColor_2="rgba(53, 162, 235, 0.8)"
                />
              </div>

              <div className="dashboard-categories">
                <h2 className="dash-home-head">Category Distribution</h2>
                <div>
                  {stats.categoryData.map((i) => {
                    const [heading, value] = Object.entries(i)[0];
                    return (
                      <CategoryItem
                        key={heading}
                        value={value}
                        heading={heading}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="transaction-container">
              <div className="gender-chart">
                <h2>Gender Ratio</h2>
                <DoughnutChart
                  labels={["Female", "Male"]}
                  data={[stats.userratio.female, stats.userratio.male]}
                  backgroundColor={[
                    "hsl(340, 82%, 56%)",
                    "rgba(53, 162, 235, 0.8)",
                  ]}
                  cutout={90}
                />
                <p>
                  <Users />
                </p>
              </div>
              <Table data={stats.modifiedLatestTransaction} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  amount?: boolean;
  backgroundColor?: string;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  amount = false,
  backgroundColor,
}: WidgetItemProps) => (
  <article
    className="widget"
    style={{
      backgroundColor: backgroundColor,
    }}
  >
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `₹${value}` : value}</h4>
      {percent > 0 ? (
        <span>
          <TrendingUp /> +{formatNumber(percent)}%{" "}
        </span>
      ) : (
        <span>
          <TrendingDown /> {formatNumber(percent)}%{" "}
        </span>
      )}
    </div>

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        black ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color: "var(--black-100)",
        }}
      >
        {formatNumber(percent)}%
      </span>
    </div>
  </article>
);

interface CategoryItemProps {
  value: number;
  heading: string;
}

const CategoryItem = ({  value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: "var(--black-100)",
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

function formatNumber(num: number): string {
  const sign = num < 0 ? "-" : "";
  const absNum = Math.abs(num);

  if (absNum >= 1e9) {
    return sign + (absNum / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (absNum >= 1e6) {
    return sign + (absNum / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (absNum >= 1e3) {
    return sign + (absNum / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return sign + absNum.toString();
}

export default Dashboard;
