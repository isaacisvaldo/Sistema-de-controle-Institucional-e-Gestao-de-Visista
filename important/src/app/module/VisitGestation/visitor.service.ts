import { Visitante } from "./dto/visitor.dto";

export const visitorService = {
  async ValidarDataVisitor(data: Visitante): Promise<any> {
    const dataAtual = new Date();
    const dataVencimento = new Date(data.Data_validade_doc);
    if (data.nome == ""){
      return { error: "Nome  Não pode estar vazio !" };
    } else  if(data.sobrenome == ""){
      return { error: "Sobrenome  Não pode estar vazio !" };
    }else if(dataAtual > dataVencimento ){
      return { error: "Presente documento fora do prazo" };

    }else if(data.contactos.length < 1 ){
    return { error: "Adicione ao minimo um contacto !" };
  }else if(data.num_identificacao ===""){
    return { error: "Adicione o numero do seu documento !" };
  }else if(data.Data_validade_doc===""){
    return { error: "A data de Validade do Documento não pode estar  vazio !" };
  }else if(data.visitaId===null){
    return { error: "Visita não encontrada" };
  }
  else{
    return { sucess: "Dados Válidos !" };
  }
}
  ,
 

};
