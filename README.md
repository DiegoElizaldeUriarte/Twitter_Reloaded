# Twitter_Reloaded <br/> 
## Fernando Carlos Aceves Díaz - A01366071 <br/> Diego Raúl Elizalde Uriarte - A01748756 <br/>
<br/>
Twitter Reloaded is a social media platform that allows users to create tweets with 300 characters maximum, reply to tweets, and see their home dashboard with the recent 10 tweets. The dashboard contains tweets and threads. Every action triggered by Twitter Reloaded is registered as a new event at the event dashboard, with information such as the type of action, user who did the action, and timestamp. Reports can be generated based on the event data, such as the user who registered more events during the day, the most commented tweet of the day, and how many users opened the application during the day.

-- SOLID practices -- <br/>
1-"The Single Responsibility Principle" está presente en practicamente todas nuestras funciones del codigo, pero un claro ejemplo de esté son nuestras funciones encargadas de realizar la creación de un tweet o la respuesta de un tweet. La función "createTweet" simplemente recibe el objeto con la información, utiliza la función de base de datos y agrega el tweet a la misma. La información del tweet es obtenida de otra función independiente (getTweetInfo) y el despliegue del tweet tambien se realiza en otra clase y, evidentemente, diferente función. (Clase: DisplayTweets, funcipon: getTweets)
<br/>
2-"The Open Closed Principle", presente, por ejemplo, en nuestro archivo principal (Home.js) que está diseñado para que no deba ser modificado absolutamente nada de su esqueleto. En caso de requerir alguna modificación, se pueden agregar más componentes independientes, pero el codigo actual no tiene necesidad de ser modificado, pero capaz de permitir nuevos "hijos" o componentes agregados.
<br/>
3- "Liskov Substitution Principle" lo podemos encontrar en el objeto de un nuevo Tweet, que ocupa basicamente la misma forma que el de una respuesta de tweet, simplemente cambiando un atributo (typeOfTweet) y que este ultimo, no contiene un contador de respuestas. Sin embargo, son perfectamente reemplazables dado que la respuesta de un tweet es basicamente el mismo objeto que un tweet original, sin un par de atributos.
<br/>
4- "Interface segregation", en nuestra aplicación la interfaz principal solo muestra el recuedro para crear un tweet, así como los 10 tweets originales. El acceso a las interfaces adicionales está perfectamente presente de manera intuitiva mediante botones que nos llevan al Dashboard o algún hilo de respuestas. Las clases de las interfaces no depende una de otra
<br/>
5- "Dependency Inversion Principle" - Nuestra función de alerta es reutilizable en varios de los componentes que tenemos, utilizando la abstracción y permitiendo su uso en varios componentes, cambiando simplemente el mensaje que queremos mostrar al usuario.
<br/>
-- Design Patterns -- <br/>
1-"Facade" es implementada principalmente en nuestra pantalla especifica para el Dashboard, dado que dentro de está, el usuario tendría que interactuar con diferentes interfaces para poder tener obtener la información completa del dashboard. Sin embargo, en el momento que el cliente ingresa al botón del Dashboard, se implementó la ejecución de 3 diferentes funciones (MostCommented.js, OpenUserApp.js y UserEvents.js), de esta manera nuestro botón manda llamar a nuestra interfaz "DisplayDashboard" que a su vez funciona como "Facade" llamando las 3 interfaces mencionadas anteriormente, terminando en una sola pantalla donde el usuario puede interactuar con los 3 componentes, sin necesidad de realizar multiples interacciones.
<br/>
2- "Chain of responsibility" es implementada en nuestra interfaz "DisplayTweets", tenemos una función llamada "getTweets" que tiene un try/catch, donde, en caso de entrar al primer catch, se manda llamar a una segunda función llamada "getTweetsCache", que sirve para que, en caso de obtener error en la base de datos en la función principal, se intente obtener los datos almacenados en el localStorage del navegador. De esta manera le damos oportunidad a más de un objeto de procesar un "request" como en este caso, la solicitud de desplegar los tweets.
<br/>
3-"Observer" contamos con un observer en varios puntos de nuestro proyecto, los más claros son en nuestros "forms" de registro cuando cambian los valores que el usuario introduce, pero tambien contamos con un "observer" especial que es un hook de React, llamado "useEffect" y que notifica cuando cambian los valores de nuestro arreglo de tweets, para realizar una renderización nueva y mostrar los tweets con los cambios pertinentes (cuando se agrega uno nuevo)


Compiling
---------

If you have not installed the necessary dependencies, run the following command:

`npm install`

To compile the project, run:


`npm run build`

Running
-------

To run the project, run:

`npm start`

This will start the server and the web application will be accessible at `http://localhost:3000`.

Docker
------

To build the Docker image, navigate to the project directory and run the following command:

`docker build -t twitter-reloaded .`

This will create a Docker image with the tag `twitter-reloaded`. You can then run the image with the following command:

`docker run -p 3000:3000 twitter-reloaded`
