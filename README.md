# roof-toppers
"Roof Toppers" is een innovatieve platformer game waarin spelers de uitdaging aangaan om omhoog te klimmen in een wolkenkrabber. Het hoofddoel is om zo hoog mogelijk te komen, waarbij de hoogte direct de score van de speler bepaalt. Zodra de finish is bereikt, wordt de score omgezet naar de tijd die nodig was om de top te bereiken.

## Installation Instructions

### Prerequisites
Ensure you have the following installed on your system:

- **PHP**
- **Composer**
- **Node.js & npm**
- **MySQL**

---

### Step 1: Clone the Repository
```sh
git clone <repository_url>
cd <repository_name>
```

### Step 2: Install PHP Dependencies
```sh
composer install
```

### Step 3: Set Up Environment File
```sh
cp .env.example .env
```
Modify `.env` to match your database and other configurations.

### Step 4: Generate Application Key
```sh
php artisan key:generate
```

### Step 5: Set Up Database
1. Create a database in MySQL (or your preferred DBMS).
2. Run migrations:
   ```sh
   php artisan migrate
   ```

### Step 6: Install JavaScript Dependencies
```sh
npm install
```

### Step 7: Build Frontend Assets
For development mode (auto-refresh):
```sh
npm run dev
```
For production build:
```sh
npm run build
```

### Step 8: Serve the Application
```sh
php artisan serve
```
Your Laravel app should now be running at [http://127.0.0.1:8000](http://127.0.0.1:8000).
