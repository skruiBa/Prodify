import React, { useState, useRef, useEffect } from 'react';
import TertiaryButton from './TertiaryButton';
import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';
import DotsIcon from '@/assets/dots.svg';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
export default function Submenu({ items, onItemSave, taskId, onReset, initialValues }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [inputValues, setInputValues] = useState(initialValues || {});
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);
  useEffect(() => {
    if (isExpanded && initialValues) {
      setInputValues(initialValues); // Populate with task's existing data
    }
  }, [isExpanded, initialValues]);

  // Menu items handler
  const handleItemClick = (item) => {
    if (item.key === 'delete') {
      onItemSave(item.key, taskId); // Pass the taskId directly for delete
      setIsExpanded(false);
    } else {
      setActiveItem(item); // Set the active item for the modal
      setInputValues((prev) => ({
        ...prev,
        [item.key]: prev[item.key] || '' // Use existing value or default to empty
      }));
    }
  };
  const handleInputChange = (value) => {
    setInputValues((prev) => ({
      ...prev,
      [activeItem.key]: value // Update the value for the active item
    }));
  };
  const handleSave = () => {
    onItemSave(activeItem.key, inputValues);
    setActiveItem(null); // Close the modal
    setIsExpanded(false);
  };

  return (
    <div className="relative ">
      <TertiaryButton
        onClick={() => {
          setActiveItem(null);
          setIsExpanded(!isExpanded);
        }}
        classname=""
      >
        <DotsIcon height={32} width={32} className="hover:fill-primary fill-textColor" />
      </TertiaryButton>

      {isExpanded && (
        <div className="absolute top-10 right-0 flex bg-backgroundlight border border-textColor shadow-lg z-10">
          <ul className="flex">
            {items.map((item, index) => (
              <li key={index} className="w-full">
                <TertiaryButton className="w-full  " onClick={() => handleItemClick(item)}>
                  {item.label}
                </TertiaryButton>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeItem && activeItem.key !== 'delete' && (
        <InputModal
          title={activeItem.modalTitle}
          inputType={activeItem.inputType}
          inputValue={inputValues[activeItem.key]} // Use the stored value
          onInputChange={(e) => handleInputChange(e.target.value)} // Update the value
          onCancel={() => {
            setActiveItem(null);
            setIsExpanded(false);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function InputModal({ title, inputType, inputValue, onInputChange, onCancel, onSave }) {
  const modalRef = useRef(null);

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // onCancel(); // Trigger cancel when clicking outside
        onSave();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div
      ref={modalRef}
      className="absolute top-20 right-0 w-60 bg-backgroundlight p-4 border border-textColor shadow-lg z-20 "
    >
      <div className="flex justify-end mt-3 gap-2 ">
        <TertiaryButton onClick={onSave} className={'w-full'}>
          Save
        </TertiaryButton>
        <TertiaryButton onClick={onCancel} className={'w-full'}>
          Cancel
        </TertiaryButton>
      </div>

      <hr className="my-2 opacity-50" />
      <input
        type={inputType}
        id="input"
        className="w-full  h-20 bg-backgroundlight text-center"
        value={inputValue}
        onChange={onInputChange}
      />
      <hr className="my-2 opacity-50" />
    </div>
  );
}
