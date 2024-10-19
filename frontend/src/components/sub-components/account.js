import React, { useRef } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getOrderStatus } from '../lib/helpers';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const recentOrderData = [
    // Your existing data
    {
        id: '1',
        account_no: '0001',
        account_type: 'Fixed',
        user_name: 'Ryan Carroll',
        date: '2022-05-14T05:24:00',
        amount: 'Rs.1996.35',
        status: 'CLOSED'
    },
    {
        id: '2',
        account_no: '0002',
        account_type: 'Fixed',
        user_name: 'Anthony Fry',
        date: '2022-05-14T03:24:00',
        amount: 'Rs.78876.00',
        status: 'HOLD'
    },
    {
        id: '3',
        account_no: '0003',
        account_type: 'Fixed',
        user_name: 'Ryan Carroll',
        date: '2022-05-14T05:24:00',
        amount: 'Rs.1296.35',
        status: 'ACTIVE'
    }
];

const Account = () =>{
    const tableRef = useRef(); // Create a reference for the table

    const generatePDF = () => {
        html2canvas(tableRef.current).then((canvas) => {
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190; // Set the width for the PDF
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('transaction_history.pdf'); // Save the PDF
        });
    };

    return (
        <div className="w-full h-[600px] bg-white px-4 pt-3 pb-4 rounded-sm border-none flex-1">
            <div className='w-full flex flex-row justify-between items-center mt-7'>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Transaction History</h2>
              <button 
                  onClick={generatePDF} 
                  className="w-[200px] h-[50px] text-[14pt] mb-4 border-[2px] bg-blue-500 text-white rounded hover:border-blue-500 hover:bg-white hover:text-blue-500"
              >
                  Download PDF
              </button>
            </div>
            <div className="overflow-y-auto max-h-[520px] mt-1">
                <table className="min-w-full text-left rounded text-gray-700 font-sans table-auto border-collapse" ref={tableRef}>
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-medium">
                        <tr>
                            <th className="py-3 px-6 ">Account No.</th>
                            <th className="py-3 px-6">Account Type</th>
                            <th className="py-3 px-6">Time</th>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Amount</th>
                            <th className="py-3 px-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm divide-y divide-gray-200">
                        {recentOrderData.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-100">
                                <td className="py-3 px-6 font-medium text-gray-500">
                                    <Link>WID{transaction.account_no}</Link>
                                </td>
                                <td className="py-3 px-6 text-gray-500">
                                    <Link>{transaction.account_type}</Link>
                                </td>
                                <td className="py-3 px-6 text-gray-500">{format(new Date(transaction.date), 'HH:mm:ss')}</td>
                                <td className="py-3 px-6 text-gray-500">{format(new Date(transaction.date), 'dd MMM yyyy')}</td>
                                <td className="py-3 px-6 text-gray-500">{transaction.amount}</td>
                                <td className="py-3 px-6 text-gray-500">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold`}>
                                        {getOrderStatus(transaction.status)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Account;