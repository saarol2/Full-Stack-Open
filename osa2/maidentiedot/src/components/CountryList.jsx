import CountryDetail from './CountryDetail'

const CountryList = ({countries, handleShow}) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    if (countries.length == 1) {
        return <CountryDetail country={countries[0]} />
    }
    return (
        <div>
            {countries.map(country => (
                <div key={country.name.common}>
                    {country.name.common} <button onClick={() => handleShow(country)}>Show</button>
                </div>
            ))}
        </div>
    )
}
export default CountryList