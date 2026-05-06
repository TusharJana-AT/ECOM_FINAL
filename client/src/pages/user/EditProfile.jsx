import React, { useEffect, useState } from "react";
import { editProduct, editProfile, getUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [userInfo, setUserInfo] = useState({
    address: " ",
    name: "",
    email: "",
    phone: "",
  });
  const navigate=useNavigate()
  useEffect(() => {
    const getCurUser = async () => {
      try {
        const res = await getUser();
        setUserInfo({
          name: res.data?.data?.name || "",
          address: res.data?.data?.address || "",
          email: res.data?.data?.email || "",
          phone: res.data?.data?.phone || "",
        });
        console.log("HOLA", res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurUser();
  }, []);
  // console.log(userInfo)
  const handleChange=async(e)=>{
    const {name,value}=e.target;
    setUserInfo((prev)=>({
        ...prev,
        [name]:value
    }))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        await editProfile(userInfo)
        navigate('/my-profile')
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          value={userInfo.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        
        <input
          placeholder="Phone"
          name="phone"
          maxLength={10}
          value={userInfo.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="address"
          placeholder="Address"
          value={userInfo.address}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
