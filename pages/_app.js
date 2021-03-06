import "../styles/globals.css";
import Head from "next/head";
import EE from "../utils/ee";

function MyApp({ Component, pageProps }) {
  EE();

  return (
    <div className="bg-white dark:bg-dark-background min-h-screen w-full bg-cover font-display">
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <div className="absolute top-8" id="popup"></div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
