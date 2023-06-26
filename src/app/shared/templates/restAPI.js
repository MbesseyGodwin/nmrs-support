import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://api.example.com/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createUser = async () => {
        try {
            const response = await axios.post('https://api.example.com/users', {
                name,
                email,
            });

            console.log('User created:', response.data);
            // Do something with the response, e.g., show a success message

            // Reset the input fields after successful creation
            setName('');
            setEmail('');

            // Fetch updated user list
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle the error, e.g., show an error message
        }
    };

    const updateUser = async (userId) => {
        try {
            const response = await axios.put(`https://api.example.com/users/${userId}`, {
                name,
                email,
            });

            console.log('User updated:', response.data);
            // Do something with the response, e.g., show a success message

            // Reset the input fields and editUserId after successful update
            setName('');
            setEmail('');
            setEditUserId(null);

            // Fetch updated user list
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle the error, e.g., show an error message
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`https://api.example.com/users/${userId}`);

            console.log('User deleted:', response.data);
            // Do something with the response, e.g., show a success message

            // Fetch updated user list
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle the error, e.g., show an error message
        }
    };

    const handleEdit = (userId) => {
        const user = users.find((user) => user.id === userId);
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setEditUserId(userId);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editUserId) {
            updateUser(editUserId);
        } else {
            createUser();
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">{editUserId ? 'Update' : 'Create'}</button>
            </form>

            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleEdit(user.id)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;


// The code  provided contains four React components that handle different HTTP requests (GET, POST, PUT, DELETE) using the Axios library in a React application. Here's a breakdown of each component:

// UserList:
// This component sends a GET request to retrieve a list of users from the specified API endpoint (https://api.example.com/users).
// The retrieved data is stored in the users state using the useState hook.
// The useEffect hook is used to fetch the users when the component mounts.
// The user list is rendered as an unordered list (<ul>) with each user's name displayed as a list item (<li>).


// CreateUser:
// This component allows users to create a new user by sending a POST request to the specified API endpoint (https://api.example.com/users).
// The component uses the useState hook to manage the name and email form inputs.
// When the form is submitted, the handleSubmit function is called, which sends the POST request using Axios with the provided name and email values.


// EditUser:
// This component allows users to edit an existing user's information.
// It takes a userId prop indicating the ID of the user to be edited.
// The component fetches the user's data from the API using a GET request to https://api.example.com/users/${userId}.
// The retrieved data is stored in the component's state using the useState hook.
// The user's name and email are displayed in the input fields, and any changes are updated in the component's state using the setName and setEmail functions.
// When the form is submitted, the handleSubmit function is called, which sends a PUT request to update the user's information at https://api.example.com/users/${userId}.


// DeleteUser:
// This component allows users to delete a specific user by sending a DELETE request to https://api.example.com/users/${userId}.
// It takes a userId prop indicating the ID of the user to be deleted.
// When the "Delete" button is clicked, the handleDelete function is called, which sends the DELETE request using Axios with the provided userId.
// These components can be used in a React application to perform CRUD operations (Create, Read, Update, Delete) on user data using HTTP requests. Please note that you need to replace https://api.example.com with the actual API endpoint you want to use in your application.







