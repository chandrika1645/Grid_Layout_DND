// import '/node_modules/react-grid-layout/css/styles.css'
// import '/node_modules/react-resizable/css/styles.css'
// import GridLayout from "react-grid-layout";
// import React, {Component} from 'react'
// import '../Styles/Grid.css'

// class Grid extends Component{

//   constructor(props) {
//     super(props);
//     this.state = {
//       layout: [
//         { i: 'button', x: 0, y: 0, w: 1, h: 2, static: true },
      
//       ],
      

//       dynamicComponents: [] // New state for dynamically added components
//     };
//   }



//   handleAddComponent = () => {
//     // Add a new dynamically created component
//     const newComponentId = `dynamic-${this.state.dynamicComponents.length+ 1}`;

//     this.setState((prevState) => ({
//       layout: [
//         ...prevState.layout,
//         {
//           i: newComponentId,
//           x: 0,
//           y: 0,
//           w: 12,
//           h: 3
//         }
//       ],
//       dynamicComponents: [
//         ...prevState.dynamicComponents,
//         { id: newComponentId, width: 1, height: 2 }
//       ]
//     }));

//   };

//   handleDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
//     // Update the state with the new position (x and y) of the grid item
//     this.setState(prevState => ({
//       layout: prevState.layout.map(item => {
//         if (item.i === newItem.i) {
//           // Update x and y values for the dragged grid item
//           return {
//             ...item,
//             x: newItem.x,
//             y: newItem.y
//           };
//         }
//         return item;
//       })
//     }));
//   };
  

//   handleResize = (layout) => {
//     // Update the size of dynamic components in state when resized
//     const dynamicComponents = layout
//       .filter((item) => !item.static)
//       .map((dynamicComponent) => ({
//         id: dynamicComponent.i,
//         // x: dynamicComponent.x,
//         // y:dynamicComponent.y,
//         width: dynamicComponent.w,
//         height: dynamicComponent.h
//       }));

//     this.setState((prevState) => ({
//       dynamicComponents,
//       layout: prevState.layout.map((item) =>
//         item.static
//           ? item // Keep static components unchanged
//           : layout.find((dynamicItem) => dynamicItem.i === item.i) || item
//       )
//     }));
//   };




  



//     render() {

//       const { layout, dynamicComponents } = this.state;
      

//         return (
//             <GridLayout
//               className="layout"
//               layout={layout}
//               cols={12}
//               rowHeight={30}
//               width={1200}
//               onResizeStop={this.handleResize}
//               onDragStop={this.handleDragStop}
//             >
//               <div key="button">
//                 <button onClick={this.handleAddComponent}>Add Component</button>
//               </div>
              

//               {dynamicComponents.map((dynamicComponent) => (
//                 <div key={dynamicComponent.id} className="dynamic-component">
//                   +
//                 </div>
//               ))}

//             </GridLayout>
//         );
//     }
// }

// export default Grid;

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import '../Styles/Grid.css'
import '../Styles/JobDetails.css'
import Table from './Table';
import Card from '../BluePrint/Card';
import download from 'downloadjs';

// import { saveAs } from 'file-saver';



const ResponsiveGridLayout = WidthProvider(Responsive);

class Grid extends Component {

  

  constructor(props) {
    super(props);
    this.state = {
      layout: [
        {
          i:"a",
          x:0,
          y:0,
          w:12,
          h:1,
          static: true,
        }
      ],             //define our grid items and pass them as prop
      dynamicComponents: [], // New state for dynamically added components
      componentData: {},
    };
  }

  onDrop = (layout, layoutItem, event) => {

    console.log('onDrop called');
    event.preventDefault();

    const droppedData = event.dataTransfer.getData('text/plain');
    
    if (droppedData) {


      
      const Data = JSON.parse(droppedData);

      const { minH, minW, w, h , fields, type} = Data;
      const {x,y} = layoutItem;
      
      
      
      const newComponentId = `dynamic-${this.state.dynamicComponents.length + 1}`;
      

      const newComponent = {
        i: newComponentId,
        x,
        y,
        w,
        h,
        minH,
        minW,
        fields,
        type,
      };
     

      const updatedComponentData = {
        ...this.state.componentData,
        [newComponentId]: Data 
      };

      console.log('Updated Component data', updatedComponentData);

      this.setState((prevState) => ({
        layout: [...prevState.layout, newComponent],
        dynamicComponents: [...prevState.dynamicComponents, newComponent],
        componentData: updatedComponentData,
        
      }));
    }else{
      console.log('No dropped data found');
    }
  };

  

  renderDynamicComponent = (dynamicComponent) => {
    const { componentData } = this.state;

    // switch (dynamicComponent.type){
    //   case 'card' :
    //     const { fields } = componentData[dynamicComponent.i];
        
    //     return <Card fields={fields} />;
    //     // return (
        
    //     //   <div className="component-data">
    //     //     {fields.map((field, index) => (

    //     //     field.isTitle ? (
    //     //       <p key={index} style={{ fontWeight: 'bold' }}>{field.value}</p>
    //     //     ) : (
    //     //       <p key={index}>{`${field.label}: ${field.value}`}</p> )
    //     //     ))}
    //     //   </div>

    //     // );

    //   case 'image':
    //     return(
    //       <img src={componentData[dynamicComponent.i].imageUrl} alt="logo" />
    //     )
      
      

    //   case 'table':
    //     return (
          
    //       <Table thead={componentData[dynamicComponent.i].thead} tbody={componentData[dynamicComponent.i].tbody} />
          
    //     );
      
    //   default:
    //     return null;
    // }
    


    if (componentData[dynamicComponent.i]) {
      switch (dynamicComponent.type) {
        case 'card':
          const { fields } = componentData[dynamicComponent.i];
          return <Card fields={fields} />;
        case 'image':
          return <img src={componentData[dynamicComponent.i].imageUrl} alt="logo" />;
        case 'table':
          const { thead, tbody } = componentData[dynamicComponent.i];
          return <Table thead={thead} tbody={tbody} />;
        default:
          return null;
      }
    } else {
      return null;
    }


  };

  handleResize = (layout) => {
    // Update the size of dynamic components in state when resized
    const updatedDynamicComponents = layout.map((item) => {
      const dynamicComponent = this.state.dynamicComponents.find(
        (comp) => comp.i === item.i
      );
      if (dynamicComponent) {
        return {
          ...dynamicComponent,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        };
      }
      return null;
    });
  
    const filteredDynamicComponents = updatedDynamicComponents.filter(
      (comp) => comp !== null
    );
  
    this.setState({
      dynamicComponents: filteredDynamicComponents,
      layout,
    });
  };

  

  handleDrag = (layout) => {
    // Update the position of dynamic components in state when dragged
    const updatedDynamicComponents = layout.map((item) => {
      const dynamicComponent = this.state.dynamicComponents.find(
        (comp) => comp.i === item.i
      );
      if (dynamicComponent) {
        return {
          ...dynamicComponent,
          x: item.x,
          y: item.y,
        };
      }
      return null;
    });
  
    const filteredDynamicComponents = updatedDynamicComponents.filter(
      (comp) => comp !== null
    );
  
    this.setState({
      dynamicComponents: filteredDynamicComponents,
    });
  };

  SaveHTMLandCSS = () => {
    console.log("save html and CSS called");
    const { dynamicComponents, componentData } = this.state;
    console.log("the data is ", dynamicComponents);
    let html = '';
    let css = '';

    dynamicComponents.forEach(dynamicComponent => {
      const { x, y, w, h, i, type } = dynamicComponent;
      const component = componentData[i];

      switch (type) {
        case 'card':
          html += `<div class="dynamic-component" style="grid-area: ${y } / ${x } / span ${h} / span ${w};">${Card(component.fields)}</div>`;
          // You might need to adjust Card component rendering based on your actual implementation
          break;
        case 'image':
          html += `<img src="${component.imageUrl}" alt="image" style="grid-area: ${y } / ${x } / span ${h} / span ${w};" />`;
          break;
        case 'table':
          html += `<div class="dynamic-component" style="grid-area: ${y } / ${x} / span ${h} / span ${w};">${Table(component.thead, component.tbody)}</div>`;
          // You might need to adjust Table component rendering based on your actual implementation
          break;
        // Add cases for other component types as needed
        default:
          break;
      }

      // Generate CSS for each component
      css += `.dynamic-component-${i} { grid-area: ${y} / ${x} / span ${h} / span ${w}; }\n`;
    });

    // Combine HTML and CSS
    const htmlAndCss = `<html><head><style>${css}</style></head><body>${html}</body></html>`;

    download(htmlAndCss, 'components.html', 'text/html');
  
   
  };

  
  render() {
    const { layout, dynamicComponents } = this.state;
    console.log("Layout data:" ,layout);
    console.log("Dynamic components:", dynamicComponents);
    

    return (  
      <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: this.state.layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      onResizeStop={this.handleResize}
      onDragStop={this.handleDrag}
      isResizable={true}
      isDroppable={true}
      onDrop={this.onDrop}
      onDragOver={(e) => e.preventDefault()}

      >
        <button key='a' className="pdf-button" onClick={this.SaveHTMLandCSS}> Save HTML and CSS </button>

        {dynamicComponents && dynamicComponents.length > 0 ?(
        dynamicComponents.map((dynamicComponent) => (
          <div
            key={dynamicComponent.i}
            className="dynamic-component"
            data-grid={{ x: dynamicComponent.x, y: dynamicComponent.y, w: dynamicComponent.w, h: dynamicComponent.h, minW: dynamicComponent.minW,
              minH: dynamicComponent.minH }}
          >
            {this.renderDynamicComponent(dynamicComponent)}
            
          </div>
        ))
        ):(
          <p>No dynamic components</p>
        )}


     
      </ResponsiveGridLayout>
      
    );
  }
}

export default Grid;


