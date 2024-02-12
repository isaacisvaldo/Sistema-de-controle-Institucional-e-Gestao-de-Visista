
export const Generation ={
    async gerarId(id:any){
        try {
            if (id !== undefined) {
                // Agora você pode usar 'func' de forma segura, sabendo que não é 'undefined'
                return id +1
              } else {
                return 'Error !!'
              }   
        } catch (error) {
            return 'Error !!'
        }
      }
}

export async function generateUniqueCodeVisita(): Promise<string> {
  const characters = '0123456789';
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  let letterCount = 0;
  for (let i = 0; i < 6; i++) {
    if (i === 0 || (i < 5 && Math.random() < 0.5 && letterCount < 1)) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      code += letters[randomIndex];
      letterCount++;
    } else {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
  }
  return code;
}
function generateUniqueCodeVisitanteAcess(length: number, characters: string): string {
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}
