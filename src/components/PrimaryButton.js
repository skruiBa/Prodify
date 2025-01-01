function PrimaryButton({ children }) {
  return (
    <button className="flex flex-row items-center justify-center font-semibold bg-primary text-black rounded-md p-2 gap-2">
      {children}
    </button>
  );
}

export default PrimaryButton;
