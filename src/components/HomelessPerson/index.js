import React from "react";

const HomelessPerson = ({
  person_name,
  age_group,
  gender,
  media_url,
  containerClass,
}) => {
  if (!person_name) return <></>;
  return (
    <div className="bg-white shadow rounded my-4 pt-5">
      <div className="px-5">
        <h2 className="font-bold">
          Name: <span className="capitalize">{person_name}</span>{" "}
        </h2>
        <img src={media_url.url} className="mt-4" />
      </div>
      <div className="mt-5">
        <div className="flex ">
          <div className="w-1/2 text-center py-2 border">
            <div className="font-bold mb-1 ">Age</div>
            <div>{age_group}</div>
          </div>
          <div className="w-1/2 text-center py-2 border">
            <div className="font-bold mb-1 ">Gender</div>
            <span className="capitalize">{gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomelessPerson;
