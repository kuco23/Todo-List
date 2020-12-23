import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Note } from '../note.interface';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() public addedNotes: Note[] = [];

  newNoteForm = new FormGroup({
    content: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required])
  })

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.apiService.getNotes().subscribe(
      (resp:Note[]) => {
        console.log(resp);
        for (let note of resp)
          this.addedNotes.push(note);
      }
    );
  }

  postNote(): void {
    if (this.newNoteForm.valid) {
      let vals = this.newNoteForm.value;
      this.apiService.postNote(1, vals.content, vals.date).subscribe(
      (resp:Note) => {
        this.addedNotes.unshift(resp);
        this.addedNotes.push();
        this.newNoteForm.patchValue({content:"", date:""});
      });
    }
  }

  deleteNote(noteId): void {
    for (let i = 0; i < this.addedNotes.length; i++)
      if (noteId == this.addedNotes[i].id) {
        this.addedNotes.splice(i,1);
        break;
      }
  }

}
