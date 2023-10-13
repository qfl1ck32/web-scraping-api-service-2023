import Image from "next/image";

import closeSvg from "@app/assets/svgs/close.svg";

export interface IModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-600 opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-xl p-6 max-w-xl w-full z-10">
        {title && (
          <h2 className="text-2xl mb-4 text-center text-gray-800 font-semibold">
            {title}
          </h2>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 transform transition-transform duration-300 hover:scale-110"
          aria-label="Close Modal"
        >
          <Image src={closeSvg} alt="Close Modal" width={24} height={24} />
        </button>
        {children}
      </div>
    </div>
  );
};
