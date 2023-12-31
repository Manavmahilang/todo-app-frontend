'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter} from 'next/navigation';
import { toast } from 'sonner';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Searchbar() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos?title=${searchTerm}`);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        toast.error('Error fetching data')
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchConfirm = (id: number) => {
    if (todos.length > 0) {
      const foundTodo = todos.find((todo) => todo.id === id);
      
      if (foundTodo) {
        console.log('Selected todo id:', id);
        router.push(`/Details/${id}?id=${id}`);
        setSearchTerm('');
      } else {
        console.log('Todo not found with the entered id:', id);
        toast.error('Todo not found please check spelling(case sensitive)')
      }
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 mx-4 flex items-center justify-center"
    >
      <motion.input
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        type="text"
        placeholder="Find todo"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-80% py-2 px-4 rounded-md bg-gray-700 text-white"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          if (todos.length > 0) {
            const foundTodo = todos.find((todo) => todo.title === searchTerm);

            if (foundTodo) {
              handleSearchConfirm(foundTodo.id);
            } else {
              console.log('Todo not found with the entered title:', searchTerm);
            }
          }
        }}
        className="ml-2  text-white border border-slate-400 px-4 py-2 rounded-md hover:bg-slate-500 hover:text-gray-100 border-opacity-20"
      >
        Search
      </motion.button>
    </motion.div>
  );
}