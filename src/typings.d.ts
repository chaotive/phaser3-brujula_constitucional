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

export interface BrujulaConstitucionalData {
    questions: Question[]
}