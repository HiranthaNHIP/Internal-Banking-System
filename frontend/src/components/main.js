import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from './sub-components/home';
import Open from './sub-components/open';
import Transaction from './sub-components/transaction';
import Withdraw from './sub-components/withdraw';
import Deposit from './sub-components/deposit';
import Info from './sub-components/info';
import Icon_Image from './assets/bank-image-icon.png';

const Main = () => {
    const location = useLocation();
    const { branch_name, first_name } = location.state || {}; // Destructure state

    const [activeComponent, setActiveComponent] = useState('Home');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    //set date and time
    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);}, []);

    // Function to get the date with proper suffix and format
    const formatDate = (date) => {
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
    
        // Add the appropriate suffix for the day
        const daySuffix = (day) => {
          if (day > 3 && day < 21) return 'th'; // 11th - 20th
          switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
          }
        };
    
        return `${day}${daySuffix(day)} ${month} ${year}`;
    };

    function renderComponent() {
        switch (activeComponent) {
            case 'Home':
                return <Home />;
            case 'Open':
                return <Open />;
            case 'Withdraw':
                return <Withdraw />;
            case 'Deposit':
                return <Deposit />;
            case 'Info':
                return <Info />;
            case 'Transaction':
                return <Transaction />;
            default:
                return <Home />;
        }
    }

    // Function to toggle the popup
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    //Logout navigation
    const logout = () =>{
        navigate('/');
    };

    return (
        <div className='w-full h-screen flex items-center justify-start bg-white font-sans antialiased'>
            <div className='w-[300px] h-screen flex flex-col items-center justify-start pt-3 bg-orange-500'>
                <img src={Icon_Image} className='w-10/12 h-auto mb-3' alt='Bank Icon' />
                <div className='w-full h-full flex flex-col items-end'>

                    {/* Home Button */}
                    <button 
                        className={`w-[240px] py-4 pl-2 text-[15pt] flex flex-row items-center ${activeComponent === 'Home' ? 'bg-white text-orange-500 font-medium rounded-l-xl' : 'bg-orange-500 text-black'}`} 
                        onClick={() => setActiveComponent('Home')}>
                        <svg className={`w-[28px] h-auto mx-2 ${activeComponent === 'Home' ? 'text-orange-500' : 'text-black'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="5 12 3 12 12 3 21 12 19 12" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                        Home
                    </button>

                    {/* Account Open Button */}
                    <button 
                        className={`w-[240px] py-4 pl-2 text-[15pt] flex flex-row items-center ${activeComponent === 'Open' ? 'bg-white text-orange-500 font-medium rounded-l-xl' : 'bg-orange-500 text-black'}`} 
                        onClick={() => setActiveComponent('Open')}>
                        <svg className={`w-[28px] h-auto mx-2 ${activeComponent === 'Open' ? 'text-orange-500' : 'text-black'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        Account Open
                    </button>

                    {/* Withdraw Button */}
                    <button 
                        className={`w-[240px] py-4 pl-2 text-[15pt] flex flex-row items-center ${activeComponent === 'Withdraw' ? 'bg-white text-orange-500 font-medium rounded-l-xl' : 'bg-orange-500 text-black'}`} 
                        onClick={() => setActiveComponent('Withdraw')}>
                        <svg className={`w-[28px] h-auto mx-2 ${activeComponent === 'Withdraw' ? 'text-orange-500' : 'text-black'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <circle cx="5" cy="18" r="2" />  <circle cx="19" cy="6" r="2" />  
                            <path d="M19 8v5a5 5 0 0 1 -5 5h-3l3 -3m0 6l-3 -3" />  
                            <path d="M5 16v-5a5 5 0 0 1 5 -5h3l-3 -3m0 6l3 -3" />
                        </svg>
                        Withdraw
                    </button>

                    {/* Deposit Button */}
                    <button 
                        className={`w-[240px] py-4 pl-2 text-[15pt] flex flex-row items-center ${activeComponent === 'Deposit' ? 'bg-white text-orange-500 font-medium rounded-l-xl' : 'bg-orange-500 text-black'}`} 
                        onClick={() => setActiveComponent('Deposit')}>
                        <svg className={`w-[28px] h-auto mx-2 ${activeComponent === 'Deposit' ? 'text-orange-500' : 'text-black'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"/>
                        </svg>
                        Deposit
                    </button>

                    {/* Account Info Button */}
                    <button 
                        className={`w-[240px] py-4 pl-2 text-[15pt] flex flex-row items-center ${activeComponent === 'Info' ? 'bg-white text-orange-500 font-medium rounded-l-xl' : 'bg-orange-500 text-black'}`} 
                        onClick={() => setActiveComponent('Info')}>
                        <svg className={`w-[28px] h-auto mx-2 ${activeComponent === 'Info' ? 'text-orange-500' : 'text-black'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />  
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        Account Info
                    </button>

                    {/* Transaction History Button */}
                    <button 
                        className={`w-[240px] py-4 pl-2 text-[15pt] flex flex-row items-center ${activeComponent === 'Transaction' ? 'bg-white text-orange-500 font-medium rounded-l-xl' : 'bg-orange-500 text-black'}`} 
                        onClick={() => setActiveComponent('Transaction')}>
                        <svg className={`w-[28px] h-auto mx-2 ${activeComponent === 'Transaction' ? 'text-orange-500' : 'text-black'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v5m0 0 2-2m-2 2-2-2M3 6v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Zm2 2v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8H5Z"/>
                        </svg>
                        Transaction History
                    </button>

                    {/* Log Out Button */}
                    <button 
                        className='w-full py-4 pl-9 text-[15pt] flex flex-row items-center mt-[100px] font-bold hover:bg-white hover:text-red-600'
                        onClick={togglePopup}>
                        <svg className='w-[28px] h-auto mx-2 hover:text-red-600' width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  
                            <path d="M7 12h14l-3 -3m0 6l3 -3" />
                        </svg>
                        Log Out
                    </button>

                    {/* Popup modal */}
                    {isOpen && (
                      <>
                        {/* Blur background */}
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
            
                        {/* Popup content */}
                        <div className="fixed inset-0 flex items-center justify-center z-20">
                            
                          <div className="bg-white flex flex-col items-center p-8 rounded shadow-lg text-center">
                            <svg className="h-10 w-10 text-black mb-2"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <h2 className="text-xl font-bold mb-5">Log Out Conformation!</h2>
                            <p className='text-2xl mb-7'>Are you sure, do you want to Log out?</p>
                            <div className='flex flex-row gap-16'>
                                <button
                                  onClick={togglePopup}
                                  className='w-[150px] h-[50px] text-[14pt] flex flex-row justify-center items-center bg-red-500 text-white rounded-md hover:bg-red-600'
                                >
                                  No
                                </button>
                                <button
                                  onClick={logout}
                                  className="w-[150px] h-[50px] text-[14pt] flex flex-row justify-center items-center bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                  Yes
                                </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className='w-full h-screen flex flex-col items-start text-lg font-medium'>
                <div className='w-full h-14 flex flex-row items-center justify-between px-5 border-solid rounded-sm border-b-orange-500 border-4'>
                    <p>Branch - {branch_name}</p>
                    <p>{currentDateTime.toLocaleTimeString()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatDate(currentDateTime)}</p>
                    <div className='flex flex-row justify-center items-center'>
                        <svg className="w-6 h-6 text-black dark:text-black mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
                        </svg>
                        <p>{first_name}</p>
                    </div>
                </div>
                <div className='w-full h-screen'>
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
};

export default Main;
