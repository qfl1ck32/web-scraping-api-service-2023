import { Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { JsonViewer } from "@app/components/JsonViewer/JsonViewer.component";

import { schema } from "./schema";
import { ScraperForm } from "./Scraper.form";

export type OnSubmit = SubmitHandler<yup.InferType<typeof schema>>;

export interface IScrapeComponentProps {
  onSubmit: OnSubmit;
  onExport: () => void;

  isLoading: boolean;

  data?: unknown;
}

export const Scraper: React.FC<IScrapeComponentProps> = ({
  onSubmit,
  onExport,

  data,
  isLoading,
}) => {
  return (
    <Fragment>
      <ScraperForm {...{ onSubmit, isLoading }} />

      {data == null ? null : (
        <div className="mt-28">
          <JsonViewer
            data={data}
            toolbar={{
              onExport,
            }}
          />
        </div>
      )}
    </Fragment>
  );
};
