import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AUsers() {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
            setUsers(response.data.data);
            toast.success('Successfully fetched users');
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="container mb-5 rounded">
            <h1 className="text-3xl font-bold mb-5">All Users:</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {users.map((user) => {
                    const { _id, userName, isLoggedIn } = user;
                    return (
                        <div key={_id} className="border p-4 rounded  bg-white ">
                            <h3 className="text-lg font-semibold mb-2">User: {userName}</h3>
                            <p className="text-sm">Status: {isLoggedIn ? <span className='text-success '>Online</span> : <span className='text-danger '>Offline</span>}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
