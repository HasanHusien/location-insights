import { useCities } from "../contexts/CitiesContext.jsx";
import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";

function CityList() {
  const { cities, loading } = useCities();

  if (loading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add uour city by clicking on the map" />;

  // pass through entir countries data if there an unique country => add it at countries page
  const contries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, imgUrl: city.imgUrl }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {contries.map((country) => (
        <CountryItem country={country} key={cities.id} />
      ))}
    </ul>
  );
}

export default CityList;
