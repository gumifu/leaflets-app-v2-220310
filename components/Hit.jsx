import Nextlink from "next/link";

export const Hit = ({ hit }) => {
  return (
    <Nextlink passHref href={`/postdetail/${hit.objectID}`}>
      <div className=" m-10 h-200">
        <div className=" bg-white shadow-lg shadow-gray-800 ">
          <img
            src={hit.image}
            alt=""
            className="object-cover w-full hover:scale-105 transition-all duration-500 ease-in-out"
          />
        </div>
        <div className="">{hit.shopName}</div>
        <div className="">{hit.caption}</div>
        {/* <div className="">{hit.place}</div>
          <div className="">{hit.objectID}</div> */}
      </div>
    </Nextlink>
  );
};
