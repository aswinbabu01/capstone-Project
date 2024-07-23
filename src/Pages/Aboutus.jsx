import React from 'react'
import ProductCard from '../components/ProductCard';



function AboutUs() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="mt-5 mb-4 text-center">About Artvista Gallery</h1>
          <p className="text-center">
            Artvista Gallery is dedicated to showcasing the finest art pieces across various genres,
            including abstract, modern, and vintage artworks. Our mission is to promote talented artists
            and provide art enthusiasts with a platform to discover and collect exquisite pieces.
          </p>
          <p className="text-center">
            Located in the heart of [City, Country], Artvista Gallery has been a hub for creativity and
            inspiration since [year established]. We believe in the transformative power of art and strive
            to foster a vibrant community of artists and collectors.
          </p>
          <p className="text-center">
            Explore our collection online or visit our gallery to experience the beauty and diversity of art
            firsthand. Whether you're a seasoned collector or new to the world of art, Artvista Gallery welcomes
            you to join us on a journey of discovery and appreciation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

