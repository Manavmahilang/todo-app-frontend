'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';


interface UpdateFormProps {
    initialId:number
    initialTitle: string;
    initialDescription: string;
    onClose: () => void; 
  }
  
  const UpdateForm: React.FC<UpdateFormProps> = ({ initialId, initialTitle, initialDescription, onClose }) => {
    const [id,setId] = useState(initialId);
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        if (initialId) {
          const response = await fetch(`http://localhost:3000/todos/${initialId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
          });
  
          if (!response.ok) {
            toast.error('Failed to update post:');
            throw new Error(`Failed to update post: ${response.statusText}`);
            
          }
          toast.success('Todo Updated');
          router.push('/');
        } else {
          console.log('ID is missing or undefined');
          toast.error('ID is missing or undefined');
        }
      } catch (err) {
        console.error(err);
        toast.error
      }
   };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          // Use HTMLTextAreaElement instead of HTMLInputElement
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Post
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
