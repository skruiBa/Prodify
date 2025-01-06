export default function PageWrapper({ children }) {
  return (
    <div
      className="text-white w-full flex flex-row bg-background
    items-start align-start justify-items-start min-h-screen p-4 pb-16 gap-12 sm:p-8"
    >
      {children}
    </div>
  );
}
