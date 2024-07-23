import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';


function Allpaintings({ data }) {
  useEffect(() => {
    console.log('Allpaintings data:', data);
  }, [data]);

  return (
    <div>
      <div className="container">
        <div className="row">
        {data&&data.map((item, index) => (
        
            <div className="col-md-6 mb-4" key={index}>
              <ProductCard product = {item} />
            </div>         
        ))}
    </div>
    </div>
    </div>
  );
}

export default Allpaintings;
