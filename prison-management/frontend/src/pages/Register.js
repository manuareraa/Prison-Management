import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    usernameForWallet: "",
    role: "",
  });

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

  const handleInput = (field, e) => {
    setFormData({
      ...formData,
      [field]: e.currentTarget.value,
    });
  };

  return (
    <div className="flex flex-col items-center py-20">
      <p className="font-bold py-6">Create New Admin Account</p>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-8">
          <p>Username</p>
          <input
            type="text"
            placeholder="Enter your username"
            className="input input-bordered w-full max-w-xs h-8 rounded-none"
            onInputCapture={(e) => handleInput("username", e)}
            value={formData.username}
          />
        </div>
        <div className="flex flex-row items-center space-x-8">
          <p>Password</p>
          <input
            type="text"
            placeholder="Enter your password"
            className="input input-bordered w-full max-w-xs h-8 rounded-none"
            onInputCapture={(e) => handleInput("password", e)}
            value={formData.password}
          />
        </div>
      </div>
      <button
        className="my-4 bg-prison-blue text-white py-2 px-4  rounded-none"
        onClick={() => {
          if (
            formData.username.length !== 0 &&
            formData.password.length !== 0
          ) {
            props.registerWithCreds(formData.username, formData.password);
            setFormData({
              username: "",
              password: "",
            });
          } else {
            toast.error("Please enter username and password");
          }

          if (props.appState.account.length === 0) {
            toast.error("Please install/connect your wallet");
          }
        }}
      >
        Create New Admin
      </button>
      <div className="divider">OR</div>
      <div className="flex flex-row items-center space-x-8">
        <p>Username</p>
        <input
          type="text"
          placeholder="Enter your username"
          className="input input-bordered w-full max-w-xs h-8 rounded-none"
          onInputCapture={(e) => handleInput("usernameForWallet", e)}
          value={formData.usernameForWallet}
        />
      </div>
      <div className="flex flex-row items-center space-x-8 mt-4">
        <label className="inline-flex items-center space-x-4">
          <div className="flex flex-row items-center">
            <input
              type="radio"
              name="admin"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleRoleChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Admin</span>
          </div>
          <div className="flex flex-row items-center">
            <input
              type="radio"
              name="user"
              value="user"
              checked={formData.role === "user"}
              onChange={handleRoleChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">User</span>
          </div>
        </label>
      </div>
      <button
        className={
          props.appState.account.length > 0
            ? "my-4 bg-prison-gray text-black py-2 px-4  rounded-none"
            : "my-4 bg-prison-blue text-white py-2 px-4  rounded-none"
        }
        onClick={() => {
          if (window.ethereum) {
            props.connectWalletForRegistration();
          } else {
            toast.error("Please install/login metamask");
          }
        }}
      >
        {props.appState.account.length > 0 ? (
          <p className="bg">Wallet: {props.appState.account}</p>
        ) : (
          "Connect Wallet"
        )}
      </button>
      <button
        className="my-4 bg-prison-blue text-white py-2 px-4  rounded-none"
        onClick={() => {
          if (props.appState.account.length === 0) {
            toast.error("Please connect your wallet");
          } else if (formData.usernameForWallet.length === 0) {
            toast.error("Please enter username");
          } else {
            props.registerWithWallet(formData.usernameForWallet, formData.role);
            setFormData({
              username: "",
              password: "",
              usernameForWallet: "",
            });
          }
        }}
      >
        Create New Admin with Wallet
      </button>
    </div>
  );
}

export default Register;
