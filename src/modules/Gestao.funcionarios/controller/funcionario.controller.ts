import { domain } from "../../../config/baseUrl/url";
import { Response, Request } from "express";
import { funcionarioRepository } from "../repository/funcionario.repository";
import { Funcionario } from "../dto/funcionario.dto";
import { Generation } from "../../../utils/generation.fuction";
import { EmployeeService } from "../funcionario.service";
import { areasRepository } from "../../Gestao.areas/repository/areas.repository";
import { Logs } from "../../Gestao.users/types/types";
import { getDeviceInfo } from "../../../utils/identify.device";
import { userRepository } from "../../Gestao.users/repository/user.repository";


export  async  function Funcionarios(req: Request, res: Response) {
    try {
      const funcionarios = await funcionarioRepository.findAllFuncionario();
      const situacao = await funcionarioRepository.findSituacaoFuncionario()
      const orgao = await funcionarioRepository.findAllOrgao()
      const areas= await areasRepository.findAllAreas()
      const user = req.session.user;
      res.render("Dashboard/funcionarios", {
        funcionarios,
        situacao,
        user,
        orgao,
        departamento:areas,
        domain,
        error: req.flash("error"),
        warning: req.flash("warning"),
        sucess: req.flash("sucess"),
      });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
}
  export  async  function FindFeathPatenteByOrgan(req: Request, res: Response) {
    try {
      const { patenteId } = req.body;
      console.log(req.body)
      const patente = await funcionarioRepository.findOnePatenteByOrgao(parseInt(patenteId));
      console.log(patente);
      return res.status(200).json({patente});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to create user." });
    }

}

export  async  function FuncionarioCreate(req: Request, res: Response) {
  try {
    const { nome, sobre_nome, fk_patente, nip, fk_situacao, fk_area } =req.body;
    const user = req.session?.user;
    const device = await getDeviceInfo()
    const func = await funcionarioRepository.obterFuncionarioComMaiorId();
    const id = await Generation.gerarId(func);
    const data: Funcionario = {
        funcionarioId:id,
        nome: nome,
        sobre_nome: sobre_nome,
        fk_patente: parseInt(fk_patente),
        fk_situacao: parseInt(fk_situacao),
        fk_area: parseInt(fk_area),
        nip: nip
    };
    const verify = await EmployeeService.validation(data);

    if (!verify.error) {
      const PersistData = await funcionarioRepository.PersistData(data);

      if (!PersistData.error) {
       
        const data: Logs = {
            titulo: "Inserção de Dados",
            descricao: `O Usuario ${user?.username} Inseriou Um novo funcionario ao Sistema !`,
            fk_user: user?.id as number,
            dispositivo: device.deviceName,
            ip: device.ipAddress,
            lat: device.latitude as number ,
            lng: device.longitude as number,
          }
       
        req.flash("sucess", `${PersistData.sucess}`);
        res.json({ sucess: PersistData.sucess });
        await userRepository.persistirDatalogsuser(data);
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
export  async  function  deleteFuncionario(req: Request, res: Response) {
  try {
    const { funcionarioId } = req.params;
    console.log(funcionarioId);
  const funcionario=   await funcionarioRepository.deleteFuncionario(
      parseInt(funcionarioId)
    );
    console.log(funcionario)
  
      res.redirect("/funcionario/Listar");
   
  } catch (error) {
    req.flash("warning", "Erro Interno!");
    res.redirect("/Funcionarios");
  }
}