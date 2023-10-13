import { useState, Fragment } from "react";

export const StringDisplay: React.FC<{ value: string; isUrl: boolean }> = ({
  value,
  isUrl,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  let displayValue = value;
  let expandable = false;

  if (value.length > 50 && !isUrl) {
    expandable = true;

    if (!expanded) {
      displayValue = `${value.substring(0, 47)}...`;
    }
  }

  if (isUrl) {
    return (
      <Fragment>
        <span className="text-orange-300 text-xs">{"{string}"}</span>{" "}
        <a
          className="text-orange-500"
          href={value}
          target="_blank"
          rel="noopener noreferrer"
        >
          {displayValue}
        </a>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <span className="text-orange-300 text-xs">{"{string}"}</span>{" "}
      <span className="text-orange-500">{displayValue}</span>
      {expandable && (
        <button className="text-gray-400" onClick={toggleExpand}>
          &nbsp;
          {expanded ? "Hide" : "Show more"}
        </button>
      )}
    </Fragment>
  );
};
