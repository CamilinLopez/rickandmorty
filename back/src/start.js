const server = require("./server");
const { database } = require("./db/DB_conection");
const { getApiData } = require("./controllers/getApiData");

const PORT = 3001;

database.sync({ force: false }).then(async () => {
    await getApiData();

    console.log("database conectada");
    server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}).catch((err) => console.log(err));