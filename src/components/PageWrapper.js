export default function PageWrapper({ children }) {
  return (
    <div
      className="text-white  flex flex-col bg-background
     w-1/2
    items-center align-center justify-items-center max-h-screen p-6 pb-16 gap-12 "
    >
      {children}
    </div>
  );
}
