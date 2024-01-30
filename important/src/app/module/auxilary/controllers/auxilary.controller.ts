import { Response, Request } from "express";
import { areaRepository } from "../areas/repository/areas.repository";
import { domain } from "../../../config/url-api/url";
import { Generation } from "../../../util/generation.fuction";
import { Area } from "../areas/dto/area.dto";
import { AreaService } from "../areas/areas.service";
import { orgaoRepository } from "../orgao/repository/orgao.repository";
import { OrgaoService } from "../orgao/orgao.service";
import { patenteRepository } from "../patente/repository/patente.repository";
import {Orgao} from '../orgao/dto/orgao.dto'
import { Patente } from "../patente/dto/patente.dto";
import { PatenteService } from "../patente/patente.service";
//Areas
export async function Areas(req: Request, res: Response) {
  try {
    const areas = await areaRepository.findAllAreas();
    console.log(areas);
    const categoria = await areaRepository.findAllCategoriaArea();
    const user = req.session.user;
    res.render("Dashboard/areas", {
      user,
      areas,
      categoria,
      domain,
      error: req.flash("error"),
      warning: req.flash("warning"),
      sucess: req.flash("sucess"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
export async function Add_areas(req: Request, res: Response) {
  try {
    const { nome, sigla, fk_categoria, areaSuperiorId } = req.body;
    const lastID = await areaRepository.obterAreaComMaiorID();
    console.log(lastID);
    const id = await Generation.gerarID(lastID);
    const data: Area = {
      areaID: id,
      nome: nome,
      sigla: sigla,
      fk_categoria: parseInt(fk_categoria),
      areaSuperiorId: parseInt(areaSuperiorId),
    };
    const verify = await AreaService.validationArea(data);

    if (!verify.error) {
      const PersistData = await areaRepository.PersistDatArea(data);

      if (!PersistData.error) {
        req.flash("sucess", `${PersistData.sucess}`);
        res.json({ sucess: PersistData.sucess });
      } else {
        res.json({ error: PersistData.error });
        console.log(PersistData.error);
      }
    } else {
      res.json({ error: verify.error });
      console.log(verify.error);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
export async function deleteArea(req: Request, res: Response) {
  try {
    const { areaID } = req.params;
    const area = await areaRepository.deleteArea(parseInt(areaID));
    if (area) {
      req.flash("sucess", "Area Deletado!");
      res.redirect("/Areas");
    } else {
      req.flash("error", "Erro ao  Deletado Area!");
      res.redirect("/Areas");
    }
  } catch (error) {
    req.flash("warning", "Erro Interno!");
    res.redirect("/Areas");
  }
}
//Orgao
export async function Orgao(req: Request, res: Response) {
  try {
    const orgaos = await orgaoRepository.findAllOrgao();
    const user = req.session.user;
    res.render("Dashboard/orgao", {
      user,
      orgaos,
      domain,
      error: req.flash("error"),
      warning: req.flash("warning"),
      sucess: req.flash("sucess"),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
export async function Add_orgao(req: Request, res: Response) {
  try {
    const { sigla, designacao } = req.body;
    const lastID = await orgaoRepository.obterorgaoComMaiorID();
    console.log(lastID);
    const id = await Generation.gerarID(lastID);
    const data: Orgao = {
      orgaoID: id,
      sigla: sigla,
      designacao: designacao,
    };

    const verify = await OrgaoService.validationOrgao(data);

    if (!verify.error) {
      const PersistData = await orgaoRepository.PersistDataOrgao(data);
      if (!PersistData.error) {
        req.flash("sucess", `${PersistData.sucess}`);
        res.json({ sucess: PersistData.sucess });
      } else {
        res.json({ error: PersistData.error });
        console.log(PersistData.error);
      }
    } else {
      res.json({ error: verify.error });
      console.log(verify.error);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
export async function deleteOrgao(req: Request, res: Response) {
  try {
    const { orgaoID } = req.params;
    const orgao = await orgaoRepository.deleteOrgao(parseInt(orgaoID));
    if (orgao) {
      req.flash("sucess", `${orgao.sucess}`);
      res.redirect("/Orgao");
    } else {
      req.flash("error", "Erro ao  Deletado Area!");
      res.redirect("/Orgao");
    }
  } catch (error) {
    req.flash("warning", "Erro Interno!");
    res.redirect("/Orgao");
  }
}
//Patente
export async function Patente(req: Request, res: Response) {
  try {
    const patentes = await patenteRepository.findAllPatente();
    const orgaos = await orgaoRepository.findAllOrgao();
    const user = req.session.user;
    res.render("Dashboard/patente", {
      user,
      patentes,
      orgaos,
      domain,
      error: req.flash("error"),
      warning: req.flash("warning"),
      sucess: req.flash("sucess"),
    });
    console.log(patentes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}
export async function Add_Patente(req: Request, res: Response) {
  try {
    const { designacao, fk_Orgao } = req.body;
    const lastID = await patenteRepository.obterPatenteComMaiorID();
    console.log(lastID);
    const id = await Generation.gerarID(lastID);
    const data: Patente = {
      PatenteID: id,
      designacao: designacao,
      fk_Orgao: parseInt(fk_Orgao),
    };
    const verify = await PatenteService.validationData(data);

    if (!verify.error) {
      const PersistData = await patenteRepository.PersistData(data);

      if (!PersistData.error) {
        req.flash("sucess", `${PersistData.sucess}`);
        res.json({ sucess: PersistData.sucess });
      } else {
        res.json({ error: PersistData.error });
        console.log(PersistData.error);
      }
    } else {
      res.json({ error: verify.error });
      console.log(verify.error);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
}