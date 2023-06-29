import React, { useState } from "react";

function AddWorker(props) {
  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const handleBlockChange = (e) => {
    setFormData({
      ...formData,
      block: e.target.value,
    });
  };

  const [formData, setFormData] = useState({
    id: props.appState.workersCount + 1,
  });

  const handleInput = (field, e) => {
    setFormData({
      ...formData,
      [field]: e.currentTarget.value,
    });
  };

  return (
    <div className="flex flex-col w-full items-center p-6">
      <p className="font-bold mb-6">Please fill the details</p>
      <form className="grid grid-cols-3 gap-4">
        <label
          htmlFor="lastname"
          className="col-start-1 col-span-1 text-gray-700"
        >
          First Name:
        </label>
        <input
          type="text"
          placeholder="Enter your First Name"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("firstname", e)}
          value={formData.firstname}
        />
        <label
          htmlFor="lastname"
          className="col-start-1 col-span-1 text-gray-700"
        >
          Last Name:
        </label>
        <input
          type="text"
          placeholder="Enter your Last Name"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("lastname", e)}
          value={formData.lastname}
        />
        <label
          htmlFor="lastname"
          className="col-start-1 col-span-1 text-gray-700"
        >
          Date of Birth:
        </label>
        <input
          type="text"
          placeholder="dd-mm-yyyy"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("dob", e)}
          value={formData.dob}
        />
        <label
          htmlFor="lastname"
          className="col-start-1 col-span-1 text-gray-700"
        >
          Address:
        </label>
        <input
          type="text"
          placeholder="Enter your Address"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("address", e)}
          value={formData.address}
        />
        <label
          htmlFor="lastname"
          className="col-start-1 col-span-1 text-gray-700"
        >
          Post Code:
        </label>
        <input
          type="text"
          placeholder="Enter your Post Code"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("postcode", e)}
          value={formData.postcode}
        />
        <label
          htmlFor="lastname"
          className="col-start-1 col-span-1 text-gray-700"
        >
          Gender:
        </label>
        <label className="inline-flex items-center space-x-4">
          <div className="flex flex-row items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleGenderChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Male</span>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleGenderChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Female</span>
          </div>
        </label>
        <label
          htmlFor="lastname"
          className="col-start-1 col-span-1 text-gray-700"
        >
          Block:
        </label>
        <label className="inline-flex items-center space-x-4">
          <div className="flex flex-row items-center">
            <input
              type="radio"
              name="block"
              value="A"
              checked={formData.block === "A"}
              onChange={handleBlockChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">A</span>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="radio"
              name="block"
              value="B"
              checked={formData.block === "B"}
              onChange={handleBlockChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">B</span>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="radio"
              name="block"
              value="C"
              checked={formData.block === "C"}
              onChange={handleBlockChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">C</span>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="radio"
              name="block"
              value="D"
              checked={formData.block === "D"}
              onChange={handleBlockChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">D</span>
          </div>
        </label>
        <label className="col-start-1 col-span-1 text-gray-700">Mobile:</label>
        <input
          type="text"
          placeholder="Enter Mobile Number"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("mobile", e)}
          value={formData.mobile}
        />
        <label className="col-start-1 col-span-1 text-gray-700">
          Department:
        </label>
        <input
          type="text"
          placeholder="Enter Department"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("department", e)}
          value={formData.department}
        />
        <label className="col-start-1 col-span-1 text-gray-700">Note:</label>
        <input
          type="text"
          placeholder="Enter Notes"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("note", e)}
          value={formData.note}
        />
        <label className="col-start-1 col-span-1 text-gray-700">
          Shift Start Time:
        </label>
        <input
          type="text"
          placeholder="Enter Shift Start Time"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("shiftStart", e)}
          value={formData.shiftStart}
        />
        <label className="col-start-1 col-span-1 text-gray-700">
          Shift End Time:
        </label>
        <input
          type="text"
          placeholder="Enter Shift End Time"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("shiftend", e)}
          value={formData.shiftend}
        />
        <label className="col-start-1 col-span-1 text-gray-700">
          Service Start Date:
        </label>
        <input
          type="text"
          placeholder="Enter Service Start Date"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("serviceStart", e)}
          value={formData.serviceStart}
        />
        <label className="col-start-1 col-span-1 text-gray-700">
          Service Stop Date:
        </label>
        <input
          type="text"
          placeholder="Enter Service Stop Date"
          className="col-start-2 col-span-2 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("serviceEnd", e)}
          value={formData.serviceEnd}
        />
      </form>
      <button
        className="my-4 bg-prison-blue text-white py-2 px-4  rounded-none mt-8"
        onClick={() => {
          props.addWorkerData(formData);
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default AddWorker;
