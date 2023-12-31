'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { toast } from 'sonner';

const Addtodo = () => {
  const [formData, setFormData] = useState({ title: '', name: '', category: '', description: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Success:', data);
      toast.success('Todo created!');

      // Reset the form
      setFormData({
        title: "",
        name: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-white text-black container my-10 mx-auto p-5 md:p-10">
        <h1 className="text-3xl font-bold mb-4">Add a new task/todo</h1>
        <div className="flex flex-col md:flex-row">
          {/* Left Container with Image */}
          <div className="md:w-1/3 relative sm:mb-10">
            <div className="pt-14 pb-6 md:pb-0 w-full h-64 md:h-80 lg:h-96">
              <Image
                src="https://images.pexels.com/photos/6027785/pexels-photo-6027785.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Background Image"
                height={300}
                width={300}
                className="w-full md:w-auto border rounded h-full object-cover"
              />
            </div>
          </div>
          {/* Right Side Contact Form */}
          <div className="md:w-2/3 mt-4 md:mt-0 sm:mt-12">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:mt-4" onSubmit={handleSubmit} >
              <div className="grid grid-cols-2 mt-4">
                <div className="col-md-4 mr-2">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="title" >Title</label>
                  <input className=" bg-white text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Title" name="title" id="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className="col-md-4 ml-2">
                  <label className="block text-black text-sm font-bold mb-2" htmlFor="name">Author Name</label>
                  <input className=" bg-white text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Alex Jones" name="name" id="name" value={formData.name} onChange={handleChange} />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="category">Category</label>
                <select className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" name="category" id="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select an option</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Reminder">Reminder</option>
                  <option value="Studying">Studying</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Banking">Banking</option>
                  {/* Add more generic values as needed */}
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="description">Description:</label>
                <textarea className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" placeholder="Description" name="description" id="description" rows={8} value={formData.description} onChange={handleChange} />
              </div>
              <div className="flex justify-center mt-4">
                <motion.button
                  whileHover={{ scale: 1.1, border: '1px solid white' }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-black text-white border rounded-md px-3 py-1"
                  type="submit"
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Addtodo;
