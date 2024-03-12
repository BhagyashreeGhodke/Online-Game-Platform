import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Games",
  "Game DC",
  "Date",
  "Status",
  "Action",
];

const TABLE_DATA = [
  {
    id: 1,
    Games: "Game 1",
    DC: 100,
    date: "Jun 29,2023",
    status: "Active"
  },
  {
    id: 2,
    Games: "Game 2",
    DC: 100,
    date: "Jun 29,2023",
    status: "Active"
  },
  {
    id: 3,
    Games: "Game 3",
    DC: 100,
    date: "Jun 29,2023",
    status: "Active"
  },
  {
    id: 4,
    Games: "Game 4",
    DC: 100,
    date: "Jun 29,2023",
    status: "Active"
  },
  {
    id: 5,
    Games: "Game 5",
    DC: 100,
    date: "Jun 29,2023",
    status: "Active"
  },
  {
    id: 6,
    Games: "Game 6",
    DC: 100,
    date: "Jun 29,2023",
    status: "Active"
  },
  {
    id: 7,
    Games: "Game 7",
    DC: 100,
    date: "Jun 29,2023",
    status: "Active"
  },
  {
    id: 8,
    Games: "Game 8",
    DC: 100,
    date: "Jun 29,2023",
    status: "Active"
  },
];

const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Game Played</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.Games}</td>
                  <td>{dataItem.DC}</td>
                  <td>{dataItem.date}</td>
                  
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td>
                  
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
