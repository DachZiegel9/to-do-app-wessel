import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToDoComponent } from '../to-do/to-do.component';

@Component({
  selector: 'app-to-do-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToDoComponent],
  templateUrl: './to-do-popup.component.html',
  styleUrl: './to-do-popup.component.scss'
})
export class ToDoPopupComponent {
  @Input() todo: any | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  title = '';

  formtodo: FormGroup;
  
  constructor(private fb: FormBuilder) { 
    this.formtodo = this.fb.group({
      id: [],
      titel: [''],
      beschreibung: [''],
      status: ['']
    });
  }

  // falls Daten vorhanden sind, werden diese ins Formular eingetragen
  ngOnChanges(): void {
    if (this.todo) {
      this.formtodo.setValue({
        id: this.todo.id,
        titel: this.todo.titel,
        beschreibung: this.todo.beschreibung,
        status: this.todo.status
      });
    }
  }

  // Pop up speichern
  saveToDo(){
    let todoSave;

    // Datensatz zusammenstellen
    if(this.todo){
      todoSave = { id: this.todo.id, titel: this.formtodo.get('titel')?.value, beschreibung: this.formtodo.get('beschreibung')?.value, status: this.todo.status};
    } else {
      todoSave = { titel: this.formtodo.get('titel')?.value, beschreibung:  this.formtodo.get('beschreibung')?.value, status: 'ausstehend'};
    }

    this.save.emit(todoSave);
  }

  // Popup schliefen
  closeToDo(){
    this.cancel.emit();
  }
}
