import React, {useState, useEffect} from 'react';
import { evaluate } from "mathjs";
import '../App.css'

const buttons = [
    "9", "8", "7", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
];

const Calculator = () => {

    const [input, setInput] = useState("");

    function handleClick(currValue) {
        console.log(currValue)
        if (currValue === "C") {
            setInput("");
        }
        else if (currValue === "=") {
            //run math operation
            try {
                const result = evaluate(input).toString()

                setInput(result);
            } catch {

            }

        } else {
            // concatenate numbers on display bar
            setInput((prevValue) => prevValue + currValue)
        }
    }


    // Add keystroke detection
    useEffect(() => {
        const handlekeyDown = (event) => {

            // keyboardEventAPI to access keystroke
            // returns as a string
            const key = event.key

            if (/^[0-9.+\-*/]$/.test(key)) {
                handleClick(key);
            } else if (key === "Enter") {
                handleClick("=")
            } else if (key === "Backspace") {
                setInput((prevValue) => prevValue.slice(0, -1));
            } else if (key === "Escape") {
                handleClick("C")
            }
        }


        // we remove event listener to avoid multiple listeners being added and causing memory leaks
        window.addEventListener("keydown", handlekeyDown)
        return () => window.removeEventListener("keydown", handlekeyDown);
    }, []);


  return (
    <div className='calculator'>
        <div className='display'> {input || 0} </div>
        <div className='buttons-grid'>
            {buttons.map((value, index) => (
                <button 
                key={index}
                className={value === "C" ? "clear" : value === "=" ? "equals" : 
                    ["*", "/", "-", "+"].includes(value) ? "operator" : ""
                } 
                onClick={() => handleClick(value)}> {value} </button>
            ))}
        </div>
    </div>
  );
};

export default Calculator;