import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from './note.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.httpClient.get('http://127.0.0.1:8081/note')
      .pipe(map((response: any) => response));
  }

  postNote(userId: number, content: string): Observable<Note> {
    return this.httpClient.post<any>(
      'http://127.0.0.1:8081/note/new',
      { userId: userId, content: content }
    ).pipe(map((response: any) => response as Note));
  }

  updateNote(noteId: number, content: string): Observable<boolean> {
    return this.httpClient.post<any>(
      'http://127.0.0.1:8081/note/update',
      { id: noteId, content: content }
    ).pipe(map((response:any) => true));
  }

  deleteNote(noteId: number): Observable<boolean> {
    return this.httpClient.delete(
      `http://127.0.0.1:8081/note/${noteId}/delete`,
    ).pipe(map((response:any) => true));
  }

}
