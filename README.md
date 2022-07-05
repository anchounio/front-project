# MasterCard Gym App

Aplicación para organizar internamente los entrenamientos en un gimnasio.

# Características

Se trata de una API que permita publicar ejercicios para la gestión de los mismos en un gimnasio. Los usuarios serán los trabajadores del gimnasio.

# Puesta en marcha del back

Para que funcione la app (frontend del proyecto), primero tendrá que crearse una base de datos en mysql con el nombre Entrenamiento. Para ello basta con ejecutar una query desde mysql (File => New Query Tab) y dentro de la query introducir el comando "CREATE DATABASE Entrenamiento". A continuación desde la terminal de la API en Visual Studio tendremos que construir las tablas de la base de datos. Para ello hay que ejecutar el comando "npm run initDB". Esto creará las tablas y también al usuario admin. Después cargaremos la base de datos con el comando "npm run dev"

# Puesta en marcha del front

Una vez inicializada la api, bastará con ejecutar desde el font el comando "npm start".

# Funcionamiento

Solamente el usuario administrador puede crear, actualizar o borrar ejercicios. Para ello tendrá que logarse primero. Sus credenciales son:
user: admin
pass: 1234

Cualquier usuario que acceda a la app puede registrarse y después logarse. Una vez que un usuario normal está logado, puede ver los ejercicios
creados previamente por el admin, añadir ejercicios a favoritos, dar likes a los ejercicios y consultar su listado de ejercicios favoritos.
