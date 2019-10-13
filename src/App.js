import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import InputRange from "react-input-range";
import Slider from "react-input-slider";
import Sidebar from "./components/Sidebar";

class App extends Component {
  state = {
    post: [],
    min: 500,
    max: 5000,
    steps: 500,
    amount: 600,
    month: 7,
    sidebarOpen: false
  };

  async componentDidMount() {
    var amount = this.state.amount;
    var month = this.state.month;
    this.fatchData(amount, month);
  }

  async fatchData(amount, month) {
    const { data: post } = await axios.get(
      `https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${month}`
    );

    this.setState({ post });
    console.log(this.state.post);
  }

  handleChange = value => {
    this.setState({ steps: value });
    console.log(this.state.steps);
  };

  onInputChange = e => {
    if (e.currentTarget.amount < 500 || e.currentTarget.amount > 5000)
      return alert("amount should be between 500 and 5000");
    if (e.currentTarget.month < 6 || e.currentTarget.month > 24)
      return alert("month should be between 6 and 24");
    else {
      var amount = e.currentTarget.amount;
      var month = e.currentTarget.month;
      this.setState({ amount });
      this.setState({ month });
    }
  };

  handleOnClick = e => {
    e.preventDefault();
    var amount = e.currentTarget.amount.value;
    var month = e.currentTarget.month.value;
    if (amount < 500 || amount > 5000)
      return alert("amount should be between 500 and 5000");
    if (month < 6 || month > 24)
      return alert("month should be between 6 and 24");
    else {
      this.fatchData(amount, month);
      var obj = {
        amount: e.currentTarget.amount.value,
        month: e.currentTarget.month.value
      };
      var dict = [];
      localStorage.setItem(amount, month);
    }
  };

  render() {
    var tf = [];
    var tf2 = [];
    var sd = this.state.post;
    tf = Object.keys(sd).map(key =>
      key === "interestRate" ? (
        <div key={key}>
          <a>{sd[key]}</a>
        </div>
      ) : (
        <div></div>
      )
    );
    tf2 = Object.keys(sd).map(key =>
      key === "monthlyPayment" ? (
        <div key={key}>
          <a>{sd[key].amount}</a>
          <a>{sd[key].currency}</a>
        </div>
      ) : (
        <div></div>
      )
    );
    return (
      <React.Fragment>
        <Sidebar></Sidebar>
        <main id="form" className="container">
          <div>
            <div>
              <form onSubmit={this.handleOnClick}>
                <label htmlFor="amount">
                  Loan amount
                  <input
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onInputChange}
                    error={this.handleError}
                    min={500}
                    max={5000}
                    type="number"
                  ></input>
                </label>
                <label htmlFor="month">
                  Loan month
                  <input
                    name="month"
                    value={this.state.month}
                    onChange={this.onInputChange}
                    error={this.handleError}
                    type="number"
                    min={6}
                    max={24}
                  ></input>
                </label>
                <button>OK</button>
              </form>
            </div>
            <div>
              <label>
                {" "}
                InterestRate
                <text>{tf}</text>
              </label>
              <label>
                {" "}
                MonthlyPayment
                <text>{tf2}</text>
              </label>
            </div>
          </div>
          <div>
            <Slider
              value={this.state.steps}
              min={this.state.min}
              max={this.state.max}
              onChange={this.handleChange}
              data-step-labels="[500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]"
            />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
