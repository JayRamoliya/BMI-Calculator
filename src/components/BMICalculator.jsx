// 1. State Management (useState)
// 2. Handling User Input (onChange event)
// 3. BMI Calculation Logic (calculateBMI function)
// 4. Reset Function (resetForm)
// 5. Dark Mode Toggle
// 6. Animations with Framer Motion


// React: The core React library for building the component.
// useState: A React Hook that allows us to manage state in functional components.
// motion & AnimatePresence: These are imported from Framer Motion, a library for animations in React.
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// This defines a functional component called BMICalculator.
const BMICalculator = () => {

  // height and weight: Stores the user's input values.
  // bmi: Stores the calculated BMI.
  // message: Stores the BMI category (Underweight, Normal, Overweight, etc.).
  // darkMode: A boolean that toggles between light and dark mode.
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const calculateBMI = (e) => {
    // Prevents the default form submission behavior.
    e.preventDefault();
    
    // Checks if both height and weight are entered.
    if (height && weight) {

      const bmiValue = (weight / (height * height)).toFixed(2);
      setBMI(bmiValue);
      // Determines the BMI category based on the calculated value.
      if (bmiValue < 18.5) {
        setMessage("Underweight");
      } else if (bmiValue < 24.9) {
        setMessage("Normal weight");
      } else if (bmiValue < 29.9) {
        setMessage("Overweight");
      } else {
        setMessage("Obese");
      }
      // If the user does not enter valid values, it shows an error message.
    } else {
      setMessage("Please enter valid height and weight");
    }
  };

  // Resets the form inputs and clears the result.
  const resetForm = () => {
    setHeight("");
    setWeight("");
    setBMI(null);
    setMessage("");
  };

  return (
    // motion.div: A Framer Motion container with animation effects.
    <motion.div
      className={`w-full max-w-sm p-6 rounded-lg shadow-lg text-center transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      // initial={{ opacity: 0, scale: 0.9 }} → The component starts slightly faded and smaller.
      // animate={{ opacity: 1, scale: 1 }} → Grows to full size smoothly.
      // transition={{ duration: 0.5 }} → Animation duration is 0.5 seconds.
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">BMI Calculator</h1>
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? "🌙" : "☀️"}
        </motion.button>
      </div>

      {/* Form */}
      <form onSubmit={calculateBMI} className="mb-4">
        <div className="mb-4">
          <label className="block text-left font-medium mb-1">
            Height (meters)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
            placeholder="e.g., 1.75"
            required
            aria-label="Height in meters"
          />
        </div>

        <div className="mb-6">
          <label className="block text-left font-medium mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            step="0.1"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
            placeholder="e.g., 70"
            required
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Calculate BMI
        </motion.button>
      </form>

      {/* Animated BMI Result */}
      <AnimatePresence>
        {bmi && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold mt-4">Your BMI: {bmi}</p>
            <p className="text-md mt-2">{message}</p>
            <motion.button
              onClick={resetForm}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BMICalculator;
