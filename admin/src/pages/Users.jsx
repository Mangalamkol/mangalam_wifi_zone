import React, {useEffect, useState} from "react";
import api from "../api";
import TopBar from "../components/TopBar";
import SideNav from "../components/SideNav";
import UserModal from "../components/UserModal";

export default function Users(){
  const [users,setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(()=>load(),[]);
  async function load(){ setUsers((await api.get("/admin/users")).data || []); }

  async function deleteUser(id){
    if(window.confirm("Are you sure you want to delete this user?")){
      await api.delete(`/admin/users/${id}`);
      load();
    }
  }

  const openModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    load();
  };

  const filteredUsers = users.filter(u => 
    u.phone.includes(search) || 
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app">
      <SideNav/>
      <div className="content">
        <TopBar title="Users" search={search} onSearch={setSearch} />
        <div className="card">
          <div className="card-header">
            <button onClick={() => openModal()}>Create User</button>
          </div>
          <table className="table">
            <thead><tr><th>Name</th><th>Phone</th><th>Role</th><th>Actions</th></tr></thead>
            <tbody>
              {currentItems.map(u=>(
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.phone}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => openModal(u)}>Edit</button>
                    <button onClick={() => deleteUser(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        {isModalOpen && (
          <UserModal user={selectedUser} onSave={closeModal} onCancel={closeModal} />
        )}
      </div>
    </div>
  );
}