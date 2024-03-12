import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const balance = useSelector((state) => state.currency.balance);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/users/all-users'); // Replace '/api/v1/users' with your actual API endpoint
        setUsers(response.data); // Assuming response.data contains the list of users
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="area-top-title dark:text-white light:text-black">DC : {balance}</h2>
      <div className="flex justify-end">
        <div className="mt-8">
          <h2 className="text-xl font-bold">All Users</h2>
          <div className="mt-4">
            {users.map(user => (
              <div key={user.id} className="flex items-center bg-white p-4 rounded shadow mb-4">
                <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full" />
                <div className="ml-4">
                  <h3 className="text-lg font-bold">{user.username}</h3>
                  <p className="text-gray-500">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
