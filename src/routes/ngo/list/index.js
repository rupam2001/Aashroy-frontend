import React, { useEffect, useState } from "react";
import {
  getNearestNGOSAsync,
  searchNGOSAsync,
} from "../../../api/ngoPublic.api";
import { getCurrentGeoLocationAsync } from "../../../utils/location";
import SearchBar from "../../../components/SearchBar";
import { NgoCard, NgoLoadingCard } from "../../../components/NgoCard";
export default function NgoList() {
  const [ngoList, setNgoList] = useState([1, 2, 3, 4, 5, 6]);
  const [msg, setMsg] = useState("NGOs near you");
  const [searchQuery, setSearchQuery] = useState("");
  const [oldSearchQuery, setOldSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const batchSize = 2;
  const [showLoadMore, setShowLoadMore] = useState(false); //currently not implemented
  const fetchInitialNgoListAsync = async () => {
    // get current location
    const position = await getCurrentGeoLocationAsync();
    const { latitude, longitude } = position.coords;
    const { ngos } = await getNearestNGOSAsync({
      diameter: -1,
      geo_location: { latitude, longitude },
    });
    if (!ngos) return;
    //sort them
    const sorted_ngos = [...ngos].sort((a, b) => a.clossness - b.clossness);
    setNgoList(sorted_ngos);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchInitialNgoListAsync();
  }, []);

  const handleSearchAsync = async () => {
    if (searchQuery.length < 2) return;
    setIsLoading(true);

    const startTime = new Date();

    const { ngos } = await searchNGOSAsync(searchQuery, skip, batchSize);
    if (!ngos || (ngos.length == 0 && ngoList.length != 0)) {
      setMsg("No results found");
      setIsLoading(false);
      setNgoList([]);
      return;
    }
    if (skip != 0) {
      //means user has already searched
      // append
      setNgoList([...ngoList, ...ngos]);
    } else {
      setNgoList(ngos);
    }
    if (ngos.length == 0) {
      setShowLoadMore(false);
    }
    setSkip(skip + batchSize);
    setShowLoadMore(true);
    setIsLoading(false);

    //calculating time taken by the server to search
    let endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    // timeDiff /= 1000;
    // get seconds
    var seconds = Math.round(timeDiff);
    setMsg(`${ngos.length} results in ${seconds / 1000} seconds`);
  };

  return (
    <div className=" w-full min-h-full flex flex-col items-center bg-gray-50 px-2 pt-6 ">
      <SearchBar
        onChange={(text) => {
          setSearchQuery(text);
          setSkip(0);
        }}
        value={searchQuery}
        containerClass={isLoading ? "" : "sticky top-2"}
        onSearchClick={handleSearchAsync}
      />
      <p className="text-gray-400 mt-4">{msg}</p>
      {ngoList.map((n) => {
        if (isLoading) return <NgoLoadingCard />;
        return <NgoCard {...n} />;
      })}
    </div>
  );
}
