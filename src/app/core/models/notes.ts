export interface Notes {
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

export interface Label {
    id: string
    label: string
    isDeleted: boolean
    userId: string
}
export interface Checklists {
    createdDate: Date
    id: string
    isDeleted: boolean
    itemName: string
    modifiedDate: Date
    notesId: string
    status: string
}

export interface Services {
    name: string
    description: string
}