import User from "./user";

export default interface Match {
   id: number;
   date: Date;
   players: number[];
   winner: number;
}
