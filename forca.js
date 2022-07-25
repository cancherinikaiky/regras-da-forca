class Forca {
  constructor(palavraSecreta) {
    this.palavraSecreta = this.ocultarPalavra(palavraSecreta);
    this.acertos = 0;
    this.letrasChutadas = [];
    this.vidasAtuais = 6;
  }

  // Converte palavra para array onde cada letra é uma posição
  palavraParaArray(palavra) {
    return palavra.split("");
  }

  // Cria uma arrayList de duas posições para armazenar a palavra em curso
  ocultarPalavra(palavra) {
    const arrayPalavra = this.palavraParaArray(palavra);
    const arrayOculta = [];
    arrayPalavra.forEach((letra) => {
      arrayOculta.push([[letra, "_"]]);
    });
    return arrayOculta;
  }

  // Atualiza e retorna a palavra oculta
  palavraAtualizada() {
    const palavraMontada = [];
    this.palavraSecreta.forEach((letraOculta) => {
      palavraMontada.push(letraOculta[0][1]);
    });
    return palavraMontada;
  }

  // Método booleano que verifica se a jogada tem uma única letra para ser válida
  validarChute(jogada) {
    const jaExiste = this.letrasChutadas.find(letra => letra === jogada);
    return jogada.replace(/\s+/g, '').length === 1 && !jaExiste;
  }

  // Atualiza a palavra quando alguma letra é acertada
  jogadaAcertada(letra) {
    this.palavraSecreta.forEach((letraOculta) => {
        if (letraOculta[0][0] === letra) {
            letraOculta[0][1] = letra;
            this.acertos += 1;
        }
    });
  }

  // Caso a situação de jogo demande, retira um valor x de vida
  retirarVida(quantVidas) {
    this.vidasAtuais -= quantVidas;
  }

  // Valida e executa a jogada
  chutar(letra) {
    if (this.validarChute(letra)) {
      this.letrasChutadas.push(letra);
      const verificarJogada = this.palavraSecreta.find(letraSecreta => letraSecreta[0][0] === letra);
      if (!verificarJogada) {
        this.retirarVida(1);
      } else {
        this.jogadaAcertada(letra);
      }
    }
  }

  // Confere o estado do jogo, "aguardando chute", "perdeu" ou ganhou
  buscarEstado() { 
    if (this.vidasAtuais === 0) {
      return "perdeu";
    } else if (this.palavraSecreta.length === this.acertos) {
      return "ganhou";
    }
    return "aguardando chute"; 
  }

  // Retorna os dados atualizados do jogo
  buscarDadosDoJogo() {
      return {
          vidas: this.vidasAtuais, // Quantidade de vidas restantes
          palavra: this.palavraAtualizada(), // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
          letrasChutadas: this.letrasChutadas // Deve conter todas as letras chutadas
      }
  }
}

module.exports = Forca;
