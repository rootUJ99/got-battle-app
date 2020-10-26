import React,{ useState } from 'react';
import './App.css';

const InputName = 'searchInput';

const App = () => {
  const [searchData, setSearchData] = useState({
    [InputName]: '',
  });
  const [responseData, setResponseData] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/search?location=${searchData.searchInput}`, {method: 'GET'});
      const data = await response.json();
      setResponseData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setSearchData({
      ...searchData,
      [e.target.name] : e.target.value
    })
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input name={InputName} value={searchData.searchInput} onChange={onChange}/>
        <button type="submit">search</button>
      </form>
      <div>
        {responseData?.searchedData?.map(it => <pre>
          {JSON.stringify(it)}
        </pre>)}
      </div>
    </div>
  );
}

export default App;
