import React, { useContext, useEffect, useRef, useState } from "react";
import { NgoContext, FaCloudUploadAlt } from "../../contexts/ngo.context";
import "./style.css";
import IconInput from "../IconInput/IconInput.component";
import { FaUpload, FaTrash } from "react-icons/fa";
import Resizer from "react-image-file-resizer";
import NgoMembers from "../ngoMembers/NgoMembers.component";
import {
  addNewPhotoAsync,
  updateNgoBasicInfoAsync,
} from "../../api/ngoDetailsEdit.api";
import { toast } from "react-toastify";
import Map from "../Map";

export default function NgoDetails({ ngoData, forPublic }) {
  // const ngoData = useContext(NgoContext);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [about, setAbout] = useState(null);
  const [media_urls, setMedia_urls] = useState([]);
  const [website, setWebsite] = useState(null);
  const [image, setImage] = useState(null);
  const modelRef = useRef(null);
  const [currenModelData, setCurrenModelData] = useState(null);
  const fileInuputRef = useRef(null);
  useEffect(() => {
    if (!ngoData.ngoDetails) return;
    setName(ngoData.ngoDetails.name);
    setEmail(ngoData.ngoDetails.email);
    setPhone(ngoData.ngoDetails.phone);
    setAbout(ngoData.ngoDetails.about);
    setWebsite(ngoData.ngoDetails.website);
    setMedia_urls(ngoData.ngoDetails.media_urls);
  }, [ngoData.ngoDetails]);

  const showModel = () => {
    modelRef.current.style.display = "flex";
  };
  const hideModel = () => {
    modelRef.current.style.display = "none";
  };
  const handleUploadClick = () => {
    fileInuputRef.current.click();
  };
  const onUploadChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setImage(image);
      setCurrenModelData({ url: image, type: "image", isUploading: true });
      showModel();
    } catch (err) {
      console.log(err);
    }
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        736,
        900,
        "JPEG",
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleDetailsEditSubmit = async () => {
    //api call
    const newNgoData = await toast.promise(
      updateNgoBasicInfoAsync({
        name,
        phone,
        about,
        website,
      }),
      {
        pending: "Updating..",
        success: "Updated Successfully",
        error: "Something went wrong",
      }
    );
    if (!newNgoData) {
      return;
    }
    let temp = { ...ngoData.ngoDetails };
    temp.name = newNgoData.name;
    temp.phone = newNgoData.phone;
    temp.about = newNgoData.about;
    temp.website = newNgoData.website;
    ngoData.setNgoDetails(temp);
  };

  const handleUpload = async () => {
    hideModel();

    const { newMediaList } = await toast.promise(
      addNewPhotoAsync({ imageBase64: image }),
      {
        pending: "Uploading....",
        success: "Uploaded",
        error: "Something went wrong",
      }
    );
    if (!newMediaList) {
      return;
    }

    setMedia_urls(newMediaList);
    let temp = { ...ngoData.ngoDetails };
    temp.media_urls = newMediaList;
    ngoData.setNgoDetails(temp);
  };

  return (
    <div className="min-h-full bg-gray-50 w-full px-0 py-4 flex flex-col justify-start items-center ">
      <div className="md:w-2/3 md:h-auto w-screen px-4 py-4 shadow md:px-20 md:py-20 rounded-2xl bg-white">
        <div className="container border-b-2 border-gray-100 h-40 mb-4">
          {ngoData.ngoDetails?.geo_location && (
            <Map
              markers={[]}
              region={[
                ngoData.ngoDetails.geo_location.longitude,
                ngoData.ngoDetails.geo_location.latitude,
              ]}
              pins={[
                {
                  longitude: ngoData.ngoDetails.geo_location.longitude,
                  latitude: ngoData.ngoDetails.geo_location.latitude,
                },
              ]}
            />
          )}
        </div>
        <IconInput
          placeholder={name}
          textClass="md:text-5xl text-3xl mr-2 focus:outline-none px-1 py-1 font-bold"
          // textClass="md:text-5xl text-2xl font-bold"
          onChangeText={(text) => setName(text)}
          isEditable={false}
        />
        {ngoData.ngoDetails && (
          <IconInput
            placeholder={email}
            // textClass="text-red-400"
            addedClass="text-red-900"
            onChangeText={(text) => setEmail(text)}
            isEditable={false}
          />
        )}
        <IconInput
          placeholder={phone}
          addedClass="text-blue-600"
          onChangeText={(text) => setPhone(text)}
          isEditable={!forPublic}
        />
        <IconInput
          placeholder={website}
          addedClass="text-blue-600 text-sx"
          onChangeText={(text) => setWebsite(text)}
          isEditable={!forPublic}
        />
        <textarea
          className="min-w-full h-60 bg-transparent about focus:outline-none "
          value={about || ""}
          onChange={(e) => {
            if (!forPublic) setAbout(e.target.value);
          }}
        />

        {!forPublic && (
          <div className="flex justify-end">
            <button
              onClick={handleDetailsEditSubmit}
              className="py-2 px-3 border-2 border-blue-400  text-white rounded font-bold text-sm bg-blue-600 transition duration-100"
            >
              Update
            </button>
          </div>
        )}
      </div>

      <NgoMembers
        membersList={ngoData.ngoDetails?.members}
        forPublic={forPublic}
      />

      <div className="md:w-2/3 md:h-auto w-screen px-4 py-4 shadow md:px-20 md:pb-4 rounded-2xl bg-white mt-10">
        <div className="md:py-10 p-4 flex justify-between items-center">
          <h1 className="text-blue-500 text-lg md:text-2xl font-medium">
            Photos
          </h1>
          {!forPublic && (
            <FaUpload
              className="text-xl text-gray-500 cursor-pointer"
              onClick={handleUploadClick}
            />
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInuputRef}
            onChange={onUploadChange}
          />
        </div>
        <div className="container grid grid-cols-3 gap-2 mx-auto">
          {media_urls?.map((i) => (
            <div className="w-full rounded" key={i.url}>
              <img
                src={i.url}
                alt="image"
                className="cursor-pointer"
                onClick={() => {
                  setCurrenModelData(i);
                  showModel();
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        id="myModal"
        className="modal flex justify-center items-center py-10"
        ref={modelRef}
      >
        <div className=" h-full md:w-1/2 w-full px-4 rounded-md flex flex-col items-center justify-start ">
          <div className="flex justify-end w-full h-10 items-end">
            {currenModelData && currenModelData.isUploading && (
              <div className=" flex flex-col justify-center items-center mr-10 md:mr-20">
                {!forPublic && (
                  <FaUpload
                    className="text-xl text-gray-500 cursor-pointer "
                    onClick={() => {
                      handleUpload();
                    }}
                  />
                )}
                {/* <p>Post</p> */}
              </div>
            )}
            <span className="close text-red-400 text-5xl" onClick={hideModel}>
              &times;
            </span>
          </div>
          <div className="h-full py-1 md:py-20">
            {currenModelData && (
              <img src={currenModelData.url} className="w-auto max-h-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
