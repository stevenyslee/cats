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
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
