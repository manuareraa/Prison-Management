import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col w-full  px-6 py-10 space-y-6">
        <div className="flex flex-row w-full  p-2 space-x-10   justify-center">
          <div
            className="flex flex-col border-4 rounded-md border-prison-blue py-20 px-32 w-[400px] text-center hover:bg-prison-blue/20 hover:cursor-pointer"
            onClick={() => navigate("/prisoner-files")}
          >
            <p className="text-xl font-bold">Prisoner Files</p>
          </div>
          <div
            className="flex flex-col border-4 rounded-md border-prison-blue py-20 px-32 w-[400px] text-center  hover:bg-prison-blue/20 hover:cursor-pointer"
            onClick={() => navigate("/worker-files")}
          >
            <p className="text-xl font-bold">Worker Files</p>
          </div>
        </div>
        <div className="flex flex-row w-full  p-2 space-x-10 justify-center">
          <div className="flex flex-col border-4 rounded-md border-prison-blue py-20 px-32 w-[400px] text-center  hover:bg-prison-blue/20 hover:cursor-pointer">
            <p className="text-xl font-bold">Case Files</p>
            <p className="text-sm italic ">(In Development)</p>
          </div>
          <div className="flex flex-col border-4 rounded-md border-prison-blue py-20 px-32 w-[400px] text-center  hover:bg-prison-blue/20 hover:cursor-pointer">
            <p className="text-xl font-bold">Cells Files</p>
            <p className="text-sm italic ">(In Development)</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
