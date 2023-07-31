import { Request, Response } from "express";
import { ChatHistory } from "../models";

//  --------------------------------------------------------------------------------------------------------------------

//  Create a new chat history
export const createChatHistory = async (req: Request, res: Response) => {
  try {
    const { firstMessage, creatorWalletAddress } = req.body;
    const newChatHistory = (
      await ChatHistory.create({
        first_message: firstMessage,
        creator_wallet_address: creatorWalletAddress
      })
    ).dataValues;

    console.log(">>>>>>>>>>>> newChatHistory => ", newChatHistory);
    return res.send(newChatHistory);
  } catch (error) {
    console.log(">>>>>>>>>>>> error of createChatHistory => ", error);
    return res.sendStatus(500);
  }
};

//  Save messages
export const saveMessages = async (req: Request, res: Response) => {
  try {
    const { chatHistoryId, messages } = req.body;

    await ChatHistory.update(
      {
        messages: JSON.stringify(messages)
      },
      {
        where: {
          id: chatHistoryId
        }
      }
    );

    return res.sendStatus(200);
  } catch (error) {
    console.log(">>>>>>>>>>>> error of saveMessages => ", error);
    return res.sendStatus(500);
  }
};

//  Delete a chat history
export const deleteChatHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ChatHistory.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(">>>>>>>>>>>> error of deleteChatHistory => ", error);
    return res.sendStatus(500);
  }
};
