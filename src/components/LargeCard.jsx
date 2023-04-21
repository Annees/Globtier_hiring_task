import moment from "moment";
import React from "react";

const LargeCard = ({ breakingNews }) => {
  // const rec = newsData[0].title;
  function truncate(string, n) {
    //n is the no of character
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <div className="relative">
      <img
        className="object-cover rounded-2xl h-[390px] w-[100%]"
        src={
          breakingNews?.urlToImage
            ? breakingNews?.urlToImage
            : "https://links.papareact.com/2io"
        }
        alt="New Poster"
      />
      <div className="absolute top-[200px] left-12 w-[100%] h-[144px]">
        <h3 className="text-4xl mb-5 text-white">
          {truncate(breakingNews?.title, 50)}
        </h3>
        <h6 className="text-sm text-white px-4 py-2 rounded-lg mt-5">
          {moment(breakingNews?.publishedAt, "YYYYMMDD").fromNow()}
        </h6>
      </div>
    </div>
  );
};

export default LargeCard;
