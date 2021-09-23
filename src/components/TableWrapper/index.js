import React from "react";
import Table from "../../components/Table";
export default function TableWrapper({ data, columns }) {
  return (
    <div className="p-4">
      <Table columns={columns} data={data} />
    </div>
  );
}
