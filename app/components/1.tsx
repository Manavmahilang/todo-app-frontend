'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';


interface Todo {
  id: number;
  title: string;
  name: string;
  category:string;
  description:string;
}


const Todobox = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch data from the Nest API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4" >
    {todos.map((todo) => (
      <Link href={{ pathname: `/Details/${todo.id}`, query: { id: JSON.stringify(todo.id) } }} key={todo.id}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: +100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-md shadow-md mx-5 relative"
          
        >
          <img
            src="https://media.istockphoto.com/id/1251044352/photo/loading-the-container-in-the-cargo-airplane.jpg?s=612x612&w=0&k=20&c=6G_RG9oepmELAqXEtjAh7N9x8_b2krD0cs3hMzps8Q0="
            alt="Todo Image"
            className="mb-4"
          />

          <div className="border-b-2 border-gray-300 mb-4"></div>

          <div>
            <p className="text-lg font-semibold">{todo.title}</p>
            <p className="text-gray-600 text-sm">By {todo.name}</p>
          </div>
        </motion.div>
      </Link>
    ))}
  </div>
);
};
export default Todobox;