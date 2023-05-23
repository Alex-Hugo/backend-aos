const Time = require("../models/Time");

const getAll = async (req, res) => {
  try {
    const times = await Time.find();
    if (times.length === 0) {
      return res.send({ error: "Nenhum time foi cadastrado!" });
    }
    return res.send({ times });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const create = async (req, res) => {
  const { nome, estado, cidade } = req.body;
  if (!nome || !estado || !cidade) {
    return res.send({
      message: "Você não enviou todos os dados necessários para o cadastro!",
    });
  }

  const novoTime = await new Time({
    nome,
    estado,
    cidade,
  });
  try {
    await novoTime.save();
    return res
      .status(201)
      .send({ message: "Time incluído com sucesso", novoTime });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const time = await res.time;
    res.status(200).send({ time });
  } catch (err) {
    return res.status(500).send({ error: err});
  }
};


const del = async (req, res) => {
  try {
    await res.time.remove();
    return res.send({message: "Time removido com sucesso!"})
  } catch (err) {
    return res.status(500).send({ error: err});
  }
}

const update = async (req,res) => {
  try { 
    await res.time.updateOne(res.novoTime);
  } catch (err) {
    res.status(500).send({ error: err});
  }
  res.send({message: "Time atualizado com sucesso!"});
} 

const filterByName = async (req, res) => {
  const nome = req.query.nome;
  if (!nome) {
    return res.status(400).send({message: "Parametro não recebido!"});
  }

  try {
    const personagens = await Time.find({nome: { $regex: `${nome}`, $options: "i"}})
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