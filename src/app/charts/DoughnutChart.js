import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const DoughnutChart = ({ data, options }) => {
  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    // chart.fontSize = "17px";
    chart.fontWeight = "bold";
    chart.fontFamily = "Open Sans";
    chart.color = "white";

    chart.data = data;

    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    pieSeries.labels.template.fill = am4core.color("white");

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    // Apply options
    if (options) {
      if (options.title) {
        chart.titles.create().text = options.title;
      }
      if (options.colors) {
        pieSeries.colors.list = options.colors.map((color) =>
          am4core.color(color)
        );
      }
      if (options.innerRadius) {
        pieSeries.innerRadius = am4core.percent(options.innerRadius);
      }
      if (options.startAngle) {
        pieSeries.startAngle = options.startAngle;
      }
      if (options.endAngle) {
        pieSeries.endAngle = options.endAngle;
      }
    }

    return () => {
      chart.dispose();
    };
  }, [data, options]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default DoughnutChart;