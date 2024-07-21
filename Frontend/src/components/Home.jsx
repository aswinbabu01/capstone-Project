import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import axios from 'axios';


function Home({data}) {
 
  return (
    <div>
 <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav m-5">
              <li className="nav-item">
                <Link className="nav-link text-decoration-none fs-3 mx-5" to="/allpaintings">All paintings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-decoration-none  fs-3  mx-5" to="/abstract">Abstract</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-decoration-none  fs-3  mx-5"to="/modern">Modern</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-decoration-none  fs-3 mx-5" to="/vintage">Vintage</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-decoration-none  fs-3 mx-5" to="/about">About us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="Banner">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/src/assets/Banner.jpg"
                className="d-block w-100"
                alt="Banner"
                style={{ height: "20%" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
        {data&&data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
