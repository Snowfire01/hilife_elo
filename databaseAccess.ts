import fs from "fs";

import Match from "./model/match";
import User from "./model/user";

export function insertMatch(match: Match) {
   const matchDatabase = JSON.parse(fs.readFileSync("database/matches.json", "utf8"));

   // find unused id
   let id = 1;
   while (matchDatabase.some((match: Match) => match.id === id)) {
      id++;
   }
   match.id = id;

   matchDatabase.push(match);
   fs.writeFileSync("database/matches.json", JSON.stringify(matchDatabase));
}

export function getMatches(): Match[] {
   const matchDatabase = JSON.parse(fs.readFileSync("database/matches.json", "utf8"));
   return matchDatabase;
}

export function getMatchesForPlayer(playerId: number): Match[] {
   const matchDatabase = JSON.parse(fs.readFileSync("database/matches.json", "utf8"));
   return matchDatabase.filter((match: Match) => match.players.some((player) => player === playerId));
}

export function insertUser(user: User) {
   const userDatabase = JSON.parse(fs.readFileSync("database/users.json", "utf8"));

   // find unused id
   let id = 1;
   while (userDatabase.some((user: User) => user.id === id)) {
      id++;
   }
   user.id = id;

   userDatabase.push(user);
   fs.writeFileSync("database/users.json", JSON.stringify(userDatabase));
}

export function getUser(id: number): User | undefined {
   const userDatabase = JSON.parse(fs.readFileSync("database/users.json", "utf8"));
   return userDatabase.filter((user: User) => user.id === id)[0];
}
