import { Fragment } from "react";

export const NumberDisplay: React.FC<{ value: number }> = ({ value }) => {
  const isInteger = Number.isInteger(value);

  return (
    <Fragment>
      {isInteger ? (
        <span className="text-blue-300 text-xs">{"{int}"}</span>
      ) : (
        <span className="text-green-300 text-xs">{"{float}"}</span>
      )}{" "}
      <span className={isInteger ? "text-blue-500" : "text-green-500"}>
        {value}
      </span>
    </Fragment>
  );
};
