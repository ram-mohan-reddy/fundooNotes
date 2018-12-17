
import { Label } from "./label";
import { Checklists } from "./checkList";

export class Notes {
  public  title: string;
  public  description: string;
  public  color: string
  public  createdDate: Date
  public  modifiedDate: Date
  public  id:string
  public  imageUrl: string 
  public  isArchived: boolean
  public  isDeleted: boolean
  public  isPined: boolean
  public  reminder: [Date]
  public  noteLabels: Array<Label>
  public  userId: string
  public  noteCheckLists: Array<Checklists>
  public  questionAndAnswerNotes:Array<any>
    
  constructor(title,description,color,createdDate,modifiedDate,id,imageUrl,isArchived,
                isDeleted,isPined,reminder,noteLabel,userId,noteCheckList,questionAndAnswerNote) {

                    this.title = title;
                    this.description =description;
                    this.color = color;
                    this.createdDate = createdDate;
                    this.modifiedDate = modifiedDate;
                    this.id = id;
                    this.imageUrl =imageUrl;
                    this.isArchived = isArchived;
                    this.isDeleted = isDeleted;
                    this.isPined = isPined;
                    this.reminder = reminder;
                    this.noteLabels.push(noteLabel);
                    this.userId = userId;
                    this.noteCheckLists.push(noteCheckList);
                    this.questionAndAnswerNotes.push(questionAndAnswerNote)
                }
}



