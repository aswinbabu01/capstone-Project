import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

function Abstract({ data }) {
  const filteredData =  data?data.filter(item => item.Type === "Abstract art"):[];

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

Abstract.propTypes = {
  data: PropTypes.array.isRequired,
};


export default Abstract;
 