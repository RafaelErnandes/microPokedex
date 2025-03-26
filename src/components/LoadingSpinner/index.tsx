export const LoadingSpinner = () => (
  <div className="flex justify-center items-center w-full h-full absolute top-30 left-0">
    <span
      className="material-icons animate-spin text-primary text-6xl"
      style={{ fontSize: "4rem" }}
    >
      refresh
    </span>
  </div>
);
