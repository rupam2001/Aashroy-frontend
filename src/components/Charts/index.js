import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

export default function Charts({ data }) {
  const [preParedData, setPreparedData] = useState([]);

  const LineChartSection = ({ key_x, key_y, _data }) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={400}
        height={400}
        data={_data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={key_x} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={key_y}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
  useEffect(() => {
    setPreparedData(data);
  }, [data]);
  return (
    <div className="bg-red-100 w-full h-full">
      <LineChartSection key_x="type" key_y="date" _data={preParedData} />
    </div>
  );
}

const groupByDate = (array, key) => {
  // Return the reduced array
  return array.reduce((result, currentItem) => {
    // If an array already present for key, push it to the array. Otherwise create an array and push the object.
    (result[currentItem[key]] = result[currentItem[key]] || []).push(
      currentItem
    );
    // return the current iteration `result` value, this will be the next iteration's `result` value and accumulate
    return result;
  }, {}); // Empty object is the initial value for result object
};

const groupByDate2 = (array = [], days = 10) => {};

const fake = [
  {
    type: "A",
    date: 123,
  },
  {
    type: "B",
    date: 124,
  },
  {
    type: "C",
    date: 126,
  },
];
