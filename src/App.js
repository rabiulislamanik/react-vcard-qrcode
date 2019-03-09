import React, { Component } from "react";
import vCardsJS from "vcards-js";

class App extends Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    organization: "",
    photo: "",
    workPhone: "",
    birthday: "",
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
    console.log(e);
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
    vCard.photo.attachFromUrl(this.state.photo, "png");
    vCard.workPhone = this.state.workPhone;
    vCard.birthday = new Date(1993, 20, 8);
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
      <div>
        <input type="text" name="firstName" onKeyUp={this.handleTextChange} />
        <input type="text" name="middleName" onKeyUp={this.handleTextChange} />
        <input type="text" name="lastName" onKeyUp={this.handleTextChange} />
        <input
          type="text"
          name="organization"
          onKeyUp={this.handleTextChange}
        />
        <input type="text" name="photo" onKeyUp={this.handleTextChange} />
        <input type="text" name="workPhone" onKeyUp={this.handleTextChange} />
        <input type="text" name="birthday" onKeyUp={this.handleTextChange} />
        <input type="text" name="title" onKeyUp={this.handleTextChange} />
        <input type="text" name="url" onKeyUp={this.handleTextChange} />
        <input type="text" name="note" onKeyUp={this.handleTextChange} />
        <input type="text" name="email" onKeyUp={this.handleTextChange} />
        <img ref="img" src={qrCodeUrl} />
        <button onClick={() => this.downloadQRCode(qrCodeUrl, "qrcode.png")}>
          Download the QRCode
        </button>
      </div>
    );
  }
}

export default App;
