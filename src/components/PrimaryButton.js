function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center justify-center font-semibold bg-primary text-black rounded-md p-2 gap-2"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
