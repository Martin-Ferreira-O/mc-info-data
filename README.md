# Minecraft-Api-Easy
API en mantenimiento para obtener información de un servidor de minecraft
## ¿Porqué usarlos?
### 🌀 Creado con TypeScript.
### 📦 Orientado a objetos
### 💥 Facil de usar

## Ejemplos
```js
//Usando ecmascript 6
import { requestApi } from "Minecraft-Api-Easy";

const client = new requestApi;

// Para obtener información de un servidor.
client.server("hypixel.net").then(res => {
  console.log(res)
})
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


// Para obtener el historial de nicks de un usuario en minecraft
client.username("Nickname, example Rappi").then(m => {
  console.log(m)
})
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
```
