import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GreetingBanner from "../components/GreetingBanner";
import FilterBar from "../components/FilterBar";
import CollegeGrid from "../components/CollegeGrid";
import { fetchRecommendations } from "../api/colleges";
import { useAuth } from "../AuthContext";
import CounsellingSupport from "../components/CounsellingSupport";


function Colleges() {
    const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [nearby, setNearby] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchRecommendations(token, {
      stream: filter !== "All" ? filter : undefined,
      search: search || undefined,
      nearby: nearby ? 1 : undefined
    })
      .then(setColleges)
      .finally(() => setLoading(false));
  }, [token, filter, search, nearby]);
  return (
    <div>
      <Navbar />
      <GreetingBanner />
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        nearby={nearby}
        setNearby={setNearby}
      />
      {loading ? (
        <div style={{ textAlign: "center", margin: "2rem" }}>Loading...</div>
      ) : (
        <CollegeGrid colleges={colleges} />
      )}
      <CounsellingSupport />
    </div>
  );
}

export default Colleges;
