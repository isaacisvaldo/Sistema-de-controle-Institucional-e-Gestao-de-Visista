import { Response, Request } from "express";
import { globalRepository } from "../repository/global.repository";


export async function OrgaoList(req: Request, res: Response) {
  try {
    const user = req.session.user;
const orgao = await globalRepository.findAllOrgao()
    res.render("Dashboard/orgaos", {user,orgao });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
