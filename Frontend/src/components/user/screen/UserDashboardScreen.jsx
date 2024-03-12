import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../index";
import { useSelector } from 'react-redux'


const UserDashboardScreen = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const adminStatus =  useSelector((state) => state.admin.status);

  return (
    <div className="content-area">
      {authStatus && !adminStatus && (<div>
      <h1>User Dashboard</h1>
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
      </div>
      )
}
    </div>
  );
};

export default UserDashboardScreen;
