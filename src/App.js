import React,{ useState } from 'react';
import Button from './Components/Button/index.js';
import Input from './Components/Input/index.js';
import Card from './Components/Card/index.js';
import Modal from './Components/Modal/index.js';
import './App.css';

const InputName = 'searchInput';

const App = () => {
  const [searchData, setSearchData] = useState({
    [InputName]: '',
  });
  const [responseData, setResponseData] = useState({});
  const [toggleModel, setToggleModel] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/indexed-search?q=${searchData.searchInput}`, {method: 'GET'});
      const data = await response.json();
      setResponseData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSearchChange = (e) => {
    console.log(e.target.name, e.target.value);
    setSearchData({
      ...searchData,
      [e.target.name] : e.target.value
    })
  }

  const handleModalClose = () => {
    setToggleModel(false);
  }

  const handleCardClick = (selectedItem) => {
    setToggleModel(true)
    setSelectedData(selectedItem);
  }

  return (
    <div className="app">
      <form onSubmit={onSubmit}>
        <div className="search-container">
          <Input name={InputName} value={searchData.searchInput} onChange={handleSearchChange}/>
          <Button type="submit">search</Button>
        </div>
      </form>
      <div className="card-container">
        {responseData?.searchedData?.map(it => 
          <Card 
            title={it?.name} 
            key={it._id} 
            onClick={()=>handleCardClick(it)}
          >
            <div>
                {it?.location}
                {it?.attacker_outcome}
            </div>
          </Card>
        )}
      </div>
      <Modal toggle={toggleModel} onClose={handleModalClose}>
        <div>
          {selectedData?.location}
          {selectedData?.attacker_outcome}
        </div>
      </Modal>
    </div>
  );
}

export default App;
