import React,{ useState } from 'react';
import Button from './Components/Button/index.js';
import Input from './Components/Input/index.js';
import Card from './Components/Card/index.js';
import Modal from './Components/Modal/index.js';
import Label from './Components/Label/index.js';
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

  const outcome = (result, cssFlag) => {
    if (cssFlag) {
      return result === 'win' 
      ? 'green'
      : 'red'
    }
    return result === 'win' 
                  ? 'Attacker Won'
                  : 'Attacker Defeated'
  }

  return (
    <div className="app">
      <form onSubmit={onSubmit}>
        <div className="search-container">
          <Input 
            name={InputName} 
            placeholder='Search by battle name, king, commander, location, region'
            value={searchData.searchInput} 
            onChange={handleSearchChange}/>
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
            <div className="grid-with-gap">
              <div>
                  {it?.location}
              </div>
              <div className={outcome(it?.attacker_outcome, true)}>
                {outcome(it?.attacker_outcome)}
              </div>
            </div>
          </Card>
        )}
      </div>
      <Modal 
        toggle={toggleModel} 
        onClose={handleModalClose}
        title={selectedData?.name}
        >
        <div className="grid-with-gap">
            <div className="flex-container">
            <div>
              Region: {selectedData?.region}
            </div>
            <div>
              Location: {selectedData?.location}
            </div>
            <div className={outcome(selectedData?.attacker_outcome, true)}>
              {outcome(selectedData?.attacker_outcome)}
            </div>
            </div>
          <div className="section">
            <div className="grid-with-gap">
              <Label>Attacker Details</Label>
              {
                Object.keys(selectedData).filter(it=> it.includes('attacker')&& !it.includes('attacker_outcome')).map(it=>selectedData[it] && <div>{it}{' : '} {selectedData[it]}</div>)
              }
            </div>
            <div className="divider"/>
            <div className="grid-with-gap">
              <Label>Defender Details</Label>
            {
                Object.keys(selectedData).filter(it=> it.includes('defender')).map(it=>selectedData[it] && <div>{it}{' : '} {selectedData[it]}</div>)
            }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
