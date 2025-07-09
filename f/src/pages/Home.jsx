import React from 'react';
import {BiCube} from 'react-icons/bi'
import ContactForm from '../components/home/ContactForm';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-blue-500 py-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <BiCube size={30} /> {/* Stock Icon */}
            <span className="text-2xl font-bold">StockSense</span>
          </div>
          <ul className="flex space-x-6">
            <li><a href="#description">Description</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ul><Link to={'/Login'}>          <button className="bg-white text-blue-500 px-4 py-2 rounded-lg">Sign In</button>
</Link>
        </div>
      </nav>

      {/* Landing Section */}
      <section id="landing" className="py-16 bg-gray-100 text-left">
        <div className="container mx-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
        <h1 className="text-4xl font-bold mb-4">Optimize your inventory. Boost Efficiency.</h1>
          <p className="text-lg text-gray-700 mb-6">
            Improve productivity and streamline operations with real-time inventory management
          </p>
          <Link to={'/Register'}> <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Get Started
          </button></Link>
         
        </div>
        <div>
            <img src="\assets\Home\hero.png" alt="Hero"/>
        </div>
        </div>
        </div>
      </section>

      {/* Description Section */}
      <section id="description" className="py-16">
        <div className="container mx-auto text-left">
          <h2 className="text-3xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 text-lg mb-8">
            Introducing StockSense, your solution for real-time inventory management. Located in Thane, MH, we provide businesses with a streamlined approach to efficiently track and control their inventory. With our cutting-edge technology, you can gain instant visibility into stock levels, track product movement, and optimize your supply chain. Say goodbye to stockouts and overstocking, and say hello to increased productivity and profitability. Trust StockSense to take your inventory management to the next level.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            
            <div className=" text-white p-6 rounded-lg shadow" style={F1S}>
              <h3 className="text-xl font-semibold mb-4">Streamline Inventory Tracking</h3>
              <p>Efficiently manage your inventory and track stock levels in real-time.</p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="text-white p-6 rounded-lg shadow" style={F2S}>
              <h3 className="text-xl font-semibold mb-4">Optimize Supply Chain</h3>
              <p>Improve inventory control, minimize stockouts and maximize inventory turnover.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="text-white p-6 rounded-lg shadow" style={F3S}>
                <div > 
              <h3 className="text-xl font-semibold mb-4">Enhanced Demand Planning</h3>
              <p>Accurately forecast demands, reducing holding costs and improve customer satisfaction.</p>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-16 bg-gray-100 text-left">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p>
            Welcome to StockSense, a leading provider of real-time inventory management solutions.
            Located in Thane, MH, our dedicated team of experts is committed to helping businesses optimize their inventory management processes. With our innovative technology and industry knowledge, we empower our clients to streamline operations, reduce costs, and improve overall efficiency.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Connect with Us</h2>
            <p>Use the form below to get in touch with us and learn more about our real-time inventory management solutions. We're here to help you streamline your inventory and boost your bottom line.</p>
          </div>
          <div>
            <ContactForm/>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} StockSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;



const F1S = {
    backgroundImage: 'url("/assets/Home/f1.jpg")', // Replace with the path to your image
    backgroundSize: 'cover', // You can set background size as needed
    backgroundPosition: 'center center', // You can adjust the position
    backgroundRepeat: 'no-repeat', // Prevent background image from repeating
    width: '100%', // Set the width of the div
    height: '300px', // Set the height of the div
  };

  const F2S = {
    backgroundImage: 'url("/assets/Home/f2.jpg")', // Replace with the path to your image
    backgroundSize: 'cover', // You can set background size as needed
    backgroundPosition: 'center center', // You can adjust the position
    backgroundRepeat: 'no-repeat', // Prevent background image from repeating
    width: '100%', // Set the width of the div
    height: '300px', // Set the height of the div
  };
  const F3S = {
    backgroundImage: 'url("/assets/Home/f3.jpg")', // Replace with the path to your image
    backgroundSize: 'cover', // You can set background size as needed
    backgroundPosition: 'center center', // You can adjust the position
    backgroundRepeat: 'no-repeat', // Prevent background image from repeating
    width: '100%', // Set the width of the div
    height: '300px', // Set the height of the div
  };

