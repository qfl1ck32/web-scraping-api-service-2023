import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import { setupDI } from "@app/di/setup";

function App({ Component, pageProps }: AppProps) {
  setupDI();

  return (
    <Fragment>
      <Head>
        <title>Web Scraping API - Dashboard</title>
        <meta
          name="description"
          content="The dashboard of the Web Scraping API service."
        />
      </Head>

      <ToastContainer
        {...{
          autoClose: 1500,
          position: "bottom-right",
        }}
      />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default App;
