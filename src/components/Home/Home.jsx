import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { ContestCard } from "./ContestCard";

export const Home = ({ contests }) => {
  var selectedContests = contests;
  if (localStorage.getItem("host_sites") != null) {
    const sites = Object.values(JSON.parse(localStorage.getItem("host_sites")))
      .filter((site) => site.status === true)
      .map((site) => site.name.toLowerCase());
    selectedContests = contests.filter((contest) =>
      sites.includes(contest?.site)
    );
  }

  const in24Hours = selectedContests.filter(contest => contest?.in_24_hours === "Yes");
  const upcoming = selectedContests.filter(contest => contest?.status === "BEFORE");

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event,newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs
        value={selectedTab} onChange={handleChange}
        textColor="white"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        className="tab-value"
      >
        <Tab label="All" />
        <Tab label="IN 24 hours" />
        <Tab label="Upcoming" />
      </Tabs>
      {selectedTab === 1 && <ContestCard contests={in24Hours} />}
      {selectedTab === 2 && <ContestCard contests={upcoming} />}
      {selectedTab === 0 && <ContestCard contests={selectedContests} />}
    </>
  );
};
