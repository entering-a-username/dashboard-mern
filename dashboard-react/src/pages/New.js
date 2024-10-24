import React, { useState } from 'react';

import { RiFile2Line } from "@remixicon/react";

export default function New({inputs, title, type}) {
  const [file, setFile] = useState("");
  const [flashMessage, setFlashMessage] = useState("");

  console.log(type)

  async function submitForm(e) {
    e.preventDefault();

    const obj = {};

    inputs.forEach(input => {
      const value = e.target.elements[input.id].value;
      console.log(input.id)
      obj[input.label] = value;
    })

    const res = await fetch(`http://localhost:3050/api/${type}s/new`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    const data = await res.json();

    console.log(data)

    if (data.created) {
      setFlashMessage(`${type} created`);

      setTimeout(() => {
        setFlashMessage("");
      }, 4000);
    }

  }


  return (
    <div className="new">

      <div className="new-container">

        <div className="top">
          {flashMessage && <h1 style={{color: "green"}}>{flashMessage}</h1>}
          <h1>{title}</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://picsum.photos/200/300"} alt="" />
          </div>

          <div className="right">
            <form onSubmit={(e) => {submitForm(e)}}>

              <div className="form-input">
                <label htmlFor="file">image: <RiFile2Line size={23} className="icon" /> </label>
                <input style={{display: "none"}} onChange={e => setFile(e.target.files[0])} type="file" id="file" />
              </div>

              {inputs.map((input) => (
                <div key={input.id} className="form-input">
                <label htmlFor="">{input.label}</label>
                <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
 
              <button>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
