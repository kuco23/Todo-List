import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.interface';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() public addedNotes: Note[] = [];
  public syncnote: string = "";

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.apiService.getNotes().subscribe(
      (resp:Note[]) => {
        for (let note of resp)
          this.addedNotes.push(note);
      }
    );
  }

  postNote(): void {
    if (!this.syncnote.length) return;
    this.apiService.postNote(1, this.syncnote).subscribe(
      (resp:Note) => {
        this.addedNotes.unshift(resp);
        this.addedNotes.push();
        this.syncnote = "";
      }
    );
  }

  deleteNote(noteId): void {
    for (let i = 0; i < this.addedNotes.length; i++)
      if (noteId == this.addedNotes[i].id) {
        this.addedNotes.splice(i,1);
        break;
      }
  }

}
