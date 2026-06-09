# 🚗 Cars

Webová aplikace pro správu vozového parku. Frontend postavený na React + Vite, backend na PHP s PDO a MySQL.

## Technologie

**Frontend**

- React 18
- Vite
- Bootstrap 5
- Axios

**Backend**

- PHP (PDO)
- MySQL

## Struktura projektu

```
├── src/
│   ├── components/
│   │   ├── CarTable/         # Tabulka vozidel
│   │   ├── FilterForm/       # Filtrování podle značky
│   │   └── UnitForm/         # Formulář pro přidání / úpravu auta
│   ├── App.jsx               # Hlavní komponenta, state management, API volání
│   └── main.jsx
├── htdocs/
│   ├── DbConnect.php         # Připojení k databázi
│   └── index.php             # REST API (getAll, getSpec, POST, PUT, DELETE)
```

## Funkce

- ✅ Výpis všech vozidel
- ✅ Filtrování vozidel podle značky
- ✅ Přidání nového vozidla
- ✅ Úprava existujícího vozidla
- ✅ Smazání vozidla

## Instalace

**Frontend**

```bash
git clone https://github.com/la-product/cars.git
cd cars
npm install
npm run dev
```

**Backend**

1. Nahraj složku `htdocs/` na server (např. Apache)
2. Vytvoř soubor `htdocs/.env`:

```
DB_SERVER=localhost
DB_NAME=cars
DB_USER=root
DB_PASS=
```

3. Importuj databázi a nastav CORS v `index.php` podle své domény

## API endpointy

| Metoda | Endpoint                    | Popis                 |
| ------ | --------------------------- | --------------------- |
| GET    | `?action=getAll`            | Vrátí všechna vozidla |
| GET    | `?action=getSpec&ids=1,2,3` | Vrátí vybraná vozidla |
| POST   | `/`                         | Přidá nové vozidlo    |
| PUT    | `/`                         | Aktualizuje vozidlo   |
| DELETE | `/{id}`                     | Smaže vozidlo         |
