import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUser, updateUserRole } from '../../api/api';

function AdminUsersPage() {
    const [users, setUsers] = useState([])
    const fetchAllUsers=async()=>{
        try {
            const res=await getAllUser()
            setUsers(res.data.data)
            // console.log(res);
            // console.log(res.data);
        } catch (error) {
            console.error(error);
            
        }

    }

    const updateRole=async(id,role)=>{
      try {
        await updateUserRole(id,{role})
        fetchAllUsers()
      } catch (error) {
        console.log(error);
        
      }
    }

    const handleDeleteUser=async(id)=>{
      try {
        await deleteUser(id)
        setUsers((prev)=>prev.filter((val)=>val.id!==id))
        console.log("USer Deleted");
        
      } catch (error) {
        console.error(error)
      }
    }
    useEffect(()=>{
        fetchAllUsers()
        
    },[])
  return (
    <div>
        {users.length === 0 ? (
        <p>No Users found</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
                <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">
                  <select value={u.role} onChange={(e)=>updateRole(u.id,e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className='p-2'><button onClick={()=>handleDeleteUser(u.id)} className='bg-amber-700  rounded-lg'>DELETE</button></td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminUsersPage