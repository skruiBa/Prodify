function SecondaryButton({ children }) {
  return (
    <button className="flex flex-row items-center justify-center font-semibold bg-primary/10 text-white rounded-md p-2 gap-2">
      {children}
    </button>
  );
}

export default SecondaryButton;
