  <p align="center">
    FrontEnd desarrollado para la Hackaton de Gentleman Programming
  </p>

_Adicionalmente funciona como PWA(Progresive Web App) que puede integrarse en cualquier dispositivo movil_

## :ledger: Index

-   [Pre-Requisitos](#pre-requisitos-)
-   [Instalación](#instalación-)
-   [PWA](#ejecutando-como-pwa-)
-   [Web-Authentication](#web-authn-fingerprint-)
-   [Despligue](#despliegue-)
    -   [Build](#build)
    -   [Docker](#docker)
-   [Generar APK](#generar-apk)
-   [Construido](#construido-con-)

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

_Puede visualizar una Demo del Proyecto en el siguiente enlace : http://hackaton.skyzerozx.com/#/login_

_**Usuario**_

```
skyzerobot64@gmail.com
Admin1
```

Mira **Despliegue** para conocer como desplegar el proyecto.

### Pre-requisitos 📋

_Software requerido_

```
NodeJS >= 16.X
NPM >= 8.X
AngularCli >= 14.X
```

_Software opcional_

```
Visual Studio Code ( O el editor de su preferencia)
```

### Instalación 🔧

_Para ejecutar un entorno de desarrollo_

_Previamente ejecutar el comando en la terminal para descargar "node_modules" para el funcionamiento del proyecto_

```
npm install
```

_Previamente configurar la ruta del API que consumira nuestro proyecto en el archivo **"src/environments/environment.ts"** campo **API_URL**_

_Para ejecutar un servidor de pruebas local usar el comando donde **"PUERTO"** sera el puerto donde deseamos ejecutar el proyecto , por default **ng serve** ejecuta el puerto 4200_

```
ng serve --port [PUERTO]
```

_Dirigirse a la ruta http://localhost:4200/#/login/ se tendra la pantalla de Login del sistema_

## Ejecutando como PWA 👨🏻‍💻

_Para ejecutar como PWA(Progressive Web App) , previamente debe tenerse instalado la libreria http-serve_

```
npm install --global http-server
```

_Una vez instalada proceder a ejecutar el siguiente comando , que nos permite ejecutar en entorno local nuestra PWA_

```
npm run start-pwa
```

_Este comando se encuentra configurado en el archivo *package.json de la raiz del proyecto por default ejecuta el puerto 8080*_

_La PWA se encuentra configurada para ejecutarse en la vista de Login si no se esta logeado_

_Se cuenta con soporte de notificaciones Push integrado tanto para escritorio como dispositivos moviles para avisos_

_Se creo el archivo `custom-service-worker.js` para la gestion de evento de notificaciones personalizado_

## Web Authn FingerPrint 👨🏻‍💻

_Cuenta con soporte para logeo mediante huella dactilar o patron/pin del dispostivo movil usando el estandar web authn_

<p align="center">
<img src="/docs/web-authn/web-authn_1.jpg" />
</p >
 
_Para habilitarlo ir al profile del usuario logeado_

<p align="center">
<img src="/docs/web-authn/web-authn_2.jpg" />
</p >

_Más informacion de Web Authn : https://webauthn.io/_

## Despliegue 📦

### Build

_Previamente configurar la ruta del API que consumira nuestro proyecto en el archivo src/environments/environment.prod.ts campo API_URL_

_Para realizar el despligue a produccion del proyecto ejecutar el siguiente comando_

```
ng build --configuration production
```

_El cual creara la carpeta "dist" en la raiz de nuestro proyecto el cual podemos desplegar en cualquier servidor que ejecute HTML CSS y JS_

_A su vez en un hosting con certificado HTTPS se podra ejecutar como una PWA que se podra "instalar"_

### Docker

_Para desplegar el proyecto mediante Docker se tiene los archivos `Dockerfile` y `docker-compose.prod.yaml`, los cuales tienen preconfigurado la imagen y dependencias necesarias para levantar el proyecto, se utilizo como base un servidor web Nginx_

_Para construir la imagen y ejecutarla tenemos el siguiente comando_

_Ejecutar el siguiente comando en la raiz del proyecto_

```
 docker-compose -f docker-compose.prod.yaml up --build
```

![Docker 1](/docs/docker/docker-1.jpg)

![Docker 2](/docs/docker/docker-2.jpg)

_En caso de requerir volver a ejecutar el contenedor del proyecto previamente creado ejecutar el comando:_

```
 docker-compose -f docker-compose.prod.yaml up
```

## Generar Apk

_Para generar un APK y posteriormente publicarlo se usara bubblewrap , el cual nos permite generar nuestra apk apartir del TWA(Trusted Web Activites)_

_Adicionalmente puede publicarse oficialmente en la PlayStore como un aplicación Android_

_Previamente instalar el CLI de bubblewrap con el siguiente comando_

```
npm i -g @bubblewrap/cli
```

_Inicializar el proyecto con el el `manifest.webmanifest` y este previamente publicado como una PWA en dominio con HTTPS , ejecutar el comando:_

```
bubblewrap init --manifest=https://YOUR_WEB_URL/manifest.webmanifest
```

_Realizar los pasos que se indican en consola teniendo previamente configurado las propiedades adecuadas de una PWA_

![Android 1](/docs/android/android-1.jpg)

![Android 2](/docs/android/android-2.jpg)

_Una vez finalizada la configuración ejecutar el siguiente comando_

```
bubblewrap build
```

![Android 3](/docs/android/android-3.jpg)

_Más información https://developer.chrome.com/docs/android/trusted-web-activity/quick-start/_

## Construido con 🛠️

_Las herramientas utilizadas son:_

-   [Angular](https://angular.io/docs) - El Framework para Desarrollo Web
-   [NPM](https://www.npmjs.com/) - Manejador de dependencias
-   [Docker](https://www.docker.com/) - Para el despliegue de aplicaciones basado en contenedores
-   [Visual Studio Code](https://code.visualstudio.com/) - Editor de Codigo
-   [Prettier](https://prettier.io/) - Formateador de Codigo
-   [TabNine](https://www.tabnine.com/) - Autocompletador de Codigo
-   [WebAuthn](https://webauthn.io/) - Web Authentication
-   [BubbleWarp](https://github.com/GoogleChromeLabs/bubblewrap) - CLI para crear APK usando TWA apartir de una PWA
-   [Black DashBoard](https://www.creative-tim.com/product/black-dashboard-angular) - Plantilla Web Utilizada

## Versionado 📌

Usamos [GIT](https://git-scm.com/) para el versionado.

## Autores✒️

-   [SkyZeroZx](https://github.com/SkyZeroZx)
-   [Jhoelssf](https://github.com/Jhoelssf)
-   [Andreverach](https://github.com/andreverach)
-   [code-sys](https://github.com/code-sys)
-   [cjosue15](https://github.com/cjosue15)
