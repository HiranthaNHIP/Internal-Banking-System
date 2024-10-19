import React from 'react';

const Home = () => {
    
    return (
        <div className="w-full h-[700px] flex flex-col font-sans text-[18pt] text-white antialiased">
            <div className='w-full h-1/2 flex flex-row items-center justify-center'>
                <button className='w-[300px] h-[300px] mx-16 flex justify-center items-center bg-orange-500 rounded-xl cursor-pointer hover:bg-white hover:font-medium hover:border-4 hover:border-orange-500 hover:text-orange-500'
                  
                >
                    <p>Account Open</p>
                </button>
                <button className='w-[300px] h-[300px] mx-16 flex justify-center items-center bg-orange-500 rounded-xl cursor-pointer hover:bg-white hover:font-medium hover:border-4 hover:border-orange-500 hover:text-orange-500'>
                    <p>Deposit</p>
                </button>
                <button className='w-[300px] h-[300px] mx-16 flex justify-center items-center bg-orange-500 rounded-xl cursor-pointer hover:bg-white hover:font-medium hover:border-4 hover:border-orange-500 hover:text-orange-500'>
                    <p>Withdraw</p>
                </button>
            </div>
            <div className='w-full h-1/2 flex flex-row items-center justify-center'>
                <button className='w-[300px] h-[300px] mx-16 flex justify-center items-center bg-orange-500 rounded-xl cursor-pointer hover:bg-white hover:font-medium hover:border-4 hover:border-orange-500 hover:text-orange-500'>
                    <p> Bank Transfer</p>
                </button>
                <button className='w-[300px] h-[300px] mx-16 flex justify-center items-center bg-orange-500 rounded-xl cursor-pointer hover:bg-white hover:font-medium hover:border-4 hover:border-orange-500 hover:text-orange-500'>
                    <p>Account Info</p>
                </button>
                <button className='w-[300px] h-[300px] mx-16 flex justify-center items-center bg-orange-500 rounded-xl cursor-pointer hover:bg-white hover:font-medium hover:border-4 hover:border-orange-500 hover:text-orange-500'>
                    <p>Transaction History</p>
                </button>
            </div>
        </div>
    );
};

export default Home;