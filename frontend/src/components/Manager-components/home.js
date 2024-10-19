import React from 'react';
import Chart from '../sub-components/chart';

const Home = () => {
    
    return (
        <div className="w-full h-[725px] flex flex-col font-sans text-white antialiased">
           <div className='w-full h-1/2 flex flex-row justify-center text-[18pt] items-center gap-20'>
                <div className='w-[320px] h-[320px] flex flex-col justify-center items-center bg-orange-500 rounded '>
                    <svg className="w-[180px] h-auto mx-2 text-white" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"/>
                    </svg>
                    <p className='mt-3 font-medium text-[18pt]'>Daily Deposit</p>
                    <p className='mt-4 font-normal text-[16pt]'>Rs.5,000,000.00</p>
                </div>
                <div className='w-[320px] h-[320px] flex flex-col justify-center items-center bg-orange-500 rounded '>
                    <svg className="w-[180px] h-auto mx-2 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>  
                        <circle cx="5" cy="18" r="2" />  <circle cx="19" cy="6" r="2" />  
                        <path d="M19 8v5a5 5 0 0 1 -5 5h-3l3 -3m0 6l-3 -3" />  
                        <path d="M5 16v-5a5 5 0 0 1 5 -5h3l-3 -3m0 6l3 -3" />
                    </svg>
                    <p className='mt-3 font-medium text-[18pt]'>Daily Withdraw</p>
                    <p className='mt-4 font-normal text-[16pt]'>Rs.5,000,000.00</p>
                </div>
                <div className='w-[320px] h-[320px] flex flex-col justify-center items-center bg-orange-500 rounded '>
                    <svg className="w-[180px] h-auto text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                        <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="3" y1="4" x2="21" y2="4" />  
                        <path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10" />  
                        <line x1="12" y1="16" x2="12" y2="20" />  
                        <line x1="9" y1="20" x2="15" y2="20" />  
                    <path d="M8 12l3 -3l2 2l3 -3" /></svg>
                    <p className='mt-3 font-medium text-[18pt]'>Liquidy</p>
                    <p className='mt-4 font-normal text-[16pt]'>23%</p>
                </div>
           </div>
           <div className='w-full h-1/2 flex flex-row justify-center items-center'>
                <Chart name="Deposits and Withdraw" />
           </div>
        </div>
    );
};

export default Home;