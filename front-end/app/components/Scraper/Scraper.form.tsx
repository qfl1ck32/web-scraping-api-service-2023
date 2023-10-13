import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { PageLoader } from "@app/components/PageLoader/PageLoader.component";

import { schema } from "./schema";

export type OnSubmit = SubmitHandler<yup.InferType<typeof schema>>;

export interface IScraperFormProps {
  onSubmit: OnSubmit;
  isLoading: boolean;
}

export const ScraperForm: React.FC<IScraperFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const isButtonDisabled =
    formState.isSubmitting || Boolean(formState.errors.url) || isLoading;

  const isInputDisabled = isLoading || formState.isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 mx-auto max-w-lg">
      {isLoading && <PageLoader />}

      <div className="mb-4">
        <input
          disabled={isInputDisabled}
          type="text"
          placeholder="Enter URL here..."
          className="p-3 w-full border text-black rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition duration-200"
          {...register("url", { required: true })}
        />
        {formState.errors.url ? (
          <p className="text-red-500 mt-1 text-sm">A valid URL is required.</p>
        ) : null}
      </div>

      <div>
        <button
          type="submit"
          className={`w-full p-3 rounded-lg text-lg font-medium transition duration-200 ${
            isButtonDisabled
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={isButtonDisabled}
        >
          {isLoading ? "Loading..." : "Scrape!"}
        </button>
      </div>
    </form>
  );
};
