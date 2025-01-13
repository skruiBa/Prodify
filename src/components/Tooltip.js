import TooltipIcon from '@/assets/tooltip.svg';

const Tooltip = ({ text }) => {
  return (
    <div className="relative group">
      <button className="p-4 bg-transparent">
        <TooltipIcon />
      </button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-backgroundlight text-white text-sm px-3 py-2 rounded shadow-lg w-40">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
