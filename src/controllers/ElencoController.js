const Elenco = require("../models/Elenco");

const getAll = async (req, res) => {
  try {
    const elenco = await Elenco.find();
    if (elenco.length === 0) {
      return res.send({ error: "Nenhum elenco foi cadastrado!" });
    }
    return res.send({ elenco });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const create = async (req, res) => {
  const {times_id, jogador1, jogador2, jogador3, jogador4, estrelaTime } = req.body;
  if (!times_id|| !jogador1 || !jogador2 || !jogador3 || !jogador4 || !estrelaTime) {
    return res.send({
      message: "Você não enviou todos os dados necessários para o cadastro!",
    });
  }

  const novoElenco = await new Elenco({
    times_id,
    jogador1,
    jogador2,
    jogador3,
    jogador4,
    estrelaTime,
  });
  try {
    await novoElenco.save();
    return res
      .status(201)
      .send({ message: "Elenco incluído com sucesso", novoElenco });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const elenco = await res.elenco;
    res.status(200).send({ elenco });
  } catch (err) {
    return res.status(500).send({ error: err});
  }
};


const del = async (req, res) => {
  try {
    await res.elenco.remove();
    return res.send({message: "Elenco removido com sucesso!"})
  } catch (err) {
    return res.status(500).send({ error: err});
  }
}

const update = async (req,res) => {
  try { 
    await res.elenco.updateOne(res.novoElenco);
  } catch (err) {
    res.status(500).send({ error: err});
  }
  res.send({message: "Elenco atualizado com sucesso!"});
} 

const filterByName = async (req, res) => {
  const times_id = req.query.times_id;
  if (!times_id) {
    return res.status(400).send({message: "Parametro não recebido!"});
  }

  try {
    const personagens = await Elenco.find({times_id: { $regex: `${times_id}`, $options: "i"}})
    return res.send({ personagens })
  } catch (err) {
    res.status(500).send({error: err});
  }

}

module.exports = {
  getAll,
  create,
  getById,
  del,
  update,
  filterByName
};