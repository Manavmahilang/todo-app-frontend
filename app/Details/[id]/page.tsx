'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {motion} from 'framer-motion';
import UpdateForm from '@/app/components/edittodoform';

interface Todo {
  id: number;
  title: string;
  name: string;
  category:string;
  description:string;
}

const TodoDetails = () => {
  const searchparams = useSearchParams();
  const findid = searchparams?.get('id');
  const id = findid ? JSON.parse(findid) : null;
  const [todoDetails, setTodoDetails] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false); 
  const router = useRouter();


  const categoryImageMap: Record<string, string> = {
    Nutrition: 'https://images.pexels.com/photos/940302/pexels-photo-940302.jpeg?auto=compress&cs=tinysrgb&w=600',
    Fitness: 'https://images.pexels.com/photos/221247/pexels-photo-221247.jpeg?auto=compress&cs=tinysrgb&w=600',
    Banking: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=600',
    Reminder: 'https://images.pexels.com/photos/1059383/pexels-photo-1059383.jpeg?auto=compress&cs=tinysrgb&w=600',
    Studying: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=600',
    Pickup: 'https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=600',
  };

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        if (id) {
          console.log('Fetching todo details for ID:', id);

          const response = await fetch(`http://localhost:3000/todos/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch todo details: ${response.statusText}`);
          }

          const data = await response.json();
          setTodoDetails(data);
        } else {
          console.log('ID is missing or undefined');
        }
      } catch (error: any) {
        console.error('Error fetching todo details:', (error as Error).message);
      }
    };

    fetchTodoDetails();
  }, [id]);
  const handleDelete = async () => {
    try {
      if (id) {
        console.log('Deleting todo with ID:', id);

        // Perform the delete request
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete todo: ${response.statusText}`);
        }

        // Redirect to the home page after successful delete
        router.push('/');
      } else {
        console.log('ID is missing or undefined');
      }
    } catch (error: any) {
      console.error('Error deleting todo:', (error as Error).message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEditForm = () => {
    setIsEditing(false);
  };

  if (!todoDetails) {
    return <div>Loading...</div>;
  }

  const {title, name, description, category } = todoDetails;
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md p-8 rounded-lg">
        <img src={categoryImageMap[category] || 'https://images.pexels.com/photos/6027785/pexels-photo-6027785.jpeg?auto=compress&cs=tinysrgb&w=600'}
         alt='alt' className="w-full h-auto object-cover mb-4" />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">By  {name}</p>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex mt-4 justify-end space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-black border rounded-md px-3 py-1"
            onClick={handleEdit} // Open the edit form
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, border: '1px solid white' }}
            whileTap={{ scale: 0.9 }}
            className="bg-black text-white border rounded-md px-3 py-1"
            onClick={handleDelete}
          >
            Delete
          </motion.button>
        </div>
      </div>
      {/* Conditionally render the Edit form */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <UpdateForm
            initialId={id}
            initialTitle={title}
            initialDescription={description}
            onClose={handleCloseEditForm} // Close the edit form
          />
        </div>
      )}
    </div>
  );
};

export default TodoDetails;