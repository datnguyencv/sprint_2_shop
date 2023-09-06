import React, { useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./Slider.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "https://www.finder.com.au/finder-au/wp-uploads/2021/08/Smart-home-gadgets_Supplied_1800x1000.jpg.jpg",
    "https://www.smartprix.com/bytes/wp-content/uploads/2023/02/1600x960_1277544-premium-smart-products.jpg",
    "https://mobieyes.vn/images/baiviet/13.1_nha_thong_minh_smarthome_1.jpg",
      "https://media.vneconomy.vn/w800/images/upload/2022/11/04/1-4.jpg"
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider">
      <div className="container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
        <img src={data[3]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
