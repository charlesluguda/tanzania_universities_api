# Tanzania Universities API 🎓

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)
![License](https://img.shields.io/badge/License-MIT-blue)
[![Swagger Docs](https://img.shields.io/badge/Swagger-Docs-brightgreen)](http://localhost:3000/api-docs)

A robust REST API providing comprehensive data on Tanzanian higher education institutions with full CRUD operations and JWT authentication.

## Table of Contents
- [Features](#features-)
- [Installation](#installation-)
- [Configuration](#configuration-)
- [API Documentation](#api-documentation-)
- [Usage Examples](#usage-examples-)
- [Data Model](#data-model-)
- [Development](#development-)
- [License](#license-)

## Features ✨

- **Complete University Data** - Names, locations, courses, accreditation
- **Advanced Filtering** - Search by location, course, or name
- **Secure Authentication** - JWT protected endpoints
- **High Performance** - Redis caching enabled
- **Auto Documentation** - Interactive Swagger UI
- **Validation** - Request payload validation
- **Pagination** - Efficient data retrieval

## Installation 🛠️

### Prerequisites
- Node.js 18+
- npm 9+
- Redis

### Quick Start
```bash
# Install package
npm install tanzania-universities-api

# Or with yarn
yarn add tanzania-universities-api
```

### Manual Setup
```bash
git clone https://github.com/charlesluguda/tanzania-universities-api.git
cd tanzania-universities-api
npm install
cp .env.example .env
npm start
```

## Configuration ⚙️

`.env` file configuration:
```ini
PORT=3000
SECRET_KEY=your_secure_jwt_secret
REDIS_URL=redis://localhost:6379 # Optional
CACHE_DURATION=120 # Cache duration in seconds
```

## API Documentation 📚

Explore the interactive API documentation:

```
http://localhost:3000/api-docs
```

![Swagger UI Preview](https://example.com/swagger-preview.png)

## Usage Examples 💻

### JavaScript Implementation
```javascript
const universityAPI = require('tanzania-universities-api');
const app = universityAPI();

app.listen(3000, () => {
  console.log('API running on port 3000');
});
```

### API Endpoints

| Method | Endpoint                     | Description                  | Auth Required |
|--------|------------------------------|------------------------------|---------------|
| GET    | `/universities`              | List all universities        | No            |
| GET    | `/universities/:id`          | Get single university        | No            |
| POST   | `/universities`              | Create new university        | Yes (Admin)   |
| GET    | `/universities/by-location`  | Filter by location           | No            |
| GET    | `/universities/by-course`    | Filter by course offering    | No            |

### cURL Examples

**Get universities in Dar es Salaam:**
```bash
curl "http://localhost:3000/api/v1/universities/by-location?location=Dar%20es%20Salaam"
```

**Create new university (authenticated):**
```bash
curl -X POST http://localhost:3000/api/v1/universities \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "University of Dodoma",
    "location": "Dodoma",
    "courses": ["Education", "ICT"],
    "established": 2007
  }'
```

## Data Model 📊

```json
{
  "id": "udsm001",
  "name": "University of Dar es Salaam",
  "location": "Dar es Salaam",
  "accreditation": "TCU",
  "established": 1961,
  "website": "https://www.udsm.ac.tz",
  "courses": [
    "Medicine",
    "Engineering",
    "Law"
  ],
  "facilities": ["Library", "Labs"],
  "studentPopulation": 35000
}
```

## Development 🧑‍💻

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -am 'Add some feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Create Pull Request

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Developed with ❤️ for Tanzania's education sector</p>
  <p>© 2023 Tanzania Universities API</p>
</div>

### Key Features of This README:

1. **Visual Appeal**: Badges, emojis, and clean formatting
2. **Comprehensive Sections**: All essential documentation areas
3. **Code Friendly**: Properly formatted code blocks
4. **Table Formatting**: For endpoints and other structured data
5. **Visual Hierarchy**: Clear section organization
6. **Callouts**: Important information highlighted
7. **Professional Footer**: With license and attribution
