import { JsonItem } from "../JsonItem.component";
import { WithHeader } from "../WithHeader.component";

export const ObjectDisplay: React.FC<{
  value: Record<string, any>;
  padding: string;
  keyName: string;
  isOpen: boolean;
  itemType: string;
  path: string;
  depth: number;
}> = ({ value, padding, keyName, isOpen, itemType, path, depth }) => {
  const objectKeys = Object.keys(value);

  return (
    <div style={{ paddingLeft: padding }}>
      <WithHeader
        keyName={keyName}
        isOpen={isOpen}
        itemCount={objectKeys.length}
        itemType={itemType}
        path={path}
        value={value}
      >
        {objectKeys.map((key) => (
          <JsonItem
            key={key}
            keyName={key}
            value={value[key]}
            depth={depth + 1}
            path={`${path}.${key}`}
          />
        ))}
      </WithHeader>
    </div>
  );
};
