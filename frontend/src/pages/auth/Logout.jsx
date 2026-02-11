import React from 'react'
import axios from 'axios';


const Logout = () => {
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/user/logout", {}, {
                withCredentials: true
            });
            window.location.href = "/";
        }
        catch (error) {
            console.error("Logout error:", error);
        }
    };



  return (
    <div>
        <button className='btn' onClick={handleLogout}>
          Logout
        </button>

      Logout Page

    </div>
  )
}

export default Logout
