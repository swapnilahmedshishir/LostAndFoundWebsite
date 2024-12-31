import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Hero from "./Hero";
import OurImpact from "./OurImpact";
import RightPlace from "./RightPlace";
import SuccessStoris from "./SuccessStoris";
import { AppContext } from "../../Component/Context/ContextProvider";
import LatestLostFoundItems from "./LatestLostFoundItems";
import { Helmet } from "react-helmet";

const Home = () => {
  const { apiUrl } = useContext(AppContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get(`${apiUrl}/api/items`).then((response) => {
      setItems(response.data);
    });
  }, []);
  // Limit to 6 items
  const displayLatestItems = items.slice(0, 6);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition duration-300">
      <Helmet>
        <title>Home || Lost And Found Website </title>
      </Helmet>
      {/* Banner/Slider */}
      <Hero />
      {/* latest items Section */}
      <LatestLostFoundItems
        latestItems={displayLatestItems}
      ></LatestLostFoundItems>

      {/* Our Impact */}
      <OurImpact />
      {/* You're in the Right Place Section */}
      <RightPlace />
      {/* Success Storis */}
      <SuccessStoris />
    </div>
  );
};

export default Home;
