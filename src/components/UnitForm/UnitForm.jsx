import React from "react";

function UnitForm({ id, data, handleNewData, handleUpdate }) {
  const handleChange = (e) => {
    let temp = { ...data };
    const { name, value } = e.target;
    switch (name) {
      case `${id}-brand`: {
        temp.brand = value;
        break;
      }
      case `${id}-model`: {
        temp.model = value;
        break;
      }
      case `${id}-reg`: {
        temp.reg = value;
        break;
      }
      case `${id}-km`: {
        temp.km = parseInt(value);
        break;
      }
      case `${id}-year`: {
        temp.year = parseInt(value);
        break;
      }

      default:
        break;
    }
    handleNewData(temp, id);
  };

  return (
    <div className="row g-3">
      {" "}
      {/* g-3 vytvoří mezery mezi sloupci i řádky */}
      <div className="col-md-6">
        <label className="form-label fw-semibold" htmlFor={`${id}-brand`}>
          Výrobce
        </label>
        <input
          id={`${id}-brand`}
          name={`${id}-brand`}
          type="text"
          className="form-control shadow-sm"
          placeholder="Např. Škoda"
          value={data.brand}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-semibold" htmlFor={`${id}-model`}>
          Model
        </label>
        <input
          id={`${id}-model`}
          name={`${id}-model`}
          type="text"
          className="form-control shadow-sm"
          placeholder="Např. Octavia"
          value={data.model}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label fw-semibold" htmlFor={`${id}-reg`}>
          Registrace
        </label>
        <input
          id={`${id}-reg`}
          name={`${id}-reg`}
          type="text"
          className="form-control shadow-sm"
          placeholder="1A2 3456"
          value={data.reg}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label fw-semibold" htmlFor={`${id}-km`}>
          Ujeté km
        </label>
        <input
          id={`${id}-km`}
          name={`${id}-km`}
          type="number"
          className="form-control shadow-sm"
          value={data.km}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4">
        <label className="form-label fw-semibold" htmlFor={`${id}-year`}>
          Rok výroby
        </label>
        <input
          id={`${id}-year`}
          name={`${id}-year`}
          type="number"
          className="form-control shadow-sm"
          value={data.year}
          onChange={handleChange}
        />
      </div>
      <div className="col-12 mt-4">
        <button
          className="btn btn-primary px-4 shadow-sm"
          type="button"
          onClick={() => handleUpdate(id)}
        >
          <i className="bi bi-save me-2"></i> Uložit data
        </button>
      </div>
    </div>
  );
}

export default UnitForm;
