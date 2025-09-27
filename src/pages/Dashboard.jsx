import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GreetingBanner from "../components/GreetingBanner";
import CollegeGrid from "../components/CollegeGrid";
import { getRecommendations } from "../api/recommendations";
import { useAuth } from "../AuthContext";
import CounsellingSupport from "../components/CounsellingSupport";

function Dashboard() {
  const { token } = useAuth();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRecommendations(token)
      .then(setColleges)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <Navbar />
      <GreetingBanner />
      <h2 style={{ margin: "2rem auto 1rem auto", maxWidth: 1200 }}>Your Top College Matches:</h2>
      {loading ? (
        <div style={{ textAlign: "center", margin: "2rem" }}>Loading...</div>
      ) : (
        <CollegeGrid colleges={colleges} />
      )}
      <CounsellingSupport />
    </div>
  );
}

export default Dashboard;
