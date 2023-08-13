import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class TxCurrSummary extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data to the chart
    chart.data = [
      {
        month: "October",
        visits: 2025,
      },
      {
        month: "November",
        visits: 1882,
      },
      {
        month: "December",
        visits: 1900,
      },
      {
        month: "January",
        visits: 1739,
      },
      {
        month: "February",
        visits: 1239,
      },
      {
        month: "March",
        visits: 1333,
      },

      {
        month: "April",
        visits: 1139,
      },
      {
        month: "May",
        visits: 2239,
      },
      {
        month: "June",
        visits: 1639,
      },
      {
        month: "July",
        visits: 1345,
      },
      {
        month: "August",
        visits: 1821,
      },
      {
        month: "September",
        visits: 1811,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.title.text = "Fiscal Year 2023";
    categoryAxis.title.fill = am4core.color("#fff");
    categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
      return am4core.color("#fff");
    });
    categoryAxis.renderer.labels.template.fontSize = 10;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Visits";
    valueAxis.title.fill = am4core.color("#fff");
    valueAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
      return am4core.color("#fff");
    });
    valueAxis.renderer.labels.template.fontSize = 10;
    const colors = [am4core.color("#00d25b")];

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "month";
    series.name = "Visits";
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";

    // Modify the fill color of each column based on the month
    series.columns.template.adapter.add("fill", (fill, target) => {
      let index = chart.data.indexOf(target.dataItem.dataContext);
      return colors[index % colors.length];
    });


    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card mb-5">
          <div className="card-body">
            <h4 className="card-title">Active Visits By Months</h4>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default TxCurrSummary;