import Image from "next/image";
import { useCallback, useState } from "react";

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
  const [showIcons, setShowIcons] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 4));

    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 1000);
  }, []);

  return (
    <div
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      style={{
        position: "relative",
        display: "inline-block",
        paddingRight: "30px",
      }}
    >
      {children}
      {showIcons && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            display: "flex",
            gap: "10px",
          }}
        >
          <span
            onClick={handleCopyClick}
            style={{
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
        </div>
      )}
    </div>
  );
};
