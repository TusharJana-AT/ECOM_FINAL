import React from "react";

const Contact = () => {
return ( <div className="max-w-4xl mx-auto p-6"> <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

  <p className="text-gray-700 mb-4">
    Have questions or need help? Reach out to us!
  </p>

  <div className="space-y-2 text-gray-700">
    <p><strong>Email:</strong> support@example.com</p>
    <p><strong>Phone:</strong> +91 9876543210</p>
    <p><strong>Address:</strong> Your City, India</p>
  </div>

  <form className="mt-6 space-y-4">
    <input
      type="text"
      placeholder="Your Name"
      className="w-full border p-2 rounded"
    />

    <input
      type="email"
      placeholder="Your Email"
      className="w-full border p-2 rounded"
    />

    <textarea
      placeholder="Your Message"
      className="w-full border p-2 rounded h-32"
    ></textarea>

    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Send Message
    </button>
  </form>
</div>


);
};

export default Contact;
