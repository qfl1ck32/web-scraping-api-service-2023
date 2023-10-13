import Image from "next/image";
import { useState } from "react";

import checkmarkSvg from "@app/assets/svgs/checkmark.svg";
import copySvg from "@app/assets/svgs/copy.svg";

interface IWithToolbarProps {
  content: unknown;
  children: React.ReactNode;
}

export const WithToolbar: React.FC<IWithToolbarProps> = ({
  content,
  children,
}) => {
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 4));

    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 1000);
  };

  return (
    <div
      onMouseEnter={() => setShowCopyIcon(true)}
      onMouseLeave={() => setShowCopyIcon(false)}
      style={{
        position: "relative",
        display: "inline-block",
        paddingRight: "20px",
      }}
    >
      {children}
      {showCopyIcon && (
        <span
          onClick={handleCopyClick}
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            cursor: hasCopied ? "auto" : "pointer",
          }}
        >
          <Image
            src={hasCopied ? checkmarkSvg : copySvg}
            alt="Copy"
            width={16}
            height={16}
          />
        </span>
      )}
    </div>
  );
};
