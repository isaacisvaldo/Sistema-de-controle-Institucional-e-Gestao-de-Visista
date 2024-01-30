
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
