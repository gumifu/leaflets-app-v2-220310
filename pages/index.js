import Head from "next/head";
import Flyers from "../components/Flyers";
import Header from "../components/Header";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  '30Q9NX0ZJ9',
  '96393fd0db56439a9aa5c63ba3746aef'
);

export default function Home() {
  return (
    <div className="bg-main">
      <Head>
        <title>leaflets</title>
        <meta name="description" content="Leaflets app by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InstantSearch searchClient={searchClient} indexName={"posts"}>
      {/* header */}
      <Header />
      {/* feed */}
      <Flyers />


      </InstantSearch>
    </div>
  );
}
