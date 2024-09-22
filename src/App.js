import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import "./styles/App.css";

function App() {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  useEffect(() => {
    document.title = 'RA2111027010026';
  }, []);

  const handleSubmit = async () => {
    try {
      setErrorMessage('');
      const parsedJson = JSON.parse(jsonData);

      const response = await axios.post('https://bajaj-backend-assignment.vercel.app/bfhl', parsedJson);
      setResponseData(response.data);
    } catch (error) {
      setErrorMessage('Invalid JSON or error processing the request');
    }
  };

  const handleInputChange = (e) => {
    setJsonData(e.target.value);
    setErrorMessage('');
  };

  return (
    <div className="App">
      <h1>Bajaj App</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON data, e.g., { "data": ["A","1","b","2"] }'
        onChange={handleInputChange}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {responseData && (
        <div>
          <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: 'black',
                color: 'white',
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: 'black',
                color: 'white',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#333' : 'black',
                color: 'white',
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#333',
                color: 'white',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: 'white',
              }),
            }}
          />

          <div style={{ marginTop: '20px' }}>
            {selectedOptions.some(option => option.value === 'alphabets') && (
              <div>
                <h3>Alphabets</h3>
                <pre>{JSON.stringify(responseData.alphabets, null, 2)}</pre>
              </div>
            )}

            {selectedOptions.some(option => option.value === 'numbers') && (
              <div>
                <h3>Numbers</h3>
                <pre>{JSON.stringify(responseData.numbers, null, 2)}</pre>
              </div>
            )}

            {selectedOptions.some(option => option.value === 'highest_lowercase_alphabet') && (
              <div>
                <h3>Highest Lowercase Alphabet</h3>
                <pre>{JSON.stringify(responseData.highest_lowercase_alphabet, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
