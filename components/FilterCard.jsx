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
        // categorySmall: categorySmallInput,
        // setPrice,
      },
    });
  };

  return (
    <div className="bg-white p-10 rounded-lg">
      {/* <div className="flex items-center border-b mt-10 mb-20">
        <h2 className="text-2xl flex-grow font-semibold">価格帯</h2>

        <CashIcon className="h-10" />
        <input
          value={setPrice}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          min={1}
          className="w-12 pl-2 text-lg outline-none text-yellow-600"
        />
      </div> */}

      <p>■ エリア / カテゴリーを入力</p>
      <div className="flex items-center md:border-2 rounded-md mb-10 py-2 md:shadow-sm border-none">
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
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-900 rounded-lg h-14"
          type="text"
          placeholder={placeholder || "例：カフェ"}
        />
      </div>

      {/* <p>■ ブランドを入力</p>
      <div className="flex items-center md:border-2 rounded-md mb-10 py-2 md:shadow-sm">
        <input
          value={brandInput}
          onChange={(e) => setBrandInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-400"
          type="text"
          placeholder={placeholder || "例：アクアレーベル"}
        />
      </div>

      <p>■ カテゴリを入力</p>
      <div className="flex items-center md:border-2 rounded-md mb-10 py-2 md:shadow-sm">
        <input
          value={categorySmallInput}
          onChange={(e) => setCategorySmallInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-400"
          type="text"
          placeholder={placeholder || "例：化粧水"}
        />
      </div> */}

      <div className="mx-auto ">
        <div className="flex mt-10">
          <button
            onClick={resetInput}
            className="flex-grow bg-gray-500 text-white px-20 py-5 hover:bg-opacity-75"
          >
            Cancel
          </button>
          <button
            onClick={search}
            className="flex-grow text-white bg-blue-500 px-20 py-2 rounded-sm hover:bg-opacity-75"
          >
            Search
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default FilterdCard;
