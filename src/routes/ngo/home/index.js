import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NgoDetails from "../../../components/ngoHome/NgoDetails.component";
import NgoLayout from "../../../layouts/ngo.layout";
import "./style.css";

export default function NgoHome({ children }) {
  return (
    <NgoLayout>
      <NgoDetails />
    </NgoLayout>
  );
}

{
  /* // <div className="container px-6 pt-1 flex flex-col">
    //   <div className="upper">
    //     <NgoDetails />
    //   </div>
    //   <div>middle</div>
    //   <div>lower</div>
    // </div> */
}
