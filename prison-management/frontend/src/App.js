import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Web3 from "web3";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import PrisonerFiles from "./pages/PrisonerFiles";
import WorkerFiles from "./pages/WorkerFiles";
import AddPrisoner from "./pages/AddPrisoner";
import AddWorker from "./pages/AddWorker";
import adminContractAbi from "./ABI/AdminContract";
import Loading from "./components/Loading";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    loading: false,
    message: "Fetching Prisoners data...",
  });
  const [appState, setAppState] = useState({
    loggedIn: false,
    web3: null,
    account: "",
    chainId: "",
    maticBalance: "",
    isConnected: false,
    username: "",
    adminContractAddress: "0x27dCcFF3216B463071ED7a5Ca4D030267dA5d638",
    prisonersCount: 0,
    workersCount: 0,
  });

  const addPrisonerData = async (data) => {
    console.log("<< addPrisonerData >>", data);
    try {
      setLoading({
        loading: true,
        message: "Adding Prisoner data to Blockchain...",
      });
      const web3 = appState.web3;
      const contract = new web3.eth.Contract(
        JSON.parse(adminContractAbi),
        appState.adminContractAddress
      );
      const result = await contract.methods
        .addPrisonerData(
          data.id,
          data.firstname,
          data.lastname,
          data.dob,
          data.address,
          data.postcode,
          data.gender,
          data.admissiondate,
          data.releasedate,
          data.block,
          data.note
        )
        .send({ from: appState.account });
      setLoading({ loading: false, message: "" });
      toast.success("Prisoner data added successfully");
      navigate("/prisoner-files");
    } catch (error) {
      console.log("Error occured while adding prisoner data: ", error);
      setLoading({ loading: false, message: "" });
    }
  };

  const addWorkerData = async (data) => {
    console.log("<< addWorkerData >>", data);

    try {
      setLoading({
        loading: true,
        message: "Adding Worker data to Blockchain...",
      });
      const web3 = appState.web3;
      const contract = new web3.eth.Contract(
        JSON.parse(adminContractAbi),
        appState.adminContractAddress
      );
      const result = await contract.methods
        .addWorkerData(
          data.id,
          data.firstname + "+" + data.lastname + "+" + data.gender,
          data.dob,
          data.address + "+" + data.postcode,
          data.block,
          data.mobile,
          data.department + "+" + data.note,
          data.shiftStart,
          data.shiftend,
          data.serviceStart,
          data.serviceEnd
        )
        .send({ from: appState.account });
      setLoading({ loading: false, message: "" });
      toast.success("Worker data added successfully");
      navigate("/worker-files");
    } catch (error) {
      console.log("Error occured while adding worker data:", error);
      setLoading({ loading: false, message: "" });
    }
  };

  const fetchAllWorkersData = async () => {
    setLoading({ loading: true, message: "Fetching workers data..." });
    const web3 = appState.web3;
    const contract = new web3.eth.Contract(
      JSON.parse(adminContractAbi),
      appState.adminContractAddress
    );
    const result = await contract.methods.getAllWorkers().call();
    console.log("fetchAllWorkersData", result);
    setLoading({ loading: false, message: "" });
    setAppState((prevState) => ({
      ...prevState,
      workersCount: result.length,
    }));
    return result;
  };

  const fetchAllPrisonersData = async () => {
    setLoading({ loading: true, message: "Fetching prisoners data..." });
    const web3 = appState.web3;
    const contract = new web3.eth.Contract(
      JSON.parse(adminContractAbi),
      appState.adminContractAddress
    );
    const result = await contract.methods.getAllPrisoners().call();
    console.log("fetchAllPrisonersData", result);
    setLoading({ loading: false, message: "" });
    setAppState((prevState) => ({
      ...prevState,
      prisonersCount: result.length,
    }));
    return result;
  };

  const logInWithCreds = async (username, password) => {
    console.log("<< Login >>", username, password);
    setLoading({ loading: true, message: "Logging in..." });
    const web3 = appState.web3;
    const contract = new web3.eth.Contract(
      JSON.parse(adminContractAbi),
      appState.adminContractAddress
    );
    const result = await contract.methods
      .loginWithCreds(username, password)
      .call({ from: appState.account });
    if (result !== "Invalid credentials") {
      setAppState((prevState) => ({
        ...prevState,
        loggedIn: true,
        username: username,
      }));
      navigate("/dashboard");
      setLoading({ loading: false, message: "" });
    } else {
      setLoading({ loading: false, message: "" });
      toast.error("Invalid credentials");
    }
  };

  const logInWithWallet = async (username) => {
    console.log("<< Login with wallet >>");
    const web3 = appState.web3;
    const contract = new web3.eth.Contract(
      JSON.parse(adminContractAbi),
      appState.adminContractAddress
    );
    const result = await contract.methods
      .loginWithWallet(username, appState.account)
      .call({ from: appState.account });
    if (result) {
      if (result[1].length === 0) {
        toast.error("Invalid credentials");
      } else {
        navigate("/dashboard");
        setAppState((prevState) => ({
          ...prevState,
          isConnected: true,
          username: username,
          role: result[2],
        }));
      }
    } else {
      console.log("Invalid wallet address or wallet not registered");
    }
  };

  const logoutWithCreds = () => {
    console.log("<< Logout >>");
    setAppState((prevState) => {
      return {
        ...prevState,
        loggedIn: false,
        isConnected: false,
        username: "",
      };
    });
    navigate("/");
  };

  const logoutWithWallet = () => {
    console.log("<< Logout >>");
    setAppState((prevState) => {
      return {
        ...prevState,
        loggedIn: false,
        isConnected: false,
        username: "",
      };
    });
    navigate("/");
  };

  const registerWithWallet = async (username, role) => {
    setLoading({ loading: true, message: "Registering user in Blockchain..." });
    console.log("<< Register with wallet >>", username, appState.account);
    let result;
    try {
      const web3 = appState.web3;
      const contract = new web3.eth.Contract(
        JSON.parse(adminContractAbi),
        appState.adminContractAddress
      );
      try {
        result = await contract.methods
          .registerWithWallet(username, appState.account, role)
          .send({ from: appState.account });
        console.log(result);
        setLoading({ loading: false, message: "" });
        toast.success("User registered successfully. Please login now.");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(
          "Error occured while registering user with wallet. Might have been already registered."
        );
        setLoading({ loading: false, message: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error with the Wallet/Metamask");
      setLoading({ loading: false, message: "" });
    }
  };

  const registerWithCreds = async (username, password) => {
    setLoading({ loading: true, message: "Registering user in Blockchain..." });
    console.log("<< Register with credentials >>", username, password);
    let result;
    try {
      const web3 = appState.web3;
      const contract = new web3.eth.Contract(
        JSON.parse(adminContractAbi),
        appState.adminContractAddress
      );
      try {
        result = await contract.methods
          .registerWithCreds(username, password)
          .send({ from: appState.account });
        console.log(result);
        setLoading({ loading: false, message: "" });
        toast.success("User registered successfully. Please login now.");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(
          "Error occured while registering user with creds. Might have been already registered."
        );
        setLoading({ loading: false, message: "" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error with the Wallet/Metamask");
      setLoading({ loading: false, message: "" });
    }
  };

  const connectWalletForRegistration = async () => {
    console.log("<< Connect wallet for regsitration>>");
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);

        // Check if Polygon chain is added to Metamask
        window.ethereum
          .request({ method: "net_version" })
          .then((chainId) => {
            setAppState((prevState) => {
              return { ...prevState, chainId: chainId };
            });
            if (chainId !== "80001") {
              toast.info("Polygon Mumbai Chain not found. Adding it...");
              // Add Polygon Mumbai chain to Metamask if not added before
              window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x13881",
                    chainName: "Mumbai Testnet",
                    nativeCurrency: {
                      name: "MATIC",
                      symbol: "MATIC",
                      decimals: 18,
                    },
                    rpcUrls: ["https://rpc-mumbai.matic.today"],
                    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
                  },
                ],
              });
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error connecting to Polygon Mumbai Chain");
          });

        const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        const chainId = await web3.eth.getChainId();

        setAppState((prevState) => {
          return {
            ...prevState,
            account: accounts[0],
            chainId: chainId,
            maticBalance: balance,
          };
        });

        toast.info("Wallet connected successfully");
      } catch (error) {
        console.error(error);
        toast.error(
          "Install Metamask. If Metamaask is installed, please reload."
        );
      }
    } else {
      toast.error("Please install MetaMask to connect your wallet.");
    }
  };

  const setUpWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        setAppState((prevState) => {
          return { ...prevState, web3: web3 };
        });
        console.log("<< Web3 Object Received  >>");
        // Check if Polygon chain is added to Metamask

        window.ethereum
          .request({ method: "net_version" })
          .then(async (chainId) => {
            console.log("Chain ID: ", chainId);
            if (chainId !== "80001") {
              try {
                await window.ethereum.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: "0x13881" }],
                });
                toast.info("Polygon Mumbai Chain found.");
              } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                  try {
                    window.ethereum.request({
                      method: "wallet_addEthereumChain",
                      params: [
                        {
                          chainId: "0x13881",
                          chainName: "Mumbai Testnet",
                          nativeCurrency: {
                            name: "MATIC",
                            symbol: "MATIC",
                            decimals: 18,
                          },
                          rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                          blockExplorerUrls: ["https://mumbai.polygonscan.com"],
                        },
                      ],
                    });
                  } catch (addError) {
                    // handle "add" error
                    toast.error("Error connecting to Polygon Mumbai Chain (2)");
                  }
                }
                // handle other "switch" errors
                toast.error("Error connecting to Polygon Mumbai Chain (1)");
              }
            }
          });

        const accounts = await web3.eth.getAccounts();
        console.log("<< Account Received  >>", accounts[0]);

        setAppState((prevState) => {
          return {
            ...prevState,
            account: accounts[0],
          };
        });
      } catch (error) {
        console.error(error);
        toast.error("Error getting web3 object. Install Metamask.");
      }
    } else {
      toast.error("Please install MetaMask to connect your wallet.");
    }
  };

  const handleChainChanged = useCallback(
    (newChainId) => {
      // toast.info("Chain changed!");
      navigate("/");
      setAppState((prevState) => {
        return {
          ...prevState,
          account: "",
          chainId: "",
          maticBalance: "",
          isConnected: false,
        };
      });
    },
    [navigate, setAppState]
  );

  const handleAccountsChanged = useCallback(
    (newAccounts) => {
      // toast.error("Account changed! Please log in Again");
      navigate("/");
      setAppState((prevState) => {
        return {
          ...prevState,
          account: "",
          chainId: "",
          maticBalance: "",
          isConnected: false,
        };
      });
    },
    [navigate, setAppState]
  );

  useEffect(() => {
    setUpWeb3();
  }, []);

  useEffect(() => {
    window.ethereum.removeListener("chainChanged", handleChainChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    window.ethereum.on("accountsChanged", handleAccountsChanged);
  }, [appState.account, handleAccountsChanged, handleChainChanged]);

  return (
    <div className="h-screen">
      {loading.loading === true ? (
        <Loading loading={loading} setLoading={setLoading} />
      ) : null}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Header appState={appState} />
      <Navbar
        appState={appState}
        logoutWithCreds={logoutWithCreds}
        logoutWithWallet={logoutWithWallet}
      />
      <Footer />
      <Routes>
        <Route
          path="/"
          element={
            <Login
              appState={appState}
              logInWithCreds={logInWithCreds}
              logInWithWallet={logInWithWallet}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              appState={appState}
              logInWithWallet={logInWithWallet}
              registerWithWallet={registerWithWallet}
              registerWithCreds={registerWithCreds}
              connectWalletForRegistration={connectWalletForRegistration}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/prisoner-files"
          element={
            <PrisonerFiles
              fetchAllPrisonersData={fetchAllPrisonersData}
              appState={appState}
            />
          }
        />
        <Route
          path="/worker-files"
          element={
            <WorkerFiles
              appState={appState}
              fetchAllWorkersData={fetchAllWorkersData}
            />
          }
        />

        <Route
          path="/add-prisoner"
          element={
            <AddPrisoner
              addPrisonerData={addPrisonerData}
              appState={appState}
            />
          }
        />
        <Route
          path="/add-worker"
          element={
            <AddWorker appState={appState} addWorkerData={addWorkerData} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
