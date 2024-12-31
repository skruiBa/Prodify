'use client';

import Button from '@/components/Button';
import VisionDropDown from '@/components/Vision/VisionDropDown';
import PageWrapper from '@/components/PageWrapper';
import { useAuth } from '../lib/authContext';
import { useEffect, useState } from 'react';
import VisionInputForm from '@/components/Vision/VisionInputForm';
import { fsListenToVisions, fsAddVision, fsDeleteVision, fsUpdateVision } from '../lib/firestore';
import TopNavbar from '@/components/TopNavbar';
export default function Vision() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [visions, setVisions] = useState([]);
  const [editVision, setEditVision] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fsListenToVisions(user.uid, (updatedVisions) => setVisions(updatedVisions));
      return () => {
        console.log('Unsubscribing from Firestore listener');
        if (typeof unsubscribe === 'function') {
          unsubscribe(); // Properly clean up listener
        }
      };
    }
  }, [user]);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev); // Toggle the form visibility
  };

  // Toggle edit form visibility ON
  const onEditClick = (vision) => {
    console.log('Editing vision:', vision);
    setEditVision(vision);
    // setVisions((prevVisions) => prevVisions.filter((v) => v.id !== vision.id));
    toggleFormVisibility();
  };

  // Toggle submit vision form OFF
  const onVisionSubmit = async (vision) => {
    console.log('Submitting vision:', vision);
    await fsAddVision(user.uid, vision);
    toggleFormVisibility();
  };

  // Toggle submit edit vision form OFF
  const onEditSubmit = async (vision) => {
    console.log('Finished editing vision:', vision);
    await fsUpdateVision(user.uid, vision.id, vision);
    setEditVision(null);
    toggleFormVisibility();
  };

  const onCompleteClick = async (vision) => {
    console.log('Completed Vision:', vision);
    await fsUpdateVision(user.uid, vision.id, { ...vision, progress: 100 });
  };

  return (
    <>
      <TopNavbar />

      <PageWrapper>
        {/* Button to toggle VisionInputForm */}
        <Button onClick={toggleFormVisibility}>{isFormVisible ? 'Cancel' : 'New Vision'}</Button>

        {/* Conditionally render upper content: VisionInputForm */}
        {isFormVisible && (
          <div className="mt-4">
            <VisionInputForm
              onSubmit={onVisionSubmit}
              editVision={editVision ?? null}
              onEditSubmit={(vision) => onEditSubmit(vision)}
            />
          </div>
        )}

        {/* Conditionally render bottom content: List of Vision goals */}
        {!isFormVisible && (
          <div className="w-full">
            {/* List of Vision goals */}
            <h1 className="text-4xl font-bold">Goals List</h1>
            {visions.map((vision) => (
              <VisionDropDown
                key={vision.id}
                vision={vision}
                onEditClick={() => onEditClick(vision)}
                onCompleteClick={() => onCompleteClick(vision)}
                onRemoveClick={() => {
                  fsDeleteVision(user.uid, vision.id);
                  setVisions((prevVisions) => prevVisions.filter((v) => v.id !== vision.id));
                }}
              />
            ))}
          </div>
        )}
      </PageWrapper>
    </>
  );
}
