import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AppProps } from "next/app";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

import { setupDI } from "@app/di/setup";

function App({ Component, pageProps }: AppProps) {
  setupDI();

  return (
    <Fragment>
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
