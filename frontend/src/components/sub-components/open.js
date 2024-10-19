import React, {useState, useEffect, useMemo } from 'react';
import { getCustomerByNic, getAccountTypes, getAccountNo,  } from '../../api';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Open = () => {
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');

    const [NIC, setNIC] = useState('');

    const [Account_no, setAccount_no] = useState('');

    const [Name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [Address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');

    const [DOB, setDOB] = useState('');
    const [dobError, setDobError] = useState('');

    const [tel_no, setTel_no] = useState('');
    const [telNoError, setTelNoError] = useState('');

    const [Gender, setGender] = useState('');
    const [genderError, setGenderError] = useState('');

    const [branchId, setBranchId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [accountTypes, setAccountTypes] = useState([]);
    const [selectedAccountType, setSelectedAccountType] = useState('');
    const [selectedAccountTypeId, setSelectedAccountTypeId] = useState('');
    const [interest_rate, setInterest_rate] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [imagePreview, setImagePreview] = useState('');


    const nameRegx = useMemo(() => /^[A-Za-z\s]+$/, []);
    const numberRegex = useMemo(() => /^[0-9]+$/, []);

    const resetForm = () => {
      setNIC('');
      // setAccount_no(''); // If you're fetching this dynamically, you can leave this as is
      setSelectedAccountType('');
      setSelectedAccountTypeId('');
      setInterest_rate('');
      setName('');
      setAddress('');
      setDOB('');
      setTel_no('');
      setGender('');
      setImage(''); // Reset the signature or image field if needed
    };
    
    const getAccountNumber = async () => {
      try{
        const response = await getAccountNo();
        setAccount_no(response.data.next_account_no);
      }catch(error){
        console.error('Error fetching account number', error);
      }
    };

    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(today.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    };

    const searchCustomer = async () => {
      // Basic validation for required fields
      if (!NIC) {
          console.log('Please enter a NIC number to search.');
          setName('');
          setAddress('');
          setDOB('');
          setTel_no('');
          setGender('');
          return;
      }
      // Here you can add logic to fetch customer data from the backend or process it as required.
      try {
        const response = await getCustomerByNic(NIC);
        const fetchedData = response.data.customer;
        console.log(fetchedData);

        //SET DATA TO THE STATES
        setAccount_no(fetchedData.next_account_no || '');
        setName(fetchedData.Name || '');
        setAddress(fetchedData.Address || '');
        setDOB(fetchedData.DOB ? fetchedData.DOB.split('T')[0] : '');
        setTel_no(fetchedData.tel_no || '');
        setGender(fetchedData.Gender || '');

        setIsReadOnly(true); //disable editing for existing customers

      } catch (error) {
        // Log other errors to the console if needed (for debugging purposes)
        if (error.response && error.response.status === 404) {
          console.log('No customers found with this NIC. You can add new customer details.');
          setName('');
          setAddress('');
          setDOB('');
          setTel_no('');
          setGender('');
          setIsReadOnly(false); // Allow editing for adding a new customer
        }else{
          console.log("An unexpected error occurred:", error);
        }
      }
    }
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      setImage(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    };

    // Handle account type selection change
    const handleAccountTypeChange = (event) => {
      const selectedType = event.target.value;
      setSelectedAccountType(selectedType);

      // Find the selected account type's details
      const selectedTypeDetails = accountTypes.find(
        (type) => type.account_type_name === selectedType
      );

      // Update the interest rate and account_type_id based on the selected account type
      setInterest_rate(selectedTypeDetails ? selectedTypeDetails.interest_rate : '');
      setSelectedAccountTypeId(selectedTypeDetails ? selectedTypeDetails.account_type_id : '');
    };

    //handle create account
    const createNewAccount = (e) => {
      e.preventDefault();
      console.log(accountTypes);
      console.log(selectedAccountType);

      if(Name===""){
        setNameError("Can't be Empty");
        setAddressError("");
        setDobError("");
        setTelNoError("");
        setGenderError("");
        setImageError("");
      }else if(Address===""){
        setNameError("");
        setAddressError("Can't be Empty");
        setDobError("");
        setTelNoError("");
        setGenderError("");
        setImageError("");
      }else if(DOB===""){
        setNameError("");
        setAddressError("");
        setDobError("Can't be Empty");
        setTelNoError("");
        setGenderError("");
        setImageError("");
      }else if(tel_no ===""){
        setNameError("");
        setAddressError("");
        setDobError("");
        setTelNoError("Can't be Empty");
        setGenderError("");
        setImageError("");
      }else if(Gender===""){
        setNameError("");
        setAddressError("");
        setDobError("");
        setTelNoError("");
        setGenderError("Please select a gender category");
        setImageError("");
      }else if(image===null){
        setNameError("");
        setAddressError("");
        setDobError("");
        setTelNoError("");
        setGenderError("");
        setImageError("Please upload a signature image");
      }else{
        try {
          // Create a FormData object
          const formData = new FormData();
          formData.append('NIC', NIC);
          formData.append('account_no', Account_no);
          formData.append('account_type_id', selectedAccountTypeId);
          formData.append('interest_rate', interest_rate);
          formData.append('customer_name', Name);
          formData.append('address', Address);
          formData.append('DOB', DOB);
          formData.append('tel_no', tel_no);
          formData.append('gender', Gender);
          formData.append('signature', image); // Make sure 'image' is the file object
          formData.append('date_opened', getCurrentDate());
          formData.append('branch_id', branchId);
          formData.append('employee_id', employeeId);
  
          axios.post('http://localhost:5000/accounts/create', formData)
          .then((response) => {console.log(response); toast.success("Bank account created successfully!");getAccountNumber();}) // Success toast
          .catch((error) => {console.error(error); toast.error("An error occurred while creating the account.");});
          resetForm();
        } catch (error) {
          console.error('Error creating account:', error);
          alert('An error occurred while creating the account. Please try again.');
        }
      }
    };

    //USE-EFFECT
    // Fetch account types when the component mounts
    useEffect(() => {
      const token = localStorage.getItem('token'); // Assuming you store your token in localStorage
      if (token) {
        const decodedToken = jwtDecode(token);
        setBranchId(decodedToken.user.branch_id);
        setEmployeeId(decodedToken.user.employee_id);
      }
      const fetchAccountTypes = async () => {
          try {
              const response = await getAccountTypes();
              setAccountTypes(response.data.account_types); // Assuming response contains an array of account types
          } catch (error) {
              console.error('Error fetching account types', error);
          }
      };
      fetchAccountTypes();
      getAccountNumber();
    }, []);

    useEffect(() => {
      if (imagePreview) {
        console.log('Image exists');
      }
      else{
        setImageError('Please upload a signature image');
      }
    }, [imagePreview]);
    // Use effect to validate the name on input change
  useEffect(() => {
    if (Name !== "" && !nameRegx.test(Name)) {
      setNameError("Can't be any numbers or special characters");
    } else {
      setNameError("");
    }
  }, [Name, nameRegx]);


  useEffect(() => {
    if (Address !== "") {
      setAddressError("");
    }
  }, [Address]);


  useEffect(() => {
    // Check if DOB is not empty
    if (DOB !== "") {
      const selectedDate = new Date(DOB);
      const today = new Date();
      
      // Check if selected DOB is in the future
      if (selectedDate > today) {
        setDobError("Date of birth cannot be in the future.");
        return; // Exit early if DOB is invalid
      }

      // Calculate age
      let age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();

      // Adjust age if the birthday has not occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }

      // Check if the age is between 18 and 65
      if (age < 18 || age > 65) {
        setDobError("Age must be between 18 and 65 years.");
      } else {
        setDobError(""); // Clear error if DOB is valid
      }
    }
  }, [DOB]);

  useEffect(()=>{
    if(tel_no !== "" && !numberRegex.test(tel_no)){
      setTelNoError("Can't be any letters or special characters");
    }else if(tel_no.length>=1 && tel_no.length<10){
      setTelNoError("Contact should be 10 numbers");
    }else if(tel_no.length >10){
      setTelNoError("Contact should be 10 numbers");
    }else if(tel_no.length===0 || tel_no.length===10){
      setTelNoError("");
    }
  },[tel_no, numberRegex]);

  useEffect(() => {
    if (Gender !== "") {
      setGenderError("");
    }
  }, [Gender]);

    return (
        <div className="w-full h-[700px] flex flex-col font-sans antialiased">

            {/* search bar */}
            <div className='w-full h-auto flex justify-center items-center'>
                <div className='w-[500px] h-[50px] flex flex-row px-5 my-3 bg-transparent border-[3.2px] pl-4 rounded-full border-orange-500 bg-none outline-transparent'>
                    <input className='w-full text-[14pt] outline-none rounded-lg'
                      type="text"
                      value={NIC}
                      onChange={(e) => setNIC(e.target.value)}
                      placeholder='Search'
                    />
                    <button onClick={searchCustomer}>
                        <svg className="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <circle cx="10" cy="10" r="7" />  
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* search bar end*/}

            <div className="w-full h-[650px] flex flex-col font-sans antialiased overflow-y-auto"> 
                <div className='w-full h-auto flex flex-row justify-between items-start px-[110px]'>
                    <div className='w-auto h-auto flex flex-col'>
                        <div className='w-auto h-auto flex flex-col my-2 '>
                            <label className='text-[15pt] font-medium'>Account No.</label>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  value={Account_no}
                                  readOnly
                            />
                        </div>
                        {/* <div className='w-auto h-auto flex flex-col my-2 '>
                            <label className='text-[15pt] font-medium'>Account Type</label>
                            <input className='w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                type="text"
                                placeholder='Account Type'
                                //onChange={handleInputChange}
                                //value={Account_no}
                            />
                        </div> */}
                        <div className='w-auto h-auto flex flex-col my-2'>
                          <label className='text-[15pt] font-medium'>Account Type</label>
                          <select
                            className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                            value={selectedAccountType}
                            onChange={handleAccountTypeChange}
                          >
                            <option value="">-- Select an Account Type --</option>
                              {accountTypes.map((type) => (
                                <option key={type.account_type_id} value={type.account_type_name}>
                                  {type.account_type_name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <label className='text-[15pt] font-medium'>Interest Rate</label>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                type="text"
                                placeholder='*0.01'
                                value={interest_rate}
                                readOnly
                            />
                        </div>
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <label className='text-[15pt] font-medium'>Signature</label>
                            <p className='text-[10pt] text-red-500'>{imageError}</p>
                            <div className="w-[480px] h-[230px] flex justify-center items-center mt-1">
                              <label
                                htmlFor="input-file"
                                className="w-[480px] h-[230px] text-[14pt]  rounded border-[3.2px] border-orange-500 bg-none outline-transparent cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/*"
                                  id="input-file"
                                  className="hidden"
                                  name='Signature'
                                  onChange={handleImageUpload}
                                />
                                <div className="w-[480px] h-[230px] flex justify-center items-center text-center">
                                  {imagePreview ? (
                                    <img
                                      src={imagePreview}
                                      alt="Uploaded"
                                      className="w-[480px] h-[210px] object-contain rounded"
                                    />
                                  ) : (
                                    <div className="flex flex-col items-center">
                                      <svg className="h-8 w-8 text-orange-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  
                                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />  
                                        <polyline points="7 9 12 4 17 9" />  
                                        <line x1="12" y1="4" x2="12" y2="16" />
                                      </svg>
                                      <span className="text-sm text-gray-400 mt-4">
                                        Upload jpg or png image files only
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </label>
                            </div>
                        </div>
                    </div>
                    <div className='w-auto h-auto flex flex-col'>
                        <div className='w-auto h-auto flex flex-col my-2 '>
                            <label className='text-[15pt] font-medium'>Full Name</label>
                            <p className='text-[10pt] text-red-500'>{nameError}</p>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  placeholder='*K.M.L Kamal Perera'
                                  value={Name}
                                  readOnly={isReadOnly}
                                  onChange={(e) => setName(e.target.value)} // Add this line to handle changes
                            />
                        </div>
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <label className='text-[15pt] font-medium'>Address</label>
                            <p className='text-[10pt] text-red-500'>{addressError}</p>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  placeholder='*No.108/13 Kurudu Road, Kadawatha, Colombo 7'
                                  value={Address}
                                  readOnly={isReadOnly}
                                  onChange={(e) => setAddress(e.target.value)} // Add this line to handle changes
                            />
                        </div>
                      
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <label className='text-[15pt] font-medium'>Date of Birth (YYYY/MM/DD)</label>
                            <p className='text-[10pt] text-red-500'>{dobError}</p>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="date"
                                  value={DOB}
                                  readOnly={isReadOnly}
                                  onChange={(e) => setDOB(e.target.value)} // Add this line to handle changes
                            />
                        </div>

                        <div className='w-auto h-auto flex flex-col my-2'>
                            <label className='text-[15pt] font-medium'>Telephone</label>
                            <p className='text-[10pt] text-red-500'>{telNoError}</p>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  placeholder='*0761234567'
                                  value={tel_no}
                                  readOnly={isReadOnly}
                                  onChange={(e) => setTel_no(e.target.value)} // Add this line to handle changes
                            />
                        </div>
    
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <label className='text-[15pt] font-medium'>Gender</label>
                            <p className='text-[10pt] text-red-500'>{genderError}</p>
                            <div className='w-[480px] h-[50px] flex flex-row justify-start items-center text-[14pt] gap-20'>
                              <div>
                                <label>
                                  <input className='form-radio h-3.5 w-4 text-[14pt] text-orange-500 border-orange-500 focus:ring-orange-500 mr-1 '
                                    type="radio"
                                    value="Male"
                                    checked={Gender === 'Male'}
                                    disabled={isReadOnly}
                                    onChange={(e) => setGender(e.target.value)}
                                  />
                                  Male
                                </label>
                              </div>
                              <div>
                                <label>
                                  <input className='form-radio h-3.5 w-4 font-[14pt] text-orange-500 border-orange-500 focus:ring-orange-500 mr-1 '
                                    type="radio"
                                    value="Female"
                                    checked={Gender === 'Female'}
                                    disabled={isReadOnly}
                                    onChange={(e) => setGender(e.target.value)}
                                  />
                                  Female
                                </label>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full h-[50px] flex flex-row justify-between items-center px-[110px]'>
                    <button onClick={createNewAccount} className='w-[200px] h-[50px] justify-center items-center text-[14pt] mt-1 bg-orange-500 text-white rounded border-[2px] border-orange-500 border-solid hover:border-[2px] hover:border-orange-500 hover:bg-white hover:text-orange-500'>Create Account</button>
                    <ToastContainer /> {/* Add ToastContainer here */}
                </div>
            </div>
        </div>
    );
};

export default Open;