"use client";

import Highcharts from "highcharts";
import "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";

// Loaded only in the browser (next/dynamic with ssr: false), so Highcharts never runs on the server.
export default function HcChart({ options }: { options: Highcharts.Options }) {
  return <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ className: "hc" }} />;
}
