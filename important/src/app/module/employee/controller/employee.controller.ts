import { Response, Request } from "express";
import { domain } from "../../../config/url-api/url";

import { orgaoRepository } from "../../auxilary/orgao/repository/orgao.repository";
import { areaRepository } from "../../auxilary/areas/repository/areas.repository";
import { Generation } from "../../../util/generation.fuction";
import { Funcionario } from "../types/types";
import { EmployeeService } from "../employee.service";
import { employeeRepository } from "../repository/employee.repository";




export  async  function Employees(req: Request, res: Response) {
    try {
      const employee = await employeeRepository.findAllEmployee();
      const orgao = await orgaoRepository.findAllOrgao();
      const area = await areaRepository.findAllAreas();
      const situacao = await employeeRepository.employeesituation()
      const user = req.session.user;
      console.log(employee);
      res.render("Dashboard/employee", {
        employee,
        user,
        domain,
        orgao,
        area,
        situacao,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  }
  export  async  function Add_employee(req: Request, res: Response) {
    try {
      const { nome, sobre_nome, fk_patente, nip, fk_situacao, fk_area } =
        req.body;
      console.log(nome, sobre_nome, fk_patente, nip, fk_situacao, fk_area);
      const func = await employeeRepository.obterFuncionarioComMaiorID();
      const id = await Generation.gerarID(func);
      const data: Funcionario = {
        nome: nome,
        sobre_nome: sobre_nome,
        fk_patente: parseInt(fk_patente),
        nip: nip,
        fk_situacao: parseInt(fk_situacao),
        fk_area: parseInt(fk_area),
        funcionarioID: id,
      };
      const verify = await EmployeeService.validation(data);

      if (!verify.error) {
        const PersistData = await employeeRepository.PersistData(data);

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
      res.status(500).json({ error: "Falha ao criar Funcionario." });
    }
  }
  export  async  function  deleteEmployee(req: Request, res: Response) {
    try {
      const { Id } = req.params;
      const employee = await employeeRepository.deleteEmployee(
        parseInt(Id)
      );
      if (employee) {
        req.flash("sucess", "Funcionario Deletado!");
        res.redirect("/Funcionarios");
      } else {
        req.flash("error", "Erro ao  Deletado Funcionario!");
        res.redirect("/Funcionarios");
      }
    } catch (error) {
      req.flash("warning", "Erro Interno!");
      res.redirect("/Funcionarios");
    }
  }

  