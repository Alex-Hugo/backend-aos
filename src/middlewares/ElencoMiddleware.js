const mongoose = require("mongoose");
const Elenco = require("../models/Elenco");

const ValidaID = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Id inválido!" });
  }

  try {
    const elenco = await Elenco.findById(id);
    if (!elenco) {
      return res.status(404).send({ msgMiddleware: "Elenco não encontrado!" });
    }
    res.elenco = elenco;
  } catch (err) {
    return res.status(500).send({ error: err });
  }

  next();
};

const ValidaBody = (req, res, next) => {
  const novoElenco = req.body;
  if (!novoElenco.times_id || !novoElenco.jogador1 || !novoElenco.jogador2 || !novoElenco.jogador3 || !novoElenco.jogador4|| !novoElenco.estrelaTime) {
    res
      .status(400)
      .send({ error: "Você não enviou todos os dados para o cadastro!" });
      return;
  }
  res.novoElenco = novoElenco;
  next();

};

module.exports = {
  ValidaID,
  ValidaBody,
};