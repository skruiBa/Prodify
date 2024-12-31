'use client';
import Button from '../Button';
import { useEffect, useState } from 'react';
import { Slider } from '@mui/material';

export default function VisionInputForm({ onSubmit, editVision = null, onEditSubmit }) {
  const [goal, setGoal] = useState({
    name: '',
    category: '',
    description: '',
    milestones: [],
    deadline: '',
    // pictures: [],
    progress: 0
  });

  const [milestone, setMilestone] = useState('');

  // Set editing vision if present
  useEffect(() => {
    if (editVision) {
      setGoal(editVision);
    } else {
      setGoal({
        name: '',
        category: '',
        description: '',
        milestones: [],
        deadline: '',
        // pictures: [],
        progress: 0
      });
    }
  }, [editVision]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMilestone = (e, AIMilestone = null) => {
    e.preventDefault();
    if (AIMilestone) {
      setGoal((prev) => ({
        ...prev,
        milestones: [...prev.milestones, AIMilestone]
      }));
    } else {
      setGoal((prev) => ({
        ...prev,
        milestones: [...prev.milestones, milestone]
      }));
    }
    setMilestone('');
  };

  // const handlePictureUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   const fileUrls = files.map((file) => URL.createObjectURL(file));
  //   setGoal((prev) => ({
  //     ...prev,
  //     pictures: [...prev.pictures, ...fileUrls]
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal.name.trim()) {
      alert('Goal name is required!');
      return;
    }

    // Differentiate between edit and submit
    if (editVision) {
      onEditSubmit(goal); // Call edit handler
    } else {
      onSubmit(goal); // Call submit handler
    }
  };

  const getAIMilestones = async (e) => {
    e.preventDefault();
    console.log('Generating milestones for ...' + goal.name);

    const prompt = `Generate 1 short milestone for a goal: ${
      goal.name
    }. The user already has milestones: ${goal.milestones.join(
      ', '
    )}. The milestone should be 6 words maximum. Really Specific. General advice.`;
    // Make the request
    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) throw new Error('Failed to fetch response');

      const data = await res.json();
      console.log('Response:', data.completion);
      // setMilestone(data.completion);
      handleAddMilestone(e, data.completion);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const deleteMilestone = (index) => {
    const updatedMilestones = [...goal.milestones];
    updatedMilestones.splice(index, 1);
    setGoal((prev) => ({
      ...prev,
      milestones: updatedMilestones
    }));
  };
  const handleProgress = (e, value) => {
    e.preventDefault();
    setGoal((prev) => ({
      ...prev,
      progress: value
    }));
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-dark-8 rounded shadow-md">
      {/* Goal Name */}
      <div>
        <label htmlFor="name" className="block text-white font-bold mb-1">
          Goal Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={goal.name}
          onChange={handleChange}
          className="w-full p-2 bg-dark-7 text-white border border-dark-6 rounded"
          placeholder="E.g., Become a programmer"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-white font-bold mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={goal.category}
          onChange={handleChange}
          className="w-full p-2 bg-dark-7 text-white border border-dark-6 rounded"
        >
          <option value="">Select a category</option>

          <option value="Physique">Health & Physique</option>
          <option value="Career">Career</option>
          <option value="Projects">Projects</option>
          <option value="Routine">Routine</option>
          <option value="Income">Income</option>
          <option value="Social">Social</option>
          <option value="Mindset">Mindset</option>
          <option value="Purpose">Purpose</option>
          <option value="Health">Health</option>
          <option value="Growth">Personal Growth</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-white font-bold mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={goal.description}
          onChange={handleChange}
          className="w-full p-2 bg-dark-7 text-white border border-dark-6 rounded"
          placeholder="Write a brief description of your goal"
          rows="3"
        ></textarea>
      </div>

      {/* Milestones */}
      <div>
        <label htmlFor="milestones" className="block text-white font-bold mb-1">
          Milestones
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
            className="flex-1 p-2 bg-dark-7 text-white border border-dark-6 rounded"
            placeholder="Add a milestone"
          />
          <div className="flex flex-col">
            <Button type="button" onClick={handleAddMilestone}>
              Add
            </Button>
            <Button type="button" onClick={getAIMilestones}>
              Get AI Help
            </Button>
          </div>
        </div>
        <ul className="mt-2 text-white">
          {goal.milestones.map((ms, index) => (
            <li key={index} className="hover:bg-dark-7 cursor-pointer flex flex-row ">
              • {ms}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
                onClick={() => deleteMilestone(index)}
                className="ml-auto"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </li>
          ))}
        </ul>
      </div>

      {/* Deadline */}
      <div>
        <label htmlFor="deadline" className="block text-white font-bold mb-1">
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={goal.deadline}
          onChange={handleChange}
          className="w-full p-2 bg-dark-7 text-white border border-dark-6 rounded"
        />
      </div>

      {/* Pictures */}
      {/* <div>
        <label htmlFor="pictures" className="block text-white font-bold mb-1">
          Pictures (Motivation)
        </label>
        <input
          type="file"
          id="pictures"
          multiple
          accept="image/*"
          onChange={handlePictureUpload}
          className="w-full p-2 bg-dark-7 text-white border border-dark-6 rounded"
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
          {goal.pictures.map((src, index) => (
            <img key={index} src={src} alt={`Motivation ${index + 1}`} className="w-full h-24 object-cover rounded" />
          ))}
        </div>
      </div> */}

      {/* Progress */}
      <Slider
        color="nothing"
        defaultValue={0}
        value={goal.progress ? goal.progress : 0}
        valueLabelDisplay="auto"
        onChange={handleProgress}
      />

      {/* submit or edit button if editvision is not null */}
      {editVision ? <Button type="submit">Save Changes</Button> : <Button type="submit">Submit Goal</Button>}
    </form>
  );
}
