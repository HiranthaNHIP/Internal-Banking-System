import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

// const Data = [
//   {
//       id: '1',
//       account_no: '0001',
//       image: 'Image',
//       full_name: 'Ryan Carroll',
//       dob: '2022-05-14',
//       address: 'Piliyandala',
//       nic: 'CLOSED',
//       email: 'email@gmai.com',
//       contact: '0123654789',
//       username:'Ryan',
//       position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   },
//   {
//     id: '1',
//     account_no: '0001',
//     image: 'Image',
//     full_name: 'Ryan Carroll',
//     dob: '2022-05-14',
//     address: 'Piliyandala',
//     nic: 'CLOSED',
//     email: 'email@gmai.com',
//     contact: '0123654789',
//     username:'Ryan',
//     position: 'Manager'
//   }
// ]
const EmployeeTable = ({ employees, branchId }) => {
  const TableRef = useRef(); // Create a reference for the table

  return (
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-none flex-1">
          <div className='w-full flex flex-row justify-between items-center'>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Employee Details</h2>
          </div>
          <div className="overflow-y-auto max-h-[575px] mt-1">
              <table className="min-w-full text-left rounded text-gray-700 font-sans table-auto border-collapse" ref={TableRef}>
                  <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-medium">
                      <tr>
                          <th className="py-3 px-4 text-center">Employee No.</th>
                          <th className="py-3 px-4 text-center">First Name</th>
                          <th className="py-3 px-4 text-center">Last Name</th>
                          <th className="py-3 px-4 text-center">Address</th>
                          <th className="py-3 px-4 text-center">Gender</th>
                          <th className="py-3 px-4 text-center">Email</th>
                          <th className="py-3 px-4 text-center">DOB</th>
                          <th className="py-3 px-4 text-center">Position</th>
                          <th className="py-3 px-4 text-center">Username</th>
                          <th className="py-3 px-4 text-center">Contact</th>
                          <th className="py-3 px-4 text-center">Join date</th>
                      </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm divide-y divide-gray-200">
                      {employees.map((employee) => (
                          <tr key={employee.id} className="hover:bg-gray-100">
                              <td className="py-3 px-6 text-center text-gray-500">
                                  <Link>EMP{employee.employee_id}</Link>
                              </td>
                              <td className="py-3 px-4 text-gray-500 text-center">{employee.first_name}</td>
                              <td className="py-3 px-4 text-gray-500 text-center">{employee.last_name}</td>
                              <td className="py-3 px-4 text-gray-500 text-center">{employee.Address}</td>
                              <td className="py-3 px-4 text-gray-500 text-center">{employee.Gender}</td>
                              <td className="py-3 px-4 text-gray-500 text-center">{employee.email}</td>
                              <td className="py-3 px-4 text-gray-500 text-center">{format(new Date(employee.DOB), 'yyyy-MM-dd')}</td>
                              <td className="py-3 px-4 text-gray-500 text-center">{employee.position}</td>
                              <td className="py-3 px-4 text-gray-500 text-center">{employee.Username}</td>
                              <td className="py-3 px-4 text-gray-500 text-center">{employee.phone_number}</td>
                              <td className="py-3 px-4 text-gray-500 text-center">{format(new Date(employee.dateof_joined), 'yyyy-MM-dd')}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
}

export default EmployeeTable;