import React, { Component } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import Slider from "react-slick";
import TxCurrChart from "./TxCurrChart";
import TxCurrByMonth from "./TxCurrByMonth";
import TxCurrGender from "./TxCurrGender";
import TxCurrByAge from "./TxCurrByAge";

export class Tx_cur extends Component {
  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }
  render() {
    return (
      <div>
        <div className="row">
          {/* TxCurrChart */}
          <TxCurrChart />

          {/* TxCurrByGender */}
          <TxCurrGender />

          {/* TxCurrByMonth */}
          <TxCurrByMonth />
        </div>

        <div className="row">
          {/* TxCurrByAge */}
          <TxCurrByAge />
        </div>
      </div>
    );
  }
}

export default Tx_cur;
