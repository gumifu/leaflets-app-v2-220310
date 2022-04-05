import Head from "next/head";
import Flyers from "../components/Flyers";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="bg-main">
      <Head>
        <title>leaflets</title>
        <meta name="description" content="Leaflets app by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* header */}
      <Header />
      {/* feed */}
      <Flyers />

    </div>
  );
}
