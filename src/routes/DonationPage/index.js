import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/default.layout";
import DonationBoard from "../../components/DonationBoard";
import TopContributors from "../../components/TopContributors";
import {
  getDonationData,
  getTopContributors,
} from "../../api/donationBoard.api";

function DonationPage() {
  const [recentDonations, setRecentDonations] = useState([]);
  const [topContributors, setTopContributors] = useState([]);

  useEffect(() => {
    // fetch data and pass it to donation board to display
    (async () => {
      const rdata = await getDonationData(0, 50);
      setRecentDonations(rdata.donations);
    })();

    // fetch data and pass it to top contributor to display
    (async () => {
      const tdata = await getTopContributors();
      console.log(tdata);
      setTopContributors(tdata.donations);
    })();
  }, []);

  return (
    <DefaultLayout navbarSolid={true}>
      <div className="w-full h-full flex flex-col p-3 items-center pt-24">
        {/* donation board */}
        <div
          id="recent-donations-board"
          className="mb-2 w-full flex items-center justify-center md:w-1/2 shadow-md h-1/2 overflow-y-scroll"
        >
          <DonationBoard donations={recentDonations} showImage={true} />
        </div>

        {/* top contributos */}
        <div
          id="recent-donations-board"
          className="mb-2 w-full flex items-center justify-center md:w-1/2 shadow-md h-1/2"
        >
          <TopContributors contributors={topContributors} />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default DonationPage;
