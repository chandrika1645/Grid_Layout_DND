import GridLayout from "react-grid-layout";
import React from "react";

class GridTest extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
      { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: "c", x: 4, y: 0, w: 1, h: 2 }
    ];
    return (
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        style={{backgroundColor: "gray" }}
      >
        
        <div key="a">a</div>
        <div key="b">b</div>
       
        
        <table key='c'>
            <thead>
                <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>John Doe</td>
                <td>30</td>
                <td>Male</td>
                </tr>
                <tr>
                <td>Jane Smith</td>
                <td>25</td>
                <td>Female</td>
                </tr>
                <tr>
                <td>Michael Johnson</td>
                <td>40</td>
                <td>Male</td>
                </tr>
            </tbody>
        </table>
        
      </GridLayout>
    );
  }
}


export default GridTest;