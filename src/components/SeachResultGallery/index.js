import React, { useState } from "react";

const SearchResultGallery = ({
  homelessList,
  handleImageClick,
  containerClass,
  homelessMap,
}) => {
  return (
    <div className={containerClass}>
      <div className="px-2">
        {Object.entries(homelessMap).map((obj) => {
          const key = obj[0];
          const value = obj[1];
          return (
            <div className="my-5">
              <div>
                <h2 className="text-gray-600 font-bold">{key} :</h2>
              </div>
              <div className="container mx-auto mt-2">
                {value.map((each_homeless) => {
                  return (
                    <div
                      className="container grid grid-cols-3 gap-1 mx-auto w-full"
                      onClick={() => {
                        handleImageClick(each_homeless);
                      }}
                    >
                      {each_homeless.media_url &&
                        each_homeless.media_url.map((media) => (
                          <div className="w-full rounded my-2" key={media.url}>
                            <img
                              src={media.url}
                              alt="image"
                              className="cursor-pointer"
                            />
                          </div>
                        ))}
                      {each_homeless.media_urls &&
                        each_homeless.media_urls.map((media) => (
                          <div className="w-full rounded my-2" key={media.url}>
                            <img
                              src={media.url}
                              alt="image"
                              className="cursor-pointer"
                              onClick={() => {
                                handleImageClick(each_homeless);
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResultGallery;
