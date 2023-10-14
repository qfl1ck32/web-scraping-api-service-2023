import Image from "next/image";
import React, { useState, useCallback } from "react";

import exportSvg from "@app/assets/svgs/export.svg";
import { Button } from "@app/components/Button/Button.component";

import { JsonViewerContext } from "./context";
import { JsonItem } from "./JsonItem.component";

interface IJsonViewerProps {
  data: unknown;

  toolbar?: Partial<IJsonViewerToolbarProps>;
}

interface IJsonViewerToolbarProps {
  onExport?: () => void;
}

const JsonViewerToolbar: React.FC<IJsonViewerToolbarProps> = ({ onExport }) => {
  return (
    <div className="absolute top-4 right-4 space-x-4">
      {onExport && (
        <Button
          onClick={onExport}
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 text-xs shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Image src={exportSvg} alt="" width={16} height={16} />
          <span className="ml-2">Export</span>
        </Button>
      )}
    </div>
  );
};

export const JsonViewer: React.FC<IJsonViewerProps> = ({ data, toolbar }) => {
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
      <div className="relative bg-blue-50 p-10 rounded-xl shadow-xl overflow-y-auto overflow-x-auto">
        {toolbar && <JsonViewerToolbar {...toolbar} />}

        <div className="max-w-[90vw] min-w-[300px]">
          <JsonItem keyName="root" value={data} depth={0} path="root" />
        </div>
      </div>
    </JsonViewerContext.Provider>
  );
};
