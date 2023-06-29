import React from "react";

function Header(props) {
  return (
    <div className="flex flex-col items-center  py-8">
      <p className="text-prison-blue text-3xl">Prison Management</p>
      {props.appState.loggedIn === true ||
      props.appState.isConnected === true ? (
        <p className="text-prison-blue text-sm mt-2">
          Welcome {props.appState.username}
        </p>
      ) : null}
    </div>
  );
}

export default Header;
