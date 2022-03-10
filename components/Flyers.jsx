import { useSession } from 'next-auth/react'
import React from 'react'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

const Flyers = () => {
      const { data: session } = useSession();
  return (
   <main className={` grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
        {/* section */}
      <section className='col-span-2'>
        {/* Stories */}
        <Stories/>
        {/* Pots */}
        <Posts/>
      </section>

      {session && (
      <section className='hidden xl:inline-grid md:col-span-1'>
        {/* MiniProfile */}
        <div className="fixed top-30">
          <MiniProfile/>
          {/* Suggestion */}
          <Suggestions/>
        </div>
      </section>
      )}
    </main>
  )
}

export default Flyers
