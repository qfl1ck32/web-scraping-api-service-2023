import { useUrlService } from "@app/services/url/url.constants";

import { useJsonViewer } from "./context";
import { ArrayDisplay } from "./displays/ArrayDisplay.component";
import { BooleanDisplay } from "./displays/BooleanDisplay.component";
import { NullDisplay } from "./displays/NullDisplay.component";
import { NumberDisplay } from "./displays/NumberDisplay.component";
import { ObjectDisplay } from "./displays/ObjectDisplay.component";
import { StringDisplay } from "./displays/StringDisplay.component";
import { UndefinedDisplay } from "./displays/UndefinedDisplay.component";
import { WithToolbar } from "./WithToolbar";

export const JsonItem: React.FC<{
  keyName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  depth: number;
  path: string;
}> = ({ keyName, value, depth, path }) => {
  const urlService = useUrlService();
  const { expandedKeys } = useJsonViewer();

  const isOpen = expandedKeys.has(path);

  const padding = `${depth * 20}px`;

  const itemType = Array.isArray(value)
    ? "array"
    : value === null
    ? "null"
    : typeof value;

  const hasHeader = itemType === "array" || itemType === "object";

  let displayValue: React.ReactNode = value;

  switch (itemType) {
    case "null":
      displayValue = <NullDisplay />;
      break;
    case "undefined":
      displayValue = <UndefinedDisplay />;
      break;

    case "string":
      displayValue = (
        <StringDisplay value={value} isUrl={urlService.isUrl(value)} />
      );
      break;
    case "number":
      displayValue = <NumberDisplay value={value} />;
      break;
    case "boolean":
      displayValue = <BooleanDisplay value={value} />;
      break;

    case "array":
      return (
        <ArrayDisplay
          {...{
            value,
            keyName,
            isOpen,
            itemType,
            path,
            depth,
            padding,
          }}
        />
      );
    case "object":
      return (
        <ObjectDisplay
          {...{
            value,
            keyName,
            isOpen,
            itemType,
            path,
            depth,
            padding,
          }}
        />
      );
    default:
      displayValue = value;
  }

  const DisplayContent = (
    <>
      {keyName}: {displayValue}
    </>
  );

  const DisplayComponent = hasHeader ? (
    DisplayContent
  ) : (
    <WithToolbar content={value}>{DisplayContent}</WithToolbar>
  );

  return <div style={{ paddingLeft: padding }}>{DisplayComponent}</div>;
};
