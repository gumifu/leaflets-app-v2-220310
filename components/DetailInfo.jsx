import React, { useEffect, useState } from "react";

const DetailInfo = ({
  id,
  accountName,
  profileImg,
  img,
  caption,
  prefectures,
  placeInfo,
  shopName,
  shopEmail,
  shopTel,
  shopHomepage,
}) => {
  return (
    <div className="mt-4 ml-10">
      <div className="bg-gray-100 p-10 rounded-3xl">
        <div className=" bg-white shadow-2xl shadow-gray-900">
          <img src={img} alt="" className="object-cover w-full" />
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
