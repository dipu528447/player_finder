import React from 'react';

const MyProfile = () => {
    
    return (
        <div>
             <div className="avatar online">
                <div className="w-24 rounded-full bg-white">
                    <img src={"https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"} alt="not found" />
                </div>
            </div>
            <div className='mx-auto w-3/4'>
                <>
                    <div className="form-control">
                        <label className="input-group m-2">
                            <span className='w-1/4'>Full Name</span>
                            <input type="text" placeholder={"Name"} className="input input-bordered w-full" name='displayName'  required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>NID No</span>
                            <input type="text" placeholder={ "Your National ID No"} className="input input-bordered w-full"  name='nid' required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Present Address</span>
                            <input type="text" placeholder={ "Your Present Address"}  className="input input-bordered w-full" required name='present_address' />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Permanent Address</span>
                            <input type="text" placeholder={"Your Permanent Address"}  className="input input-bordered w-full" name='permanent_address' required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Contact</span>
                            <input type="number" placeholder={ "Your Contact Number"} className="input input-bordered w-full"  name='contact' required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Change Profile Image</span>
                            <input type="file"  className="input w-full" name='profile_pic' required />
                        </label>
                    </div>
                    <button className="btn btn-primary w-1/4" type="submit" >Update Profile</button>
                </>
            </div>

        </div>
    );
};

export default MyProfile;