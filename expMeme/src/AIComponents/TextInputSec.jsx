import React from 'react';
import { motion } from 'framer-motion';

// Define inputVariants locally or import them from a constants file
const inputVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 0.7, type: "spring", stiffness: 60 } },
};

function TextInputSec({ inputText, setInputText }) {
  return (
   <motion.div
      className="mt-auto  flex  w-150 justify-baseline align-bottom"
      variants={inputVariants}
      initial="hidden"
      animate="visible"
    >
      <input
        className="w-full bg-[#40414f] text-white p-4 rounded-md border border-[#565869] focus:outline-none"
        placeholder="Enter your meme idea..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </motion.div>

  );
}

export default TextInputSec;