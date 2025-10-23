# Advanced Job Search - Usage Guide

## Overview
The advanced search functionality has been successfully implemented in your NestJS application. Here are the new endpoints and how to use them:

## New Endpoints

### 1. Advanced Search (POST /jobs/search/advanced)
Comprehensive search with multiple filters and pagination.

**Request Body Example:**
```json
{
  "query": "desenvolvedor react",
  "categoria": "TI",
  "localizacao": "São Paulo",
  "tipoContrato": "CLT",
  "salarioMin": 3000,
  "salarioMax": 8000,
  "experiencia": "Pleno",
  "page": 1,
  "limit": 20,
  "orderBy": "relevancia"
}
```

**Response:**
```json
{
  "jobs": [...],
  "total": 150,
  "page": 1,
  "totalPages": 8,
  "hasNext": true,
  "hasPrev": false
}
```

### 2. Quick Search (GET /jobs/search/quick)
Fast search for autocomplete functionality.

**Example:** `GET /jobs/search/quick?q=dev&limit=5`

### 3. Popular Categories (GET /jobs/categories/popular)
Get most popular job categories.

**Example:** `GET /jobs/categories/popular?limit=10`

### 4. Popular Locations (GET /jobs/locations/popular)
Get most popular job locations.

**Example:** `GET /jobs/locations/popular?limit=10`

### 5. Similar Jobs (GET /jobs/:id/similar)
Find jobs similar to a specific job.

**Example:** `GET /jobs/123e4567-e89b-12d3-a456-426614174000/similar?limit=5`

## Database Changes

The Job entity now includes these additional fields:
- `salario` (decimal, nullable)
- `categoria` (varchar, nullable)
- `localizacao` (varchar, nullable)
- `tipoContrato` (varchar, nullable)
- `experiencia` (varchar, nullable)
- `status` (varchar, default: 'ATIVO')

## Search Features

### Text Search
- Searches across: title, description, category, and location
- **Case-insensitive matching** (Desenvolvimento = desenvolvimento)
- Partial word matching
- Works with accents and special characters

### Filters
- **Category filtering** (case-insensitive: "TI" = "ti" = "Ti")
- **Location filtering** (partial match, case-insensitive)
- **Contract type filtering** (case-insensitive: "CLT" = "clt")
- **Salary range filtering** (works with both `salario` and `valorSugerido`)
- **Experience level filtering** (case-insensitive: "Pleno" = "pleno")

### Sorting Options
- **relevancia**: Prioritizes title matches, then description matches
- **data**: Most recent jobs first (default)
- **salario**: Highest salary first

### Pagination
- Configurable page size (1-100 items)
- Metadata includes total count, page info, and navigation flags

## Usage Tips

1. **Migration**: You'll need to run a database migration to add the new columns
2. **Backward Compatibility**: Existing functionality remains unchanged
3. **Performance**: The search uses database indexes for optimal performance
4. **Flexibility**: All search parameters are optional

## Next Steps

1. Run database migration to add new columns
2. Update your frontend to use the new search endpoints
3. Consider adding database indexes on frequently searched columns
4. Test the search functionality with sample data