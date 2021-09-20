import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NgoDetails from "../../../components/ngoHome/NgoDetails.component";
import { NgoContext } from "../../../contexts/ngo.context";
import NgoLayout from "../../../layouts/ngo.layout";
import "./style.css";

export default function NgoHome({ children }) {
  const ngocontext = useContext(NgoContext);
  return (
    <NgoLayout>
      <NgoDetails ngoData={ngocontext} forPublic={false} />
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
