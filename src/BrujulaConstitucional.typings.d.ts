export interface Answer {
    text: string
    type: number
}

export interface Question {
    id: number
    text: string
    level: number
    answers: Answer[]
}

export interface GameData {
    questions: Question[]
}

export interface GameState {
    answers: {
        questionId: number
        type: number
    }[]
    questionIndex: number
}
