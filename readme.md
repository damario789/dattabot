# Dattabot-server

Models:

_User_
```
- email : string, required, unique
- password : string, required
```

_Capsule_
```
- subject : string, required
- message : integer, required
- status : boolean, required
- timeRelease : date, required
- UserId : required
```
​
List of available endpoints:
​
- `POST /register`
- `POST /login`

And routes below need authentication

- `GET /capsule`
- `POST /capsule`



### POST /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "<field> cannot be null"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email format"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is already exists"
}
```


### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_  ​

```json
{
  "access_token": "string"
}
```

_Response (401 - Unauthenticated)_

```json
{
  "message": "Invalid Email/Password"
}
```
​

### GET /capsule

description: 
  get all capsule data

Query:
  
  ```json
  {
    "status": "boolean",
  }
  ```

Request:

- headers: access_token (string)

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "subject": "Hidden",
        "message": "Hidden",
        "timeRelease": "2022-05-20T00:00:00.000Z"
    }
]
```

### GET /capsule

description: 
  get all capsule data

Query:
  
  ```json
  {
    "status": "boolean",
  }
  ```

Request:

- headers: access_token (string)

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "subject": "Hidden",
        "message": "Hidden",
        "timeRelease": "2022-05-20T00:00:00.000Z"
    }
]
```

### POST /capsule

description: 
  create capsule data

Body:
  
  ```json
  {
    "subject": "string",
    "message": "string",
    "timeRelease": "string",
  }
  ```

Request:

- headers: access_token (string)

_Response (201 - Created)_

```json
{
    "id": 1,
    "subject": "test subject",
    "message": "ini message test",
    "timeRelease": "2022-05-20T00:00:00.000Z",
    "UserId": 1,
    "status": false,
    "updatedAt": "2022-05-19T13:41:24.725Z",
    "createdAt": "2022-05-19T13:41:24.725Z"
}
```
