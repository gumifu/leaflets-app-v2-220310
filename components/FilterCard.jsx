import { CashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const FilterdCard = ({ placeholder }) => {
  const [prefecRefInput, setPrefecRefInput] = useState("");
  const [classificationRefInput, setClassificationRefInput] = useState("");
  const router = useRouter();

  const resetInput = () => {
    // setsetPrefecRefInput("")
    setClassificationRefInput("");
  };

  const search = () => {
    router.push({
      pathname: "/filtersresult",
      query: {
        prefecture: prefecRefInput,
        classification: classificationRefInput,
      },
    });
  };

  return (
    <div className="">

      <div className="grid grid-cols-3 items-center justify-center border-2 border-gray-500 bg-opacity-40 bg-gray-900  rounded-lg w-full">

        <div className=" col-span-1 mx-auto">
          {/* <div className="absolute ">
            <img src="/copy-image.png"
              layout="fill"
            objectFit="contain"
            className=" w-40 hidden md:inline-block"
            />
          </div> */}

          <div className="bg-[url('/copy-image.png')] bg-opacity-75">

          <img src="/copy.png"
            layout="fill"
          objectFit="contain"
          className="w-64 hidden md:inline-block z-10"
          />
          </div>
        </div>
        <div className=" col-span-3 md:col-span-2 md:mr-5 m-3">
      <p className=" text-white">■ エリア / カテゴリーを入力</p>
      <div className="flex items-center rounded-md lg:mb-5 mb-1 py-2 md:shadow-sm border-none">
        <select
          value={prefecRefInput}
          onChange={(e) => setPrefecRefInput(e.target.value)}
          name="prefectures"
          className="rounded-lg mr-1 lg:h-14 h-10"
        >
          <option value="全国">全国</option>
          <option value="福岡県">福岡県</option>
          <option value="東京都">東京都</option>
          <option value="北海道">北海道</option>
          <option value="山口県">山口県</option>
          <option value="その他">その他</option>
        </select>
        <input
          value={classificationRefInput}
          onChange={(e) => setClassificationRefInput(e.target.value)}
          className="flex-grow md:pl-5 bg-transparent w-full text-sm text-gray-900 rounded-lg lg:h-14 h-10 bg-gray-50 "
          type="text"
          placeholder={placeholder || "例：カフェ"}
        />
      </div>

      <div className="mx-auto ">
        <div className="flex">
          <button
            onClick={resetInput}
            className="flex-grow bg-gray-500 text-white md:px-20 lg:py-5 py-2 hover:bg-opacity-75 "
          >
            Cancel
          </button>
          <button
            onClick={search}
            className="flex-grow text-white bg-blue-500 md:px-20 lg:py-5 py-2 rounded-sm hover:bg-opacity-75"
          >
            Search
          </button>
        </div>
      </div>
    </div>
        </div>
    </div>
  );
};

export default FilterdCard;
