"use client";

import Highcharts from "highcharts";
import "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";

// Loaded only in the browser (see Chart), so Highcharts never runs on the server.
export default function HcChart({ options }: { options: Highcharts.Options }) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ className: "min-h-9 w-full" }}
    />
  );
}
