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
    <div className="bg-white p-4 shadow rounded my-4">
      <div className="">
        <img src={media_url.url} />
      </div>
      <div className="py-4">
        <h2 className="font-bold ">Name: {person_name}</h2>
        <p className="text-green-500">age group: {age_group}</p>
        <p className="text-green-500">gender: {gender}</p>
      </div>
    </div>
  );
};

export default HomelessPerson;
