export default class ExampleText extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.image('logo', 'assets/phaser3-logo.png');
        this.load.text('data', 'assets/text/appName.txt');
    }

    create ()
    {
        // this.add.image(8, 8, 'logo').setOrigin(0);

        const data = this.cache.text.get('data');

        this.add.dom(400, 300, 'div', 'background-color: rgba(0, 0, 80); width: 600px; height: 500px; font: 12px Courier; color: white; overflow: hidden', data);
    }
}