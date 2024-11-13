
# Egyptian National ID Validator API

A streamlined API for validating Egyptian National IDs and extracting essential information such as date of birth, gender, and birth governorate based on the ID's structure.

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Example Request](#example-request)
- [API Documentation](#api-documentation)
- [ID Format](#id-format)

## Overview

The Egyptian National ID Validator API enables validation of Egyptian national ID numbers and extracts key details such as:

- Date of Birth
- Gender 
- Governorate of Birth

Using regular expressions, this API ensures the format of each ID is correct and then parses out relevant data. The API is structured to respond with JSON, and Swagger documentation is available for easy testing and exploration.

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   https://github.com/Mohamedabdullhaleam/NID-Validator.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd egyptian-id-validator
   ```

3. **Install required dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server (default port: 8000):**
   ```bash
   npm start
   ```

Your server should now be running, and the API is accessible at `http://127.0.0.1:8000`.

## API Endpoints

### Validate National ID
- **URL:** `/api/validate-id`
- **Method:** POST
- **Description:** Accepts a National ID and verifies its format, extracting the birth date, gender, and governorate if valid.

## Example Request

**Request:**
```json
{
  "id": "30005251234567"
}
```

**Response:**
```json
{
  "valid": true,
  "birth_date": "2000-05-25",
  "gender": "Female",
  "governorate": "Alexandria"
}
```

## API Documentation

Interactive API documentation is provided with Swagger UI, allowing you to explore and test the available endpoints.

- **Swagger UI:**
  - **URL:** `/api-docs`
  - **Description:** Allows you to view and test endpoints, providing details on request/response formats.

**Example Documentation URL:** `http://127.0.0.1:8000/api-docs`

## ID Format

The Egyptian National ID is a 14-digit number with the following structure:

| Segment | Description |
| ------- | ----------- |
| **C** (1 digit) | Century indicator (e.g., 2 for 1900–1999, 3 for 2000–2099) |
| **YYMMDD** (6 digits) | Date of birth (YY = year, MM = month, DD = day) |
| **VV** (2 digits) | Governorate code (e.g., 01 for Cairo, 02 for Alexandria) |
| **IIIG** (4 digits) | Birth sequence, where the last digit indicates gender (odd for male, even for female) |
| **X** (1 digit) | Checksum for validation (optional implementation) |

### ID Example
**ID:** `30005251234567`

- **Century Code:** `3` (2000–2099)
- **Date of Birth:** `2000-05-25`
- **Governorate:** Alexandria (`02`)
- **Gender:** Female (last digit in sequence is even)


