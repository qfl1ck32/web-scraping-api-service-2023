import "../app/globals.css";

import { AppProps } from "next/app";
import { Fragment } from "react";

import { setupDI } from "@app/di/setup";

function App({ Component, pageProps }: AppProps) {
  setupDI();

  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default App;
