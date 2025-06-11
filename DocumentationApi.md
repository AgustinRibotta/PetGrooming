
---

## 📂 Owner Endpoints

### 🔹 Create Owner

**POST** `/owner`

Creates a new pet owner.

#### Request Body

```json
{
  "name": "John Doe",
  "phoneNumber": "123-456-7890"
}
```

#### Response – `201 Created`

```json
{
  "id": 2,
  "name": "John Doe",
  "phoneNumber": "123-456-7890",
  "petCount": 0
}
```

#### Error –  `400 Bad Request`

```json
{
	"phoneNumber": "Phone number is mandatory",
	"name": "Name is mandatory"
}
```

---

### 🔹 Get All Owners

**GET** `/owner`

Fetches a list of all registered owners.

#### Response – `200 OK`

```json
[
  {
    "id": 1,
    "name": "Alice Smith",
    "phoneNumber": "555-1234",
    "petCount": 2
  },
  ...
]
```

---

### 🔹 Get Owner by ID

**GET** `/owner/{id}`

Fetches details of a specific owner by their unique ID.

#### Path Parameter

* `id` (integer) – Owner's ID

#### Response – `200 OK`

```json
{
  "id": 1,
  "name": "Alice Smith",
  "phoneNumber": "555-1234",
  "pets": [
    {
      "id": 101,
      "name": "Bella",
      "race": "Bulldog"
    }
  ]
}
```

#### Error – `404 Not Found`

```json
{
  "message": "Owner with id {id} not found."
}
```

---

### 🔹 Update Owner

**PUT** `/owner/{id}`

Updates information for an existing owner.

#### Path Parameter

* `id` (integer) – Owner's ID

#### Request Body

```json
{
  "name": "Jane Doe",
  "phoneNumber": "987-654-3210"
}
```

#### Response – `200 OK`

```json
{
  "message": "Owner with id 2 updated successfully."
}
```

#### Error – `404 Not Found`

```json
{
  "message": "Owner with id 2 does not exist."
}
```

---

### 🔹 Delete Owner

**DELETE** `/owner/{id}`

Deletes an owner and disassociates any related pets.

#### Path Parameter

* `id` (integer) – Owner's ID

#### Response – `202 Accepted`

```json
{
  "message": "Owner with id 2 was deleted."
}
```

---

## 🐾 Pet Endpoints

### 🔹 Create Pet

**POST** `/pets`

Creates a new pet and links it to an existing owner.

#### Request Body

```json
{
  "ownerId": 2,
  "name": "Charlie",
  "race": "Golden Retriever",
  "color": "Gold",
  "allergic": false,
  "specialAttention": true,
  "observations": "Requires regular exercise"
}
```

#### Response – `201 Created`

```json
{
  "id": 202,
  "name": "Charlie",
  "race": "Golden Retriever",
  "color": "Gold",
  "allergic": false,
  "specialAttention": true,
  "observations": "Requires regular exercise",
  "ownerId": 2
}
```

#### Error –  `400 Bad Request`

```json
{
	"allergic": "Allergic field is required.",
	"color": "Color is required.",
	"race": "Race is required.",
	"name": "Name is required.",
	"specialAttention": "Special attention is required."
}
```

---

### 🔹 Get Pet by ID

**GET** `/pets/{id}`

Retrieves detailed information about a specific pet.

#### Path Parameter

* `id` (integer) – Pet's ID

#### Response – `200 OK`

```json
{
  "id": 202,
  "name": "Charlie",
  "race": "Golden Retriever",
  "color": "Gold",
  "ownerId": 2
}
```

#### Error – `404 Not Found`

```json
{
  "message": "Pet with id 7 not found"
}
```

---

### 🔹 Update Pet

**PUT** `/pets/{id}`

Updates details of an existing pet.

#### Path Parameter

* `id` (integer) – Pet's ID

#### Request Body

```json
{
  "name": "Charlie",
  "race": "Labrador",
  "color": "Yellow",
  "allergic": false,
  "specialAttention": false,
  "observations": "None",
  "ownerId": 2
}
```

#### Response – `200 OK`

```json
{
  "message": "Pet with id 202 updated successfully."
}
```

#### Error – `404 Not Found` or `400 Bad Request`

```json
{
  "message": "Invalid request or pet not found."
}
```

---

### 🔹 Delete Pet

**DELETE** `/pets/{id}`

Deletes a pet by ID.

#### Path Parameter

* `id` (integer) – Pet's ID

#### Response – `202 Accepted`

```json
{
  "message": "Pet with id 102 was deleted."
}
```

---

## ⚠️ Error Handling

| Status Code | Description                 |
| ----------- | --------------------------- |
| 200         | OK                          |
| 201         | Created                     |
| 202         | Accepted (Delete Success)   |
| 400         | Bad Request (Invalid Input) |
| 404         | Not Found (ID Not Exist)    |
| 500         | Internal Server Error       |

