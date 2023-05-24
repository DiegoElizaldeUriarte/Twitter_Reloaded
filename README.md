# Twitter_Reloaded <br/> 
## Fernando Carlos Aceves Díaz - A01366071 <br/> Diego Raúl Elizalde Uriarte - A01748756 <br/>
<br/>
Twitter Reloaded is a social media platform that allows users to create tweets with 300 characters maximum, reply to tweets, and see their home dashboard with the recent 10 tweets. The dashboard contains tweets and threads. Every action triggered by Twitter Reloaded is registered as a new event at the event dashboard, with information such as the type of action, user who did the action, and timestamp. Reports can be generated based on the event data, such as the user who registered more events during the day, the most commented tweet of the day, and how many users opened the application during the day.

-- SOLID practices --
1-"The Single Responsibility Principle" está presente en practicamente todas nuestras funciones del codigo, pero un claro ejemplo de esté son nuestras funciones encargadas de realizar la creación de un tweet o la respuesta de un tweet. La función "createTweet" simplemente recibe el objeto con la información, utiliza la función de base de datos y agrega el tweet a la misma. La información del tweet es obtenida de otra función independiente (getTweetInfo) y el despliegue del tweet tambien se realiza en otra clase y, evidentemente, diferente función. (Clase: DisplayTweets, funcipon: getTweets)
2-"The Open Closed Principle", presente, por ejemplo, en nuestro archivo principal (Home.js) que está diseñado para que no deba ser modificado absolutamente nada de su esqueleto. En caso de requerir alguna modificación, se pueden agregar más componentes independientes, pero el codigo actual no tiene necesidad de ser modificado, pero capaz de permitir nuevos "hijos" o componentes agregados.
3- "Liskov Substitution Principle" lo podemos encontrar en el objeto de un nuevo Tweet, que ocupa basicamente la misma forma que el de una respuesta de tweet, simplemente cambiando un atributo (typeOfTweet) y que este ultimo, no contiene un contador de respuestas. Sin embargo, son perfectamente reemplazables dado que la respuesta de un tweet es basicamente el mismo objeto que un tweet original, sin un par de atributos.
4- "Interface segregation", en nuestra aplicación la interfaz principal solo muestra el recuedro para crear un tweet, así como los 10 tweets originales. El acceso a las interfaces adicionales está perfectamente presente de manera intuitiva mediante botones que nos llevan al Dashboard o algún hilo de respuestas. Las clases de las interfaces no depende una de otra
5- "Dependency Inversion Principle" - Nuestra función de alerta es reutilizable en varios de los componentes que tenemos, utilizando la abstracción y permitiendo su uso en varios componentes, cambiando simplemente el mensaje que queremos mostrar al usuario.

-- Design Patterns --
1-"Adapter", esta utilizado en nuestro registro de usuarios, dado que el usuario verá siempre la misma interfaz de registro, usando los mismos datos, pero en caso de cambiar la API con la que se realizan los registros, estos cambios no se verán reflejados para el usuario, al contrario, no debería notar los cambios dado que el codigo está diseñado para adaptarse a la API que se considere adecuada en ese momento para el registro. En este caso se trata de una conexión con Firebase pero en caso de cambiarla, los datos que se le solicitan al usuario serán exactamente los mismos.
2- "Decorator" es utilizado constantemente en el proyecto, dado que contamos con componentes que son vistos como interfaces por el usuario, mientras que estos componentes extienden a las clases (o funciones) de otros archivos que implementan la funcionalidad, por "detras" del componente. En nuestro componente "TweetForm" presente en Home.js, estamos pasando la información de usuario, para ser usado por detras en la implementación de este componente.
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
