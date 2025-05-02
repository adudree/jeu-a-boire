import type { EQuestionType, ETargetNumber } from "~/enums/questions";

export declare interface IQuestion {
    question: string,
    questionType: {
        uid: EQuestionType,
        target: ETargetNumber
    }
}