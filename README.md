Repositorio de Proyecto Software correspondiente al segundo cuatrimestre de la 
asignatura en la Universidad de Zaragoza.

Pasos para configurar el proyecto en Windows:

Instalar Angular CLI:

1. - Descargar la última versión (LATEST) de NodeJS en la siguiente url:
	 https://nodejs.org/es/

2. - Instalar la aplicación, dejando todo como está en la misma.

3. - Instalar Git desde la siguiente url, seguir instalación normal:
	 https://git-scm.com/downloads

3. - Abrir la terminal de Windows con cmd, ejecutar con permisos de admin.

4. - Actualizar NPM, el gestor de paquetes de node, para bajarnos las 
	 dependencias más actuales:
	 npm install -g npm@latest

5. - Borrar la cache de NPM:
	 npm cache clean --force

6. - Desactivar las auditorias de NPM para evitar fallos:
	 npm set audit false
	
7. - Desinstalar los paquetes anteriores de Angular CLI
	 npm uninstall -g angular-cli
	 npm uninstall -g @angular/cli

8. - Borrar la cache de NPM de nuevo:
	 npm cache clean --force

9. - Instalar la última versión de Angular CLI para instalar Angular 9:
	 npm install -g @angular/cli@latest

10. - Ahora ya tenemos instalado y actualizado Angular CLI y ya podemos 
	 generar un nuevo proyecto de Angular 9
	 ng new
