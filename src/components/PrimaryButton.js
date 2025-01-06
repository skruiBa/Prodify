function PrimaryButton({ children, onClick, type = 'button', className }) {
  return (
    <button
      onClick={onClick}
      type={type} // Add the type prop
      className={`flex flex-row items-center justify-center w-32
        h-12  font-semibold  bg-primary text-black p-2 gap-2 ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
