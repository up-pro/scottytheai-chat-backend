import { Request, Response } from "express";
import {
  IdoClaimableScottyAmountOfInvestor,
  IdoInvestedToken,
  IdoInvestment,
  IdoSaleStage
} from "../models";

//  Invest ETH or USDT to claim SCOTTY token
export const invest = async (req: Request, res: Response) => {
  try {
    const {
      investorWalletAddress,
      investedTokenId,
      investedTokenAmount,
      scottyAmount,
      saleStageId
    } = req.body;

    //  The data of current sale stage
    const idoSaleStageData = (
      await IdoSaleStage.findOne({
        where: {
          id: saleStageId
        }
      })
    )?.dataValues;

    if (
      Number(idoSaleStageData.claimed_scotty_amount) >=
      Number(idoSaleStageData.hard_cap)
    ) {
      return res.sendStatus(409);
    }

    if (
      Number(idoSaleStageData.claimed_scotty_amount) + scottyAmount >
      Number(idoSaleStageData.hard_cap)
    ) {
      return res.sendStatus(409);
    }

    //  The data of user's investment in the current sale stage
    const idoInvestmentData = (
      await IdoInvestment.findOne({
        where: {
          investor_wallet_address: investorWalletAddress,
          id_invested_token: investedTokenId,
          id_sale_stage: saleStageId
        }
      })
    )?.dataValues;

    //  The data of claimable scotty amount of user
    const idoClaimableScottyAmountOfInvestorData = (
      await IdoClaimableScottyAmountOfInvestor.findOne({
        where: {
          investor_wallet_address: investorWalletAddress
        }
      })
    )?.dataValues;

    //  Update claimed_scotty_amount adding user's claimed scotty amount
    await IdoSaleStage.update(
      {
        claimed_scotty_amount:
          Number(idoSaleStageData.claimed_scotty_amount) + scottyAmount
      },
      { where: { id: saleStageId } }
    );

    if (idoInvestmentData) {
      //  If user has ever invested same token in the current sale stage

      //  Update invested token amount and scotty amount adding investedTokenAmount and scottyAmount
      await IdoInvestment.update(
        {
          invested_token_amount:
            Number(idoInvestmentData.invested_token_amount) +
            investedTokenAmount,
          scotty_amount: Number(idoInvestmentData.scotty_amount) + scottyAmount
        },
        {
          where: {
            investor_wallet_address: investorWalletAddress,
            id_invested_token: investedTokenId,
            id_sale_stage: saleStageId
          }
        }
      );

      //  Update user's claimable scotty amount adding scottyAmount
      await IdoClaimableScottyAmountOfInvestor.update(
        {
          claimable_scotty_amount:
            Number(
              idoClaimableScottyAmountOfInvestorData.claimable_scotty_amount
            ) + scottyAmount
        },
        {
          where: {
            investor_wallet_address: investorWalletAddress
          }
        }
      );
    } else {
      //  If user is new to invest this token in the current sale stage

      //  Insert user's first investment data
      await IdoInvestment.create({
        investor_wallet_address: investorWalletAddress,
        id_invested_token: investedTokenId,
        invested_token_amount: investedTokenAmount,
        scotty_amount: scottyAmount,
        id_sale_stage: saleStageId
      });

      if (idoClaimableScottyAmountOfInvestorData) {
        //  If user has ever invested any token before, update his claimable scotty amount adding scottyAmount
        await IdoClaimableScottyAmountOfInvestor.update(
          {
            claimable_scotty_amount:
              Number(
                idoClaimableScottyAmountOfInvestorData.claimable_scotty_amount
              ) + scottyAmount
          },
          {
            where: {
              investor_wallet_address: investorWalletAddress
            }
          }
        );
      } else {
        //  If user is new to invest token, insert his new data
        await IdoClaimableScottyAmountOfInvestor.create({
          investor_wallet_address: investorWalletAddress,
          claimable_scotty_amount: scottyAmount
        });
      }
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(">>>>>>>>>>>>>>> error of invest => ", error);
    return res.sendStatus(500);
  }
};

export const getInvestedTokens = async (req: Request, res: Response) => {
  try {
    const investedTokens = await IdoInvestedToken.findAll();
    return res.send(investedTokens);
  } catch (error) {
    console.log(">>>>>>>>>>>>>>> error of getInvestedTokens => ", error);
    return res.sendStatus(500);
  }
};
