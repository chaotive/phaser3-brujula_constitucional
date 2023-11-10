import * as Phaser from 'phaser';
import {Answer, GameData, GameState, Question} from "../BrujulaConstitucional.typings";
import GameObject = Phaser.GameObjects.GameObject;
import {
    stButtonText,
    stButtonTextSmall, stButtonTextSmall2,
    stLogo,
    stPreference, stPreferenceIndeciso,
    stResult,
    stText,
    stTitle
} from "../BrujulaConstitucional/styles";
import Rectangle = Phaser.GameObjects.Rectangle;
import {shuffle} from "../helpers";

export default class BrujulaConstitucional extends Phaser.Scene
{
    gameData: GameData
    state: GameState
    volatileObjects: GameObject[] = []
    disabledInteractives: GameObject[] = []
    modalVolatileObjects: GameObject[] = []
    progress: Rectangle[] = []

    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.image('phaser3-logo', 'assets/phaser3-logo.png');
        // this.load.image('libs', 'assets/libs.png');

        // this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        // this.load.glsl('stars', 'assets/starfields.glsl.js');

        this.load.image('logo', 'assets/logo1.2.png');

        // this.load.text('textData', 'assets/text/appName.txt');
        this.load.json('jsonData', 'assets/json/sample.json');
        this.load.json('gameData', 'assets/json/brujulaConstitucional.json');

        this.load.image('button1', 'assets/ui/button1.1.png');
        this.load.image('result', 'assets/ui/result.png');
        this.load.image('target', 'assets/ui/target.png');


        this.load.image('background1', 'assets/backgrounds/background1.png');
        this.load.image('banderachile', 'assets/backgrounds/banderachile.png');
        this.load.image('brujula', 'assets/backgrounds/brujula.png');

        this.load.text('textData', 'assets/text/appName.txt');
    }

    create ()
    {
        // this.scale.displaySize.setAspectRatio( 780 / 360 );
        // this.scale.refresh();

        // this.add.shader('RGB Shift Field', 0, 0, 1066, 600).setOrigin(0);
        // this.add.shader('Plasma', 0, 412, 1066, 172).setOrigin(0);

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

        this.add.image(0, 0, 'background1').setOrigin(0).setScale(1.3325);
        const bandera = this.add.image(133, -100, 'banderachile').setOrigin(0);
        bandera.alpha = 0.9;
        const brujula = this.add.image(20, 25, 'brujula').setOrigin(0).setScale(0.4);
        brujula.alpha = 0.8;
        this.add.text(36,90, "Brújula\nConstitucional", stLogo);
        // this.add.image(25, 25, 'logo').setOrigin(0).setScale(0.8);

        const frame = this.add.rectangle(533, 498, 1016, 172, 0xC0C0C0);
        frame.setStrokeStyle(2, 0xffffe6);
        frame.alpha = 0.9;
        this.tweens.add({
            targets: frame,
            scaleX: 0.99,
            scaleY: 0.97,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: 2 * 1000
        });

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

    removeProgress() {
        this.progress.forEach(o => o.destroy())
        this.progress = []
    }

    drawProgress() {
        for(let i = 0; i < this.gameData.questionsToAnswer; i++) {
            const block =
                this.add.rectangle(60 + i * 95, 377, 85, 25, 0xffffff)
                    .setOrigin(0);
            block.setStrokeStyle(2, 0xffff99);
            this.progress.push(block)
        }
    }

    generateQuestionsPool(): number[] {
        const ids = this.gameData.questions.map(q => q.id)
        const shuffledIds = shuffle(ids)
        return shuffledIds.slice(0, this.gameData.questionsToAnswer)
    }

    createState() {
        const state: GameState = {
            questionIndex: 0,
            answers: [],
            questions: this.generateQuestionsPool()
        }
        console.log(state)
        return state
    }

    initState() {
        this.state = this.createState()
    }

    showIntro() {
        this.registerVolatile(this.add.text(50,435, "¡BIENVENIDO!", stTitle));
        this.registerVolatile(this.add.text(50,500, "Juega respondiendo unas sencillas preguntas, \ny orienta tu voto de cara al plebicito.", stText));

        this.registerVolatiles(this.makeStartButton(450))
    }

    showResult() {
        this.registerVolatile(this.add.text(50,435, "¡FELICIDADES!", stTitle));
        this.registerVolatile(this.add.text(50,500, "Haz llegado al final del juego. \nMira lo que hemos calculado como tu opción :)", stText));

        // const result= this.registerVolatile(
        //     this.add.sprite(520, -115, 'result').setOrigin(0).setScale(1.25));
        // result.alpha = 0.9;
        const target = this.registerVolatile(
            this.add.sprite(730, 75, 'target').setOrigin(0).setScale(0.3));
        target.alpha = 0.7;
        this.registerVolatile(this.add.text(750,25, "Tu Resultado", stResult));

        let aFavorCount: number = 0
        this.state.answers.forEach(a => { if (a.type == 1) { aFavorCount++ } } )
        const aFavor = aFavorCount / this.gameData.questionsToAnswer * 100

        let enContraCount: number = 0
        this.state.answers.forEach(a => { if (a.type == 2) { enContraCount++ } } )
        const enContra = enContraCount / this.gameData.questionsToAnswer * 100

        let indecisoCount: number = 0
        this.state.answers.forEach(a => { if (a.type == 0) { indecisoCount++ } } )
        const indeciso = indecisoCount / this.gameData.questionsToAnswer * 100

        // this.registerVolatile(
        //     this.add.text(695,100+50, "A favor: " + aFavor.toFixed(1) + "%", stPreference));
        // this.registerVolatile(
        //     this.add.text(695,100+75, "En Contra: " + enContra.toFixed(1) + "%", stPreference));
        // this.registerVolatile(
        //     this.add.text(695,100+100, "Indeciso: " + indeciso.toFixed(1) + "%", stPreference));

        if (aFavor == enContra)
            this.registerVolatile(this.add.text(730,175, "INDECISO", stPreferenceIndeciso));
        else if (aFavor > enContra)
            this.registerVolatile(this.add.text(730,120, "A\nFAVOR", stPreference));
        else
            this.registerVolatile(this.add.text(700,120, "EN\nCONTRA", stPreference));

        const buttonExplain = this.add.sprite(740, 350, 'button1')
            .setOrigin(0).setScale(0.1, 0.05).setInteractive();
        buttonExplain.tint = 0XFF99FF;
        this.registerVolatile(this.add.text(765,330+25, "VER EXPLICACIÓN", stButtonTextSmall2))
        buttonExplain.on('pointerup', _ => this.showExplanationModal())
        this.registerVolatile(buttonExplain);

        const buttonAgain = this.add.sprite(740, 450, 'button1')
            .setOrigin(0).setScale(0.1).setInteractive();
        this.registerVolatile(this.add.text(755,450+25, "JUGAR DE NUEVO", stButtonTextSmall))
        buttonAgain.on('pointerup', _ => {
            this.initState()
            this.cleanVolatiles()
            this.drawProgress()
            this.showQuestion()
        })
        this.registerVolatile(buttonAgain);
    }

    showExplanationModal() {
        const textData = this.cache.text.get('textData');

        const dom = this.registerModalVolatile(this.add.dom(625, 350, 'div',
            'background-color: rgba(0, 0, 80); width: 740px; height: 440px; font: 12px Courier; color: white; overflow: auto; padding: 5px',
            textData));

        const frame = this.registerModalVolatile(
            this.add.rectangle(634, 100, 750, 50, 0xb38f00));
        frame.setStrokeStyle(2, 0x000050);

        this.registerModalVolatile(
            this.add.text(270,85, "Explicación de tu votación...", stText));

        const buttonCerrar = this.add.sprite(887, 79, 'button1')
            .setOrigin(0).setScale(0.045).setInteractive();
        this.registerModalVolatile(this.add.text(899,75+5, "CERRAR", stButtonTextSmall2))
        buttonCerrar.on('pointerup', _ => {
            this.cleanModalVolatiles()
            this.enableInteractives()
        })
        this.registerModalVolatile(buttonCerrar);

        this.disableInteractives()
    }

    getCurrentQuestion(): Question{
        const questionId = this.state.questions[this.state.questionIndex]
        const question = this.gameData.questions.filter(q => q.id == questionId)[0]
        if (!question) throw new Error("Question with id " + questionId + "not found")
        return question
    }

    answerQuestion(type: number)
    {
        // console.log(type);
        this.state.answers.push({
            questionId: this.getCurrentQuestion().id,
            type
        })

        this.state.questionIndex++;

        if (this.state.questionIndex == this.gameData.questionsToAnswer) {
            this.cleanVolatiles()
            this.removeProgress()
            this.showResult()
        }
        else this.showQuestion();
    }

    cleanVolatiles() {
        this.volatileObjects.forEach(o => o.destroy())
        this.volatileObjects = []
    }

    cleanModalVolatiles() {
        this.modalVolatileObjects.forEach(o => o.destroy())
        this.modalVolatileObjects = []
    }

    disableInteractives() {
        this.disabledInteractives = []
        this.volatileObjects.forEach(o => {
            // console.log(o.name)
            if (o.input?.enabled) {
                // console.log(o.name, "interactive")
                o.disableInteractive()
                this.disabledInteractives.push(o)
            }
        })
    }

    enableInteractives() {
        this.disabledInteractives.forEach(o => {
            o.setInteractive()
        })
        this.disabledInteractives = []
    }

    registerVolatile<T extends GameObject>(object: T) {
        this.volatileObjects.push(object)
        return object
    }

    registerVolatiles(objects: GameObject[]) {
        objects.forEach(o => this.volatileObjects.push(o))
    }

    registerModalVolatile<T extends GameObject>(object: T) {
        this.modalVolatileObjects.push(object)
        return object
    }

    registerModalVolatiles(objects: GameObject[]) {
        objects.forEach(o => this.modalVolatileObjects.push(o))
    }

    showQuestion() {
        const question = this.getCurrentQuestion();
        console.log(question);
        this.progress[this.state.questionIndex].fillColor = 0xcc3300
        if (this.state.questionIndex > 0) this.progress[this.state.questionIndex - 1].fillColor = 0x006699

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
        const questionTitle = this.add.text(50,435, "Pregunta " + (this.state.questionIndex + 1), stTitle);
        const questionText = this.add.text(50,500, question.text, stText);

        return [questionTitle, questionText]
    }

    makeAnswerButton(answer: Answer, y: number) {
        const button = this.add.sprite(740, y, 'button1')
            .setOrigin(0).setScale(0.1).setInteractive();
        button.alpha = 0.8;
        const text = this.add.text(765,y+20, answer.text, stButtonText);
        button.on('pointerup', _ => this.answerQuestion(answer.type))

        return [button, text]
    }

    makeStartButton(y: number) {
        const button = this.add.sprite(740, y, 'button1')
            .setOrigin(0).setScale(0.1).setInteractive();
        const text = this.add.text(770,y+15, "COMENZAR", stButtonText);
        button.on('pointerup', _ => {
            this.cleanVolatiles()
            this.drawProgress()
            this.showQuestion()
        })

        return [button, text]
    }
}
