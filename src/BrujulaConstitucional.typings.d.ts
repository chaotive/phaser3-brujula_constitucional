export interface Answer {
    text: string
    type: number
}

export interface Question {
    id: number
    text: string
    level: number
    answers: Answer[]
    answerExplanation: string
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
    questionIds: number[]
}
