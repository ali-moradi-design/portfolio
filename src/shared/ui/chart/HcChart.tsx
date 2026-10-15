"use client";

import Highcharts from "highcharts";
import "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
import styles from "./Chart.module.css";

// Loaded only in the browser (see Chart), so Highcharts never runs on the server.
export default function HcChart({ options }: { options: Highcharts.Options }) {
  return <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ className: styles.chart }} />;
}
