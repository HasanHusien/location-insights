import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext.jsx";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";

import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const { createCity, loading } = useCities();
  const navigate = useNavigate();

  // with this way can i getting my global state (state as url)
  // const [lat, lng] = useLatAndLng();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!lat || !lng) return;
        setIsLoadingGeoCoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        console.log(data);

        if (!data.countryCode)
          throw new Error(
            "That dosn't seem to be a city. Click somewher else 😃 ",
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchData();
  }, [lat, lng]);

  async function handelSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeoCoding) return <Spinner />;
  if (!lat || !lng) return <Message message="Start by clicking on map" />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={handelSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
