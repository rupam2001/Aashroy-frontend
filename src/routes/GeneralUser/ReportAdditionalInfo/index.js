import React, { useState, useEffect } from "react";
import UserLayout from "../../../layouts/UserLayout";
import HomelessPeopleCard from "../../../components/HomelessPeopleCard";
import { useLocation, useHistory } from "react-router";
import { MdPersonAdd } from "react-icons/md";
import { reportHomelessAddInfo } from "../../../api/reportHomeless.api";

import { toast } from "react-toastify";

function ReportAdditionalInfo() {
  const location = useLocation();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [ageGroup, setAgeGroup] = useState("31-40");
  const [photo, setPhoto] = useState("");
  const [parentId, setParentId] = useState("");
  const [loading, setLoading] = useState(false);

  const addAPersonHandler = () => {
    if (name.length < 1) {
      toast.error("Name cannot be empty.");
      return;
    }

    setData((p) => {
      let newP = [...p];
      p.push({
        name,
        gender,
        ageGroup,
        photo,
      });
      return newP;
    });

    setName("");
    setGender("male");
    setAgeGroup("31-40");
    setPhoto("");
  };

  const submitHandler = async () => {
    if (data.length < 1) {
      toast.error("Add at least one person to submit");
      return;
    }

    // send data to backend
    setLoading(true);

    await toast.promise(reportHomelessAddInfo(setLoading, data, parentId), {
      pending: "Uploading data",
      success: "Successfully uploaded",
      error: "Oops! Something went wrong",
    });

    // redirect to homepage
    history.replace("/general");
  };

  const deleteHandler = (index) => {
    // deletes the entry at given index
    setData((p) => {
      let newP = [...p];
      newP.splice(index, 1);
      return newP;
    });
  };

  useEffect(() => {
    // check if parent id is passed
    if (location.state && location.state.parentId) {
      // if yes set parentId
      setParentId(location.state.parentId);
      // else return it back to /general/report-homeless
    } else {
      history.replace("/general/report-homeless");
    }
  }, []);

  return (
    <UserLayout>
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full p-3 items-center">
          {/* list of homeless people */}
          {data.length > 0 &&
            data.map((person, index) => {
              return (
                <HomelessPeopleCard
                  key={index}
                  index={index}
                  canEdit={false}
                  name={person.name}
                  gender={person.gender}
                  ageGroup={person.ageGroup}
                  photo={person.photo}
                  deleteHandler={deleteHandler}
                />
              );
            })}

          <hr />

          {/* active homeless person card */}
          <HomelessPeopleCard
            canEdit={true}
            name={name}
            setName={setName}
            gender={gender}
            setGender={setGender}
            ageGroup={ageGroup}
            setAgeGroup={setAgeGroup}
            photo={photo}
            setPhoto={setPhoto}
          />

          {/* add person */}
          <button
            onClick={addAPersonHandler}
            className="my-3 w-full lg:w-2/3 justify-center p-3 flex items-center hover:bg-blue-600 hover:text-white border-blue-500 border-2 rounded text-blue-500"
          >
            <MdPersonAdd /> &nbsp; Add Person
          </button>

          {/* Submit button */}
          <button
            onClick={submitHandler}
            disabled={loading}
            className=" p-3 w-full lg:w-2/3 rounded flex justify-center font-semibold sticky bottom-0 items-center focus:bg-blue-600 bg-blue-500 text-white"
          >
            Submit&nbsp;({data.length} {data.length < 2 ? "entry" : "entries"})
          </button>
        </div>
      </div>
    </UserLayout>
  );
}

export default ReportAdditionalInfo;
