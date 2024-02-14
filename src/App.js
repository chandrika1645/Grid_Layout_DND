import './App.css';



import Grid from './Components/Grid';
import JobDetails from './Components/JobDetails';
import ServiceAdd from './Components/ServiceAdd';
import Table from './Components/Table';

function App() {
  return (
    <div className="App">
    <div className='Left-content'>
      <JobDetails/>
      <Table/>
      <ServiceAdd/>
    </div>

    <div className='Right-content'>

      <Grid/>
    </div>

      
      {/* <GridTest/> */}
      
    </div>
  );
}

export default App;
