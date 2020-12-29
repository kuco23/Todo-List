import {
  Body,Controller, Delete, Get, Path, Post, Route
} from "tsoa";
import { Note } from './note';
import {
  NoteInsertParams, NoteUpdateParams, NotesService
} from './notesService';

@Route("note")
export class NotesController extends Controller {

  @Get("{userId}")
  public async getNotes(
    @Path() userId: number
  ): Promise<Note[]> {
    return new NotesService().getNotes({ userId: userId });
  }

  @Post("new")
  public async postNote(
    @Body() requestBody: NoteInsertParams
  ): Promise<Note> {
    return new NotesService().insertNote(requestBody);
  }

  @Post("update")
  public async updateNote(
    @Body() requestBody: NoteUpdateParams
  ): Promise<void> {
    new NotesService().updateNote(requestBody);
  }

  @Delete("{id}/delete")
  public async deleteNote(
    @Path() id: number
  ): Promise<void> {
    new NotesService().deleteNote({ id: id });
  }

}
