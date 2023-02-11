<h1 align="center">Practical Work on Programação em Ambiente Web (Programming in Web Environment)</h1>

<p>
  <img src="http://img.shields.io/static/v1?style=for-the-badge&label=School%20year&message=2021/2022&color=sucess"/>
  <img src="http://img.shields.io/static/v1?style=for-the-badge&label=Discipline&message=PAW&color=sucess"/>
  <a href="https://github.com/nunofbcastro-ESTG-IPP/PAW/blob/main/Doc/2022.PAW.TP_AC_V1.pdf" target="_blank">
    <img src="https://img.shields.io/badge/-Utterance-grey?style=for-the-badge"/>
  </a>
  <a href="https://github.com/nunofbcastro-ESTG-IPP/PAW/blob/main/Doc/Relatorio_PAW_TP_Grupo9.pdf" target="_blank">
    <img src="https://img.shields.io/badge/-Report-grey?style=for-the-badge"/>
  </a>
</p>

---

<h2>Languages</h2>


<p align="left">
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&amp;logo=node.js&amp;logoColor=white" alt="NodeJS">
<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&amp;logo=express&amp;logoColor=%2361DAFB" alt="Express.js">
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&amp;logo=javascript&amp;logoColor=%23F7DF1E" alt="JavaScript">
<img src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&amp;logo=angular&amp;logoColor=white" alt="Angular">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&amp;logo=typescript&amp;logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&amp;logo=tailwind-css&amp;logoColor=white" alt="TailwindCSS">
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&amp;logo=html5&amp;logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&amp;logo=css3&amp;logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white" alt="MongoDB">

</p>

---

<h2>How to run</h2>

```
git clone https://github.com/nunofbcastro-ESTG-IPP/PAW.git
cd PAW
```

Before executing it, you have to change the STRIPE_SK, email and emailPassword values in the BackOffice/.env file and the stripe_pk value in the FrontOffice/src/environments/environment.ts file

Nota:

- [Stripe](https://stripe.com/docs/keys)
- [Email](https://outlook.live.com/owa/)

```
docker compose up
```

For the execution to be complete, the execution of BackOffice and FrontOffice must be complete.

The execution of BackOffice is finished when the following message appears:

```
 ** Angular Live Development Server is listening on 0.0.0.0:4200, open your browser on http://localhost:4200/ **
✔ Compiled successfully.
```

The execution of FrontOffice is finished when the following message appears:

```
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
connection succesful
```

---

<h2>How to restore database</h2>

cd Database
mongorestore --host localhost:27018 --username root --password rootpassword --authenticationDatabase admin --db paw backup/paw

---

<h2>Users already created</h2>

```
email:password
admin@gmail.com:Admin123
employee@gmail.com:Employee123
client@gmail.com:Client123
```

<h2>Endpoints</h2>

```
http://localhost:3000
http://localhost:3000/api-docs/
http://localhost:4200
```

---

<h2>Authors</h2>

<h3>
  Nuno Castro
  <a href="https://github.com/nunofbcastro?tab=followers">
    <img src="https://img.shields.io/github/followers/nunofbcastro.svg?style=social&label=Follow" />
  </a>
</h3>

<h3>
  Bruno Ferreira
  <a href="https://github.com/brunoferreira0106?tab=followers">
    <img src="https://img.shields.io/github/followers/BrunoFerreira02.svg?style=social&label=Follow" />
  </a>
</h3>
