import React, { useEffect, useReducer, useRef, useState } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import Resizer from "react-image-file-resizer";
import {
  addNewMembeNgoAsync,
  removeMembeNgoAsync,
} from "../../api/ngoDetailsEdit.api";

export default function NgoMembers({ membersList, forPublic }) {
  const [members, setMembers] = useState(membersList || []);
  const [showForm, setShowForm] = useState(false);
  const fileInuputRef = useRef(null);

  const [newName, setNewName] = useState(null);
  const [newRole, setNewRole] = useState(null);
  const [newAbout, setNewAbout] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    setMembers(membersList);
  }, [membersList]);
  const handleAddMembersClick = () => {
    setShowForm(true);
  };
  const handleUploadClick = () => {
    fileInuputRef.current.click();
  };
  const onUploadChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setNewImage(image);
    } catch (err) {
      alert("something went wrong");
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

  const handleNewMemberAdded = async () => {
    const { members } = await addNewMembeNgoAsync({
      name: newName,
      role: newRole,
      about: newAbout,
      profile_pic: newImage,
    });
    if (!members) {
      alert("Something went wrong");
    }
    setMembers(members);
    setShowForm(false);
  };
  const handleRemoveMember = async (_id) => {
    const { members } = await removeMembeNgoAsync({ _id });
    if (!members) {
      alert("Something went wrong");
    }
    setMembers(members);
    setShowForm(false);
  };

  return (
    <div className="md:w-2/3 md:h-auto w-screen px-4 py-4 shadow md:px-20 md:py-20 rounded-2xl bg-white mt-10">
      <div className=" flex justify-between items-center">
        <h1 className="text-blue-500 text-lg md:text-2xl font-medium mb-10">
          Members
        </h1>
        <div className="flex flex-col items-center">
          {!forPublic && (
            <FaPlusCircle
              className="text-xl text-blue-500 cursor-pointer"
              onClick={handleAddMembersClick}
            />
          )}
          {!forPublic && (
            <p className="text-sm font-medium text-blue-500">Add</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center ">
        {showForm && (
          <div class="max-w-md py-4 px-8 bg-white shadow rounded-lg my-12 w-full min-w-full">
            <div class="flex justify-center md:justify-end -mt-16">
              <img
                class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500 cursor-pointer"
                src={
                  newImage
                    ? newImage
                    : "https://res.cloudinary.com/rupamcloud/image/upload/v1631867064/uplaod_bkswrb.png"
                }
                onClick={handleUploadClick}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInuputRef}
                onChange={onUploadChange}
              />
            </div>
            <div className="">
              <input
                class="text-gray-800 text-3xl font-sm bold pb-2 mt-2 w-full p-2 outline-none"
                placeholder="Name"
                autoFocus
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
                required
              />
              <input
                className="text-blue-400 my-4 w-full p-2 outline-none"
                placeholder="Role"
                onChange={(e) => {
                  setNewRole(e.target.value);
                }}
                required
              />
              <br />
              <textarea
                class="mt-2 text-gray-600 w-full h-auto p-2 outline-none"
                rows={5}
                placeholder="about"
                onChange={(e) => {
                  setNewAbout(e.target.value);
                }}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="py-2 px-3 border-0 border-blue-400  text-gray-500 mx-4 rounded font-bold text-sm  transition duration-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewMemberAdded}
                  className="py-2 px-3 border-2 border-blue-400  text-white rounded font-bold text-sm bg-blue-600 transition duration-100"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        {members &&
          members.map((m) => (
            <div class="max-w-md py-4 px-8 bg-white shadow rounded-lg my-12 min-w-full">
              <div class="flex justify-center md:justify-end -mt-16">
                <img
                  class="w-20 h-20 object-cover rounded-full border-2 border-blue-500"
                  src={m.profile_pic}
                />
              </div>
              <div className="md:block flex flex-col items-center">
                <h2 class="text-gray-800 text-3xl font-semibold pb-2">
                  {m.name}
                </h2>
                <h5 className="text-blue-400">{m.role}</h5>
                <p class="mt-2 text-gray-600">{m.about}</p>
                {!forPublic && (
                  <div className="flex justify-end mt-4 w-full">
                    <FaTrash
                      className="cursor-pointer text-red-500"
                      onClick={() => {
                        handleRemoveMember(m._id);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
