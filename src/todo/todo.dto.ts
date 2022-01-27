export interface ReturnTodoInterface {
    id: number;
    title: string;
    body: string;

}


export interface CreateTodoInterface{
    title: string;
    body: string;
}

export class CreateTodoDto {
  title: string;
  body: string;
}

export class EditTodoDto {
    id : number
    title: string;
    body: string;
}