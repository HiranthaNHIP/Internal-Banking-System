import React, {useState} from 'react';
import Profile from './profile';
import Account from './account';
import { getCustomerAndAccountByNic } from '../../api';

const Info = () => {
    const [customerID, setCustomerID] = useState('');
    const [Name, setName] = useState('');
    const [NIC, setNIC] = useState('');
    const [Address, setAddress] = useState('');
    const [DOB, setDOB] = useState('');
    const [tel_no, setTel_no] = useState('');
    const [Gender, setGender] = useState('');
    const [Account_no, setAccount_no] = useState('');
    const [image, setImage] = useState(null);
    // const [imagePreview, setImagePreview] = useState('');
    const [dateOpened, setDateOpened] = useState('');
    const [balance, setBalance] = useState('');
    const [accountTypeName, setAccountTypeName] = useState('');
    const [show, setShow] = useState('Profile');

    function changeSection(){
        if(show === 'Profile'){
            return <Profile CustomerID={customerID} Name={Name} Address={Address} DOB={DOB} tel_no={tel_no} Gender={Gender} Signature={image}/>;
        }else if(show === 'Account'){
            return <Account Account_no={Account_no} balance={balance} date_opened={dateOpened} account_type_name={accountTypeName}/>;
        }
    }


    const searchCustomer = async () => {
        // Basic validation for required fields
        if (!NIC) {
            console.log('Please enter a NIC number to search.');
            return;
        }
        // Here you can add logic to fetch customer data from the backend or process it as required.
        try {
          const response = await getCustomerAndAccountByNic(NIC);
          const fetchedData = response.data.profile;
          console.log(fetchedData);
  
          //SET DATA TO THE STATES
          setCustomerID(fetchedData.CustomerID || '');
          setName(fetchedData.Name || '');
          setNIC(fetchedData.NIC || '');
          setAddress(fetchedData.Address || '');
          setDOB(fetchedData.DOB ? fetchedData.DOB.split('T')[0] : '');
          setTel_no(fetchedData.tel_no || '');
          setGender(fetchedData.Gender || '');
          setAccount_no(fetchedData.Account_no || '');
          setImage(fetchedData.Signature || '');
          setDateOpened(fetchedData.date_opened ? fetchedData.date_opened.split('T')[0] : '');
          setBalance(fetchedData.balance || '');
          setAccountTypeName(fetchedData.account_type_name || '');    
  
        } catch (error) {
          // Log other errors to the console if needed (for debugging purposes)
          if (error.response && error.response.status === 404) {
            console.log('No customers found with this NIC. You can add new customer details.');
          }else{
            console.log("An unexpected error occurred:", error);
          }
        }
    };

    return (
        <div className="w-full h-[700px] flex flex-col font-sans antialiased">

            <div className='w-full h-auto flex flex-row justify-between items-center px-4'>
                {/* searching section */}
                <div className='w-[500px] h-[50px] flex flex-row px-5 my-3 bg-transparent border-[3.2px] pl-4 rounded-full border-orange-500 bg-none outline-transparent'>
                    <input className='w-full text-[14pt] outline-none rounded-lg'
                      type="text"
                      placeholder='Search'
                      onChange={(e)=>{setNIC(e.target.value)}}
                    />
                    <button onClick={searchCustomer}>
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
                    <button id='profile' class={`w-[100px] h-[50px] text-[14pt] flex flex-row justify-center items-center  rounded-l border-[2px] border-orange-500 border-solid hover:border-[2px] ${show === 'Profile' ? 'bg-white text-orange-500':'bg-orange-500 text-white'}`}
                      onClick={()=>{setShow('Profile')}}
                    >
                        Profile
                    </button>
                    {/* bank account */}
                    <button id='bank_account' class={`w-[160px] h-[50px] text-[14pt] flex flex-row justify-center items-center  rounded-r border-[2px] border-orange-500 border-solid hover:border-[2px] ${show === 'Account' ? 'bg-white text-orange-500':'bg-orange-500 text-white'} `}
                    onClick={()=>{setShow('Account')}}
                    >
                        Bank Account
                    </button>
                </div>
            </div>

            <div className='w-full h-auto flex items-center justify-center'>
                {changeSection()}
            </div>
        </div>
    );
};

export default Info;