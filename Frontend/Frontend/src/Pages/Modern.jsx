import React from 'react'
import ProductCard from '../components/ProductCard';

function Modern({ data }) {
  const filteredData = data?data.filter(item => item.Type === "Modern art"):[];

  return (
    <div>
      <div className="container">
        <div className="row">
          {filteredData.map((item, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <ProductCard product = {item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modern;
