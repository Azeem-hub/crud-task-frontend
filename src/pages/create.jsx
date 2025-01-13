import axios from "axios";
import { set } from "mongoose";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
  });

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
          let data = await axios.post("http://localhost:5000/create", {
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
          toast.success("New user created successfully!");
        } catch (error) {
          toast.error("Failed to create user.");
        }
      };
      reader.readAsDataURL(file);
    } else {
      try {
        let data = await axios.post("http://localhost:5000/create", user);
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          avatar: "",
        });
        toast.success("New user created successfully!");
      } catch (error) {
        toast.error("Failed to create user.");
      }
    }
    navigate("/"); //use navigate hook use in function to redirect after user creation
  }

  return (
    <>
      <form action="" onSubmit={submitHandler} className="form_fields">
        <h1>Create Page Form</h1>
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
          <input type="file" className="grow" accept="image/*" name="avatar" />
        </label>
        {/* <FileBase /> */}
        <button className="button" type="submit">
          register
        </button>
      </form>
    </>
  );
}

export default Create;
