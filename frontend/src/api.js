import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000",
});

// Tasks API endpoints
export const getCustomerByNic = (NIC) => api.get(`/customers/${NIC}`);
export const getCustomerAndAccountByNic = (NIC) => api.get(`/customers/${NIC}`);
export const getAccountTypes = () => api.get(`/accountTypes/`);
export const getAccountNo = () => api.get('/accounts/next-account/');
export const createAccount = (formData) => api.post('/accounts/create', formData, {headers: {
    'Content-Type': 'multipart/form-data',
  },});
export const getAccountForWithdrawalAndDeposit = (account_no) => api.get(`/accounts/withdraw-deposit/${account_no}`);
export const withdrawAmount = (withdrawData) => api.post("/transactions/withdraw", withdrawData);
export const depositAmount = (depositData) => api.post("/transactions/deposit", depositData);
export const getTransactions = (branchID) => api.get(`/transactions/transaction/${branchID}`);
export const getEmployees = (branchID) => api.get(`/employees/${branchID}`);

//Auth API endpoints
export const loginUser = (userData) => api.post('/auth/login', userData);
export const register = (userData) => api.post('/auth/register', userData);

export default api;