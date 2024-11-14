# easy-economy web admin y docente

## Descripción
**easy-economy web admin y docente** es una aplicación web diseñada para el uso de los docentes, en este caso tenemos 2 roles, el rol de la administracion de la PUCV la cual tiene el poder de Crear, editar y elimiar: ClavesPucv, Docentes y Alumnos, al no tener o existir una api de la PUCV para reducir tiempos y costos se tubo que optar por ingreso de datos manual por un ente. A su vez el rol de docente el cual tiene el control de los cursos, sus secciones; que puede añadir contenido y un link de youtube opcional, ademas de añadir cuestionarios y calculadoras para facilitar el uso de comprension y aprendizaje de los alumnos

## Integrantes
- Hector German Vera Martinez

## Requisitos Funcionales
1. **Inicio de Sesión del Docente**: El docente tendrá que iniciar sesión con su RUT y contraseña para poder acceder.
2. **Selección de ClavePucv**: El docente podrá acceder a la ClavePucv de su interés que ya está asignada por el ente de administración.
3. **Visualización de Cursos**: El docente podrá visualizar todos los cursos que tiene asignados en su ClavePucv.
4. **Agregar Curso**: El docente podrá agregar un curso para separar los contenidos.
5. **Editar Curso**: El docente podrá editar el contenido del curso.
6. **Eliminar Curso**: El docente tendrá el poder de eliminar todos los datos relacionados con el curso, incluyendo los datos creados por los alumnos, eliminando así cualquier rastro del curso en la base de datos.
7. **Ocultar Curso**: El docente tendrá la opción de ocultar un curso, lo que también ocultará sus secciones para evitar eliminar el curso.
8. **Visualización de Secciones de Curso**: El docente podrá acceder a las secciones del curso.
9. **Agregar Sección en Curso**: El docente tendrá la opción de agregar una sección al curso con contenido tipo texto de una descripción breve del tema y la opción de agregar un link de YouTube de apoyo.
10. **Editar Sección de Curso**: El docente tendrá la opción de editar la sección del curso.
11. **Eliminar Sección de Curso**: El docente tendrá la opción de eliminar una sección, lo que eliminará todo lo relacionado con la sección.
12. **Visualización de Cuestionarios**: El docente podrá ver los cuestionarios asociados a los cursos.
13. **Agregar Cuestionario**: El docente podrá agregar un cuestionario a un curso, incluyendo las preguntas y las respuestas que desee.
14. **Editar Cuestionario**: El docente podrá editar el cuestionario cuando lo desee.
15. **Eliminar Cuestionario**: El docente podrá eliminar el cuestionario, lo que eliminará todos los datos relacionados con él.
16. **Ocultar Cuestionario**: El docente podrá ocultar el cuestionario que desee y considere pertinente para no mostrar al estudiante.
17. **Visualización de Calculadoras**: El docente podrá ver las calculadoras que estén relacionadas con su ClavePucv.
18. **Agregar Calculadora**: El docente podrá crear una calculadora, evitando espacios en la fórmula de entrada, por ejemplo: "x = y a * b", para que funcione correctamente en la aplicación móvil.
19. **Editar Calculadora**: El docente podrá editar la calculadora que desee.
20. **Eliminar Calculadora**: El docente podrá eliminar la calculadora que considere pertinente, lo que eliminará todos los datos relacionados.
21. **Ocultar Calculadora**: El docente podrá ocultar la calculadora que desee y considere pertinente.

22. **Inicio de Sesión del Administrador**: El administrador tendrá que ingresar con sus credenciales.

23. **Ver ClavePucv**: El administrador podrá ver todas las ClavePucv en el sistema.

24. **Crear ClavePucv**: El administrador podrá crear una ClavePucv y agregar un docente para que la imparta. Además, cargará datos por defecto al crear la ClavePucv: cursos, secciones, cuestionarios, calculadoras.

25. **Editar ClavePucv**: El administrador podrá editar la ClavePucv que considere pertinente.

26. **Eliminar ClavePucv**: El administrador podrá eliminar la ClavePucv que desee, eliminando todos los datos relacionados con la ClavePucv.

27. **Ver Docentes**: El administrador podrá ver todos los docentes en el sistema.

28. **Crear Docente**: El administrador podrá crear un docente y asignarle una ClavePucv. Además, cargará datos por defecto al crear la ClavePucv: cursos, secciones, cuestionarios, calculadoras.

29. **Editar Docente**: El administrador podrá editar los datos del docente que considere pertinente.

30. **Eliminar Docente**: El administrador podrá eliminar el docente que desee, eliminando todos los datos relacionados con el docente.

31. **Ver Alumnos**: El administrador podrá ver todos los alumnos en el sistema.

32. **Crear Alumno**: El administrador podrá crear un alumno y asignarle una ClavePucv. Además, cargará datos por defecto al crear la ClavePucv: cursos, secciones, cuestionarios, calculadoras.

33. **Editar Alumno**: El administrador podrá editar los datos del alumno que considere pertinente.

34. **Eliminar Alumno**: El administrador podrá eliminar el alumno que desee, eliminando todos los datos relacionados con el alumno.


## Requisitos No Funcionales
1. **Rendimiento**: La aplicación debe cargar rápidamente y ser capaz de manejar múltiples interacciones simultáneas sin demoras significativas.
2. **Seguridad**: La seguridad de los datos del usuario debe ser garantizada, especialmente en lo relacionado con la autenticación y almacenamiento de contraseñas que estaran encriptadas y el funcionamiento de un token de duracion de 20 minutos, este para las consultas a la base de datos y la navegacion dentro de la aplicacion.
3. **Compatibilidad**: La aplicación debe estar apta para el uso de aplicaciones de escritorio y mobiles.
4. **Escalabilidad**: La arquitectura del sistema debe permitir la expansión de nuevas funcionalidades y un aumento en la cantidad de usuarios.
5. **Usabilidad**: La aplicación debe ser intuitiva, con una interfaz amigable y fácil de navegar para los estudiantes.

## Tecnologías Utilizadas
- **Firebase**: Para el despliegue del hosting de la aplicacion web.
- **Node.js**: Para la implementación de la API REST.
- **Neon.tech**: Para la gestión de datos datos.
- **React.js**: Para el desarrollo de la aplicación.
- **Boostrap**: Para aumentar la velocidad de Desarrollo
- **Fly.io**: Para el despliegue de la API y servicios backend.
- **Sequelize y Axios**: Para las consultas API y servicios de backend.

## Instalación
1. Clonar el repositorio
2. Abrir el proyecto en Visual Studio.
3. Abrir 2 terminales; una para el frontend y otro para el backend.
4. Para el backend, configurar el entorno y las credenciales de Firebase y Neon.tech.
5. Para el acceso de docente las credenciales son 123456789 y la contraseña: contrasenia123.
6. Para el acceso de admin la credenciales son abcd y contraseña: contrasenia123.