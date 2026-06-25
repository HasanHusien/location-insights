import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <img src={country.imgUrl} />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
