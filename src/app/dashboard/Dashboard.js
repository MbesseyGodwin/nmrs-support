import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Slider from "react-slick";
import { TodoListComponent } from "../apps/TodoList";
import { VectorMap } from "react-jvectormap";
import Globalproperties from "./Globalproperties";
import DashboardSlides from "./DashboardSlides";
import DashboardCards from "./DashboardCards";


export class Dashboarding extends Component {

  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }

  render() {
    return (
      <div>
        <DashboardCards />

        <div className="row">
          {/* dashboard slides */}
          <DashboardSlides />
          {/* Globalproperties data */}
          <Globalproperties />
        </div>
      </div>
    );
  }
}

export default Dashboarding;
