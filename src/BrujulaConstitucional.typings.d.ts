export interface Answer {
    text: string
    type: number
    explanation: string
}

export interface Question {
    id: number
    text: string
    level: number
    answers: Answer[]
}

export interface GameData {
    questionsToAnswer: number
    questions: Question[]
}

export interface GameState {
    answers: {
        questionId: number
        type: number
    }[]
    questionIndex: number
    questionsPool: number[]
}
