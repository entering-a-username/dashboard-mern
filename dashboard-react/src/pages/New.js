import React, { useState } from 'react';

import { RiFile2Line } from "@remixicon/react";

export default function New({inputs, title}) {
  const [file, setFile] = useState("");

  return (
    <div className="new">

      <div className="new-container">

        <div className="top">
          <h1>{title}</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://picsum.photos/200/300"} alt="" />
          </div>

          <div className="right">
            <form>

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
