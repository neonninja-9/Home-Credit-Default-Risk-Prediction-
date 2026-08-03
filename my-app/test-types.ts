import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

declare let token: JWT;
declare let session: Session;
declare let user: User;

let r1 = token.role;
let r2 = session.user.role;
let r3 = user.role;
