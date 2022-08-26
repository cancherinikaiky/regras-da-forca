class Forca {
  constructor(palavraSecreta) {
    this._palavraSecreta = this.palavraParaArray(palavraSecreta);
    this._palavraJogada = this.ocultarPalavra(this._palavraSecreta);
    this._acertos = 0;
    this._chutes = [];
    this._vidasRestantes = 6;
  }

  // Getters
  get palavraSecreta() {
    return this._palavraSecreta;
  }
  get palavraJogada() {
    return this._palavraJogada;
  }
  get acertos() {
    return this._acertos;
  }
  get chutes() {
    return this._chutes;
  }
  get vidasRestantes() {
    return this._vidasRestantes;
  }

  // Converte palavra para array onde cada letra é uma posição
  palavraParaArray(palavra) {
    return palavra.split("");
  }

  // Cria a palavra oculta do mesmo tamanho que a palavra secreta
  ocultarPalavra(palavra) {
    const palavraJogada = [];
    for (let i = 0; i < palavra.length; i++) {
      palavraJogada[i] = "_";
    }
    return palavraJogada;
  }

  // Booleano que verifica se a letra já foi chutada
  letraExistente(jogada) {
    return this.chutes.find(letra => letra === jogada);
  }

  // Verifica se a jogada possui só uma letra
  quantLetras(jogada) {
    const jogadaSemEspacos = jogada.replace(/\s+/g, '');
    return jogadaSemEspacos.length === 1;
  }

  // Atualiza a palavra quando alguma letra é acertada
  atualizarPalavraJogada(jogada) {
    this.palavraSecreta.forEach((letra, i) => {
        if (letra === jogada) {
            this.palavraJogada[i] = jogada;
            this.atualizarAcertos();
        }
    });
  }

  // Caso o jogador acerte o chute, irá adicionar um acerto
  atualizarAcertos() {
    this._acertos += 1;
  }

  // Caso o jogador erre o chute, irá retirar uma vida
  retirarVida() {
    this._vidasRestantes -= 1;
  }

  // Verifica se a jogada é válida, e caso for, executa a jogada
  chutar(letraJogada) {
    if (!this.letraExistente(letraJogada) && this.quantLetras(letraJogada)) {
      this._chutes.push(letraJogada);
      const verificarJogada = this.palavraSecreta.find(letra => letraJogada === letra);
      if (verificarJogada) {
        this.atualizarPalavraJogada(letraJogada);
      } else {
        this.retirarVida();
      }
    }
  }

  // Verifica e atualiza o estado atual do jogo
  buscarEstado() {
    const estado = {
      perdeu: "perdeu",
      ganhou: "ganhou",
      aguardando: "aguardando chute"
    }

    if (this.vidasRestantes === 0) {
      return estado.perdeu;
    } else if (this.palavraSecreta.length === this.acertos) {
      return estado.ganhou;
    }
    return estado.aguardando;
  }

  // Retorna os dados atualizados do jogo
  buscarDadosDoJogo() {
      return {
          vidas: this.vidasRestantes, // Quantidade de vidas restantes
          palavra: this.palavraJogada, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
          letrasChutadas: this.chutes // Deve conter todas as letras chutadas
      }
  }
}

module.exports = Forca;
