export async function generateCurrentDate(){
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1; // Mês é base 0, então somamos 1.
    const dia = dataAtual.getDate();
    const dataFormatada = `${ano}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    return dataFormatada
}