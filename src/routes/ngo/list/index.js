import React, { useState } from "react";
export default function NgoList() {
  const [ngoList, setNgoList] = useState([]);
  return (
    <div>
      {ngoList.map((n) => (
        <NgoCard {...n} />
      ))}
    </div>
  );
}

const NgoCard = ({ name, about }) => {
  return <div></div>;
};
