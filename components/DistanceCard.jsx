import { useRouter } from 'next/router';
import React from 'react'

const DistanceCard = () => {
    const router = useRouter();

	const distanceNum1 = () => {
		router.push({
			pathname: "/distance",
			query: 1,
		});
	}
	const distanceNum3 = () => {
		router.push({
			pathname: "/distance",
			query: 3,
		});
	}
  const distanceNum10 = () => {
    router.push({
      pathname: "/distance",
      query: 10,
    });
  };
	return (
		<>
    <p className=" text-white">■ 現在地から</p>
		<div className='flex items-center'>
      <div
          onClick={distanceNum1}
          className='bg-gray-200 rounded-lg cursor-pointer px-3'
      >
        1km以内(徒歩10分程度)
    </div>
      <div
          onClick={distanceNum3}
          className='bg-gray-200 rounded-lg cursor-pointer px-3 mx-2'
      >
        3km以内(徒歩30分程度)
    </div>
      <div
          onClick={distanceNum10}
          className='bg-gray-200 rounded-lg cursor-pointer px-3'
      >
        10km以内(車10分程度)
    </div>
		</div>
		</>
  )
}

export default DistanceCard
