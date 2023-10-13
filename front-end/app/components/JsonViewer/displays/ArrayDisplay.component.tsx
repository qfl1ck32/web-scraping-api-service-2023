import { JsonItem } from "../JsonItem.component";
import { WithHeader } from "../WithHeader.component";

export const ArrayDisplay: React.FC<{
  value: unknown[];
  keyName: string;
  isOpen: boolean;
  itemType: string;
  path: string;
  depth: number;
  padding: string;
}> = ({ value, keyName, isOpen, itemType, path, padding, depth }) => {
  return (
    <div style={{ paddingLeft: padding }}>
      <WithHeader
        keyName={keyName}
        isOpen={isOpen}
        itemCount={value.length}
        itemType={itemType}
        path={path}
        value={value}
      >
        {value.map((item: unknown, index: number) => (
          <JsonItem
            key={index}
            keyName={`${index}`}
            value={item}
            depth={depth + 1}
            path={`${path}.${index}`}
          />
        ))}
      </WithHeader>
    </div>
  );
};
