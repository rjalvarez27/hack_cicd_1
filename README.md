# hack_cicd_1
Practica social oplesk 

⚡️ Realizar los 5 Hacks ➔ (Ejercicios) ⚡️
📚 documentos comandos git 1 | comandos git 2 | comandos git 3 | configuración de cuenta
- NOTA HACER LAS PRÁCTICAS MEDIANTE LA CONSOLA DE GIT BASH  
Trucos	Detalles
H-1	Enviar un saludo de hola mundo
H-2	Detectar rama
H-3	Detectar solicitud de extracción
H-4	Crear un proceso de minify para un archivo .js
H-5	Enviar mensaje a telegram

🏆 H-1
Enviar un mensaje de hola mundo cuando se haga un push a la rama principal.

crear el directorio .github/workflows

Crear el archivo hola.yml

Ejemplo:

name: Hola Mundo

on:
  push:
    branches:
      - main

jobs:
  saludo:
    runs-on: ubuntu-latest
    
    steps:
    - name: Download Source
      uses: actions/checkout@v4
      
    - name: Say Hola Mundo
      run: echo "¡Hola mundo! Se ha realizado un push a la rama main."

🏆 H-2
Enviar un mensaje de (Hola Developer sino Hola Main) cuando se haga un push a las ramas correspondientes de: Main y Developer.

crear el directorio .github/workflows

Crear el archivo detectar_rama.yml

Ejemplo:

 name: SayHello

 on:
   push:
     branches:
       - develop
       - main

   pull_request:
     branches:
       - main
       - develop

       
 jobs:
  detect-branch:
     runs-on: ubuntu-latest

     steps:
       - name: Download Source
         uses: actions/checkout@v4
          
       - name: Say Hello Main
         if: ${{ github.ref == 'refs/heads/main' }}
         run: echo "Hello, main!"

🏆 H-3
Enviar un mensaje cuando se detecte un pull_request a la rama principal.

crear el directorio .github/workflows

Crear el archivo detectar_pr.yml

Ejemplo:

        - name: PR
          if: github.event_name == 'pull_request'
          run: echo "hello pull request"  

🏆 H-4
Desarrollar el proceso de minificar un archivo.js.

💡 enlace: acción de confirmación automática:

crear el directorio .github/workflows

Crear el archivo minify.yml

Otorgar permiso de escritura en github, para que el auto-commit se pueda ejecutar

Ejemplo:

  steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'  

      - name: Install minify
        run: npm install minify -g

      - name: Minify JavaScript
        run: minify main.js > main.min.js

      - name: Commit minified file
        uses: stefanzweifel/git-auto-commit-action@v5
        
        with:
          commit_message: "Minify JavaScript"

🏆 H-5
Enviar un mensaje a telegrama mediante CI/CD, para notificar una integración en principal.

💡 enlace: telegram-acción:

crear el directorio .github/workflows

Crear archivo telegram.yml

Crear canal en telegram

Registrar el "token y id" de telegram en el baùl de secretos en github

. Ejemplo:

name: telegram message
on: [push]
jobs:

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: send telegram message on push
        uses: appleboy/telegram-action@master
        with:
          to: ${{ secrets.TELEGRAM_CHAT_ID }}
          token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          message: |
            ${{ github.actor }} created commit:
            Commit message: ${{ github.event.commits[0].message }}
            Repository: ${{ github.repository }}
