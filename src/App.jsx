import { useEffect } from "react";
import { useState } from "react"
import { Link, NavLink } from "react-router";
import Navbar from "../components/Navbar";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const url = "http://127.0.0.1:3000/getUsers"
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json();
      setUsers(json);
      console.log(json)
    } catch (error) {
      setError('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const postData = async () => {
    const url = 'http://127.0.0.1:3000/createUser'
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email })
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      await getData();
      setName("")
      setEmail("");
    } catch (error) {
      setError('Failed to send user data to server');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const updateUser = async () => {
    const url = `http://127.0.0.1:3000/updateUser/${editUserId}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email })
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await getData();
      setIsEdit(false);
      setEditUserId(null);
      setName("");
      setEmail("");
    } catch (error) {
      setError("Failed to update user");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const deleteUser = async (userId) => {
    const url = `http://127.0.0.1:3000/deleteUser/${userId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await getData();
    } catch (error) {
      setError("Failed to delete user");
      console.error(error);
    }
  }


  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  const handleEdit = (user) => {
    setIsEdit(true);
    setEditUserId(user._id);
    setName(user.name);
    setEmail(user.email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateUser();
    } else {
      postData();
    }
  }

  return (
    <div>
      <Navbar />

      <div className="p-4">
        <div>
          <div className="text-xl font-bold mb-4">
            Create New User
          </div>

          <form
            action="http://127.0.0.1:3000/createUser"
            onSubmit={handleSubmit}
            className="max-w-md p-6 bg-white rounded-2xl space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                {isEdit ? "Update" : "Submit"}
              </button>
            </div>
          </form>

        </div>
        <br />
        <div className="text-xl font-bold mb-4">User List</div>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id} className="p-3 mb-2 border rounded">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <div className="gap-2 flex mt-2">
                  <button onClick={() => handleEdit(user)} type="button" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">Edit</button>
                  <button onClick={() => deleteUser(user._id)} type="button" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
