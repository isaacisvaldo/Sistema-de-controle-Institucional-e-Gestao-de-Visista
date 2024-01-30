import { Response, Request } from "express";
import { hash } from "bcryptjs";
import { domain } from "../../../config/baseUrl/url";
import { auxRepository } from "../repository/aux.repository";


export async function OrgaoList(req: Request, res: Response) {
  try {
    const user = req.session.user;
const orgao = await auxRepository.findAllOrgao()
    res.render("Dashboard/orgaos", {user,orgao });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
