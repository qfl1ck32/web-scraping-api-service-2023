export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  className = "",
  ...props
}) => (
  <button
    onClick={onClick}
    className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transform transition-all duration-200
                 hover:bg-blue-600 
                 active:bg-blue-700 active:shadow-inner 
                 focus:outline-none focus:ring-2 focus:ring-blue-300
                 ${className}`}
    {...props}
  >
    {children}
  </button>
);
