import { Request, Response } from "express";
import { ChatHistory } from "../models";
import { getCurrentDate } from "../utils/functions";

//  --------------------------------------------------------------------------------------------------------------------

//  Create a new chat history
export const createChatHistory = async (req: Request, res: Response) => {
  try {
    const { title, creatorWalletAddress } = req.body;
    const currentDate = getCurrentDate();
    const newChatHistory = (
      await ChatHistory.create({
        title,
        creator_wallet_address: creatorWalletAddress,
        created_date: currentDate,
        updated_date: currentDate
      })
    ).dataValues;

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
    const currentDate = getCurrentDate();

    await ChatHistory.update(
      {
        messages: JSON.stringify(messages),
        updated_date: currentDate
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

//  Get a user's chat histories
export const getChatHistories = async (req: Request, res: Response) => {
  try {
    const { creatorWalletAddress } = req.params;

    const chatHistories = await ChatHistory.findAll({
      where: {
        creator_wallet_address: creatorWalletAddress
      },
      order: [["updated_at", "DESC"]]
    });
    return res.send(chatHistories);
  } catch (error) {
    console.log(">>>>>>>>>>>> error of getChatHistories => ", error);
    return res.sendStatus(500);
  }
};

export const updateTitleOfChatHistory = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(">>>>>>>>>>>> error of getChatHistories => ", error);
    return res.sendStatus(500);
  }
};
