import React, { useState } from "react";
import img from "../assets/paymentimg.jpeg";

const RazorpayCheckout2 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(16); // Default minimum amount

  const [success, setSuccess] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!name || !email || !amount) {
      alert("Please fill all fields.");
      return;
    }
    if(amount <16 ){
        alert("Minimum amount is $16");
        return;
    }

    // Simulate payment success
    setSuccess(true);
  };

  

  return (
    <div className="max-w-md mx-auto  p-6 border rounded-lg shadow-md mt-50 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Rasorpay Checkout</h2>
      {success ? (
        <div className="text-green-600 text-center">
           
          <p>✅ Payment of ${amount} successful!</p>
          <p>Thank you, {name} 🎉</p>
        </div>
      ) : (
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label className="block  font-bold text-xl font-mono  ">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xl font-bold font-mono">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-xl font-bold font-mono">Amount ($)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
            />
          </div>
         

           <img  src={img} alt="Success" className="w-90 h-100 mx-auto mb-4" />
            <button
            type="submit"
            
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
          >
            Pay Now
          </button>

          <h5 className="text-red-600 text-center text-xs font-mono  hover:text-blue-600"> Resorpay Service is Unavailable</h5>
        </form>
      )}
    </div>
  );
};

export default RazorpayCheckout2;
