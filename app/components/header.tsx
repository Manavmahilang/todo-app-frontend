"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Searchbar from './searchbar';

const Header = () => {
    return (
      <header className="bg-slate-600 p-4 flex items-center justify-between">
        {/* Home Button */}
        <Link href="/">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" text-white border border-slate-400 px-4 py-2 rounded-md hover:bg-slate-500 hover:text-gray-100 border-opacity-20"
        >
          Home
        </motion.button>
        </Link>
  
        {/* Search Bar */}
        <Searchbar />
  
        {/* Login Button */}
        <Link href="/Addtodo">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white border border-slate-400 px-4 py-2 rounded-md hover:bg-slate-500 hover:text-gray-100 border-opacity-20">
          Add Todo
        </motion.button>
        </Link>
      </header>
    );
  };
  
  export default Header;