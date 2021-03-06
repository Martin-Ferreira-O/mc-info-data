# Mc-info-data
Api completamente fácil de usar para obtener información útil de cualquier servidor o usuario en Minecraft.
## ¿Porqué usarlo?
### 🌀 Creado con TypeScript.
### 📦 Orientado a objetos
### 💥 Facil de usar


#### ChangeLog
```diff
+ Metodo body 
Muestra la imagen de una skin premium
+ Metodo skin
Muestra la imagen para descargar de una skin premium
+ Metodo namemcLikes
Mostrara las personas que han otorgado likes a un servidor de minecraft Mediante NameMC
- Muchos bugs arreglados.
Donde se hacian las requests
```

### Support
```
Puedes encontrar soporte en este discord.
https://discord.gg/xqS8PZB
```
#### Ejemplos
```js
const {requestApi} = require("mc-info-data");
const client = new requestApi();// Creamos un nuevo objeto.

// Para obtener información de un servidor.
client.server("hypixel.net").then(res => {// Devuelve promesa por lo que tambien podemos usar la sintaxis de async/await
  console.log(res)
});

/*
Response
{
  ip: '172.65.229.74',
  port: 25565,
  motd: {
    raw: [
      '             §aHypixel Network  §c[1.8-1.16]',
      '        §6§lSKYBLOCK 0.11 §7- §5§lDWARVEN MINES'
    ],
    clean: [
      '             Hypixel Network  [1.8-1.16]',
      '        SKYBLOCK 0.11 - DWARVEN MINES'
    ],
    html: [
      '             <span style="color: #55FF55">Hypixel Network  </span><span style="color: #FF5555">[1.8-1.16]</span>',
      '        <span style="color: #FFAA00"><span style="font-weight: bold;">SKYBLOCK 0.11 </span></span><span style="color: #AAAAAA">- </span><span style="color: #AA00AA"><span style="font-weight: bold;">DWARVEN MINES</span></span>'
    ]
  },
  players: { online: 108336, max: 200000, listUsers: undefined },
  version: 'Requires MC 1.8 / 1.16',
  hostname: 'mc.hypixel.net',
  software: undefined
}
*/
```
#### Para obtener el historial de nicks de un usuario en minecraft
```js
client.history("Nickname, example Rappi").then(m => {
  console.log(m)
});
/*
Response
[
  { name: 'ChipyKhao2014' },
  { name: 'RaulFTW98', changedToAt: 1423070842000 },
  { name: 'Parvi', changedToAt: 1432485897000 },
  { name: 'XenomYTB', changedToAt: 1436292345000 },
  { name: 'Jake_Saw', changedToAt: 1442421363000 },
  { name: 'zRappi', changedToAt: 1472142039000 },
  { name: 'Rappi', changedToAt: 1484933586000 }
]
*/
// Podrian usar un forEach para ver cada elemento del array y el npm momentjs para obtener una legible.

client.history("Rappi").then(m => {
  m.forEach(async (v) => {
    await console.log(v.name + " cambiado el " + moment(v.changedToAt).format("L"))
  })
});
```

### Metodos.
```js
server() // Recibe de parametro una IP a buscar información. <String> 
// Devuelve una promesa (Objeto con información del servidor).

history() // Recibe de parametro un nickname a buscar información
// Devuelve una promesa (Array de nicknames cambiados por el usuario).

namemcLikes() // Recibe de parametro un servidor a buscar información
// Devuelve una promesa (Array de nicksnames || Si el array supera los 500 nicknames otorgara un numero.)

body() // Recibe de parametro un nickname, muestra el cuerpo de una skin
// Devuelve una promesa (Buffer de la imagen)

skin() // Recibe de parametro un nickname muestra una skin para descarfar
// Devuelve una promesa (Buffer de la imagen)

icon() // Recibe de parametro un servidor de minecraft
// Devuelve una promesa (Buffer del icono)

// Devuelve una promesa (Objeto).
history() // Recibe de parametro un nickname a buscar información
// Devuelve una promesa (Array).
namemcLike() // Recibe de parametro un servidor a buscar información
// Devuelve una promesa (Array de nicks)
body() // Recibe de parametro un nickname, muestra el cuerpo de una skin
// Devuelve una promesa (URL de imagen)
skin() // Recibe de parametro un nickname muestra una skin para descarfar
// Devuelve una promesa (URL de imagen)
```

### Ejemplos usando discord.js

```js
// Usaremos un ejemplo mostrando de estado en nuestro bot los usuarios conectados en nuestra network.
const { Client } = require("discord.js");
const { requestApi } = require("mc-info-data");
const api = new requestApi();
const client = new Client();

client.on("ready", async () => {// Usamos una función asincronica para usar await.
	// Evento ready se ejecuta cuando el bot inicia sesión.
	setInterval(async () => {
		const request = await api.server("MiServer"); // Deben colocar la ip de su servidor acá.
		const usersOnline = request.players.online;
    	client.user.setActivity(`${usersOnline} en mi network.`, {
         	type: 'WATCHING'
      	});
  	}, 60000);
});
```
