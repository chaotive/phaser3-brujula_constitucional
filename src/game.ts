import * as Phaser from 'phaser';
import BrujulaConstitucional from "./scenes/BrujulaConstitucional";
// import Demo from "./scenes/Demo";
// import Example from "./scenes/Example";
// import BrujulaConstitucional from "./scenes/BrujulaConstitucional";
//
// // const config = {
// //     type: Phaser.AUTO,
// //     backgroundColor: '#125555',
// //     width: 800,
// //     height: 600,
// //     scene: Demo
// // };
//
// // const config = {
// //     type: Phaser.WEBGL,
// //     parent: 'phaser-example',
// //     scene: Example
// // };
//
// const config = {
//     type: Phaser.AUTO,
//     // parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     dom: {
//         createContainer: true
//     },
//     scene: BrujulaConstitucional
// };
//
// const game = new Phaser.Game(config);

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 1066,
    height: 600,
    scale: {
        // width: 1280,
        // height: 720,
        mode: Phaser.Scale.FIT
    },
    dom: {
        createContainer: true
    },
    scene: BrujulaConstitucional
};

const game = new Phaser.Game(config);
