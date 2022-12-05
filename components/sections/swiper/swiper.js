import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import { useSelector, useDispatch } from "react-redux";
import Card from "../SwiperCard/Card";

import ImageOne from "../../../public/1.jpg";
import ImageTwo from "../../../public/2.jpg";
import ImageThree from "../../../public/3.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

export default () => {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      // navigation
      autoplay={{ delay: 1800 }}
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide style={{ paddingTop: "15px", textAlign: "center" }}>
        <Card picture={ImageOne} />
      </SwiperSlide>

      <SwiperSlide style={{ paddingTop: "15px", textAlign: "center" }}>
        <Card picture={ImageTwo} />
      </SwiperSlide>

      <SwiperSlide style={{ paddingTop: "15px", textAlign: "center" }}>
        <Card picture={ImageThree} />
      </SwiperSlide>
    </Swiper>
  );
};
