import React, {useState, useEffect } from 'react';
import { getAccountForWithdrawalAndDeposit, withdrawAmount } from '../../api'
import {jwtDecode} from 'jwt-decode';

const Withdraw = () => {
    const [image, setImage] = useState(null);
    const [NIC, setNIC] = useState('');
    const [Account_no, setAccount_no] = useState('');
    const [Name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [selectedAccountType, setSelectedAccountType] = useState('');
    const [balance, setBalance] = useState('');
    const [amount, setAmount] = useState('');
    const [branchId, setBranchId] = useState('');

    // Convert input value to a number and check if it's less than or equal to 0
    const isButtonDisabled = Number(balance) <= 0;



    const searchUserDetails = async () => {
        // Basic validation for required fields
        if (!Account_no) {
            console.log('Please enter an Account number to search.');
            setAccount_no('');
            setNIC('');
            setName('');
            setImage('');
            setSelectedAccountType('');
            setBalance('');
            return;
        }
        // Here you can add logic to fetch customer data from the backend or process it as required.
        try {
          const response = await getAccountForWithdrawalAndDeposit(Account_no);
          const fetchedData = response.data.accounts; // Adjust this based on the actual response structure.
          console.log(fetchedData);
  
          //SET DATA TO THE STATES
          setAccount_no(fetchedData.Account_no || '');
          setNIC(fetchedData.NIC || '');
          setName(fetchedData.Name || '');
          setImage(fetchedData.Signature || '');
          setSelectedAccountType(fetchedData.account_type_name || '');
          setBalance(fetchedData.balance || '');
          
        } catch (error) {
          // Log other errors to the console if needed (for debugging purposes)
          if (error.response && error.response.status === 404) {
            console.log('No details were found!');
            setAccount_no('');
            setNIC('');
            setName('');
            setImage('');
            setSelectedAccountType('');
            setBalance('');
          }else{
            console.log("An unexpected error occurred:", error);
          }
        }
      }
    //USE-EFFECT
    // Fetch account types when the component mounts
    useEffect(() => {
      const token = localStorage.getItem('token'); // Assuming you store your token in localStorage
      console.log(token);
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        setBranchId(decodedToken.user.branch_id);
        setEmployeeId(decodedToken.user.employee_id);
      }
    }, []);

    const withdraw = async () => {
      const withdrawData = {
        account_no: Account_no,
        amount: amount,
        employee_id: employeeId,
        branch_id: branchId,
      };
      try {
        const response = await withdrawAmount(withdrawData);
        console.log(response);
      } catch (error) {
        console.log("An unexpected error occurred:", error.response ? error.response.data : error.message);

      }
    }
    return (
      <div className="w-full h-[700px] flex flex-col font-sans antialiased">
        <div className="w-full h-auto flex justify-center items-center">
          <div className="w-[500px] h-[50px] flex flex-row px-5 my-3 bg-transparent border-[3.2px] pl-4 rounded-full border-orange-500 bg-none outline-transparent">
            <input
              className="w-full text-[14pt] outline-none rounded-lg"
              type="text"
              value={Account_no}
              onChange={(e) => setAccount_no(e.target.value)}
              placeholder="Search"
            />
            <button onClick={searchUserDetails}>
              <svg
                class="h-8 w-8 text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full h-[650px] flex flex-col font-sans antialiased">
          <div className="w-full h-auto flex flex-row justify-between items-end px-[110px] mt-3.5">
            <div className="w-auto h-auto flex flex-col">
              <div className="w-auto h-auto flex flex-col my-2 ">
                <label className="text-[15pt] font-medium">Account No.</label>
                <input
                  className="w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent"
                  type="text"
                  placeholder="Account No."
                  value={Account_no}
                  readOnly
                />
              </div>
              <div className="w-auto h-auto flex flex-col my-2">
                <label className="text-[15pt] font-medium">Name</label>
                <input
                  className="w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent"
                  type="text"
                  placeholder="Name"
                  value={Name}
                  readOnly
                />
              </div>
              <div className="w-auto h-auto flex flex-col my-2">
                <label className="text-[15pt] font-medium">Balance</label>
                <input
                  className="w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent"
                  type="text"
                  placeholder="Balance"
                  value={balance}
                  readOnly
                />
              </div>
            </div>
            <div className="w-auto h-auto flex flex-col">
              <div className="w-auto h-auto flex flex-col my-2">
                <label className="text-[15pt] font-medium">NIC</label>
                <input
                  className="w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent"
                  type="text"
                  placeholder="NIC"
                  value={NIC}
                  readOnly
                />
              </div>
              <div className="w-auto h-auto flex flex-col my-2">
                <label className="text-[15pt] font-medium">Account Type</label>
                <input
                  className="w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent"
                  type="text"
                  placeholder="Account Type"
                  value={selectedAccountType}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="w-full h-auto flex items-center justify-center">
            <div className="w-auto h-auto flex flex-col my-2">
              <label className="text-[15pt] font-medium">Signature</label>
              <div className="w-[1060px] h-[150px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent">
                {/* Display the image if it exists */}
                {image ? (
                  <img
                    src={`http://localhost:5000/images/`+image} alt="Customer Signature"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span>No signature available</span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-auto flex flex-row justify-between items-center my-2 px-[110px]">
            <div className="w-auto h-auto flex flex-col my-1">
              <label className="text-[15pt] font-medium">
                Enter withdraw amount
              </label>
              <input
                className="w-[500px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent"
                type="text"
                placeholder="Amount (Rs.)"
                disabled={isButtonDisabled}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button onClick={withdraw} disabled ={isButtonDisabled} className="w-[200px] h-[50px] justify-center items-center text-[14pt] mt-8 bg-orange-500 text-white rounded border-[2px] border-orange-500 border-solid hover:border-[2px] hover:border-orange-500 hover:bg-white hover:text-orange-500">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    );
};

export default Withdraw;