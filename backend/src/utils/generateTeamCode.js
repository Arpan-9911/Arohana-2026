import { customAlphabet } from "nanoid";

const generateTeamCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);

export default generateTeamCode;