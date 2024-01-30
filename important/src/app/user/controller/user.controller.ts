import { Response, Request } from "express";
import { UserService } from "../user.service";
import { scheduleRepository } from "../../work_schedule/repository/schedule.repository";

import { efetivo_pelotaoRepository } from "../../work_schedule/repository/efetivo.pelotao.repository";
import { Efetivo_pelotao } from "../../work_schedule/dto/efetivo.pelotao.dto";
import { scheduleService } from "../../work_schedule/schedule.service";
import { escalaRepository } from "../../work_schedule/repository/escala.repository";
import { Escala } from "../../work_schedule/dto/escala.dto";
import { Escala_pelotao } from "../../work_schedule/dto/escala.pelotoes.dto";
import { Escala_pelotao_posto } from "../../work_schedule/dto/escala.pelotao.posto.dto";

import { patenteRepository } from "../../module/auxilary/patente/repository/patente.repository";
import { VisitorRepository } from "../../module/VisitGestation/repository/visitor.repository";
import { domain } from "../../config/url-api/url";
import { employeeRepository } from "../../module/employee/repository/employee.repository";
interface UserSessionData {
  id: number;
  username: string;
  imagenName: string;
  email: string;
  designacaoGrupo: string | undefined;
  designacaoPerfil: string | undefined;
  estado: number;
  perfilID: number;
  grupoID: number;
  situacao_funcionario: string | undefined;
  area: string | undefined;
  nip: string | undefined;
  sigla_area: string | undefined;
  orgao: string | undefined;
  patente: string | undefined;
}
declare module "express-session" {
  interface SessionData {
    user: UserSessionData;
  }
}
class UserController {
  async escalapermaneca(req: Request, res: Response) {
    try {

      const escala_permanenca =
        await escalaRepository.findAllEscalaPermanencas();
        interface Employee {
          funcionarioID: number;
          nome: string;
          sobre_nome: string;
        }
        
        interface Position {
          posicaoID: number;
          designacao: string;
        }
        
        interface Schedule {
          escalaID: number;
          mes: string;
          ano: string;
        }
        
        interface OriginalData {
          per_escalaID: number;
          dia_d_semana: string;
          fk_funcionario: number;
          fk_escala: number;
          fk_posicao: number;
          estado: number;
          createdAt: string;
          updatedAt: string;
          funcionario: Employee;
          posicoes_escalados: Position;
          escalas: Schedule;
        }
        
        interface TransformedData {
          [date: string]: {
            permanente?: { nome: string };
            reserva?: { nome: string };
          };
        }

        
        // function transformarFormato(dados: any): TransformedData {
        //   const novoFormato: TransformedData = {};
        
        //   dados.forEach((item: { dia_d_semana: any; funcionario: any; posicoes_escalados: any; }) => {
        //     const { dia_d_semana, funcionario, posicoes_escalados } = item;
        //     const { nome, sobre_nome } = funcionario;
        //     const { designacao } = posicoes_escalados;
        
        //     if (!novoFormato[dia_d_semana]) {
        //       novoFormato[dia_d_semana] = {};
        //     }
        
        //     const positionKey = designacao.toLowerCase() as 'permanente' | 'reserva';
        //     novoFormato[dia_d_semana][positionKey] = {
        //       nome: `${nome} ${sobre_nome}`
        //     };
        //   });
        
        //   return novoFormato;
        // }
        
        // const novoFormatoDados: TransformedData = transformarFormato(escala_permanenca);
        //   console.log(novoFormatoDados)
        //   console.log("novoFormatoDados")
      
          return res.status(200).json({ data: 'Em Desenvolvimento'});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
  }

  async error404(req: Request, res: Response) {
    try {
      const user = req.session.user;
      res.render("Dashboard/error/siteConstrucao", {
        user,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
  }

  async painelEscala(req: Request, res: Response) {
    try {
      const escalas = await escalaRepository.findAllEscala();
      const efetivo_pelotao =
        await efetivo_pelotaoRepository.findAllEfetivo_pelotao();
      const escala_de_permanecas =
        await escalaRepository.findAllEscalaPermanencas();
      
      const escala_peolatao =
        await escalaRepository.findAllEscala_de_pelotoes();
      const escala_de_pelotao_postos =
        await escalaRepository.findAllEscalaPelotaoposto();
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/painelEscalas", {
        escala_de_pelotao_postos,
        escala_peolatao,
      
        user,
        efetivo_pelotao,
        escalas,
        escala_de_permanecas,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
  }
  async painelClinic(req: Request, res: Response) {
    try {
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/painelclinic", {
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
  }
  async painelVisitas(req: Request, res: Response) {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1; // Mês é base 0, então somamos 1.
    const dia = dataAtual.getDate();
    
    const dataFormatada = `${ano}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    try {
      const user = req.session.user;
      const visita_visitante = await VisitorRepository.findAllVisitaVisitantetoday();
      const visitas = await VisitorRepository.findAllVisita();
      const visitantes=await VisitorRepository.findAllVisitor();
      console.log(visita_visitante)

      let v_servico=0
      let v_pessoal=0

      let v_servicodia=0
      let v_pessoaldia=0
      visitas.map(e=>{
        if(e.tipo_visita?.tipo_visitaID==1){
            v_pessoal=v_pessoal+1
        }else if(e.tipo_visita?.tipo_visitaID==2){
            v_servico=v_servico+1
        }
        if(e.tipo_visita?.tipo_visitaID==1 && e.data_visita==dataFormatada){
            v_servicodia=v_servicodia+1
        }else if(e.tipo_visita?.tipo_visitaID==2 && e.data_visita==dataFormatada){
            v_pessoaldia=v_pessoaldia+1
        }
      })
      let total =0
      visita_visitante.map(e=>{

        if(e.visitas?.data_visita==dataFormatada){
            total=total+ 1
        }
    })
      res.render("Dashboard/painelvisitas", {v_pessoaldia,v_servicodia,v_servico,v_pessoal, user,visita_visitante,visitas ,visitantes,total,dataFormatada});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
  }

  //Funcionarios

  async FindFeathPatente(req: Request, res: Response) {
    try {
      const { fk_Orgao } = req.body;
      const patente = await patenteRepository.findOnePatentefk_orgao(fk_Orgao);
      console.log(patente);
      res.json({ patente });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }
  }

  //Funções Escalas de Serviço
  async Escalas(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const escalas = await escalaRepository.findAllEscala();
      const tipo_escala = await scheduleRepository.findAllTipo_Escala();
      console.log(escalas);
      res.render("Dashboard/escalas", {
        user,
        domain,
        tipo_escala,
        escalas,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
 
  async EscalaSave(req: Request, res: Response) {
    try {
      const { mes, ano, fk_tipo_de_escala } = req.body;
      const data: Escala = {
        mes: mes,
        ano: ano,
        fk_tipo_de_escala: parseInt(fk_tipo_de_escala),
      };
      const PersistData = await escalaRepository.PersistData(data);

      if (!PersistData.error) {
        req.flash("sucess", `${PersistData.sucess}`);
        res.json({ sucess: PersistData.sucess });
      } else {
        res.json({ error: PersistData.error });
        console.log(PersistData.error);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed Internal." });
    }
  }
  async EscalaPermanencas(req: Request, res: Response) {
    try {
      const escala_permanenca =
        await escalaRepository.findAllEscalaPermanencas();
      const escalas = await escalaRepository.findAllEscala();
      const posicao = await scheduleRepository.findAllPosicaoEscalas();
      const user = req.session.user;
      const funcionario = await employeeRepository.findAllEmployee();
      const tipo_escala = await scheduleRepository.findAllTipo_Escala();
      console.log(escala_permanenca);
      res.render("Dashboard/escala_permanencas", {
        funcionario,
        escalas,
        tipo_escala,
        user,
        escala_permanenca,
        domain,
        posicao,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Form_Add_Escala_Permaneca(req: Request, res: Response) {
    
    try {
      const user = req.session.user;
      const employee =  await employeeRepository.findAllEmployee();
      const escala_permanenca =
        await escalaRepository.findAllEscalaPermanencas();
      console.log(escala_permanenca);
      
      res.render("Dashboard/form/register_escala_permaneca", {
        user,
        employee,
        escala_permanenca,
        domain,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }

  async EscalaPelotaoPosto(req: Request, res: Response) {
    try {
      const escala_de_pelotao_postos =
        await escalaRepository.findAllEscalaPelotaoposto();
      const escala_peolatao =
        await escalaRepository.findAllEscala_de_pelotoes();
      const funcionarios = await employeeRepository.findAllEmployee();
      const postos = await scheduleRepository.findAllPostos();
      const turnos = await scheduleRepository.findAllTurnos();
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/escala_pelotao_posto", {
        domain,
        turnos,
        postos,
        escala_de_pelotao_postos,
        funcionarios,
        escala_peolatao,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async EscalaPelotaoPostoSave(req: Request, res: Response) {
    try {
      const { escala_de_pelotoesID, turnoID, funcionarioID, postoID } =
        req.body;
      console.log(escala_de_pelotoesID, turnoID, funcionarioID, postoID);
      const data: Escala_pelotao_posto = {
        fk_escala_de_pelotoes: parseInt(escala_de_pelotoesID),
        fk_funcionario: parseInt(funcionarioID),
        fk_posto: parseInt(postoID),
        fk_turno: parseInt(turnoID),
      };
      const PersistData = await escalaRepository.PersistDataEscalaPelotaoposto(
        data
      );

      if (!PersistData.error) {
        req.flash("sucess", `${PersistData.sucess}`);
        res.json({ sucess: PersistData.sucess });
      } else {
        res.json({ error: PersistData.error });
        console.log(PersistData.error);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed Internal." });
    }
  }
  async EscalaPelotao(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const escalas = await escalaRepository.findAllEscala();
      const pelotao = await scheduleRepository.findAllPelotao();
      const escala_peolatao =
        await escalaRepository.findAllEscala_de_pelotoes();
      console.log(escala_peolatao);
      res.render("Dashboard/escala_pelotao", {
        escala_peolatao,
        domain,
        escalas,
        pelotao,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async EscalaPelotaoSave(req: Request, res: Response) {
    try {
      const { dia_d_semana, fk_pelotao, fk_escala } = req.body;
      const data: Escala_pelotao = {
        dia_d_semana: dia_d_semana,
        fk_pelotao: parseInt(fk_pelotao),
        fk_escala: parseInt(fk_escala),
      };
      const PersistData = await escalaRepository.PersistDataEscala_de_pelotoes(
        data
      );

      if (!PersistData.error) {
        req.flash("sucess", `${PersistData.sucess}`);
        res.json({ sucess: PersistData.sucess });
      } else {
        res.json({ error: PersistData.error });
        console.log(PersistData.error);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed Internal." });
    }
  }
  
  async Escala_cctv(req: Request, res: Response) {
    try {
      const escalas = await escalaRepository.findAllEscala();

      const funcionario = await employeeRepository.findAllEmployee();
      const user = req.session.user;
      const tipo_escala = await scheduleRepository.findAllTipo_Escala();
      const escala_cctv= await escalaRepository.findAllEscala_cctv()
      console.log(tipo_escala);
      res.render("Dashboard/escala_cctv", {
        domain,
        escala_cctv,
        tipo_escala,
        escalas,
        funcionario,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Escala_pm(req: Request, res: Response) {
    try {
      const escalas = await escalaRepository.findAllEscala();
  
      const funcionario = await employeeRepository.findAllEmployee();
      const user = req.session.user;
      const tipo_escala = await scheduleRepository.findAllTipo_Escala();
      console.log(tipo_escala);
      res.render("Dashboard/escala_pm", {
        domain,
    
        tipo_escala,
        escalas,
        funcionario,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Escala_deia(req: Request, res: Response) {
    try {
      const escalas = await escalaRepository.findAllEscala();
      
      const funcionario = await employeeRepository.findAllEmployee();
      const user = req.session.user;
      const tipo_escala = await scheduleRepository.findAllTipo_Escala();
      console.log(tipo_escala);
      res.render("Dashboard/escala_deia", {
        domain,
    
        tipo_escala,
        escalas,
        funcionario,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }

  async Form_Add_Escala_CCTV(req: Request, res: Response) {

    try {
      const user = req.session.user;
      const visitas = await VisitorRepository.findAllVisita();
      const employee = await employeeRepository.findAllEmployee();
      console.log(visitas);
      res.render("Dashboard/form/register_escala_cctv", {
        user,
        visitas,
        employee,
        domain,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Form_Add_Escala_PM(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const visitas = await VisitorRepository.findAllVisita();
      console.log(visitas);
      res.render("Dashboard/form/register_escala_pm", {
        user,
        visitas,
        domain,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Form_Add_Escala_DEIA(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const visitas = await VisitorRepository.findAllVisita();
      console.log(visitas);
      res.render("Dashboard/form/register_escala_deia", {
        user,
        visitas,
        domain,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Form_Add_Escala_Pelotao_posto(req: Request, res: Response) {
    try {
      const user = req.session.user;
      const visitas = await VisitorRepository.findAllVisita();
      console.log(visitas);
      res.render("Dashboard/form/register_escala_deia", {
        user,
        visitas,
        domain,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }

  async Posicoes_escalados(req: Request, res: Response) {
    try {
      const message = await UserService.getSigUp();
      const posicoes = await scheduleRepository.findAllPosicaoEscalas();
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/posicoes_escalados", { message, user, posicoes });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }

  async Pelotao(req: Request, res: Response) {
    try {
      const message = await UserService.getSigUp();
      const pelotao = await scheduleRepository.findAllPelotao();
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/pelotao", { message, user, pelotao });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Turnos(req: Request, res: Response) {
    try {
      const turnos = await scheduleRepository.findAllTurnos();
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/turnos", { user, turnos });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Tipo_escala(req: Request, res: Response) {
    try {
      const message = await UserService.getSigUp();
      const tipo_escala = await scheduleRepository.findAllTipo_Escala();
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/tipo_escala", { message, user, tipo_escala });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Posto(req: Request, res: Response) {
    try {
      const postos = await scheduleRepository.findAllPostos();
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/postos", { user, postos });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Efetivo_pelotao(req: Request, res: Response) {
    try {
      const pelotao = await scheduleRepository.findAllPelotao();
      const efetivo_pelotao =
        await efetivo_pelotaoRepository.findAllEfetivo_pelotao();
      const funcionario = await employeeRepository.findAllEmployee();
      const user = req.session.user;
      console.log(user);
      res.render("Dashboard/efetivo_pelotao", {
        user,
        funcionario,
        pelotao,
        domain,
        efetivo_pelotao,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Efetivo_pelotaosearch(req: Request, res: Response) {
    try {
      const { pelotaoID } = req.body;

      const pelotaoposto = await escalaRepository.findOneEscalaPelotaoposto(
        parseInt(pelotaoID)
      );
      if (pelotaoposto != undefined) {
        const pelotao = await scheduleRepository.findPelotao_Funcionario(
          pelotaoposto.fk_pelotao
        );
        res.json({ pelotao });
        console.log(pelotao);
      } else {
        res.json({});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to ..." });
    }
  }
  async Efetivo_pelotao_save(req: Request, res: Response) {
    try {
      const { fk_pelotao, fk_funcionario } = req.body;
      console.log(fk_funcionario);
      // const lastID = await efetivo_pelotaoRepository.obterEfetivo_pelotaoComMaiorID();
      // console.log(lastID);
      // const id = await Generation.gerarID(lastID);
      const data: Efetivo_pelotao = {
        fk_funcionario: parseInt(fk_funcionario),
        fk_pelotao: parseInt(fk_pelotao),
      };
      const verify = await scheduleService.ValidarDataEfetivoPelotao(data);

      if (!verify.error) {
        const PersistData = await efetivo_pelotaoRepository.PersistData(data);

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
      return res.status(500).json({ error: "Failed Internal." });
    }
  }
 
}
export default UserController;
