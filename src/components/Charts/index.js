import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
export default function Charts({ data }) {
  const [preParedDataByDate, setPreparedDataByDate] = useState([]);

  const LineChartSection = ({ key_x, _data, lines = [] }) => (
    <LineChart
      width={800}
      height={400}
      data={_data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={key_x} />
      <YAxis />
      <Tooltip />
      <Legend />
      {lines.map(({ colour, key_y }) => (
        <Line
          type="monotone"
          dataKey={key_y}
          stroke={colour}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  );

  const AreaChartComp = ({ key_x, _data, areas = [] }) => (
    <AreaChart
      width={790}
      height={400}
      data={_data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={key_x} />
      <YAxis />
      <Tooltip />
      {areas.map(({ colour, key_y }) => (
        <Area
          type="monotone"
          dataKey={key_y}
          stroke={colour}
          activeDot={{ r: 8 }}
        />
      ))}
    </AreaChart>
  );

  useEffect(() => {
    setPreparedDataByDate(countCrimeFreqByDate(data));
  }, [data]);

  return (
    <div className=" w-full min-h-screen flex flex-col justify-center items-center">
      <div className="my-8">
        <LineChartSection
          key_x="date"
          lines={[{ colour: "blue", key_y: "Number of crime reports" }]}
          _data={preParedDataByDate}
        />
      </div>
      <div className="mt-8">
        <AreaChartComp
          key_x="date"
          areas={[{ colour: "blue", key_y: "Number of crime reports" }]}
          _data={preParedDataByDate}
        />
      </div>
    </div>
  );
}

const countCrimeFreqByDate = (array) => {
  const date_map = {};

  for (let i = 0; i < array.length; i++) {
    let d = array[i].date;
    //convert it to date string
    d = new Date(d).toString();
    d = d.split(" ");
    d = d[0] + " " + d[1] + " " + d[2]; //eg: Tue Jan 10
    if (date_map.hasOwnProperty(d)) {
      date_map[d]++;
    } else {
      date_map[d] = 1;
    }
  }
  let result = [];
  for (const key in date_map) {
    const obj = {
      date: key,
      "Number of crime reports": date_map[key],
    };
    result.push(obj);
  }
  return result;
};

const groupByType = (array, type) => {
  const type_map = {};

  for (let i = 0; i < array.length; i++) {
    let t = array[i].type;
    //convert it to date string

    if (type_map.hasOwnProperty(t)) {
      type_map[t]++;
      continue;
    }
    type_map[t] = 1;
  }
  let result = [];
  for (const key in type_map) {
    const obj = {
      type: key,
      freq: type_map[key],
    };
    result.push(obj);
  }
  return result;
};
