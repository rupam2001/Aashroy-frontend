import React from "react";
import "./style.css";

import DefaultLayout from "../../layouts/default.layout";

const NotFound = () => {
  return (
    <DefaultLayout navbarSolid={true}>
      <div className="">
        <div id="four-o-four">
          <div className="fof">
            <h1>Error 404</h1>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NotFound;
