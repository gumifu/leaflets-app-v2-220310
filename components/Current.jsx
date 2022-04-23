import React, { useState, useEffect, useRef } from 'react';
import Direction from './Direction';
// import './App.css';

/* エラーテキスト */
export const ErrorText = () => (
  <p className="App-error-text">geolocation IS NOT available</p>
);

export const Current = () => {
  const [isAvailable, setAvailable] = useState(false);
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  // useEffectが実行されているかどうかを判定するために用意しています
  const isFirstRef = useRef(true);

  /*
   * ページ描画時にGeolocation APIが使えるかどうかをチェックしています
   * もし使えなければその旨のエラーメッセージを表示させます
   */
  useEffect(() => {
    isFirstRef.current = false;
    if ('geolocation' in navigator) {
      setAvailable(true);
    }
	}, [isAvailable]);




    function showError(error) {
      const errorMessages = [
        "位置情報が許可されてません",
        "現在位置を特定できません",
        "位置情報を取得する前にタイムアウトになりました",
      ];
      alert(`error:${errorMessages[error.code-1]}`);
    }

    const option = {
      enableHighAccuracy: true,
      maximumAge: 20000,
      timeout: 10000,
    };

	// navigator.geolocation.getCurrentPosition(showPosition, showError, option);


  // const CurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
			setPosition({ latitude, longitude });
			showError;
			option;
    });
  // };

  // useEffect実行前であれば、"Loading..."という呼び出しを表示させます
  if (isFirstRef.current) return <div className="App">Loading...</div>;

  return (
    <div className="App">
      <p>Geolocation API Sample</p>
      {!isFirstRef && !isAvailable && <ErrorText />}
      {isAvailable && (
				<div className=''>
					<Direction position={position} latitude={position.latitude} longitude={position.longitude}/>
          {/* <button onClick={getCurrentPosition}>Get Current Position</button> */}
          <div>
            latitude: {position.latitude}
            <br />
            longitude: {position.longitude}
          </div>
        </div>
      )}
    </div>
  );
};

// export default Current;
