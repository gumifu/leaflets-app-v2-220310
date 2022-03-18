import {signIn} from 'next-auth/react';

const signUp = () => {

  return (
    <div>
      {/* <Header/> */}
      <body class="bg-gradient-to-br from-blue-900 to-gray-900 font-family-karla h-screen text-white">
        <div class="w-full flex flex-wrap">
          {/* <!-- Image Section --> */}
              <div class="w-1/2 shadow-2xl hidden md:block">
                  <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0" alt="Background" />
              </div>
              {/* <!-- Register Section --> */}
              <div class="w-full md:w-1/2 flex flex-col">

                  <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                      <a href="#" class="" alt="Logo"><img src="/logo-main-white.svg" className=" w-24 md:w-20"/></a>
                  </div>

                  <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                      <p class="text-center text-3xl">Join Us.</p>
                      <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                          <div class="flex flex-col pt-4">
                              <label for="name" class="text-lg">ユーザー名</label>
                              <input type="text" id="name" placeholder="" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                          </div>

                          <div class="flex flex-col pt-4">
                              <label for="email" class="text-lg">メールアドレス</label>
                              <input type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                          </div>

                          <div class="flex flex-col pt-4">
                              <label for="password" class="text-lg">パスワード</label>
                              <input type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                          </div>

                          {/* <div class="flex flex-col pt-4">
                              <label for="confirm-password" class="text-lg">パスワード確認</label>
                              <input type="password" id="confirm-password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                          </div> */}

                          <input type="submit" value="アカウント登録" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline p-2 mt-8" />
                      </form>
                      <div class="text-center pt-12 pb-12">
                          <p>アカウント作成済み <a href="login.html" onClick={signIn} class="underline font-semibold">ログイン</a></p>
                      </div>
                  </div>

              </div>


          </div>

      </body>
    </div>
  )
}

export default signUp
