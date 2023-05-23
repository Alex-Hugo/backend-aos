const mongoose = require("mongoose");
const Titulos = require("../models/Titulos");

const ValidaID = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Id inválido!" });
  }

  try {
    const titulos = await Titulos.findById(id);
    if (!titulos) {
      return res.status(404).send({ msgMiddleware: "Titulo não encontrado!" });
    }
    res.titulos = titulos;
  } catch (err) {
    return res.status(500).send({ error: err });
  }

  next();
};

const ValidaBody = (req, res, next) => {
  const novoTitulos = req.body;
  if (!novoTitulos.nomeTime || !novoTitulos.ano) {
    res
      .status(400)
      .send({ error: "Você não enviou todos os dados para o cadastro!" });
      return;
  }
  res.novoTitulos = novoTitulos;
  next();

};

module.exports = {
  ValidaID,
  ValidaBody,
};