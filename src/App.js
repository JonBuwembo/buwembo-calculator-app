import { useState } from 'react';
import './App.css'
import Calculator from './components/calculator';


function App() {

  const [value, setValue] = useState('')
  return (
    <div>
       <Calculator />
    </div>
  );
}

export default App;
