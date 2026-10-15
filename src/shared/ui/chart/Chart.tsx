"use client";

import type Highcharts from "highcharts";
import dynamic from "next/dynamic";

const HcChart = dynamic(() => import("./HcChart"), { ssr: false });

/** A Highcharts chart, loaded in the browser only. `height` reserves its space while it loads. */
export function Chart({ options, height }: { options: Highcharts.Options; height: number }) {
  return (
    <div style={{ minHeight: height }}>
      <HcChart options={options} />
    </div>
  );
}
