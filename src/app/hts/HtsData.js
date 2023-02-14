import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const HtsData = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = [
      { date: "2012-01-01", value: 8, value2: 7, color: "#FFFFFF" },
      { date: "2012-01-02", value: 10, value2: 6, color: "#FFFFFF" },
      { date: "2012-01-03", value: 12, value2: 5, color: "#FFFFFF" },
      { date: "2012-01-04", value: 14, value2: 7, color: "#FFFFFF" },
    ];

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.labels.template.fill = am4core.color("#FFFFFF");

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    series.name = "Value";
    series.fillOpacity = 0.5;

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = "date";
    lineSeries.dataFields.valueY = "value2";
    lineSeries.tooltipText = "{valueY.value}";
    lineSeries.name = "Value 2";
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.stroke = "color";
    lineSeries.propertyFields.strokeDasharray = "solid";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.fill = am4core.color("#FFFFFF");
    chart.cursor.lineX.stroke = am4core.color("#FFFFFF");

    setChart(chart);
    return () => {
      chart.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }} />;
};

export default HtsData;
