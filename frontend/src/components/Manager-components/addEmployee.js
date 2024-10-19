import React, {useState, useEffect, useMemo} from 'react';
import {jwtDecode} from 'jwt-decode';
// import axios from 'axios';
import { register } from '../../api';

const AddEmployee = () => {
  const [fname, setFName] = useState('');
  const [errorFName, setErrorFName] = useState('');

  const [password, setPassword] = useState('');
  const [errorPassword,setErrorPassword] = useState('');

  const [username, setUsername] = useState('');
  const [errorUsername, setErrorUsername] = useState('');

  const [position, setPosition] = useState('');
  const [errorPosition, setErrorPosition] = useState('');

  const [lname, setLName] = useState('');
  const [errorLName, setErrorLName] = useState('');

  const [address, setAddress] = useState('');
  const [errorAddress, setErrorAddress] = useState('');

  const [email,setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const [dob, setDob] = useState('');
  const [errordob, setErrorDob] = useState('');

  const [contact, setContact] = useState('');
  const [errorContact, setErrorContact] = useState('');

  const [gender, setGender] = useState('');
  const [errorgender, setErrorGender] = useState('');

  const [branchID, setBranchId] = useState('');

  const nameRegx = useMemo(() => /^[A-Za-z]+$/, []);
  const usernameRegx = useMemo(() => /^[a-zA-Z0-9._%+-]{3,}$/, []);
  const numberRegex = useMemo(() => /^[0-9]+$/, []);
  const emailRegx = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);
  const passwordRegx = useMemo(() => /^(?=.{6,})([A-Za-z\d@$!%*?&_]*)$/, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const resetForm = () => {
    setFName('');
    setLName(''); // If you're fetching this dynamically, you can leave this as is
    setUsername('');
    setPassword('');
    setAddress('');
    setDob('');
    setContact('');
    setGender('');
    setPosition('');
    setEmail('');
  };

  // Use effect to validate the name on input change
  useEffect(() => {
    if (fname !== "" && !nameRegx.test(fname)) {
      setErrorFName("Can't be any numbers or special characters");
    } else {
      setErrorFName("");
    }
  }, [fname, nameRegx]);

  useEffect(()=>{
    if(password !== "" && !passwordRegx.test(password)){
      setErrorPassword("Please enter a valid password");
    }else{
      setErrorPassword("");
    }
  },[password, passwordRegx]);

  useEffect(() => {
    if (username !== "" && !usernameRegx.test(username)) {
      setErrorUsername("Please enter a valid username");
    } else {
      setErrorUsername("");
    }
  }, [username, usernameRegx]);

  useEffect(() => {
    if (position !== "" && !nameRegx.test(position)) {
      setErrorPosition("Can't be any numbers or special characters");
    } else {
      setErrorPosition("");
    }
  }, [position, nameRegx]);

  useEffect(() => {
    if (lname !== "" && !nameRegx.test(lname)) {
      setErrorLName("Can't be any numbers or special characters");
    } else {
      setErrorLName("");
    }
  }, [lname, nameRegx]);

  useEffect(() => {
    if (address !== "") {
      setErrorAddress("");
    }
  }, [address]);

  useEffect(() => {
    if (email !== "" && !emailRegx.test(email)) {
      setErrorEmail("Unvalid email");
    } else {
      setErrorEmail("");
    }
  }, [email, emailRegx]);

  useEffect(() => {
    // Check if DOB is not empty
    if (dob !== "") {
      const selectedDate = new Date(dob);
      const today = new Date();
      
      // Check if selected DOB is in the future
      if (selectedDate > today) {
        setErrorDob("Date of birth cannot be in the future.");
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
        setErrorDob("Age must be between 18 and 65 years.");
      } else {
        setErrorDob(""); // Clear error if DOB is valid
      }
    }
  }, [dob]);

  useEffect(()=>{
    if(contact !== "" && !numberRegex.test(contact)){
      setErrorContact("Can't be any letters or special characters");
    }else if(contact.length>=1 && contact.length<10){
      setErrorContact("Contact should be 10 numbers");
    }else if(contact.length===0 || contact.length===10){
      setErrorContact("");
    }
  },[contact, numberRegex]);

  useEffect(() => {
    if (gender !== "") {
      setErrorGender("");
    }
  }, [gender]);

  //USE-EFFECT
  // Fetch account types when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store your token in localStorage
    if (token) {
      const decodedToken = jwtDecode(token);
      setBranchId(decodedToken.user.branch_id);
      // setEmployeeId(decodedToken.user.employee_id);
    }
  }, []);
  const handleClick = async ()=>{
    if(fname===""){
      setErrorFName("Can't be Empty");
      setErrorPassword("");
      setErrorUsername("");
      setErrorPosition("");
      setErrorLName("");
      setErrorAddress("");
      setErrorEmail("");
      setErrorDob("");
      setErrorContact("");
      setErrorGender("");
    }else if(username===""){
      setErrorFName("");
      setErrorPassword("");
      setErrorUsername("Can't be Empty");
      setErrorPosition("");
      setErrorLName("");
      setErrorAddress("");
      setErrorEmail("");
      setErrorDob("");
      setErrorContact("");
      setErrorGender("");
    }else if(password===""){
      setErrorFName("");
      setErrorPassword("Can't be Empty");
      setErrorUsername("");
      setErrorPosition("");
      setErrorLName("");
      setErrorAddress("");
      setErrorEmail("");
      setErrorDob("");
      setErrorContact("");
      setErrorGender("");
    }else if(position ===""){
      setErrorFName("");
      setErrorPassword("");
      setErrorUsername("");
      setErrorPosition("Can't be Empty");
      setErrorLName("");
      setErrorAddress("");
      setErrorEmail("");
      setErrorDob("");
      setErrorContact("");
      setErrorGender("");
    }else if(lname===""){
      setErrorFName("");
      setErrorPassword("");
      setErrorUsername("");
      setErrorPosition("");
      setErrorLName("Can't be Empty");
      setErrorAddress("");
      setErrorEmail("");
      setErrorDob("");
      setErrorContact("");
      setErrorGender("");
    }else if(address===""){
      setErrorFName("");
      setErrorPassword("");
      setErrorUsername("");
      setErrorPosition("");
      setErrorLName("");
      setErrorAddress("Can't be Empty");
      setErrorEmail("");
      setErrorDob("");
      setErrorContact("");
      setErrorGender("");
    }else if(email===""){
      setErrorFName("");
      setErrorPassword("");
      setErrorUsername("");
      setErrorPosition("");
      setErrorLName("");
      setErrorAddress("");
      setErrorEmail("Can't be Empty");
      setErrorDob("");
      setErrorContact("");
      setErrorGender("");
    }else if(dob ===""){
      setErrorFName("");
      setErrorPassword("");
      setErrorUsername("");
      setErrorPosition("");
      setErrorLName("");
      setErrorAddress("");
      setErrorEmail("");
      setErrorDob("Can't be Empty");
      setErrorContact("");
      setErrorGender("");
    }else if(contact===""){
      setErrorFName("");
      setErrorPassword("");
      setErrorUsername("");
      setErrorPosition("");
      setErrorLName("");
      setErrorAddress("");
      setErrorEmail("");
      setErrorDob("");
      setErrorContact("Can't be Empty");
      setErrorGender("");
    }else if(gender===""){
      setErrorFName("");
      setErrorPassword("");
      setErrorUsername("");
      setErrorPosition("");
      setErrorLName("");
      setErrorAddress("");
      setErrorEmail("");
      setErrorDob("");
      setErrorContact("");
      setErrorGender("Can't be Empty");
    }else{
      setErrorFName("");
      setErrorPassword("");
      setErrorUsername("");
      setErrorPosition("");
      setErrorLName("");
      setErrorAddress("");
      setErrorEmail("");
      setErrorDob("");
      setErrorContact("");
      setErrorGender("");

      try{
        const accountData = {
          branch_id: branchID,           
          first_name: fname, 
          last_name: lname, 
          Address: address, 
          Gender: gender,   
          email: email,      
          DOB: dob,                   
          position: position,                
          Username: username,        
          password: password,             
          phone_number: contact, 
          dateof_joined: getCurrentDate(),
        };
        const response = await register(accountData);
        if (response.status === 201) {
          alert('Employee created successfully');
          // Handle success, e.g., clear form fields or redirect the user
        } else {
          alert('Failed to create employee');
        }
        console.log(accountData);
        resetForm();
      }catch(error){
        console.log('Error creating account:', error);
        alert('An error occurred while creating the account. Please try again.');
      }
    }
  };

    return (
            <div className="w-full max-h-[650px] flex flex-col font-sans antialiased overflow-y-auto"> 
                <div className='w-full h-auto flex flex-row justify-between items-start px-[110px]'>
                    <div className='w-auto h-auto flex flex-col'>

                         {/* First Name */}
                        <div className='w-auto h-auto flex flex-col my-2 '>
                          <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                            <label className='text-[15pt] font-medium'>First Name</label>
                            <p className='text-[10pt] text-red-500'>{errorFName}</p>
                          </div>
                          <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                type="text"
                                placeholder='*Udagemuwe Upali'
                                value={fname}
                                onChange={(e)=>{setFName(e.target.value)}}
                          />
                        </div>

                        {/* Username */}
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                              <label className='text-[15pt] font-medium'>Username</label>
                              <p className='text-[10pt] text-red-500'>{errorUsername}</p>
                            </div>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  placeholder='*upali'
                                  value={username}
                                  onChange={(e)=>{setUsername(e.target.value)}}
                            />
                        </div>

                        {/*PASSWORD*/}	
                        <div className='w-auto h-auto flex flex-col my-2 '>
                            <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                              <label className='text-[15pt] font-medium'>Password</label>
                              <p className='text-[10pt] text-red-500'>{errorPassword}</p>
                            </div>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="password"
                                  value={password}
                                  onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>
                        {/*PASSWORD*/}


                        {/* Position */}
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                              <label className='text-[15pt] font-medium'>Position</label>
                              <p className='text-[10pt] text-red-500'>{errorPosition}</p>
                            </div>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  placeholder='*Manager'
                                  value={position}
                                  onChange={(e)=>{setPosition(e.target.value)}}
                            />
                        </div>

                        {/* Contact */}
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                              <label className='text-[15pt] font-medium'>Contact</label>
                              <p className='text-[10pt] text-red-500'>{errorContact}</p>
                            </div>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  placeholder='*0761234567'
                                  value={contact}
                                  onChange={(e)=>{setContact(e.target.value)}}
                            />
                        </div>
                    </div>
                    
                    <div className='w-auto h-auto flex flex-col'>
                      {/* Last Name */}
                        <div className='w-auto h-auto flex flex-col my-2 '>
                            <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                              <label className='text-[15pt] font-medium'>Last Name</label>
                              <p className='text-[10pt] text-red-500'>{errorLName}</p>
                            </div>
                            <label className='text-[15pt] font-medium'></label>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  placeholder='*Perera'
                                  value={lname}
                                  onChange={(e)=>{setLName(e.target.value)}}
                            />
                        </div>

                        {/* Address */}
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                              <label className='text-[15pt] font-medium'>Address</label>
                              <p className='text-[10pt] text-red-500'>{errorAddress}</p>
                            </div>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  value={address}
                                  placeholder='*No.108/13 Kurudu Road, Kadawatha, Colombo 7'
                                  onChange={(e)=>{setAddress(e.target.value)}}
                            />
                        </div>

                        {/* Email */}
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                              <label className='text-[15pt] font-medium'>Email</label>
                              <p className='text-[10pt] text-red-500'>{errorEmail}</p>
                            </div>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="text"
                                  value={email}
                                  placeholder='*sample@gmail.com'
                                  onChange={(e)=>{setEmail(e.target.value)}}
                            />
                        </div>

                        {/* Date of Birth  */}
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                              <label className='text-[15pt] font-medium'>Date of Birth</label>
                              <p className='text-[10pt] text-red-500'>{errordob}</p>
                            </div>
                            <input className='w-[480px] h-[40px] text-[12pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                                  type="date"
                                  value={dob}
                                  placeholder='* 12/03/2024'
                                  onChange={(e) =>{setDob(e.target.value)}}
                            />
                        </div>

                        {/* Gender */}
                        <div className='w-auto h-auto flex flex-col my-2'>
                            <div className='w-[480px] h-auto flex flex-row justify-between items-center'>
                              <label className='text-[15pt] font-medium'>Gender</label>
                              <p className='text-[10pt] text-red-500'>{errorgender}</p>
                            </div>
                            <div className='w-[480px] h-[50px] flex flex-row justify-start items-center text-[14pt] gap-20'>
                              <div>
                                <label>
                                  <input className='form-radio h-3.5 w-4 text-[14pt] text-orange-500 border-orange-500 focus:ring-orange-500 mr-1 '
                                    type="radio"
                                    value="Male"
                                    checked={gender === "Male"}
                                    onChange={(e)=>{setGender(e.target.value)}}
                                  />
                                  Male
                                </label>
                              </div>
                              <div>
                                <label>
                                  <input className='form-radio h-3.5 w-4 font-[14pt] text-orange-500 border-orange-500 focus:ring-orange-500 mr-1 '
                                    type="radio"
                                    value="Female"
                                    checked={gender === "Female"}
                                    onChange={(e)=>{setGender(e.target.value)}}
                                  />
                                  Female
                                </label>
                              </div>
                            </div>
                        </div>

                        {/* Create Button */}
                        <button className='w-[480px] h-[50px] justify-center items-center text-[14pt] mt-2 bg-green-500 text-white rounded border-[2px] border-green-500 border-solid hover:border-[2px] hover:border-orange-500 hover:bg-white hover:text-orange-500'
                            type='submit'
                            onClick={handleClick}
                        >
                          Create
                        </button>
                      </div>
                </div>

                <div className='w-full h-[50px] flex flex-row justify-between items-center px-[110px]'>
                </div>
            </div>
            

    );
}

export default AddEmployee;