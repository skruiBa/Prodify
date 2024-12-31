export default function PageWrapper({ children }) {
  return (
    <div
      className="text-white  w-1/1.2 flex flex-col bg-background
    items-center align-center justify-items-center min-h-screen p-4 pb-16 gap-12 sm:p-8"
    >
      {children}
    </div>
  );
}
