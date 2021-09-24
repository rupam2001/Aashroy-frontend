import React, { useState } from "react";
import Table from "../../components/Table";
import {
  FaChartLine,
  FaMapMarkedAlt,
  FaTable,
  FaChartArea,
} from "react-icons/fa";
import { MdPeople, MdLocationOn, MdPhotoLibrary } from "react-icons/md";
import Charts from "../Charts";

export default function TableWrapper({ data, columns }) {
  const [showTable, setShowTable] = useState(true);
  return (
    <div className="p-4 w-full">
      <div className="flex justify-evenly py-2 z-50 my-1 sticky top-0 bg-white shadow items-center text-sm border-b-2 border-gray-100">
        <div
          className="flex flex-col items-center text-blue-500 cursor-pointer"
          onClick={() => {
            setShowTable(true);
          }}
        >
          <FaTable />
          <span>Table</span>
        </div>
        <div
          className="flex flex-col items-center text-blue-500 cursor-pointer"
          onClick={() => {
            setShowTable(false);
          }}
        >
          <FaChartArea />
          <span>Charts</span>
        </div>
      </div>
      <div className="">
        {showTable && <Table columns={columns} data={data} />}
        {!showTable && <Charts data={data} />}
      </div>
    </div>
  );
}
