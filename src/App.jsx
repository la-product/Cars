import "./App.css";
import { useEffect, useState } from "react";
import CarTable from "./components/CarTable/CarTable";
import UniForm from "./components/UnitForm/UnitForm";
import FilterForm from "./components/FilterForm/FilterForm";
import axios from "axios";

function App() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });
  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });
  const [carsToShow, setCarsToShow] = useState([]);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = () => {
    axios
      .get("https://kovacik.endora.site/cars/htdocs/index.php?action=getAll")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCars(response.data);
          setCarsToShow([]);
        } else {
          console.error("Odpověď serveru není pole.");
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert(`Chyba: ${error}`);
      });
  };

  const filterCars = (ids) => {
    const param = ids.join();
    console.log(param);
    axios
      .get(
        `https://kovacik.endora.site/cars/htdocs/index.php?action=getSpec&ids=${param}`,
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log(response.data);
          setCarsToShow(response.data);
        } else {
          console.error("Odpověď serveru není pole.");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert(`Chyba: ${error}`);
      });
  };

  const insertCar = (car) => {
    axios
      .post("https://kovacik.endora.site/cars/htdocs/", car)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto úspěšně přidáno.");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert(`Chyba: ${error}`);
      });
  };

  const updateCar = (car) => {
    axios
      .put("https://kovacik.endora.site/cars/htdocs/", car)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto úspěšně aktualizováno.");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert(`Chyba: ${error}`);
      });
  };

  const deleteCar = (id) => {
    axios
      .delete(`https://kovacik.endora.site/cars/htdocs/${id}`)
      .then((response) => {
        console.log(response.data);
        getCars();
        alert("Auto úspěšně smazáno.");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleNewData = (updatedCar, source) => {
    switch (source) {
      case "add-car-form": {
        setNewCar(updatedCar);
        break;
      }
      case "change-car-form": {
        setCarToChange(updatedCar);
        break;
      }
      default:
        break;
    }
  };

  const fillEmptyInfos = (car) => {
    const filledCar = {
      ...car,
      brand: car.brand.trim() ? car.brand : "empty",
      model: car.model.trim() ? car.model : "empty",
      reg: car.reg.trim() ? car.reg : "empty",
      km: parseInt(car.km) || 0,
      year: parseInt(car.year) || 0,
    };
    return filledCar;
  };

  const confirmCar = (car) => {
    return window.confirm(
      "Opravdu chcete odeslat data?\n" +
        `Značka: ${car.brand}\n` +
        `Model: ${car.model}\n` +
        `Reg.značka: ${car.reg}\n` +
        `Kilometry: ${car.km}\n` +
        `Rok výroby: ${car.year}\n`,
    );
  };

  const handleUpdate = (source) => {
    let temp;
    switch (source) {
      case "add-car-form": {
        temp = fillEmptyInfos(newCar);
        if (confirmCar(temp)) {
          insertCar(temp);
          setNewCar({
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          });
          alert("Data byla úspěšně odeslána");
        } else {
          alert("Odeslání dat bylo zrušeno");
        }
        break;
      }
      case "change-car-form": {
        temp = fillEmptyInfos(carToChange);
        if (confirmCar(temp)) {
          const index = cars.findIndex((car) => car.id === temp.id);
          if (index !== -1) {
            updateCar(temp);
            setCarToChange({
              id: 0,
              brand: "",
              model: "",
              reg: "",
              km: "",
              year: "",
            });
            alert("Aktualizace dat úspěšná");
          } else {
            alert("Auto s daným id nebylo nalezeno");
            setCarToChange({
              id: 0,
              brand: "",
              model: "",
              reg: "",
              km: "",
              year: "",
            });
          }
        } else {
          alert("Aktualizace neproběhla");
        }
        break;
      }
      default:
        break;
    }
  };

  const handleDelete = (idToDel) => {
    deleteCar(idToDel);
  };

  const handleChange = (idToChange) => {
    const temp = cars.filter((car) => car.id === idToChange);
    setCarToChange(...temp);
  };

  const handleFilterData = (filteredCars) => {
    const ids = filteredCars.map((car) => car.id);
    filterCars(ids);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Filtr aut</h5>
        </div>
        <div className="card-body">
          <FilterForm data={cars} handleFilterData={handleFilterData} />
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Seznam vozidel</h5>
        </div>
        <div className="card-body p-0">
          {" "}
          {/* p-0 aby tabulka lícovala k okrajům */}
          <CarTable
            data={carsToShow}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Přidání nového auta</h5>
            </div>
            <div className="card-body">
              <UniForm
                id="add-car-form"
                data={newCar}
                handleNewData={handleNewData}
                handleUpdate={handleUpdate}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">Úprava existujícího auta</h5>
            </div>
            <div className="card-body">
              <UniForm
                id="change-car-form"
                data={carToChange}
                handleNewData={handleNewData}
                handleUpdate={handleUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
