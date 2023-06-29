// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract AdminContract {
    struct Admin {
        string mode;
        string username;
        uint256 created_date;
        string password;
        string wallet_address;
    }

    struct Prisoner {
        uint256 id;
        string firstName;
        string lastName;
        string dob;
        string resAddress;
        string postCode;
        string gender;
        string admissionDate;
        string releaseDate;
        string cellBlock;
        string notes;
    }

    struct Worker {
        uint256 id;
        string firstName;
        string dob;
        string resAddress;
        string cellBlock;
        string mobile;
        string department;
        string shiftStart;
        string shiftEnd;
        string serviceStart;
        string serviceEnd;
    }

    mapping(string => bool) public existingUsernames;
    mapping(string => bool) public existingWallets;
    mapping(string => Admin) public admins;
    mapping(uint256 => Prisoner) public prisoners;
    mapping(uint256 => Worker) public workers;

    uint256 prisonerCount = 0;
    uint256 workerCount = 0;

    function registerWithCreds(
        string memory _username,
        string memory _password
    ) public {
        require(!existingUsernames[_username], "Username already exists");
        existingUsernames[_username] = true;
        admins[_username] = Admin({
            mode: "creds",
            username: _username,
            created_date: block.timestamp,
            password: _password,
            wallet_address: ""
        });
    }

    function registerWithWallet(
        string memory _username,
        string memory _wallet_address
    ) public {
        require(
            !existingWallets[_wallet_address],
            "Wallet address already exists"
        );
        existingWallets[_wallet_address] = true;

        if (existingUsernames[_username]) {
            Admin storage admin = admins[_username];
            require(
                keccak256(bytes(admin.wallet_address)) == keccak256(bytes("")),
                "Username/Wallet address already exists"
            );
            admin.wallet_address = _wallet_address;
            admin.mode = "hybrid";
        } else {
            existingUsernames[_username] = true;
            admins[_username] = Admin({
                mode: "wallet",
                username: _username,
                created_date: block.timestamp,
                password: "",
                wallet_address: _wallet_address
            });
        }
    }

    function loginWithCreds(
        string memory _username,
        string memory _password
    ) public view returns (string memory) {
        Admin storage admin = admins[_username];
        if (
            keccak256(bytes(admin.username)) == keccak256(bytes(_username)) &&
            keccak256(bytes(admin.password)) == keccak256(bytes(_password))
        ) {
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    }

    function loginWithWallet(
        string memory _username,
        string memory _wallet_address
    ) public view returns (string memory, string memory) {
        Admin storage admin = admins[_username];
        if (
            keccak256(bytes(admin.wallet_address)) ==
            keccak256(bytes(_wallet_address))
        ) {
            return ("Login successful", admin.username);
        } else {
            return ("Invalid Wallet/Wallet not registered", "");
        }
    }

    function addPrisonerData(
        uint256 _id,
        string memory _firstName,
        string memory _lastName,
        string memory _dob,
        string memory _address,
        string memory _postCode,
        string memory _gender,
        string memory _admissionDate,
        string memory _releaseDate,
        string memory _block,
        string memory _notes
    ) public {
        prisoners[_id] = Prisoner({
            id: _id,
            firstName: _firstName,
            lastName: _lastName,
            dob: _dob,
            resAddress: _address,
            postCode: _postCode,
            gender: _gender,
            admissionDate: _admissionDate,
            releaseDate: _releaseDate,
            cellBlock: _block,
            notes: _notes
        });
        prisonerCount += 1;
    }

    function getPrisonerCount() public view returns (uint256) {
        return prisonerCount;
    }

    function getAllPrisoners() public view returns (Prisoner[] memory) {
        Prisoner[] memory allPrisoners = new Prisoner[](prisonerCount);
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= prisonerCount; i++) {
            allPrisoners[currentIndex] = prisoners[i];
            currentIndex++;
        }

        return allPrisoners;
    }

    function addWorkerData(
        uint256 _id,
        string memory _firstName,
        string memory _dob,
        string memory _address,
        string memory _cellBlock,
        string memory _mobile,
        string memory _department,
        string memory _startDate,
        string memory _endDate,
        string memory _serviceStart,
        string memory _serviceEnd
    ) public {
        workers[_id] = Worker({
            id: _id,
            firstName: _firstName,
            dob: _dob,
            resAddress: _address,
            cellBlock: _cellBlock,
            mobile: _mobile,
            department: _department,
            shiftStart: _startDate,
            shiftEnd: _endDate,
            serviceStart: _serviceStart,
            serviceEnd: _serviceEnd
        });
        workerCount += 1;
    }

    function getWorkerCount() public view returns (uint256) {
        return workerCount;
    }

    function getAllWorkers() public view returns (Worker[] memory) {
        Worker[] memory allWorkers = new Worker[](workerCount);
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= workerCount; i++) {
            allWorkers[currentIndex] = workers[i];
            currentIndex++;
        }

        return allWorkers;
    }
}
