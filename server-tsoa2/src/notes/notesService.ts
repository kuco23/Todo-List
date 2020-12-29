import { Note } from './note';
import {
  db, SQL_CREATE_NOTE_TABLE, SQL_INSERT_NOTE_ROW,
  SQL_QUERY_NOTES, SQL_UPDATE_NOTE_CONTENT
} from '../database';

const randomKey: Function = () => Math.floor(Math.random()*100000);

export type NoteInsertParams = Pick<
  Note, "userId" | "content" | "expirationDate"
>;
export type NoteUpdateParams = Pick<Note, "id" | "content">;
export type NoteQueryParams = Pick<Note, "userId">;
export type NoteDeleteParams = Pick<Note, "id">;

export class NotesService {

  public async getNotes(NoteQueryParams: NoteQueryParams): Promise<Note[]> {
    return new Promise((resolve,reject) => {
      db.all(SQL_QUERY_NOTES, (err: any, vals: Note[]) => {
        if (err) {
          console.log('reject');
          reject('Error: getNotes querry failed');
          return;
        }
        console.log(vals);
        resolve(vals);
      });
    })
  }

  public insertNote(noteInsertParams: NoteInsertParams): Note {
    let key: number = randomKey();
    let date: string = "20.20.2020";
    db.run(SQL_INSERT_NOTE_ROW, [
      key, noteInsertParams.userId, noteInsertParams.content,
      noteInsertParams.expirationDate, date
    ]);
    return { id: key, timestamp: date, ...noteInsertParams }
  }

  public updateNote(noteUpdateParams: NoteUpdateParams): void {
    let date: string = "20.20.2020";
    db.run(
      SQL_UPDATE_NOTE_CONTENT,
      [noteUpdateParams.content, date, noteUpdateParams.id]
    );
  }

  public deleteNote(noteDeleteParams:NoteDeleteParams): void {
    db.run(`DELETE FROM note WHERE id=${noteDeleteParams.id}`);
  }

}
