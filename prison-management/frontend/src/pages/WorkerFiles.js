import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WorkerFiles(props) {
  const [workerData, setWorkerData] = useState([]);
  const navigate = useNavigate();

  const parseData = async () => {
    const data = await props.fetchAllWorkersData();
    let structElements = [];
    if (data.length > 0) {
      data.forEach((e) => {
        let name = e[1].split("+");
        let fullAddress = e[3].split("+");
        let dept = e[6].split("+");

        let struct = (
          <tr className="font-light hover">
            <td className="py-0 text-[12px]">{e[0]}</td>
            <td className="py-0 text-[12px]">{name[0]}</td>
            <td className="py-0 text-[12px]">{name[1]}</td>
            <td className="py-0 text-[12px]">{e[2]}</td>
            <td className="py-0 text-[12px]">{fullAddress[0]}</td>
            <td className="py-0 text-[12px]">{fullAddress[1]}</td>
            <td className="py-0 text-[12px]">{name[2]}</td>
            <td className="py-0 text-[12px]">{e[4]}</td>
            <td className="py-0 text-[12px]">{e[5]}</td>
            <td className="py-0 text-[12px]">{dept[0]}</td>
            <td className="py-0 text-[12px]">{dept[1]}</td>
            <td className="py-0 text-[12px]">{e[7]}</td>
            <td className="py-0 text-[12px]">{e[8]}</td>
            <td className="py-0 text-[12px]">{e[9]}</td>
            <td className="py-0 text-[12px]">{e[10]}</td>
          </tr>
        );
        structElements.push(struct);
        setWorkerData(structElements);
      });
    } else {
      console.log("No prisoner data found");
      setWorkerData(data);
    }
  };

  useEffect(() => {
    parseData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center mt-8">
        <p className="text-center py-2 text-2xl text-prison-blue font-bold">
          Worker Files
        </p>
        {workerData.length === 0 ? (
          <p className="text-center text-xl mt-4  font-bold">
            No Worker Records
          </p>
        ) : (
          <>
            <table className="table bg-prison-gray text-md font-medium mt-4">
              <thead>
                <tr>
                  <th className="font-medium py-2 text-[12px]">ID</th>
                  <th className="font-medium py-2 text-[12px]">First Name</th>
                  <th className="font-medium py-2 text-[12px]">Last Name</th>
                  <th className="font-medium py-2 text-[12px]">DOB</th>
                  <th className="font-medium py-2 text-[12px]">Address</th>
                  <th className="font-medium py-2 text-[12px]">Post Code</th>
                  <th className="font-medium py-2 text-[12px]">Gender</th>
                  <th className="font-medium py-2 text-[12px]">Block</th>
                  <th className="font-medium py-2 text-[12px]">Mobile</th>
                  <th className="font-medium py-2 text-[12px]">Department</th>
                  <th className="font-medium py-2 text-[12px]">Notes</th>
                  <th className="font-medium py-2 text-[12px]">Shift Start</th>
                  <th className="font-medium py-2 text-[12px]">Shift End</th>
                  <th className="font-medium py-2 text-[12px]">
                    Service Start
                  </th>
                  <th className="font-medium py-2 text-[12px]">Service End</th>
                </tr>
              </thead>
              <tbody>{workerData}</tbody>
            </table>
          </>
        )}

        <div
          className="flex flex-row w-full border-2 border-prison-blue rounded-md mt-8 justify-center py-2 hover:bg-prison-blue/20 hover:cursor-pointer"
          onClick={() => {
            if (props.appState.isConnected) {
              if (props.appState.role !== "admin") {
                toast.error("Only admin have privilege to edit files.");
              } else {
                navigate("/add-worker");
              }
            } else {
              toast.error("Please register and login with your wallet");
            }
          }}
        >
          <p className="font-bold">Add New Worker</p>
        </div>
      </div>
    </>
  );
}

export default WorkerFiles;
