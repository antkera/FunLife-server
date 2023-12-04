const FunCollection = require("../../models/FunColletion.model");
const User = require("../../models/User.model");
const Fun = require("../../models/fun.model");
const Invitation = require("../../models/invitation.model");

const router = require("express").Router();

// GET "/api/user/findFriends" => devuelve un array con el nombre, apellido e id de todos los usuarios.
router.get("/findFriends", async (req, res, next) => {
  try {
    const response = await User.find().select({
      username: 1,
      lastName: 1,
      friends: 1,
    });
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// patch "/api/user/addFriend" => devuelve un array con el nombre, apellido e id de todos los usuarios.
router.patch("/addFriend", async (req, res, next) => {
  const { _id } = req.payload;
  console.log(req.body);
  const friendId = req.body._id;

  try {
    await User.findByIdAndUpdate(_id, { $addToSet: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $addToSet: { friends: _id } });

    res.json({ message: "invitación aceptada" });
  } catch (error) {
    next(error);
  }
});

// GET "/api/user/myProfile" => devuelve los datos de mi perfil

router.get("/myProfile", async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const response = await User.findById(_id).populate("friends");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// GET "/api/user/myFriends" => devuelve un array de mis amigos y sus ids
router.get("/myFriends", async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const response = await User.findById(_id).select("friends").populate({
      path: "friends",
      select: "_id username",
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/user/newFun" => recibe unos datos de un formulario y crea todo lo necesario para crear un fun
router.post("/newFun", async (req, res, next) => {
  console.log(req.body);
  const { newFun, arrUsers } = req.body;
  const { title, description, date, time, isPublic } = newFun;
  const { _id } = req.payload;

  try {
    const funCollection = { title };
    const respFunColl = await FunCollection.create(funCollection);

    const fun = {
      description,
      date,
      time,
      isPublic,
      collection: respFunColl._id,
      creator: _id,
    };

    const respFun = await Fun.create(fun);
    await FunCollection.findByIdAndUpdate(respFunColl._id, {
      $push: { funs: respFun._id },
    });
    console.log("response", respFunColl);
    const invitation = { inviter: _id, guests: arrUsers, fun: respFun._id };
    await Invitation.create(invitation);
    await User.findByIdAndUpdate(_id, {
      $push: { funs: respFun._id },
    });
  } catch (error) {
    console.log("aqui", error);
    next(error);
  }
});

// GET "/api/user/myFuns" => devulve un json con los datos de los funs del usuario.

router.get("/myFuns", async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const response = await User.findById(_id)
      .select({ funs: 1 })
      .populate({
        path: "funs",
        populate: {
          path: "collection",
          model: "FunCollection",
        },
      });

    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
