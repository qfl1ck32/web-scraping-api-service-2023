import React, { useState, useCallback } from "react";

import { JsonViewerContext } from "./context";
import { JsonItem } from "./JsonItem.component";

interface JsonViewerProps {
  data: unknown;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    new Set(["root"])
  );

  const toggleExpand = useCallback(
    (key: string) => {
      const newExpandedKeys = new Set(expandedKeys);
      if (newExpandedKeys.has(key)) {
        newExpandedKeys.delete(key);
      } else {
        newExpandedKeys.add(key);
      }
      setExpandedKeys(newExpandedKeys);
    },
    [expandedKeys]
  );

  return (
    <JsonViewerContext.Provider value={{ expandedKeys, toggleExpand }}>
      <div className="bg-blue-50 p-10 rounded-xl shadow-xl overflow-y-auto overflow-x-auto">
        <div className="max-w-[90vw] min-w-[300px]">
          <JsonItem keyName="root" value={data} depth={0} path="root" />
        </div>
      </div>
    </JsonViewerContext.Provider>
  );
};
