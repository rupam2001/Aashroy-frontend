import React, { useEffect, useState } from "react";
import DonationBoard from "../../components/DonationBoard";
import { getDonationData } from "../../api/donationBoard.api";

function DonationPage() {
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    // fetch data and pass it to donation board to display
    (async () => {
      const rdata = await getDonationData(0, 50);
      console.log(rdata.donations);
      setRecentDonations(rdata.donations);
    })();
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-3 items-center">
      <div
        id="recent-donations-board"
        className="mb-2 w-full flex items-center justify-center md:w-1/2 shadow-md"
      >
        <DonationBoard donations={recentDonations} showImage={true} />
      </div>
    </div>
  );
}

export default DonationPage;
