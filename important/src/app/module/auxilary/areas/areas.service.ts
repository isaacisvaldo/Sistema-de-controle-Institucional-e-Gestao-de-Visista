import { Area } from "./dto/area.dto";
import { areaRepository } from "./repository/areas.repository";


export const AreaService ={
    async  validationArea(data:Area):Promise <any> {
        
        if(data.nome == null || data.nome==""){
            return {error:'Nome Não pode estar vazio !'};
        }else if(data.sigla== null || data.sigla==""){
            return {error:'Sigla Não pode estar vazio !'};
        }else if(data.fk_categoria== null || data.fk_categoria==undefined){
            return {error:'A Categoria  Não pode estar vazio !'};
         
        }else {
            //verificar se os dados ja se encontram presente
            const result = await areaRepository.findAOneBySigla(data.sigla)
            if(result.length !=0){
                console.log(result)
                return {error:'Esta Area ja Encontra-se Cadastrado !'};     
            }else{
                return {sucess:'Dados Válidos !'};  
            }
        }
        
      },

     
    }