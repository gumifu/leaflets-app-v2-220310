import React, { useCallback, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Direction from "./Direction";
import { Current } from "./Current";

// import mapStyles from "./mapUtils/mapStyles";
// 地図のデザインを指定することができます。
// デザインは https://snazzymaps.com からインポートすることができます。

const center = { lat: 33.5902, lng: 130.4017 }

 const origin = { lat: 42.755955, lng: 141.32816 };
  // 始点を指定する
  const destination = { lat: 45.299023, lng: 141.65308 };
  // 終点を指定する
  // const transitPoints = [
  //   {
  //     location: { lat: 43.66406, lng: 142.85445 },
  //     stopover: true,
  //   },
  //   { location: { lat: 43.906742, lng: 144.79872 } },
  //   { location: { lat: 43.286533, lng: 143.18524 } },
  // ];

const libraries = ["places"];
const mapContainerStyle = {
  height: "60vh",
  width: "100%",
};
// 地図の大きさを指定します。

const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: true,
};

export default function GoogleMapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    // ここにAPIキーを入力します。今回は.envに保存しています。
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  //API読み込み後に再レンダーを引き起こさないため、useStateを使わず、useRefとuseCallbackを使っています。

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
　　　　　// デフォルトズーム倍率を指定します。
        center={center}
　　　　　// 札幌周辺にデフォルトのセンターを指定しました。
        options={options}
        onLoad={onMapLoad}
    >
       <Current/>
      </GoogleMap>
  );
}
