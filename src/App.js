import "./App.css";
import { NavBar } from "./components/Navbar";
import { Home } from "./components/Home/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import Platform from "./components/Platform";
import { Route, Routes } from "react-router-dom";
import defaultSubscribtion from "./data/defaultSubscriptions";

function App() {
  const [AllContests, setAllContests] = useState([]);

  useEffect(() => {
    // Initialize localStorage if null
    const stored = localStorage.getItem("host_sites");
    if (stored === null) {
      localStorage.setItem(
        "host_sites",
        JSON.stringify(defaultSubscribtion)
      );
    }

    axios
      .get("https://clist.by:443/api/v2/contest/?limit=20&upcoming=true", {
        headers: {
          Authorization:
            "ApiKey siddharth0714:3ef96e04ca2f54b3e892fa1f20c09e2fc5d2652e",
        },
      })
      .then((res) => {
        const allowedHosts = [
          "codeforces.com",
          "atcoder.jp",
          "leetcode.com",
          "codechef.com",
          "hackerearth.com",
          "hackerrank.com",
        ];

        const contests = res.data.objects
          .filter((item) => allowedHosts.includes(item.host))
          .map((item) => ({
            name: item.event,
            url: item.href,
            start_time: item.start,
            end_time: item.end,
            site: item.host,
            duration: item.duration,
          }));

        setAllContests(contests);
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home contests={AllContests} />} />
        <Route path="/platform" element={<Platform />} />
      </Routes>
    </div>
  );
}

export default App;
