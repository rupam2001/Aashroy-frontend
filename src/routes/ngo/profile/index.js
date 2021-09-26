import React, { useEffect, useState } from "react";
import { getNGOAsync } from "../../../api/ngoPublic.api";
import NgoDetails from "../../../components/ngoHome/NgoDetails.component";
export default function NgoProfile(props) {
  const [_id, setId] = useState(null);
  const [ngo, setNgo] = useState(null);
  const fetchNGOAsync = async () => {
    //get the id
    const { id } = props.match.params;
    //API CALL to fetch the ngo with that ip for public view
    // alert(id);
    const { ngo } = await getNGOAsync({ id });
    console.log(ngo);
    setNgo(ngo);
  };
  useEffect(() => {
    fetchNGOAsync();
  }, []);
  if (!ngo) return <div></div>;
  return (
    <div>
      <NgoDetails forPublic={true} ngoData={{ ngoDetails: ngo }} />
    </div>
  );
}
