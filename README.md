# Dokumentasi API

## 1. Registrasi

- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

## 2. Login

- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

## 3. Get Profile

- **Endpoint**: `GET /api/auth/profile`
- **Headers**: `Authorization: token`
- **Request Body**:

  ```json
  {
    "username": "string",
    "email": "string"
  }
  ```

## 4. Update Profile

- **Endpoint**: `PUT /api/auth/profile`
- **Headers**: `Authorization: token`
- **Request Body**:

  ```json
  {
    "username": "string",
    "email": "string"
  }
  ```

## 5. Add Product

- **Endpoint**: ` POST /api/products`
- **Headers**: `Authorization: token`
- **Request Body**:

  ```json
  {
    "name": "string",
    "price": "number",
    "description": "string"
  }
  ```

## 6. Get All Product

- **Endpoint**: `GET /api/products`
- **Headers**: `Authorization: token`
- **Request Body**:

  ```json
  [
    {
      "_id": "string",
      "name": "string",
      "price": "number",
      "description": "string"
    }
  ]
  ```

## 7. Update Product

- **Endpoint**: `PUT /api/products/:id`
- **Headers**: `Authorization: token`
- **Request Body**:

  ```json
  {
    "name": "string",
    "price": "number",
    "description": "string"
  }
  ```

## 8. Delete Product

- **Endpoint**: `DELETE /api/products/:id`
- **Headers**: `Authorization: token`
