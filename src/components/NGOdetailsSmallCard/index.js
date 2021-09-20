import React from "react";

function NGOdetailsSmallCard({ name, email, phone, website }) {
  return (
    <div className="p-3 shadow-md rounded md:mx-3">
      <h1 className="font-semibold text-blue-600 uppercase">Donate to : </h1>
      {/* name */}
      <div className="py-1">
        <span className="text-sm text-gray-400">Name :&nbsp;</span>
        <span className="">{name}</span>
      </div>

      {/* email */}
      <div className="py-1">
        <span className="text-sm text-gray-400">Email :&nbsp;</span>
        <a href={`mailto:${email}`} className="text-blue-400">
          {email}
        </a>
      </div>

      {/* phone */}
      <div className="py-1">
        <span className="text-sm text-gray-400">Phone :&nbsp;</span>
        <a href={`tel:${phone}`} className="text-blue-400">
          {phone}
        </a>
      </div>

      {/* website */}
      <div className="py-1">
        <span className="text-sm text-gray-400">Website :&nbsp;</span>
        <a href={website} target="_blank" className="text-blue-400">
          {website}
        </a>
      </div>
    </div>
  );
}

export default NGOdetailsSmallCard;
