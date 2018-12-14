# Cats API
Registers accounts and pictures for cute kittens.

**URL**
----

  cats-env-dev.us-west-1.elasticbeanstalk.com
  

**Methods:**
----

POST /cat/register
  
*  **Data Params**

   **Required:**
 
   `name=[string]`
   `username=[string]`
   `password=[string]`
   `weight=[float]`

   **Optional:**
 
   `birthdate=[date]`
   `breed=[string]`
   `imageUrl=[string]`

PUT /cat/login
  
*  **Data Params**

   **Required:**
 
   `username=[string]`
   `password=[string]`
   
GET /cats
  
*  **Data Params**

   **Required:**
  
   `Header: authToken`

   **Optional:**
 
   `id=[string]`
   `name=[string]`
   `username=[string]`
   
GET /cats/random
  
*  **Data Params**

   **Required:**
 
   `none`
   
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "imageUrl": "http://honesttopaws.com/wp-content/uploads/sites/5/2017/05/banana-cat-1.png",
        "name": "Enji",
        "breed": "Siamese"
    }
]`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ error: 'Name invalid' }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ auth: false, message: 'Failed to authenticate token.' }`
    
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error: err }`
    
* **Sample Call:**

  ```javascript
    axios.post('http://cats-env-dev.us-west-1.elasticbeanstalk.com/cat/register', {
        "addedAt": "2018-01-01",
        "breed": "Siamese",
        "birthdate": "2018-01-01",
        "imageUrl": "http://honesttopaws.com/wp-content/uploads/sites/5/2017/05/banana-cat-1.png",
        "lastSeenAt": "2018-12-12",
        "name": "name",
        "username": "username",
        "password": "password",
        "weight": 50
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      }
  ```
