import { Orgao } from "./dto/orgao.dto";
import { orgaoRepository } from "./repository/orgao.repository";

export const OrgaoService = {
  async validationOrgao(data: Orgao): Promise<any> {
    if (data.designacao == null || data.designacao == "") {
      return { error: "Designacao Não pode estar vazio !" };
    } else if (data.sigla == null || data.sigla == "") {
      return { error: "Sigla Não pode estar vazio !" };
   
    } else {
      //verificar se os dados ja se encontram presente
      const result = await orgaoRepository.findOneOrgaoBysigla(data.sigla);
      if (result.length != 0) {
        console.log(result);
        return { error: "Esta Orgao ja Encontra-se Cadastrado !" };
      } else {
        return { sucess: "Dados Válidos !" };
      }
    }
  },
};
