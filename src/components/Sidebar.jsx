import React, { Component } from "react";

class Sidebar extends Component {
  getItems() {
    var dict = [];

    for (let i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      dict.push({
        keys: key,
        values: value
      });
      console.log(key);
      console.log(value);
    }
    var fg = [];
    return (fg = Object.keys(dict).map(keys => `My key is ${key} `));
  }
  render() {
    return (
      <div id="sidebar">
        <ul>{this.getItems()}</ul>
      </div>
    );
  }
}

export default Sidebar;
