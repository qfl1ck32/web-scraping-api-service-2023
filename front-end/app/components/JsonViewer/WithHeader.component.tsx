import Image from "next/image";

import DownArrow from "@app/assets/svgs/down-arrow.svg";
import RightArrow from "@app/assets/svgs/right-arrow.svg";

import { useJsonViewer } from "./context";
import { formatItemCount } from "./utils";
import { WithToolbar } from "./WithToolbar";

export const WithHeader: React.FC<{
  keyName: string;
  isOpen: boolean;
  itemCount: number;
  itemType: string;
  path: string;
  value: unknown;
  children: React.ReactNode;
}> = ({ keyName, isOpen, itemCount, itemType, path, children, value }) => {
  const { toggleExpand } = useJsonViewer();

  return (
    <div className="relative text-gray-800">
      <div className="flex ">
        <div
          className="cursor-pointer mr-1 mt-1"
          style={{
            marginLeft: "-7px",
          }}
          onClick={() => toggleExpand(path)}
        >
          <Image
            height={16}
            width={16}
            src={isOpen ? DownArrow : RightArrow}
            alt={isOpen ? "⬇️" : "➡️"}
          />
        </div>
        <div>
          <WithToolbar content={value}>
            {`"${keyName}"`}:
            {itemType === "array" ? " [" : itemType === "object" ? " {" : " "}{" "}
            {!isOpen && ` ... ${itemType === "array" ? "]" : "}"}`}{" "}
            <span className="text-gray-600 text-xs">
              {formatItemCount(itemCount)}
            </span>
          </WithToolbar>
        </div>
      </div>

      <div className={isOpen ? "border-l-2 border-gray-300" : "hidden"}>
        {children}
      </div>

      <div>{isOpen && (itemType === "array" ? "]" : "}")}</div>
    </div>
  );
};
