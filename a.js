const { requestApi } = require("./dist/index");

const data = new requestApi();
data.server().then(console.log())