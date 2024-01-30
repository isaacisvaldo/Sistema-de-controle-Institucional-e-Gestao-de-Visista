export interface Area {
    areaID: number,
    nome: string,
    sigla: string,
    fk_categoria: number,
    areaSuperiorId: number |null | undefined,
  }