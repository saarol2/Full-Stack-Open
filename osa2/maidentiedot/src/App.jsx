import { useState, useEffect } from 'react'
import axios from 'axios';
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null)
  }
  const handleShow = (country) => {
    setSelectedCountry(country)
  }
  const countriesToShow = filter
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    :countries

    return (
        <div>
          <div>
            Find countries: <input value={filter} onChange={handleFilterChange} />
          </div>
          {selectedCountry ? (
            <CountryDetail country={selectedCountry} />
          ) : (
            <CountryList countries={countriesToShow} handleShow={handleShow} />
          )}
        </div>
      )
    }
export default App;