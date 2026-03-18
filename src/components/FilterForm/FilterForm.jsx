import React, { useEffect, useState } from "react";

function FilterForm({ data, handleFilterData }) {
  const [brands, setBrands] = useState([]);
  const [selBrands, setSelBrands] = useState([]);

  useEffect(() => {
    const test = new Set(data.map((item) => item.brand));
    const result = Array.from(test);
    setBrands(result);
  }, [data]);

  const handleChange = (e) => {
    const selOptions = e.target.selectedOptions;
    const selOptionsValues = Array.from(selOptions).map(
      (option) => option.value,
    );
    setSelBrands(selOptionsValues);
    console.log(selOptionsValues);
  };

  const handleFilter = () => {
    const filtered = data.filter((car) => selBrands.includes(car.brand));
    handleFilterData(filtered);
  };

  const handleReset = () => {
    handleFilterData(data);
    setSelBrands([]);
  };

  return (
    <div className="row g-3 align-items-end mb-4">
      <div className="col-md-8">
        <label
          htmlFor="brand"
          className="form-label fw-bold text-muted small uppercase"
        ></label>
        <select
          className="form-select shadow-sm"
          name="brand"
          id="brand"
          multiple
          onChange={handleChange}
          value={selBrands}
          style={{ minHeight: "100px" }}
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary shadow-sm"
            onClick={handleFilter}
            disabled={brands.length === 0}
          >
            <i className="bi bi-filter"></i> Filtrovat
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleReset}
          >
            Reset Filtru
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterForm;
