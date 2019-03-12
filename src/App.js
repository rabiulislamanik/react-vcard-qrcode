import React, { useState } from "react";
import vCardsJS from "vcards-js";

function App() {
  //define initialstate
  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    organization: "",
    workPhone: "",
    title: "",
    note: "",
    workEmail: "",
    url: ""
  };
  //use hooks
  const [formState, setState] = useState(initialState);

  //function for downloading the qrcode
  const downloadQRCode = (url, fileName) => {
    fetch(url, {})
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => {
        const tag = document.createElement("a");
        tag.href = url;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
      });
  };

  //function for textinput changes
  const handleTextChange = e => {
    setState({ ...formState, [e.target.name]: e.target.value });
    //note: did this because the setState was
    //keeping the changed property only.
    //so other properties values was becoming undefined
    //so I spread the full state first, then the changed
    //property just got overwritten
    // TODO:// seek for a better solution
  };

  //create a new vCard
  let vCard = vCardsJS();
  //set properties from state
  vCard.firstName = formState.firstName;
  vCard.middleName = formState.middleName;
  vCard.lastName = formState.lastName;
  vCard.organization = formState.organization;
  vCard.workPhone = formState.workPhone;
  vCard.title = formState.title;
  vCard.note = formState.note;
  vCard.workEmail = formState.workEmail;
  vCard.url = formState.url;
  //get as formatted string and encode it
  let vCardString = vCard.getFormattedString();
  let vCardEncodedString = encodeURIComponent(vCardString);
  let qrCodeUrl = `https://chart.googleapis.com/chart?chs=300x300&choe=UTF-8&chld=M|0&cht=qr&chl=${vCardEncodedString}`;
  //console.log(formState);
  //create the jsx
  return (
    <div className="container form-group col-md-4 d-flex flex-column justify-content-center">
      <h1 className="text-info text-center">VCard QRCode Generator</h1>
      <img
        style={{ height: 100, width: 100, margin: "auto" }}
        src={qrCodeUrl}
        alt="generated-qr-code"
      />
      <input
        className="form-control"
        type="text"
        name="firstName"
        placeholder="First name"
        onKeyUp={handleTextChange}
      />
      <input
        className="form-control"
        type="text"
        name="middleName"
        placeholder="Middle name"
        onKeyUp={handleTextChange}
      />
      <input
        className="form-control"
        type="text"
        name="lastName"
        placeholder="Last name"
        onKeyUp={handleTextChange}
      />
      <input
        className="form-control"
        type="text"
        name="organization"
        placeholder="Organization"
        onKeyUp={handleTextChange}
      />
      <input
        className="form-control"
        type="text"
        name="title"
        placeholder="Designation"
        onKeyUp={handleTextChange}
      />
      <input
        className="form-control"
        type="text"
        name="workPhone"
        placeholder="Phone (work)"
        onKeyUp={handleTextChange}
      />
      <input
        className="form-control"
        type="text"
        name="email"
        placeholder="Email"
        onKeyUp={handleTextChange}
      />
      <input
        className="form-control"
        type="text"
        name="url"
        placeholder="Website"
        onKeyUp={handleTextChange}
      />
      <input
        className="form-control"
        type="text"
        name="note"
        placeholder="Description"
        onKeyUp={handleTextChange}
      />
      <button
        className="btn btn-info"
        onClick={() => downloadQRCode(qrCodeUrl, "qrcode.png")}
      >
        Download the QRCode
      </button>
    </div>
  );
}

export default App;
