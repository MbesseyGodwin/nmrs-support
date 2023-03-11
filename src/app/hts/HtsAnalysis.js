import React, { useState, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const HtsAnalysis = () => {
const [chart, setChart] = useState(null);

useEffect(() => {
let chart = am4core.create("donutChart", am4charts.PieChart);
// chart.fontSize = "10px";
chart.fontWeight = "bold";
chart.fontFamily = "Open Sans";
chart.color = "white";

chart.data = [{
  country: "Lithuania",
  liters: 232.9
}, {
  country: "Czech Republic",
  liters: 301.9
}, {
  country: "Ireland",
  liters: 201.1
}];

let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "liters";
pieSeries.dataFields.category = "country";
pieSeries.labels.template.fill = am4core.color("white");
pieSeries.ticks.template.disabled = true;

chart.innerRadius = am4core.percent(40);

setChart(chart);

return () => {
  chart.dispose();
};
}, []);

return (
<div id="donutChart" style={{ width: "100%", height: "500px" }}></div>
);
};

export default HtsAnalysis;