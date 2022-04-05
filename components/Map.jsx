import axios from "axios";
import GoogleMapReact from "google-map-react";

export const Map = ({ coordinates }) => {
  const center = {
    lat: coordinates.latitude,
    lng: coordinates.longitude,
  };

  const handleApiLoaded = ({ map, maps }) => {
    new maps.Marker({
      map,
      position: center,
    });
  };

  const requestUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&daily=weathercode&timezone=Asia%2FTokyo`;

  axios
    .get(requestUrl)
    .then(function (response) {
      // リクエスト成功時の処理（responseに結果が入っている）
      console.log(response.data.daily.weathercode[0]);
    })
    .catch(function (error) {
      // リクエスト失敗時の処理（errorにエラー内容が入っている）
      console.log(error);
    })
    .finally(function () {
      // 成功失敗に関わらず必ず実行
      console.log("done!");
    });

  return (
    <div style={{ height: "30vh", width: "100%" }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY }}
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
        defaultCenter={center}
        defaultZoom={18}
        onGoogleApiLoaded={handleApiLoaded}
      ></GoogleMapReact>
    </div>
  );
};
