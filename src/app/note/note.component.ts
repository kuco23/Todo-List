import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPen, faCross } from '@fortawesome/free-solid-svg-icons';
import { Note } from '../note.interface';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NoteComponent implements OnInit {
  @Input() public note: Note;
  @Output() public destroySentinel = new EventEmitter();
  public penIcon = faPen;
  public crossIcon = faCross;

  constructor(
    public modalService: NgbModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {}

  formatNoteData(): string {
    let date = this.note.timestamp;
    let dueBy = this.note.expirationDate;
    return `Note of user <b>${this.note.userId}</b> added on <b>${date}</b> due by <b>${dueBy}</b>`;
  }

  noteUpdateModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (newContent) => {
        if (!newContent.length) return;
        this.apiService.updateNote(this.note.id, this.note.content).subscribe(
          (result:any) => {this.note.content = newContent;}
        );
      }, () => {}
    );
  }

  noteDeleteModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      () => {
        this.apiService.deleteNote(this.note.id).subscribe(
          (result:any) => {this.destroySentinel.emit("destroy");}
        );
      }, () => {}
    );
  }

}
