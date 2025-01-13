import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function ShowUsers() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    // using fetch method
    const res = await fetch("http://localhost:5000/");
    const data = await res.json();
    //  using axios method
    // const data = axios.get("http://localhost:5000/");
    console.log(data);
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function deleteUser(id) {
    if (window.confirm("DO YOU REALLY WANT TO DELETE THIS USER?")) {
      await axios.delete(`http://localhost:5000/users/${id}`);
      const filterUsers = users.filter((mereusers) => mereusers._id !== id);
      setUsers(filterUsers);
      toast.success("User Deleted Successfully?");
    }
  }

  return (
    <>
      <Link to="/" className="add_user_btn">
        Add User
      </Link>
      <div className="flex gap-4 justify-center box-layout">
        {users.map((mereusers) => {
          return (
            <>
              <div className="card glass w-96" key="mereusers._id">
                <figure>
                  <img
                    style={{ width: "200px" }}
                    src={mereusers.avatar}
                    alt="car!"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {mereusers.firstName} {mereusers.lastName}
                  </h2>
                  <p>{mereusers.email}</p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/edit/${mereusers._id}`}
                      className="btn btn-primary edit_btn"
                      style={{ backgroundColor: "dodgerblue" }}
                    >
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        deleteUser(mereusers._id);
                      }}
                    >
                      Remove?
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default ShowUsers;
