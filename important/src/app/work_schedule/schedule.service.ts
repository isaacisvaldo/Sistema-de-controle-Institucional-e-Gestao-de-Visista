import { Efetivo_pelotao } from "./dto/efetivo.pelotao.dto";
import { Escala } from "./dto/escala.dto";
import { Escala_permanenca } from "./dto/escala.permanenca.dto";
import { Escala_cctv } from "./dto/escala.pm.cctv.dto";
import { efetivo_pelotaoRepository } from "./repository/efetivo.pelotao.repository";
import { escalaRepository } from "./repository/escala.repository";
export const scheduleService = {
  async ValidarDataEfetivoPelotao(data: Efetivo_pelotao): Promise<any> {
    if (data.fk_funcionario == null || data.fk_funcionario == undefined) {
      return { error: "fk_funcionario  Não pode estar vazio !" };
    } else if (data.fk_pelotao == null || data.fk_pelotao == undefined) {
      return { error: "fk_pelotao  Não pode estar vazio !" };
    } else {
      //verificar se os dados ja se encontram presente
      const result = await efetivo_pelotaoRepository.findByFk_func_FK_pelotao(
        data.fk_funcionario
      );
      if (result.length > 0) {
        console.log(result);
        return { error: "Este Funcionario ja encontra-se Em um pelotão !" };
      } else {
        return { sucess: "Dados Válidos !" };
      }
    }
  },
  async ValidarDataEscala(data: Escala): Promise<any> {
    if (data.mes == null || data.mes == undefined|| data.mes=="") {
      return { error: "Mes  Não pode estar vazio !" };
   
    } else {
      //verificar se os dados ja se encontram presente
       return { sucess: "Dados Válidos !" };
    }
  },
  async ValidarDataEscala_permaneca(data: Escala_permanenca[]): Promise<any> {
    if (data[0].fk_escala == null || data[0].fk_escala == undefined) {
      return { error: "fk_escala  Não pode estar vazio !" };
    } else if (data[0].fk_funcionario == null || data[0].fk_funcionario == undefined) {
      return { error: "fk_funcionario  Não pode estar vazio !" };
    } else if(data[0].dia_d_semana==undefined||data[0].dia_d_semana==null) {
      return { error: "dia_d_semana  Não pode estar vazio !" };
    }  else if (data[0].fk_posicao == null || data[0].fk_posicao == undefined) {
        return { error: "fk_posicao  Não pode estar vazio !" };
    } else if (data[0].fk_funcionario ==  data[1].fk_funcionario ) {
      return { error: "Não podes escolher os mesmo funcionarios Para Estar Em duas posiçoes" };
  }else{
      //verificar se os dados ja se encontram presente
      const result = await escalaRepository.FilterEscalaPermanencas(data[0].dia_d_semana,data[0].fk_funcionario)
      if (result.length >0) {
        console.log(result);
        return { error: "Este Funcionario ja encontra-se Escalado !" };
      } else {
        return { sucess: "Dados Válidos !" };
      }
    }
  },
  async ValidarDataEscala_cctv(data: Escala_cctv): Promise<any> {
    if (data.fk_escala == null || data.fk_escala == undefined) {
      return { error: "fk_escala  Não pode estar vazio !" };
    } else if (data.fk_funcionario == null || data.fk_funcionario == undefined) {
      return { error: "fk_funcionario  Não pode estar vazio !" };
    } else if(data.dia_d_semana==undefined||data.dia_d_semana==null) {
      return { error: "dia_d_semana  Não pode estar vazio !" };
  
    }else{
     
        return { sucess: "Dados Válidos !" };
      
    }
  },
};
