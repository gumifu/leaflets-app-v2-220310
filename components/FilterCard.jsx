import { CashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";

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
    <div className="bg-white p-10 rounded-lg">
      <p>■ エリア / カテゴリーを入力</p>
      <div className="flex items-center rounded-md mb-5 py-2 md:shadow-sm border-none">
        <select
          value={prefecRefInput}
          onChange={(e) => setPrefecRefInput(e.target.value)}
          name="prefectures"
          className="rounded-lg mr-1 h-14"
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
          className="flex-grow md:pl-5 bg-transparent w-full text-sm text-gray-900 rounded-lg h-14"
          type="text"
          placeholder={placeholder || "例：カフェ"}
        />
      </div>

      <div className="mx-auto ">
        <div className="flex">
          <button
            onClick={resetInput}
            className="flex-grow bg-gray-500 text-white md:px-20 py-5 hover:bg-opacity-75 "
          >
            Cancel
          </button>
          <button
            onClick={search}
            className="flex-grow text-white bg-blue-500 md:px-20 py-5 rounded-sm hover:bg-opacity-75"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterdCard;
