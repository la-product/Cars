import React from "react";

function CarTable({ data, handleChange, handleDelete }) {
  return (
    <div className="table-responsive">
      {/* table-hover: zvýrazní řádek při najetí myši
        table-striped: přidá prokládané barvy řádků (zebra)
        align-middle: vertikálně vycentruje text v buňkách (vypadá to líp u tlačítek)
      */}
      <table className="table table-hover table-striped align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>Značka</th>
            <th>Model</th>
            <th>Registrace</th>
            <th className="text-end">Najeto (km)</th>
            <th className="text-center">Rok výroby</th>
            <th className="text-center" style={{ width: "150px" }}>
              Akce
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td className="fw-bold text-primary">{item.brand}</td>
                <td>{item.model}</td>
                <td>
                  <span className="badge bg-light text-dark border">
                    {item.reg}
                  </span>
                </td>
                <td className="text-end">{item.km?.toLocaleString()}</td>
                <td className="text-center">{item.year}</td>
                <td className="text-center">
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => handleChange(item.id)}
                      title="Editovat"
                    >
                      Edituj
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                      title="Smazat"
                    >
                      Smaž
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                Žádná data k zobrazení. Zkuste změnit filtr nebo načíst auta.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CarTable;
