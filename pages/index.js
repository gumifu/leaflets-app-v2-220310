import Head from "next/head";
import Flyers from "../components/Flyers";
import Header from "../components/Header";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import Modal from "../components/Modal";
import Script from "next/script";

export default function Home() {
  return (
    <div className="bg-main">
      <Head>
        <title>leaflets</title>
        <meta name="description" content="Leaflets app by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <!--==============JQuery読み込み===============--> */}
      <Script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"
      ></Script>
      <Script src="https://rawgit.com/kimmobrunfeldt/progressbar.js/master/dist/progressbar.min.js"></Script>

      {/* <!--自作のJS--> */}
      <Script src="https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/4-1-2/js/4-1-2.js"></Script>
      {/* header */}
      <div id="splash">
        <h1>
          <i>HEY Cheeeeese ! ! !</i>
        </h1>
        <div id="splash_text"></div>
      </div>
      <Header />

      {/* feed */}
      <Flyers />
      <Modal />
    </div>
  );
}
