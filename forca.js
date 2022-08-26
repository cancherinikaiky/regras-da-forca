class Forca {
    constructor(palavraSecreta) {
      this._palavraSecreta = this.palavraParaArray(palavraSecreta);
      this._palavraJogada = this.ocultarPalavra(this._palavraSecreta);
      this._acertos = 0;
      this._chutes = [];
      this._vidasRestantes = 6;
    }
  
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
  
    palavraParaArray(palavra) {
      return palavra.split("");
    }
  
    ocultarPalavra(palavra) {
      const palavraOculta = [];
      for (let i = 0; i < palavra.length; i++) {
        palavraOculta[i] = "_";
      }
      return palavraOculta;
    }
  
    letraNaoChutada(chute) {
      return this.chutes.indexOf(chute) === -1;
    }
  
    chuteComUmaLetra(jogada) {
      const jogadaSemEspacos = jogada.replace(/\s+/g, '');
      return jogadaSemEspacos.length === 1;
    }
    
     atualizarAcertos() {
      this._acertos += 1;
    }
  
    retirarVida() {
      this._vidasRestantes -= 1;
    }
  
    atualizarPalavraJogada(letraJogada) {
      this.palavraSecreta.forEach((letraSecreta, i) => {
          if (letraSecreta === letraJogada) {
              this.palavraJogada[i] = letraJogada;
              this.atualizarAcertos();
          }
      });
    }

    chuteCorreto(chute) {
        return this.palavraSecreta.indexOf(chute) !== -1;
    }
  
    chutar(chute) {
      const jogadaValida = this.letraNaoChutada(chute) && this.chuteComUmaLetra(chute);
      if (jogadaValida) {
        this._chutes.push(chute);
        if (this.chuteCorreto(chute)) {
          this.atualizarPalavraJogada(chute);
        } else {
          this.retirarVida();
        }
      }
    }
  
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

    buscarDadosDoJogo() {
        return {
            vidas: this.vidasRestantes,
            palavra: this.palavraJogada,
            letrasChutadas: this.chutes
        }
    }
  }
  
  module.exports = Forca;
  