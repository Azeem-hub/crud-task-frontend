import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Edit() {
  // ===================================
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const { id } = useParams();

  async function fetchUser() {
    const data = await axios(`http://localhost:5000/edit/${id}`);
    console.log(data.data);
    setUser(data.data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function changeHandler(e) {
    // console.log(e.target.name, e.target.value);
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  let navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();

    const fileInput = document.querySelector('input[name="avatar"]');
    if (fileInput && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        // console.log(base64Image); //this print the address of file
        setUser({ ...user, avatar: base64Image });
        // console.log(user); //it showing the avatar value empty
        try {
          let data = await axios.patch(`http://localhost:5000/users/${id}`, {
            ...user,
            avatar: base64Image, // Send the base64 image in the request
          });
          // console.log(data.data); check which data is inserted in data base
          setUser({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            avatar: "",
          });
          toast.success("User Updated successfully!");
        } catch (error) {
          toast.error("Failed to create user.");
        }
      };
      reader.readAsDataURL(file);
    } else {
      try {
        let data = await axios.patch(`http://localhost:5000/users/${id}`, user);
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          avatar: "",
        });
        toast.success("User Updated Successfully!");
      } catch (error) {
        toast.error("Failed to Update user.");
      }
    }
  }

  //====================================
  return (
    <>
      <div>
        <form action="" onSubmit={submitHandler} className="form_fields">
          <h1>Update User</h1>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="First Name"
              value={user.firstName}
              onChange={changeHandler}
              name="firstName"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Last Name"
              value={user.lastName}
              onChange={changeHandler}
              name="lastName"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={user.email}
              onChange={changeHandler}
              name="email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="password"
              value={user.password}
              onChange={changeHandler}
              name="password"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="file"
              className="grow"
              accept="image/*"
              name="avatar"
            />
          </label>
          <button className="button" type="submit">
            Update Now
          </button>
        </form>
      </div>
    </>
  );
}

export default Edit;
