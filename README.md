# Mc-info-data
Easy to use api to get useful information from any server or user in Minecraft.
## Why use?
### 🌀 Created with TS.
### 📦 Object Oriented
### 💥 Easy to use


#### ChangeLog
```diff
+ All lang changed to english.
+ Added interfaces.
```

### Support
```
You can find support on this discord.
https://discord.gg/xqS8PZB
```
#### Examples
```js
const { MCInfo } = require("mc-info-data");
const mcinfo = new MCInfo();

// Para obtener información de un servidor.
mcinfo.server("hypixel.net").then(console.log);

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
  players: { online: 108336, max: 200000 },
  version: 'Requires MC 1.8 / 1.16',
  hostname: 'mc.hypixel.net',
}
*/
```
### If you want to get the nickname history it is very easy!
```js
mcinfo.history("Nickname, example Rappi").then(console.log());
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
const moment = require("moment");
mcinfo.history("Rappi").then(m => {
  m.forEach(v => {
    console.log(v.name + " Changed on " + moment(v.changedToAt).format("L"));
  });
});
```

### Metodos.
```js
server() // Receive an IP parameter to search for information.

history() // Receive parameter a nickname to search for information

namemcLikes() // Receive parameter from a server to search for information

body() // Receive a nickname parameter, show the body of a skin

skin() // Receive a nickname parameter show a skin to download

icon() // Get a minecraft server IP as a parameter

namemcLikes() // Get a minecraft server IP as a parameter
```