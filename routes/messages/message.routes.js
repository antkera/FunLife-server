const Message = require("../../models/Message.model");

const router = require("express").Router();

// GET "/api/messages/:category" => devulve un json con los mensajes, invitaciones o solicitudes de amistad de el usuario actual de los funs publicos.

router.get("/:category", async (req, res, next) => {
  const { category } = req.params;
  const { _id } = req.payload;
  console.log("recibiendo llamada para mensajes");

  try {
    if (category === "received") {
      const response = await Message.find({ receiver: _id })
        .populate("fun", "description")
        .populate("sender", "username");
      res.json(response);
    }
    if (category === "sended") {
      const response = await Message.find({ sender: _id })
        .populate("fun", "description")
        .populate("receiver", "username");
      res.json(response);
    }
  } catch (error) {
    next(error);
  }
});

// POST "/api/messages/message" => devulve un json con los mensajes, invitaciones o solicitudes de amistad de el usuario actual. de los funs publicos.

router.post("/message", async (req, res, next) => {
  console.log(req.body);
  const { receiver, message } = req.body;
  const { _id } = req.payload;

  const messageToSend = {
    category: "message",
    sender: _id,
    receiver,
    message,
  };
  try {
    await Message.create(messageToSend);
    res.json("Message sended");
  } catch (error) {
    next(error);
  }
});
// DELETE "/api/messages/message" => borra un mensaje por id

router.delete("/delete/:_id", async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params._id);
    res.json("mensaje borrado");
  } catch (error) {
    next(error);
  }
});

// PUT "/messages/notFresh" => cambia isFresh de un mensaje a false

router.put("/notFresh/:_id", async (req, res, next) => {
  try {
    await Message.findByIdAndUpdate(req.params._id, {isFresh: false});
    res.json("message updated");
  } catch (error) {
    next(error);
  }
});

// POST "/api/messages/friend" => crea un mensaje de solicitud de amistad.

router.post("/friend", async (req, res, next) => {
  console.log(req.body);
  const { receiver } = req.body;
  const { _id } = req.payload;

  const messageToSend = {
    category: "friendReq",
    sender: _id,
    receiver,
    message: "Hi, do you want to be my friend?",
  };
  try {
    await Message.create(messageToSend);
    res.json("Message sended");
  } catch (error) {
    next(error);
  }
});

// POST "/api/messages/fun" => crea un mensaje de invitación a un fun

router.post("/fun", async (req, res, next) => {
  console.log(req.body);
  const { receiver } = req.body;
  const { _id } = req.payload;

  const messageToSend = {
    category: "friendReq",
    sender: _id,
    receiver,
    message: "Hi, do you want to be my friend?",
  };
  try {
    await Message.create(messageToSend);
    res.json("Message sended");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
