import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex flex-row bg-prison-gray justify-between">
      {props.appState.loggedIn !== true &&
      props.appState.isConnected !== true ? (
        <div className="flex flex-row">
          {path === "/" ? (
            <div
              className="text-md px-6 bg-prison-blue text-white py-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Login
            </div>
          ) : (
            <div
              className="text-md px-6 bg-prison-gray  text-black py-2 hover:bg-prison-blue hover:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Login
            </div>
          )}
          {path === "/register" ? (
            <div
              className="text-md px-6 bg-prison-blue text-white py-2 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </div>
          ) : (
            <div
              className="text-md px-6 bg-prison-gray  text-black py-2 hover:bg-prison-blue hover:text-white cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row">
          {path === "/dashboard" ? (
            <div
              className="text-md px-6 bg-prison-blue text-white py-2 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          ) : (
            <div
              className="text-md px-6 bg-prison-gray  text-black py-2 hover:bg-prison-blue hover:text-white cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}
          {path === "/prisoner-files" ? (
            <div
              className="text-md px-6 bg-prison-blue text-white py-2 cursor-pointer"
              onClick={() => navigate("/prisoner-files")}
            >
              Prisoner Files
            </div>
          ) : (
            <div
              className="text-md px-6 bg-prison-gray  text-black py-2 hover:bg-prison-blue hover:text-white cursor-pointer"
              onClick={() => navigate("/prisoner-files")}
            >
              Prisoner Files
            </div>
          )}
          {path === "/worker-files" ? (
            <div
              className="text-md px-6 bg-prison-blue text-white py-2 cursor-pointer"
              onClick={() => navigate("/worker-files")}
            >
              Worker Files
            </div>
          ) : (
            <div
              className="text-md px-6 bg-prison-gray  text-black py-2 hover:bg-prison-blue hover:text-white cursor-pointer"
              onClick={() => navigate("/worker-files")}
            >
              Worker Files
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row">
        {props.appState.loggedIn === true ? (
          <div
            className="text-md px-6 bg-prison-blue text-white py-2 cursor-pointer"
            onClick={() => props.logoutWithCreds()}
          >
            Logout
          </div>
        ) : props.appState.isConnected === true ? (
          <>
            <div
              className="text-md px-6 bg-prison-gray  text-black py-2 "
              onClick={() => navigate("/")}
            >
              Wallet:{" "}
              {props.appState.account.slice(0, 8) +
                "..." +
                props.appState.account.slice(-4)}
            </div>
            <div
              className="text-md px-6 bg-prison-blue text-white py-2 cursor-pointer"
              onClick={() => props.logoutWithWallet()}
            >
              Disconnect Wallet
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
