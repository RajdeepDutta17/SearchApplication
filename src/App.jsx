import { useState, useEffect, Fragment } from "react";
import "./App.css";
import { toast } from "react-toastify";
import axios from "axios";

function App() {
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState(null);

  const handleClick = () => {
    if (!inputData) {
      toast.warn("Input field is empty!!");
    }
  };

  const getEmployeeData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url:
          //   ? "https://search-app-api-qicn.onrender.com/api/v1/getEmployeeByQuery?searchQuery=" +
          //     inputData
          //   : "https://search-app-api-qicn.onrender.com/api/v1/getEmployee",
          "http://localhost:8080/api/v1/getEmployeeByQuery?searchQuery=" +
          inputData,
      });

      setData(res.data.data);
      if (!res.data.status) {
        toast.warn(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, [inputData]);
  return (
    <div className="container">
      <h1 className="mt-2">Employee Details</h1>
      <div className="inputBox">
        <input
          className="form-control"
          type="text"
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
          placeholder="Type to search...."
        />
        <button className="btn btn-primary" onClick={handleClick}>
          Search
        </button>
      </div>
      <div className="tableBox mt-2">
        <table className="table table-bordered table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Employee ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Job Title</th>
              <th scope="col">Department</th>
              <th scope="col">Business Unit</th>
              <th scope="col">Gender</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <td data-cell="Employee ID">{item.employee_id}</td>
                    <td data-cell="Full Name">{item.full_name}</td>
                    <td data-cell="Job Title">{item.job_title}</td>
                    <td data-cell="Department">{item.department}</td>
                    <td data-cell="Business Unit">{item.business_unit}</td>
                    <td data-cell="Gender">{item.gender}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="col">Employee ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Job Title</th>
              <th scope="col">Department</th>
              <th scope="col">Business Unit</th>
              <th scope="col">Gender</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default App;
