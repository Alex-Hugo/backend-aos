const Titulos = require("../models/Titulos");

const getAll = async (req, res) => {
  try {
    const titulos = await Titulos.find();
    if (titulos.length === 0) {
      return res.send({ error: "Nenhum titulo foi cadastrado!" });
    }
    return res.send({ titulos });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const create = async (req, res) => {
  const { nomeTime, ano, } = req.body;
  if (!nomeTime || !ano) {
    return res.send({
      message: "Você não enviou todos os dados necessários para o cadastro!",
    });
  }

  const novoTitulos = await new Titulos({
    nomeTime,
    ano,
  });
  try {
    await novoTitulos.save();
    return res
      .status(201)
      .send({ message: "Titulo incluído com sucesso", novoTitulos });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const titulos = await res.titulos;
    res.status(200).send({ titulos });
  } catch (err) {
    return res.status(500).send({ error: err});
  }
};


const del = async (req, res) => {
  try {
    await res.titulos.remove();
    return res.send({message: "Titulo removido com sucesso!"})
  } catch (err) {
    return res.status(500).send({ error: err});
  }
}

const update = async (req,res) => {
  try { 
    await res.titulos.updateOne(res.novoTitulos);
  } catch (err) {
    res.status(500).send({ error: err});
  }
  res.send({message: "Titulo atualizado com sucesso!"});
} 

module.exports = {
  getAll,
  create,
  getById,
  del,
  update,
};
