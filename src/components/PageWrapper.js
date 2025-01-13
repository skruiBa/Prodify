export default function PageWrapper({ children }) {
  return (
    <div
      className="text-white  flex flex-col bg-background
     w-full  mx-auto custom-800:w-2/3 custom-1024:w-2/4 custom-1600:w-2/5
    items-center align-center justify-items-center max-h-screen p-6 pb-16 gap-12 "
    >
      {children}
    </div>
  );
}
