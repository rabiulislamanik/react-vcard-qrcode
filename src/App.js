import React, { Component } from "react";
import vCardsJS from "vcards-js";

class App extends Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    organization: "",
    workPhone: "",
    title: "",
    node: "",
    email: ""
  };
  downloadQRCode = (url, fileName) => {
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

  handleTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    //create a new vCard
    let vCard = vCardsJS();
    //set properties from state
    vCard.firstName = this.state.firstName;
    vCard.middleName = this.state.middleName;
    vCard.lastName = this.state.middleName;
    vCard.organization = this.state.organization;
    vCard.photo.embedFromString(this.state.photo, "png");
    vCard.workPhone = this.state.workPhone;
    vCard.birthday = this.state.birthday;
    vCard.title = this.state.title;
    vCard.url = this.state.url;
    vCard.note = this.state.note;
    vCard.email = this.state.email;
    //now render vcard
    //get as formatted string
    let vCardString = vCard.getFormattedString();
    let vCardEncodedString = encodeURIComponent(vCardString);
    let qrCodeUrl = `https://chart.googleapis.com/chart?chs=300x300&choe=UTF-8&chld=M|0&cht=qr&chl=${vCardEncodedString}`;
    return (
      <div className="container form-group col-md-4 d-flex flex-column justify-content-center">
        <h1 className="text-info text-center">VCard QRCode Generator</h1>
        <img
          ref="img"
          style={{ height: 100, width: 100, margin: "auto" }}
          src={qrCodeUrl}
        />
        <input
          className="form-control"
          type="text"
          name="firstName"
          placeholder="First name"
          onKeyUp={this.handleTextChange}
        />
        <input
          className="form-control"
          type="text"
          name="middleName"
          placeholder="Middle name"
          onKeyUp={this.handleTextChange}
        />
        <input
          className="form-control"
          type="text"
          name="lastName"
          placeholder="Last name"
          onKeyUp={this.handleTextChange}
        />
        <input
          className="form-control"
          type="text"
          name="organization"
          placeholder="Organization"
          onKeyUp={this.handleTextChange}
        />
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="Designation"
          onKeyUp={this.handleTextChange}
        />
        <input
          className="form-control"
          type="text"
          name="workPhone"
          placeholder="Phone (work)"
          onKeyUp={this.handleTextChange}
        />
        <input
          className="form-control"
          type="text"
          name="email"
          placeholder="Email"
          onKeyUp={this.handleTextChange}
        />
        <input
          className="form-control"
          type="text"
          name="url"
          placeholder="Website"
          onKeyUp={this.handleTextChange}
        />
        <input
          className="form-control"
          type="text"
          name="note"
          placeholder="Description"
          onKeyUp={this.handleTextChange}
        />
        <button
          className="btn btn-info"
          onClick={() => this.downloadQRCode(qrCodeUrl, "qrcode.png")}
        >
          Download the QRCode
        </button>
      </div>
    );
  }
}

export default App;
