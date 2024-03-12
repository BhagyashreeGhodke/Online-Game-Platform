import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/v1/users/current-user'); // Replace '/api/user' with your actual API endpoint
        if(response){

            setUserData(response.data.data); // Assuming response.data contains the user data
            setLoading(false);
        }
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error: Unable to fetch user data.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center">
        <img src={userData.avatar} alt="Profile" className="w-24 h-24 rounded-full" />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{userData.username}</h1>
          <p className="text-gray-500">@{userData.username}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Posts</h2>
        {/* Render user's posts here */}
        {/* Example: */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* {userData.posts.map(post => (
            <img key={post.id} src={post.imageUrl} alt="Post" className="w-full h-32 object-cover rounded-md" />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
