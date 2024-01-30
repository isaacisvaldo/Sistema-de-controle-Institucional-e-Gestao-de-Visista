export interface UserSessionData {
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
   export enum Meses {
        Janeiro = 1,
        Fevereiro = 2,
        Março = 3,
        Abril = 4,
        Maio = 5,
        Junho = 6,
        Julho = 7,
        Agosto = 8,
        Setembro = 9,
        Outubro = 10,
        Novembro = 11,
        Dezembro = 12
  }
  export type userLogs = {
    logID?: number
    titulo: string
    descricao: string
    fk_user:number
    createdAt?: Date | string
    updatedAt?: Date | string
  }