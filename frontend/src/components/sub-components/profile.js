import React, {useState} from 'react';

const Profile = () =>{
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file));
      }
    };
    return (
        <div className="w-full h-[600px] flex flex-col font-sans antialiased"> 
            <div className='w-full h-auto flex flex-row justify-between items-end px-[110px] mt-5'>
                <div className='w-auto h-auto flex flex-col'>
                    <div className='w-auto h-auto flex flex-col my-2 '>
                        <label className='text-[15pt] font-medium'>Full Name</label>
                        <input className='w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                              type="text"
                              placeholder='*K.M.L Kamal Perera'
                        />
                    </div>
                    <div className='w-auto h-auto flex flex-col my-2'>
                        <label className='text-[15pt] font-medium'>Address</label>
                        <input className='w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                              type="text"
                              placeholder='*No.108/13 Kurudu Road, Kadawatha, Colombo 7'
                        />
                    </div>
                    <div className='w-auto h-auto flex flex-col my-2'>
                        <label className='text-[15pt] font-medium'>Email</label>
                        <input className='w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                              type="text"
                              placeholder='*sample@gmail.com'
                        />
                    </div>
                </div>
                <div className='w-auto h-auto flex flex-col'>
                    <div className='w-auto h-auto flex flex-col my-2'>
                        <label className='text-[15pt] font-medium'>Date of Birth (DD/MM/YYYY)</label>
                        <input className='w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                              type="text"
                              placeholder='* 12/03/2024'
                        />
                    </div>
                    <div className='w-auto h-auto flex flex-col my-2'>
                        <label className='text-[15pt] font-medium'>Telephone</label>
                        <input className='w-[480px] h-[50px] text-[14pt] mt-1 outline-none rounded border-[3.2px] pl-2 border-orange-500 bg-none outline-transparent'
                              type="text"
                              placeholder='*0761234567'
                        />
                    </div>
                    

                    <div className='w-auto h-auto flex flex-col my-2'>
                        <label className='text-[15pt] font-medium'>Gender</label>
                        <div className='w-[480px] h-[50px] flex flex-row justify-start items-center text-[14pt] gap-20'>
                          <div>
                            <label>
                              <input className='form-radio h-3.5 w-4 text-[14pt] text-orange-500 border-orange-500 focus:ring-orange-500 mr-1 '
                                type="radio"
                                value="Male"
                              />
                              Male
                            </label>
                          </div>
                          <div>
                            <label>
                              <input className='form-radio h-3.5 w-4 font-[14pt] text-orange-500 border-orange-500 focus:ring-orange-500 mr-1 '
                                type="radio"
                                value="Female"
                              />
                              Female
                            </label>
                          </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full h-auto flex items-center justify-center'>
                <div className='w-auto h-auto flex flex-col my-2'>
                    <label className='text-[15pt] font-medium'>Signature</label>
                    <div className="w-[1060px] h-[180px] flex justify-center items-center mt-1">
                      <label
                        htmlFor="input-file"
                        className="w-[1060px] h-[180px] text-[14pt]  rounded border-[3.2px] border-orange-500 bg-none outline-transparent cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          id="input-file"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <div className="w-[1060px] h-[180px] flex justify-center items-center text-center">
                          {image ? (
                            <img
                              src={image}
                              alt="Uploaded"
                              className="w-[1040px] h-[160px] object-contain rounded-lg"
                            />
                          ) : (
                            <div className="flex flex-col items-center">
                              <svg class="h-8 w-8 text-orange-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  
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

            
            <div className='w-full h-[50px] flex flex-row justify-between items-center my-2 px-[110px]'>
                <button className='w-[200px] h-[50px] justify-center items-center text-[14pt] mt-11 bg-orange-500 text-white rounded border-[2px] border-orange-500 border-solid hover:border-[2px] hover:border-orange-500 hover:bg-white hover:text-orange-500'>Update</button>
            </div>
            
        </div>
    )
};

export default Profile;