import Phaser, { Scene } from 'phaser';
import options from '../constants/options';

class GameScene extends Scene {
  constructor() {
    super('game');
    this.score = 0; // Inicializa a pontuação como zero
  }

  create() {
    this.canThrow = true;
    this.knifeGroup = this.add.group();
    this.knife = this.add.sprite(window.game.config.width / 2, window.game.config.height / 5 * 4, 'knife');
    this.target = this.add.sprite(window.game.config.width / 2, 400, 'target');
    this.target.depth = 1;

    this.updateScore(); // Atualiza a pontuação inicial no DOM
    this.input.on('pointerdown', this.throwKnife, this);
  }

  update() {
    this.target.angle += options.rotationSpeed;
    const children = this.knifeGroup.getChildren();

    for (let i = 0; i < children.length; i++) {
      children[i].angle += options.rotationSpeed;
      const radians = Phaser.Math.DegToRad(children[i].angle + 90);
      children[i].x = this.target.x + (this.target.width / 2) * Math.cos(radians);
      children[i].y = this.target.y + (this.target.width / 2) * Math.sin(radians);
    }
  }

  throwKnife() {
    if (!this.canThrow) return;

    this.canThrow = false;
    this.tweens.add({
      targets: [this.knife],
      y: this.target.y + this.target.width / 2,
      duration: options.throwSpeed,
      callbackScope: this,
      onComplete: this.onCompleteThrowKnife,
    });
  }

  onCompleteThrowKnife() {
    let legalHit = true;
    const children = this.knifeGroup.getChildren();

    for (let i = 0; i < children.length; i++) {
      const isSameAngle = Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < options.minAngle;
      if (isSameAngle) {
        legalHit = false;
        break;
      }
    }

    if (legalHit) {
      this.score++; // Incrementa a pontuação ao acertar
      this.updateScore(); // Atualiza o elemento no DOM

      this.canThrow = true;
      const knife = this.add.sprite(this.knife.x, this.knife.y, 'knife');
      knife.impactAngle = this.target.angle;

      this.knifeGroup.add(knife);
      this.knife.y = window.game.config.height / 5 * 4;
    } else {
      this.score = 0; // Reinicia a pontuação ao errar
      this.updateScore(); // Atualiza o elemento no DOM para refletir a pontuação zerada

      this.tweens.add({
        targets: [this.knife],
        y: this.sys.game.config.height + this.knife.height,
        rotation: 5,
        duration: options.throwSpeed * 4,
        callbackScope: this,
        onComplete: () => {
          this.scene.start('game'); // Reinicia o jogo
        },
      });
    }
  }

  // Função para atualizar o elemento #score no DOM
  updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
      scoreElement.innerText = `${this.score}`;
    }
  }
}

export default GameScene;