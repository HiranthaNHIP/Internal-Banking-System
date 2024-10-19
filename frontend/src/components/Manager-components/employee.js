import React, { useState, useCallback, useEffect } from 'react';
import Add from "./addEmployee";
import Table from "./empoyeeTable";
import { jwtDecode } from 'jwt-decode';
import { getEmployees } from '../../api';

const Employee = () => {
    const [show, setShow] = useState('Profile');
    const [employees, setEmployees] = useState([]);
    const [branchId, setBranchId] = useState('');    

    function changeSection(){
        if(show === 'Profile'){
            return <Add/>;
        }else if(show === 'Account'){
            return <Table employees={employees} branchId={branchId} />;
        }
    }

    const fetchEmployees = useCallback(async () => {
        try {
          const response = await getEmployees(branchId);
          const data = response.data.employees;
          console.log(data);
          setEmployees(data);
        } catch (error) {
          if (error.response) {
            console.log('Error fetching employees - Server response error:', error.response);
          } else {
            console.log('Error fetching employees - Client error:', error.message);
          }
        }
      }, [branchId]); // Memoize to only change if branchId changes
    
      useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setBranchId(decodedToken.user.branch_id);
        //   setEmployeeId(decodedToken.user.employee_id);
        }
      }, []);
    
      useEffect(() => {
        if (branchId) {
          fetchEmployees();
        }
      }, [branchId, fetchEmployees]); // Now fetchTransactions is included in the dependency array


  return (
    <div className="w-full h-[700px] flex flex-col font-sans text-[18pt] text-black antialiased">
        <div className='w-full h-auto flex flex-row justify-between items-center px-4'>
                {/* searching section */}
                <div className='w-[500px] h-[50px] flex flex-row px-5 my-3 bg-transparent border-[3.2px] pl-4 rounded-full border-orange-500 bg-none outline-transparent'>
                    <input className='w-full text-[14pt] outline-none rounded-lg'
                      type="text"
                      placeholder='Search'
                    />
                    <button>
                        <svg class="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <circle cx="10" cy="10" r="7" />  
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </button>
                </div>

                {/* button section */}
                <div className='flex flex-row'>
                    {/* profile button */}
                    <button id='profile' class={`w-[160px] h-[50px] text-[14pt] flex flex-row justify-center items-center  rounded-l border-[2px] border-orange-500 border-solid hover:border-[2px] ${show === 'Profile' ? 'bg-orange-500 text-white':'bg-white text-orange-500'}`} 
                      onClick={()=>{setShow('Profile')}}
                    >
                        Add Employee
                    </button>
                    {/* bank account */}
                    <button id='bank_account' class={`w-[160px] h-[50px] text-[14pt] flex flex-row justify-center items-center  rounded-r border-[2px] border-orange-500 border-solid hover:border-[2px] ${show === 'Account' ? 'bg-orange-500 text-white':'bg-white text-orange-500'}`}
                    onClick={()=>{setShow('Account')}}
                    >
                        All
                    </button>
                </div>
            </div>

            <div className='w-full h-auto flex items-center justify-center'>
                {changeSection()}
            </div>
    </div>
  )
}

export default Employee