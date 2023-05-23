const routes = require("express").Router();
const TimesController = require("../controllers/TimesController");
const TimesMiddleware = require("../middlewares/TimesMiddleware");
const ElencoController = require("../controllers/ElencoController");
const ElencoMiddleware = require("../middlewares/ElencoMiddleware");
const TitulosController = require("../controllers/TitulosController");
const TitulosMiddleware = require("../middlewares/TitulosMiddleware");


routes.get("/times", TimesController.getAll);
routes.post("/times", TimesController.create);
routes.get("/times/:id", TimesMiddleware.ValidaID, TimesController.getById);
routes.delete("/times/:id", TimesMiddleware.ValidaID, TimesController.del);
routes.put("/times/:id", TimesMiddleware.ValidaID, TimesMiddleware.ValidaBody, TimesController.update);
routes.get("/filterByName", TimesController.filterByName); //filterByName?nome
routes.get("/elenco", ElencoController.getAll);
routes.post("/elenco", ElencoController.create);
routes.delete("/elenco/:id", ElencoMiddleware.ValidaID, ElencoController.del);
routes.get("/filterByName", ElencoController.filterByName);//filterByName?times_id
routes.get("/titulos", TitulosController.getAll);
routes.post("/titulos", TitulosController.create);
routes.get("/titulos/:id", TimesMiddleware.ValidaID, TitulosController.getById);
routes.delete("/titulos/:id", TitulosMiddleware.ValidaID, TitulosController.del);

module.exports = routes;