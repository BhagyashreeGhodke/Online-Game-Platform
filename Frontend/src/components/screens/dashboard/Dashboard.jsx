import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../index";
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const adminStatus =  useSelector((state) => state.admin.status);
  console.log("adminStatus in dashboard of admin: ", adminStatus);
  return (
    <div className="content-area">
      {authStatus && adminStatus && (<div>
    
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

export default Dashboard;
