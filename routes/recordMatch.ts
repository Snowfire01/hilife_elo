import { Request, Response } from "express";

import { insertMatch, getUser } from "../databaseAccess";

export default function recordMatchRoute(req: Request, res: Response) {
   const players = req.body.players as number[];
   let date = req.body.date;
   const winner = req.body.winner as number;

   if (!date) {
      date = new Date();
   } else {
      try {
         date = new Date(date);
      } catch (e) {
         res.status(400).send("Invalid date");
         return;
      }
   }

   if (!players || players.length < 2) {
      res.status(400).send("At least two players are required");
      return;
   }

   if (!winner) {
      res.status(400).send("A winner is required");
      return;
   }

   if (!players.includes(winner)) {
      res.status(400).send("Winner must be one of the players");
      return;
   }

   for (const player of players) {
      if (!getUser(player)) {
         res.status(400).send(`Player ${player} does not exist`);
         return;
      }
   }

   try {
      insertMatch({ id: 0, date, players, winner });
      res.status(200).send("Match inserted");
   } catch (e) {
      res.status(500).send("Failed to insert match");
      return;
   }
}
