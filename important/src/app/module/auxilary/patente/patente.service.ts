import { Patente } from "./dto/patente.dto";
import { patenteRepository } from "./repository/patente.repository";

export const PatenteService = {
  async validationData(data: Patente): Promise<any> {
    if (data.designacao == null || data.designacao == "") {
      return { error: "Nome Não pode estar vazio !" };
    } else if (data.fk_Orgao == null || data.fk_Orgao == undefined) {
      return { error: "Orgão Não pode estar vazio !" };
    } else {
      //verificar se os dados ja se encontram presente
      const result = await patenteRepository.findByDesinacao(data.designacao);
      if (result.length != 0) {
        console.log(result);
        return { error: "Esta Area ja Encontra-se Cadastrado !" };
      } else {
        return { sucess: "Dados Válidos !" };
      }
    }
  },
};
