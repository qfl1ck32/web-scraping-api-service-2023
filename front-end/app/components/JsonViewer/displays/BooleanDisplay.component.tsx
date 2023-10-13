import { Fragment } from "react";

export const BooleanDisplay: React.FC<{ value: boolean }> = ({ value }) => {
  return (
    <Fragment>
      <span className="text-purple-300 text-xs">{"{boolean} "}</span>
      <span className="text-purple-600">{value ? "true" : "false"}</span>
    </Fragment>
  );
};
