
import { Label } from "./label";
import { Checklists } from "./checkList";

export class Notes {
    title: string
    description: string
    color: string
    createdDate: Date
    modifiedDate: Date
    id:string
    imageUrl: string 
    isArchived: boolean
    isDeleted: boolean
    isPined: boolean
    reminder: [Date]
    noteLabels: Array<Label>
    userId: string
    noteCheckLists: Array<Checklists>
    questionAndAnswerNotes:Array<any>
}



