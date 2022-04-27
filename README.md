# Gas Project

[Trello board](https://trello.com/b/5owAOiEP/sssf2022-project)  
[Figma prototype](https://www.figma.com/file/NOQZb6ZI9mtSlYiQwhEXTo/Prototype?node-id=0%3A1)

## Graphql
### Mutations
#### Register
```graphql
registerUser(
  username: String!,
  password: String!,
  confirmPassword: String!
): UserWithToken
```

##### Example return
```json
{
  "data": {
    "registerUser": {
      "id": "6268f0ce25dc90ac3a8e3467",
      "username": "testuser",
      "token": "<TOKEN>"
    }
  }
}
```

#### Update 95 price
```graphql
update95(stationID: String!, price: String!): Fuel
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```

#### Update 98 price
```graphql
update98(stationID: String!, price: String!): Fuel
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```

#### Update Diesel price
```graphql
updateDiesel(stationID: String!, price: String!): Fuel
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```

#### Add favorite
```graphql
addFavorite(stationID: String!): Favorite
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```

#### Delete favorite
```graphql
deleteFavorite(stationID: String!): Boolean
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```

### Queries
#### Login
```graphql
login(username: String!, password: String!): UserWithToken
```

##### Example return
```json
{
  "data": {
    "login": {
      "id": "6268f0ce25dc90ac3a8e9849",
      "username": "testuser",
      "token": "<TOKEN>"
    }
  }
}
```

#### Station
```graphql
station(id: String!): Station
```

#### Stations by bounds
```graphql
stationsByBounds(bounds: Bounds!): [Station]
```

#### Stations around location
```graphql
stationsAround(location: Location!, radius: Float): [Station]
```

#### Fuel 95
```graphql
fuel95(stationID: String!): Fuel
```

#### Fuel 98
```graphql
fuel98(stationID: String!): Fuel
```

#### Fuel Diesel
```graphql
fuelDiesel(stationID: String!): Fuel
```

#### User
```graphql
user(id: ID!): User
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```

#### Favorites
```graphql
favorites: [Station]
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```

#### Favorite
```graphql
favorite(stationID: String): Favorite
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```

#### User history
```graphql
userHistory(userID: ID!): [History]
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```

#### Station history
```graphql
stationHistory(stationID: String!, type: String): [History]
```

Header
```
Authorization: Bearer <YOUR_TOKEN_HERE>
```


### Object types
#### Types
```graphql
type Station {
  id: ID
  stationID: String
  properties: Properties
  geometry: Geometry
  prices: Prices
  address: Address
}
```

```graphql
type Properties {
  brand: String
  name: String
  operator: String
}
```

```graphql
type Properties {
  brand: String
  name: String
  operator: String
}
```

```graphql
type Geometry {
  type: String
  coordinates: [Float]
}
```

```graphql
type Prices {
  fuel95: Fuel
  fuel98: Fuel
  fuelDiesel: Fuel
}
```

```graphql
type Address {
  house_number: String
  road: String
  city: String
  postcode: String
  country: String
}
```

```graphql
type User implements UserBase {
    id: ID
    username: String
}
```

```graphql
type UserWithToken implements UserBase {
    id: ID
    username: String
    token: String
}
```

```graphql
type History {
    userID: ID
    stationID: String
    price: String
    type: String
    updatedAt: String
}
```

```graphql
type Fuel {
    stationID: String
    price: String
    updatedAt: String
}
```

```graphql
type Favorite {
    userID: ID
    stationID: String
}
```

#### Inputs
```graphql
input Bounds {
  s: Float!
  w: Float!
  n: Float!
  e: Float!
}
```

```graphql
input Location {
  lon: Float!
  lat: Float!
}
```

#### Interfaces
```graphql
interface UserBase {
id: ID
username: String
}
```
