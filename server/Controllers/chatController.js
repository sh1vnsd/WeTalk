const chatModel = require("../Models/chatModel")


//createChat
const createChat = async (req, res) => {
  //Id of the users having convo
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({

      //chech if members have 2 ids that we got from req.body
      members: { $all: [firstId, secondId] }
    })

    //If the chat already exists just return it
    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [firstId, secondId]
    })

    //Save chat to db
    const response = await newChat.save();

    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

//findUserChats
const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] }
    })

    res.status(200).json(chats);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

//findChat
const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] }
    })

    res.status(200).json(chat);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}


module.exports = { createChat, findUserChats, findChat };
