import { Request, Response } from "express";

import { insertUser } from "../databaseAccess";

export default function createUserRoute(req: Request, res: Response) {
   const discordId = req.body.discordId as string;
   const name = req.body.name as string;

   if (!discordId) {
      res.status(400).send("Discord ID is required");
      return;
   }

   if (!name) {
      res.status(400).send("Name is required");
      return;
   }

   try {
      insertUser({ id: 0, discordId, name });
      res.status(200).send("User inserted");
   } catch (e) {
      res.status(500).send("Failed to insert user");
      return;
   }
}
