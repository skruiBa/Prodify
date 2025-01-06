function SecondaryButton({ children, onClick, type = 'button', className }) {
  return (
    <button
      onClick={onClick}
      type={type} // Add the type prop
      className={`flex flex-row items-center justify-center h-12  w-32 
      font-semibold bg-primary/10 text-white  p-2 gap-2 ${className}`}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
