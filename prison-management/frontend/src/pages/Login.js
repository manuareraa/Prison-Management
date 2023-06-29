import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    usernameForWallet: "",
  });

  const handleInput = (field, e) => {
    setFormData({
      ...formData,
      [field]: e.currentTarget.value,
    });
  };

  return (
    <div className="flex flex-col items-center py-20">
      <p className="font-bold py-6">
        If you do not have an account, please register first by clicking on the
        register button
      </p>
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
            if (window.ethereum && props.appState.account.length > 0) {
              props.logInWithCreds(formData.username, formData.password);
              setFormData({
                username: "",
                password: "",
              });
            } else {
              toast.error("Please install/login Metamask");
            }
          } else {
            toast.error("Please enter username and password");
          }
        }}
      >
        Login
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
      {props.appState.account.length > 0 ? (
        <p className="bg-prison-gray py-2 px-4 mt-4">Wallet: {props.appState.account}</p>
      ) : null}
      <button
        className="my-4 bg-prison-blue text-white py-2 px-4  rounded-none"
        onClick={() => {
          if (window.ethereum && props.appState.account.length > 0) {
            if (formData.usernameForWallet.length !== 0) {
              props.logInWithWallet(formData.usernameForWallet);
            } else {
              toast.error("Please enter username");
            }
          } else {
            toast.error("Please install/login Metamask. Or reload the page.");
          }
        }}
      >
        Login via Wallet
      </button>
    </div>
  );
}

export default Login;
