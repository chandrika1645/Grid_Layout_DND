// JobDetailsTemplate.jsx
import React from 'react';
import '../Styles/Card.css';

const Card = ({ fields, onDragStart }) => {
  return (
    <div draggable={true} onDragStart={onDragStart} className='Card-component'>
      {fields.map((field, index) => (
        <div key={index}>
          <p style={field.isTitle ? { fontWeight: 'bold' } : {}}>{field.label}: {field.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
