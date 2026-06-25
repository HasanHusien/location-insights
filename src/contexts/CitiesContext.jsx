/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const BASE_URL = "http://localhost:9000/";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  // have to be useReducer make it later
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // try - catch - finally => are quite useful for readable and cleanCode with fetching data and useEffect
  useEffect(() => {
    setLoading(true);
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((prevCities) => [...prevCities, data]);
    } catch {
      alert("thire was error when loading...");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      await fetch(`${BASE_URL}cities`, {
        method: "DELETE",
      });
      setCities((prevCities) => prevCities.filter((city) => city.id !== id));
    } catch {
      alert("thire was error when deleting city.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  return context;
}

export { CitiesProvider, useCities };
