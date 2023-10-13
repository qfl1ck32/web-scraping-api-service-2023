import { createContext, useContext } from "react";

interface ContextProps {
  expandedKeys: Set<string>;
  toggleExpand: (key: string) => void;
}

export const JsonViewerContext = createContext<ContextProps | undefined>(
  undefined
);

export const useJsonViewer = () => {
  const context = useContext(JsonViewerContext);
  if (!context) {
    throw new Error("useJsonViewer must be used within a JsonViewerProvider");
  }
  return context;
};
