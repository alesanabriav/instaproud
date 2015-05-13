# API rest of instabrand
Instagram clone for companies

## Methods HTTP allowed

|  Method  |              Description              |
| -------- | -------------------------------------- |
| `GET`    | get resource or get collection of resources |
| `POST`   | Create a resource                      |
| `PUT`    | Update a resource                 |
| `DELETE` | Delete a resource                    |

## Response codes

| Code |                         Description                          |
| ------ | ------------------------------------------------------------ |
| `200`  | Success                                                      |
| `201`  | Success - new resource created.                              |
| `204`  | Success - there don't content for response                   |
| `400`  | Bad Request              |
| `401`  | Unauthorized  |
| `404`  | Not Found                               |
| `422`  | Unprocessable Entity - validation errors            |
| `500`  | server error                                            |

# Resource /users

## [GET] /users
Get collection of users

Response 200 (application/json)

    [{
        id: 1,
        name: "Alejandro Sanabria",
        email: "alejandro@company.com"
    },
    {
        id: 2,
        name: "Daniel Hernandez",
        email: "daniel@company.com"
    }]

## [GET] /users/1
get one user

Response 200 (application/json)

    {
        id: 1,
        name: "Alejandro Sanabria",
        email: "alejandro@company.com"
    }

## [POST] /users
Create new user

Request  (application/json)

    {
        "name": "Alejandro Sanabria",
        "email": "alejandro@company.com",
        "password": "test"
    }

Response 201 (application/json)

    {
        id: 1,
        name: "Alejandro Sanabria",
        email: "alejandro@company.com"
    }

## [PUT] /users/1
Update user

Request  (application/json)

    {
        name: "Alejandro Villescas",
        email: "ale@company.com",
        password: "test123"
    }

Response 201 (application/json)

    {
        id: 1,
        name: "Alejandro Villescas",
        email: "ale@company.com",
        password: "test123"
    }

## [DELETE] /users/1
Response 204 (application/json)



