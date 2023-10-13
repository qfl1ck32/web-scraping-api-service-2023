export const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
      <div
        style={{
          animation: "spin 1s linear infinite",
          borderTopColor: "#3498db",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
        className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4 animate-spin"
      ></div>
    </div>
  );
};
