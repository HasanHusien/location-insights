import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext.jsx";
import styles from "./CityList.module.css";

import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";

// formatting my date nicely
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

/* eslint-disable react/prop-types */
// => useContext(CitiesProvider)
function CityList() {
  const { cities, loading, currentCity, deleteCity } = useCities();

  if (loading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add uour city by clicking on the map" />;

  const cityItems = cities.map((city) => {
    const { cityName, imgUrl, date, id, position } = city;
    const { lat, lng } = position;

    function handekClick(e) {
      e.preventDefault();
      deleteCity(id);
    }

    return (
      <li key={id}>
        <Link
          className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
          to={`${id}?lat=${lat}&lng=${lng}`}
        >
          <img className={styles.imgUrl} src={imgUrl} />
          <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>{formatDate(date)}</time>
          <button className={styles.deleteBtn} onClick={handekClick}>
            &times;
          </button>
        </Link>
      </li>
    );
  });

  return <ul className={styles.cityList}>{cityItems}</ul>;
}

export default CityList;
