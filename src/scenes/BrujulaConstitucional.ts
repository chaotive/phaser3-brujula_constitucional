import * as Phaser from 'phaser';
import {Answer, GameData, GameState, Question} from "../BrujulaConstitucional.typings";
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;
import GameObject = Phaser.GameObjects.GameObject;

export default class BrujulaConstitucional extends Phaser.Scene
{
    gameData: GameData
    state: GameState
    volatileObjects: GameObject[]

    constructor ()
    {
        super();

        this.volatileObjects = [];
    }

    preload ()
    {
        // this.load.image('phaser3-logo', 'assets/phaser3-logo.png');
        // this.load.image('libs', 'assets/libs.png');

        this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        this.load.glsl('stars', 'assets/starfields.glsl.js');

        this.load.image('logo', 'assets/logo1.2.png');

        // this.load.text('textData', 'assets/text/appName.txt');
        this.load.json('jsonData', 'assets/json/sample.json');
        this.load.json('gameData', 'assets/json/brujulaConstitucional.json');

        this.load.image('button1', 'assets/ui/button1.1.png');
        this.load.image('result', 'assets/ui/result.png');
    }

    create ()
    {
        this.add.shader('RGB Shift Field', 0, 0, 800, 600).setOrigin(0);
        this.add.shader('Plasma', 0, 412, 800, 172).setOrigin(0);

        // this.add.image(400, 300, 'libs');
        //
        // const phaserLogo = this.add.image(400, 70, 'phaser3-logo');
        // this.tweens.add({
        //     targets: phaserLogo,
        //     y: 350,
        //     duration: 1500,
        //     ease: 'Sine.inOut',
        //     yoyo: true,
        //     repeat: -1
        // })

        const logo = this.add.image(10, 10, 'logo').setOrigin(0);

        // const textData = this.cache.text.get('textData');
        // this.add.dom(400, 300, 'div', 'background-color: rgba(0, 0, 80); width: 600px; height: 500px; font: 12px Courier; color: white; overflow: hidden', textData);

        // const jsonData = this.cache.json.get('jsonData');
        // console.log(jsonData)
        // this.add.dom(400, 300, 'div', 'background-color: rgba(0, 0, 80); width: 600px; height: 500px; font: 12px Courier; color: white; overflow: hidden', JSON.stringify(jsonData));

        this.gameData = this.cache.json.get('gameData');
        console.log(this.gameData)

        this.initState();
        this.showIntro()
        // this.showResult()
    }

    createState(): GameState {
        return {
            questionIndex: 0,
            answers: []
        }
    }

    initState() {
        this.state = this.createState()
    }

    showIntro() {
        const titleStyle: TextStyle = {
            fontSize: 25,
            color: "#d35400",
            backgroundColor: "#FFFF00"
        }

        const textStyle: TextStyle = {
            // fontSize: 34,
            // color: "#d35400",
            // backgroundColor: "#FFFF00"
        }

        this.registerVolatile(this.add.text(50,450, "¡Bievenido a la BRÚJULA CONSTITUCIONAL!", titleStyle));
        this.registerVolatile(this.add.text(50,500, "Responde unas sencillas preguntas, y orienta tu voto de cara al plebicito.", textStyle));

        this.registerVolatiles(this.makeStartButton(150))
    }

    showResult() {
        const titleStyle: TextStyle = {
            fontSize: 25,
            color: "#d35400",
            backgroundColor: "#FFFF00"
        }

        const textStyle: TextStyle = {
            // fontSize: 34,
            // color: "#d35400",
            // backgroundColor: "#FFFF00"
        }

        const resultStyle: TextStyle = {
            fontSize: 42,
            color: "#FF0000",
            // backgroundColor: "#FFFF00"
        }

        const buttonStyle: TextStyle = {
            fontSize: 25,
            color: "#0000FF",
            // backgroundColor: "#FFFF00"
        }

        const preferenceStyle: TextStyle = {
            fontSize: 30,
            color: "#FF00FF",
            // backgroundColor: "#FFFF00"
        }

        this.registerVolatile(this.add.text(50,450, "¡FELICIDADES!", titleStyle));
        this.registerVolatile(this.add.text(50,500, "Haz llegado al final del juego. Mira lo que hemos calculado como tu opción :)", textStyle));

        this.registerVolatile(this.add.sprite(260, -115, 'result').setOrigin(0).setScale(1.25));
        this.registerVolatile(this.add.text(430,70, "TU RESULTADO", resultStyle));

        let aFavorCount: number = 0
        this.state.answers.forEach(a => { if (a.type == 1) { aFavorCount++ } } )
        const aFavor = aFavorCount / this.gameData.questions.length * 100

        let enContraCount: number = 0
        this.state.answers.forEach(a => { if (a.type == 2) { enContraCount++ } } )
        const enContra = enContraCount / this.gameData.questions.length * 100

        let indecisoCount: number = 0
        this.state.answers.forEach(a => { if (a.type == 0) { indecisoCount++ } } )
        const indeciso = indecisoCount / this.gameData.questions.length * 100

        this.registerVolatile(
            this.add.text(435,100+50, "A favor: " + aFavor.toFixed(1) + "%", preferenceStyle));
        this.registerVolatile(
            this.add.text(435,100+75, "En Contra: " + enContra.toFixed(1) + "%", preferenceStyle));
        this.registerVolatile(
            this.add.text(435,100+100, "Indeciso: " + indeciso.toFixed(1) + "%", preferenceStyle));

        const button = this.add.sprite(450, 250, 'button1')
            .setOrigin(0).setScale(0.1).setInteractive();
        this.registerVolatile(this.add.text(475,250+25, "Jugar de nuevo", buttonStyle))
        button.on('pointerup', _ => {
            this.initState()
            this.cleanVolatiles()
            this.addQuestions()
        })
        this.registerVolatile(button);
    }

    answerQuestion(type: number)
    {
        console.log(type);
        this.state.answers.push({
            questionId: this.gameData.questions[this.state.questionIndex].id,
            type
        })

        this.state.questionIndex++;

        if (this.state.questionIndex == this.gameData.questions.length) {
            this.cleanVolatiles()
            this.showResult()
        }
        else this.addQuestions();
    }

    cleanVolatiles() {
        this.volatileObjects.forEach(o => o.destroy())
        this.volatileObjects = []
    }

    registerVolatile(object: GameObject) {
        this.volatileObjects.push(object)
    }

    registerVolatiles(objects: GameObject[]) {
        objects.forEach(o => this.volatileObjects.push(o))
    }

    addQuestions() {
        const question = this.gameData.questions[this.state.questionIndex];
        console.log(question);

        // clean sprites
        this.cleanVolatiles()

        // QUESTION
        this.registerVolatiles(this.makeQuestion(question))

        // ANSWERS
        this.registerVolatiles(this.makeAnswerButton(question.answers[0], 50))
        this.registerVolatiles(this.makeAnswerButton(question.answers[1], 150))
        this.registerVolatiles(this.makeAnswerButton(question.answers[2], 250))
    }

    makeQuestion(question:Question) {
        const style: TextStyle = {
            fontSize: 25,
            color: "#d35400",
            backgroundColor: "#FFFF00"
        }

        const questionTitle = this.add.text(50,450, "Pregunta " + (this.state.questionIndex + 1) + ":", style);
        const questionText = this.add.text(50,500, question.text, style);

        return [questionTitle, questionText]
    }

    makeAnswerButton(answer: Answer, y: number) {
        const style: TextStyle = {
            fontSize: 34,
            color: "#0000FF",
            // backgroundColor: "#FFFF00"
        }

        const button = this.add.sprite(450, y, 'button1')
            .setOrigin(0).setScale(0.1).setInteractive();
        const text = this.add.text(475,y+25, answer.text, style);
        button.on('pointerup', _ => this.answerQuestion(answer.type))

        return [button, text]
    }

    makeStartButton(y: number) {
        const style: TextStyle = {
            fontSize: 34,
            color: "#0000FF",
            // backgroundColor: "#FFFF00"
        }

        const button = this.add.sprite(450, y, 'button1')
            .setOrigin(0).setScale(0.1).setInteractive();
        const text = this.add.text(475,y+25, "Comenzar", style);
        button.on('pointerup', _ => {
            this.cleanVolatiles()
            this.addQuestions()
        })

        return [button, text]
    }
}
