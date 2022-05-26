import React, { Component } from "react";

class Footer extends Component {
  year = () => {
    let d = new Date();
    return d.getFullYear();
  };

  render() {
    return (
      <footer className="clearfix mt-4">
        <p>
          &copy; {this.year()}
          <a
            href="https://www.inceptionu.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            inceptionU
          </a>
          , All rights reserved
        </p>
      </footer>
    );
  }
}

export default Footer;