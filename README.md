<!--
title: 'AWS TypeScript Example'
description: 'This template demonstrates how to deploy a TypeScript function running on AWS Lambda using Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Desafio técnico usando serverless framework

Info sobre [Serverless framework](https://www.serverless.com/framework/)

## Instrucciones
### Desarrollar una API Restful:
- Que permita mediante un método, adjuntar un archivo solo de tipo .csv y almacenarlo en
un contenedor de tipo Bucket S3.
- Además desarrollar un método que permita listar todos los archivos del Bucket S3,
informando fecha de carga y nombre del archivo.
- Para asegurar este proyecto te pedimos que el mismo sea accesible solo desde el servicio
API Gateway de AWS y que este implemesnte cualquier tipo de validaciones de acceso que
creas conveniente.
- Por último, desarrollar un pequeño test funcional para probar que no se puedan adjuntar
archivos de otro tipo que no sean .csv. (para este punto te recomendamos que utilices la
herramienta postman)

### Aclaraciones

No existe ninguna preferencia en cuanto al lenguaje con el cual desarrollar esta actividad.
Te pedimos que utilices el framework serverless compatible con funciones lambda y que
el mismo se pueda desplegar en la nube de AWS en la región north virginia.

### Arquitectura para este proyecto

![Arquitectura del proyecto](/assets/img/arquitectura.jpg "Arquitectura del proyecto")

## Usage
Se implementarion los siguientes endpoints para resolver el desafio:

GET https://tu-dominio-aws/files/list

POST https://tu-dominio-aws/files/upload

### Endpoint GET files/list
Este endpoint no recibe paramnetros.
Responde con el listado de archivos presentes en el Bucket, ademas seagrego una propiedad con una url firmada para poder descargar el archivo.
La respuesta del endpoint es la siguiente:

```json
[
    {
        "uploadDate": "2023-07-31T13:27:36.000Z",
        "filename": "Nombre del archivo.csv",
        "signedUrl": "https://xxx/Nombre%archivo.csv?",
    }
]
```

### Endpoint POST files/upload
Este endpoint debe recibir un archivo, el mismo debe ser enviado con un content-type multipart/form-data

En caso de completarse la subida de forma exitosa la respuesta sera de la siguiente manera:

```json
{
    "signedUrl": "https://xxx/Nombre%archivo.csv?",
    "link": "https://xxx.s3.amazonaws.com/Nombre del Archivo.csv"
}
```

Solo se permite subir archivos .csv, en caso de intentar enviar un archivo de otro tipo la respuesta sera la siguiente:

```json
{
    "title": "WrongTypeExcepetion",
    "status": 400,
    "detail": "Only text/csv type files are allowed to be uploaded",
    "instance": "POST /files/upload",
    "code": "file003"
}
```
## Arquitectura del proyecto.
Se separo en 3 capas, infra , dominio y aplicacion.
Se utilizo inyeccion de dependencias mediante contructor, ademas que las funciones se diseñaron para tener una unica responsabilidad apoyandose en los principios SOLID.

Se utilizo la libreria [parse-multipart-data](https://www.npmjs.com/package/parse-multipart-data) para parsear el archivo que viene en multipart/form-data.

Se utlizo el aws-sdk para node, y se encapsulo toda la funcionalidad en un servicio

Se implemento un excpection handler para estandarizar la respuesta de los errores que pudieran producirse en la API. La respuesta esta inspirada en la publicacion [RFC7807](https://www.rfc-editor.org/rfc/rfc7807.html)

Se implemento autenticacion y autorizacion mediante el servicio de cognito. Con el token de vuelto, solo se valida que el usuario exista en cognito, para poder usar la api. Por el momento no se controlan roles ni permisos.
Se creo un endpoint de login para que el usuario pueda obtener el token que validad su identidad.
Con dicho token, es posible consumer los endpoints desarrollados


### Deployment

Correr el siguiente comando

```
$ serverless deploy --verbose
```
