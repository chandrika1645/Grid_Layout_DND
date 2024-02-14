import React from 'react'
import '../Styles/Table.css'

const Table = ({fields}) => {
  
  const handleDragStart = (e) => {

    console.log("Dragging");


    const Data = {
      type: 'table',
      fields: fields,
      w: 6,
      h:6,
      minH: 6,
      minW: 4,
    };

    e.dataTransfer.setData('text/plain', JSON.stringify(Data))
  }



  return (
    
    <table draggable={true}
    onDragStart={handleDragStart}
    className="appliance-table">
      <thead>
        <tr>
          {fields.thead.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fields.tbody.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    
  )
};


Table.defaultProps = {
  fields : { 

    thead: ['Appliances', 'Quality', 'Circuit Style'],
    
    tbody:[
    { Appliances: 'Bells', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Horns', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Chimes', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Strobes', Quantity: '', 'Circuit Style': '' },
    { Appliances: 'Speakers', Quantity: '', 'Circuit Style': '' },
    ],


  }
};

export default Table