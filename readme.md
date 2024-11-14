# easy-economy web admin y docente

## Descripción
**easy-economy web admin y docente** es una aplicación web diseñada para el uso de los docentes. En este caso, tenemos dos roles: el rol de la administración de la PUCV, que tiene el poder de crear, editar y eliminar ClavesPucv, Docentes y Alumnos; y el rol de docente, que tiene el control de los cursos, sus secciones, y puede añadir contenido y un link de YouTube opcional, además de añadir cuestionarios y calculadoras para facilitar el uso de comprensión y aprendizaje de los alumnos.

## Integrantes
- Hector German Vera Martinez

## Requisitos Funcionales

### 1.0 Cursos
1.1 **Visualización de Cursos**: El docente podrá visualizar todos los cursos que tiene asignados en su ClavePucv.
1.2 **Agregar Curso**: El docente podrá agregar un curso para separar los contenidos.
1.3 **Editar Curso**: El docente podrá editar el contenido del curso.
1.4 **Eliminar Curso**: El docente tendrá el poder de eliminar todos los datos relacionados con el curso, incluyendo los datos creados por los alumnos, eliminando así cualquier rastro del curso en la base de datos.
1.5 **Ocultar Curso**: El docente tendrá la opción de ocultar un curso, lo que también ocultará sus secciones para evitar eliminar el curso.

### 2.0 Secciones
2.1 **Visualización de Secciones de Curso**: El docente podrá acceder a las secciones del curso.
2.2 **Agregar Sección en Curso**: El docente tendrá la opción de agregar una sección al curso con contenido tipo texto de una descripción breve del tema y la opción de agregar un link de YouTube de apoyo.
2.3 **Editar Sección de Curso**: El docente tendrá la opción de editar la sección del curso.
2.4 **Eliminar Sección de Curso**: El docente tendrá la opción de eliminar una sección, lo que eliminará todo lo relacionado con la sección.

### 3.0 Cuestionarios
3.1 **Visualización de Cuestionarios**: El docente podrá ver los cuestionarios asociados a los cursos.
3.2 **Agregar Cuestionario**: El docente podrá agregar un cuestionario a un curso, incluyendo las preguntas y las respuestas que desee.
3.3 **Editar Cuestionario**: El docente podrá editar el cuestionario cuando lo desee.
3.4 **Eliminar Cuestionario**: El docente podrá eliminar el cuestionario, lo que eliminará todos los datos relacionados con él.
3.5 **Ocultar Cuestionario**: El docente podrá ocultar el cuestionario que desee y considere pertinente para no mostrar al estudiante.

### 4.0 Calculadoras
4.1 **Visualización de Calculadoras**: El docente podrá ver las calculadoras que estén relacionadas con su ClavePucv.
4.2 **Agregar Calculadora**: El docente podrá crear una calculadora, evitando espacios en la fórmula de entrada, por ejemplo: "x = y a * b", para que funcione correctamente en la aplicación móvil.
4.3 **Editar Calculadora**: El docente podrá editar la calculadora que desee.
4.4 **Eliminar Calculadora**: El docente podrá eliminar la calculadora que considere pertinente, lo que eliminará todos los datos relacionados.
4.5 **Ocultar Calculadora**: El docente podrá ocultar la calculadora que desee y considere pertinente.

### 5.0 Administración
5.1 **Inicio de Sesión del Administrador**: El administrador tendrá que ingresar con sus credenciales.
5.2 **Ver ClavePucv**: El administrador podrá ver todas las ClavePucv en el sistema.
5.3 **Crear ClavePucv**: El administrador podrá crear una ClavePucv y agregar un docente para que la imparta. Además, cargará datos por defecto al crear la ClavePucv: cursos, secciones, cuestionarios, calculadoras.
5.4 **Editar ClavePucv**: El administrador podrá editar la ClavePucv que considere pertinente.
5.5 **Eliminar ClavePucv**: El administrador podrá eliminar la ClavePucv que desee, eliminando todos los datos relacionados con la ClavePucv.
5.6 **Ver Docentes**: El administrador podrá ver todos los docentes en el sistema.
5.7 **Crear Docente**: El administrador podrá crear un docente y asignarle una ClavePucv. Además, cargará datos por defecto al crear la ClavePucv: cursos, secciones, cuestionarios, calculadoras.
5.8 **Editar Docente**: El administrador podrá editar los datos del docente que considere pertinente.
5.9 **Eliminar Docente**: El administrador podrá eliminar el docente que desee, eliminando todos los datos relacionados con el docente.
5.10 **Ver Alumnos**: El administrador podrá ver todos los alumnos en el sistema.
5.11 **Crear Alumno**: El administrador podrá crear un alumno y asignarle una ClavePucv. Además, cargará datos por defecto al crear la ClavePucv: cursos, secciones, cuestionarios, calculadoras.
5.12 **Editar Alumno**: El administrador podrá editar los datos del alumno que considere pertinente.
5.13 **Eliminar Alumno**: El administrador podrá eliminar el alumno que desee, eliminando todos los datos relacionados con el alumno.

### 6.0 Inicio de Sesión del Docente
6.1 **Inicio de Sesión del Docente**: El docente tendrá que iniciar sesión con su RUT y contraseña para poder acceder.
6.2 **Selección de ClavePucv**: El docente podrá acceder a la ClavePucv de su interés que ya está asignada por el ente de administración.

## Requisitos No Funcionales
1. **Rendimiento**: La aplicación debe cargar rápidamente y ser capaz de manejar múltiples interacciones simultáneas sin demoras significativas.
2. **Seguridad**: La seguridad de los datos del usuario debe ser garantizada, especialmente en lo relacionado con la autenticación y almacenamiento de contraseñas que estarán encriptadas y el funcionamiento de un token de duración de 20 minutos, este para las consultas a la base de datos y la navegación dentro de la aplicación.
3. **Compatibilidad**: La aplicación debe estar apta para el uso de aplicaciones de escritorio y móviles.
4. **Escalabilidad**: La arquitectura del sistema debe permitir la expansión de nuevas funcionalidades y un aumento en la cantidad de usuarios.
5. **Usabilidad**: La aplicación debe ser intuitiva, con una interfaz amigable y fácil de navegar para los estudiantes.

## Tecnologías Utilizadas
- **Firebase**: Para el despliegue del hosting de la aplicación web.
- **Node.js**: Para la implementación de la API REST.
- **Neon.tech**: Para la gestión de datos.
- **React.js**: Para el desarrollo de la aplicación.
- **Bootstrap**: Para aumentar la velocidad de desarrollo.
- **Fly.io**: Para el despliegue de la API y servicios backend.
- **Sequelize y Axios**: Para las consultas API y servicios de backend.

## Instalación
1. Clonar el repositorio.
2. Abrir el proyecto en Visual Studio.
3. Abrir 2 terminales; una para el frontend y otra para el backend.
4. Para el backend, configurar el entorno y las credenciales de Firebase y Neon.tech.
5. Para el acceso de docente, las credenciales son RUT: 123456789 y contraseña: contrasenia123.
6. Para el acceso de admin, las credenciales son usuario: abcd y contraseña: contrasenia123.