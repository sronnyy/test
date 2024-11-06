import { Scene } from 'phaser'

class BootScene extends Scene {
  constructor() {
    super('boot')
  }

  preload() {
    this.load.json('assets', './images/assetsK/assets.json')
    this.load.image('logo', './images/assetsK/logo.png')
  }

  create() {
    this.scene.start('loading')
  }
}

export default BootScene
