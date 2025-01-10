function TertiaryButton({ children, onClick, type = 'button', className }) {
  return (
    <button
      onClick={onClick}
      type={type} // Add the type prop
      className={`flex flex-row items-center justify-center w-auto hover:text-primary
          h-12  font-semibold  bg-transparent text-white p-2 gap-2 ${className}`}
    >
      {children}
    </button>
  );
}

export default TertiaryButton;
