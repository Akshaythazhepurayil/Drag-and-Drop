
import './App.css';
import DragAndDrop from './components/DragAndDrop';

const data = [
  {title: "Disable", items: ["1", "2", "3"]},
  {title: "Enable", items: ["4", "5"]}
]


function App() {
  return (
    <div className="App">
      <div className="App-header">
        <DragAndDrop data={data}/>
      </div>
    </div>
  );
}

export default App;
