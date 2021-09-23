import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import NGOdetailsSmallCard from "../../../components/NGOdetailsSmallCard";
import {
  DONATION_TYPES,
  DONATION_PHOTO_LIMIT,
} from "../../../constants/donation.constants";
import {
  fetchNGOdetails,
  submitDonationFormData,
} from "../../../api/donation.api";
import imageSizeReducer from "../../../utils/imageSizeReducer";

import Cookies from "js-cookie";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFileUpload, FaGhost } from "react-icons/fa";

function Donate() {
  const { ngoId } = useParams();
  const history = useHistory();

  const [donorName, setDonorName] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [type, setType] = useState(DONATION_TYPES[0]);
  const [media, setMedia] = useState([]);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [ngoDetails, setNgoDetails] = useState({});

  // function to handle if new files are selected
  const handleFileSelection = (e) => {
    if (loading) return;
    let files = e.target.files;

    if (files)
      // reduce size and store them in media
      imageSizeReducer(files, setMedia, DONATION_PHOTO_LIMIT);
  };

  // function to make a anonymous donation or to cancel it
  const isAnonymousHandler = () => {
    if (isAnonymous) setDonorName("");
    else setDonorName("Anonymous");
    setIsAnonymous((p) => !p);
  };

  // function to validate and upload data to server
  const submitHandler = async () => {
    // validate
    if (donorName.length < 1) {
      toast.error("Name cannot be empty");
      return;
    } else if (
      !contactNumber ||
      contactNumber.length < 8 ||
      contactNumber.length > 13
    ) {
      toast.error("Enter a valid contact number");
      return;
    } else if (
      !width ||
      !height ||
      !length ||
      width.length < 1 ||
      height.length < 1 ||
      length.length < 1
    ) {
      toast.error("Enter valid dimensions");
      return;
    } else if (weight.length < 1) {
      toast.error("Weight cannot be empty");
      return;
    }

    setLoading(true);
    try {
      // call api function
      const result = await toast.promise(
        submitDonationFormData(
          setLoading,
          donorName,
          contactNumber,
          type,
          ngoId,
          media,
          [length, width, height],
          weight
        ),
        {
          pending: "Uploading data",
          success: "Successfully uploaded",
          error: "Oops! Something went wrong",
        }
      );
    } catch (err) {
      toast.error(err);
    }
    history.replace("/general");
  };

  useEffect(() => {
    // prepare existing data
    let userName = Cookies.get("general_user_data");
    userName = JSON.parse(userName).name;
    setDonorName(userName);

    // get NGO details : name, geo location
    (async () => {
      try {
        const data = await fetchNGOdetails(ngoId);
        setNgoDetails(data["0"]);
      } catch (err) {
        toast.error(err);
        history.replace("/general");
      }
    })();
  }, []);

  return (
    <UserLayout>
      <div className="flex flex-col justify-center item-center p-3 md:flex-row-reverse md:justify-around w-full">
        <div id="ngo-details-container" className=" flex flex-col md:w-1/2">
          <div className="">Map</div>

          <NGOdetailsSmallCard
            name={ngoDetails.name}
            phone={ngoDetails.phone}
            email={ngoDetails.email}
            website={ngoDetails.website}
          />
        </div>
        <div
          id="donation-form"
          className="my-3 flex flex-col rounded shadow-md p-3 md:w-1/2"
        >
          {/* name of donor */}
          <div className="flex flex-col pb-2">
            <div className="flex justify-between mb-1">
              <label className="text-gray-400 text-sm">Name :</label>
              <button
                title="Donate Anonymously"
                onClick={isAnonymousHandler}
                className={"px-2" + (isAnonymous ? " text-purple-500" : " ")}
              >
                <FaGhost />
              </button>
            </div>
            <input
              disabled={loading || isAnonymous}
              type="text"
              className="border-2 border-gray-100 p-2 rounded"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>

          {/* contact number */}
          <div className="flex flex-col pb-2">
            <label className="text-gray-400 text-sm">Contact Number : </label>
            <input
              disabled={loading}
              type="number"
              min="0"
              className="border-2 border-gray-100 p-2 rounded"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          {/* type of donation */}
          <div className="flex pb-3 pt-2 item-center">
            <label for="select-gender" className="text-gray-400 text-sm">
              Donation type :&nbsp;
            </label>
            <select
              id="select-gender"
              name="gender"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white text-sm"
              disabled={loading}
            >
              {DONATION_TYPES.map((item, index) => (
                <option className="bg-white" read key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* dimensions */}
          <div className="flex item-center justify-between pb-2">
            {/* length */}
            <div className="flex flex-col pb-2 w-1/4 mr-1">
              <label className="text-gray-400 text-sm">Length : </label>
              <input
                disabled={loading}
                type="text"
                className="border-2 border-gray-100 p-2 rounded"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            {/* width */}
            <div className="flex flex-col pb-2 w-1/4 mr-1">
              <label className="text-gray-400 text-sm">Width : </label>
              <input
                disabled={loading}
                type="text"
                className="border-2 border-gray-100 p-2 rounded"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            {/* height */}
            <div className="flex flex-col pb-2 w-1/4 ml-1">
              <label className="text-gray-400 text-sm">Height : </label>
              <input
                disabled={loading}
                type="text"
                className="border-2 border-gray-100 p-2 rounded"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          {/* weight */}
          <div className="flex flex-col pb-2">
            <label className="text-gray-400 text-sm">
              Approximate weight :
            </label>
            <input
              disabled={loading}
              type="text"
              className="border-2 border-gray-100 p-2 rounded"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* media */}
          {/* show images preview if any */}
          {media.length > 0 && (
            <div className="my-2 p-3 flex overflow-x-scroll">
              {media.map((item, index) => {
                return (
                  <img className="m-1" key={index} src={item} alt="previews" />
                );
              })}
            </div>
          )}
          {/* upload/capture images */}
          {media.length < DONATION_PHOTO_LIMIT && (
            <>
              <label
                for="file-upload"
                className="flex justify-center cursor-pointer items-center text-gray-700 border-2 h-20 border-dotted my-2 p-3"
              >
                Upload photos&nbsp;
                <FaFileUpload />
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                placeholder="photo"
                multiple
                accept="image/*"
                onChange={handleFileSelection}
                max="10"
              />
            </>
          )}
          <span className="text-sm mx-3 text-gray-600">
            * A maximum of {DONATION_PHOTO_LIMIT} images can be uploaded at once
          </span>

          {/* button to upload data */}
          <button
            onClick={submitHandler}
            className={
              "flex justify-center items-center text-white rounded  focus:bg-blue-700 m-3 p-3 text-lg" +
              (isAnonymous ? " bg-purple-500" : " bg-blue-500")
            }
          >
            Submit
          </button>
        </div>
      </div>
    </UserLayout>
  );
}

export default Donate;
