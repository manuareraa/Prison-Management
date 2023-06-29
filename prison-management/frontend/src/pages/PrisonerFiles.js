import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PrisonerFiles(props) {
  const [prisonerData, setPrisonerData] = useState([]);
  const navigate = useNavigate();

  const parseData = async () => {
    const data = await props.fetchAllPrisonersData();
    let structElements = [];
    if (data.length > 0) {
      data.forEach((e) => {
        let struct = (
          <tr className="font-light hover">
            <td className="py-0 text-[12px]">{e[0]}</td>
            <td className="py-0 text-[12px]">{e[1]}</td>
            <td className="py-0 text-[12px]">{e[2]}</td>
            <td className="py-0 text-[12px]">{e[3]}</td>
            <td className="py-0 text-[12px]">{e[4]}</td>
            <td className="py-0 text-[12px]">{e[5]}</td>
            <td className="py-0 text-[12px]">{e[6]}</td>
            <td className="py-0 text-[12px]">{e[7]}</td>
            <td className="py-0 text-[12px]">{e[8]}</td>
            <td className="py-0 text-[12px]">{e[9]}</td>
            <td className="py-0 text-[12px]">{e[10]}</td>
          </tr>
        );
        structElements.push(struct);
        setPrisonerData(structElements);
      });
    } else {
      console.log("No prisoner data found");
      setPrisonerData(data);
    }
  };

  useEffect(() => {
    parseData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center mt-8">
        <p className="text-center py-2 text-2xl text-prison-blue font-bold">
          Prisoner Files
        </p>
        {prisonerData.length === 0 ? (
          <p className="text-center text-xl mt-4  font-bold">
            No Prisoner Records
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
                  <th className="font-medium py-2 text-[12px]">
                    Admission Date
                  </th>
                  <th className="font-medium py-2 text-[12px]">Release Date</th>
                  <th className="font-medium py-2 text-[12px]">Block</th>
                  <th className="font-medium py-2 text-[12px]">Notes</th>
                </tr>
              </thead>
              <tbody>{prisonerData}</tbody>
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
                navigate("/add-prisoner");
              }
            } else {
              toast.error("Please register and login with your wallet");
            }
          }}
        >
          <p className="font-bold">Add New Prisoner</p>
        </div>
      </div>
    </>
  );
}

export default PrisonerFiles;
