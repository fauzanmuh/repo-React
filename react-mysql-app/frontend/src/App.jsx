import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Ambil data users dari backend
  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Tambah user baru
  const addUser = () => {
    axios.post("http://localhost:5000/users", { name, email })
      .then((response) => {
        setUsers([...users, response.data]);
        setName("");
        setEmail("");
      })
      .catch((error) => console.error(error));
  };

  // Update user
  const updateUser = () => {
    axios.put(`http://localhost:5000/users/${editingId}`, { name, email })
      .then(() => {
        setUsers(users.map(user => user.id === editingId ? { id: editingId, name, email } : user));
        setName("");
        setEmail("");
        setEditingId(null);
      })
      .catch((error) => console.error(error));
  };

  // Hapus user
  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((error) => console.error(error));
  };

  // Set data user yang akan diedit
  const editUser = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <div>
      <h1>User List</h1>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {
        editingId ? (
          <button onClick={updateUser}>Update User</button>
        ) : (
          <button onClick={addUser}>Tambah User</button>
        )
      }

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
