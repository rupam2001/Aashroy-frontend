const crimeColumn = [
  {
    Header: "Type",
    columns: [
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Description",
        accessor: "type_description",
      },
    ],
  },
  {
    Header: "Location",
    columns: [
      {
        Header: "Address",
        accessor: "reverse_geocoding_address",
      },
    ],
  },
  {
    Header: "Report",
    columns: [
      {
        Header: "Description",
        accessor: "brief_report",
      },
    ],
  },
];

export { crimeColumn };
