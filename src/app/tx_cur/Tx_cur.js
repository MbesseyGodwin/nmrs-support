import React, { Component } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import Slider from "react-slick";

import TxCurCards from "./TxCurCards";
import TxCurrAge from "./TxCurrAge";
import TxCurrCategory from "./TxCurrCategory";
import TxCurrGender from "./TxCurrGender";
import TxCurrSummary from "./TxCurrSummary";


export class Tx_cur extends Component {
  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }
  render() {
    return (
      <div>
        {/* TxCurCards */}
        <TxCurCards />

        <div className="row">

          {/* TxCurrAge */}
          <TxCurrAge />

          {/* TxCurrByGender */}
          <TxCurrGender />

          {/* TxCurrCategory */}
          <TxCurrCategory />
        </div>

        <div className="row">\

          {/* TxCurrSummary */}
          <TxCurrSummary />
        </div>
      </div>
    );
  }
}

export default Tx_cur;
