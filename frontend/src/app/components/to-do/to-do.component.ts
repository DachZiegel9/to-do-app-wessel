import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Services } from '../../services/services';
import { ToDoPopupComponent } from '../to-do-popup/to-do-popup.component';

@Component({
  selector: 'app-to-do',
  standalone: true,
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
  imports: [CommonModule, ReactiveFormsModule, ToDoPopupComponent]
})
export class ToDoComponent implements OnInit{
  todos: any[] = [];
  formtodo: FormGroup;

  currentTodo: any = null;
  isPopupVisible: boolean = false;

  constructor(private services: Services, private fb: FormBuilder) { 
    this.formtodo = this.fb.group({
      id: [],
      titel: [''],
      beschreibung: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.loadToDo();
  }

  // Laden von gespeicherten Daten
  loadToDo(){
    this.services.getToDo().subscribe(loadedTodos => {
      this.todos.push(loadedTodos);
    });
  }

  // hover über Button und Check anzeigen 
  toggleCheck(show: boolean, index: any): void {
    this.todos[0].data[index].showCheck = show;
  }

  // Statusänderungen speichern
  changeStatus(todo: any){
    if(todo.status == 'ausstehend'){
      todo.status = 'abgeschlossen';
    } else if (todo.status == 'abgeschlossen'){
      todo.status = 'ausstehend';
    }

    const todoSave = { titel: todo.titel, beschreibung: todo.beschreibung, status: todo.status};

    this.services.updateToDo(todo.id, todoSave).subscribe(t => {
      this.todos = [];
      this.loadToDo();
    });
  }

  // Pop-up anzeigen & To-Do füllen
  changeToDo(todo: any){
    this.currentTodo = todo;
    this.isPopupVisible = true;
  }

  // To-Do löschen
  deleteToDo(id: any){
    this.services.deleteToDo(id).subscribe(t => {
      this.todos = [];
      this.loadToDo();
    });
  }

  // To-Do speichern
  saveTodo(todo: any){
    // To-Do Änderung speichern
    if (todo.id) {
      const index = this.todos[0].data.findIndex((t: any) => t.id === todo.id);
      if (index !== -1) {
        const todoSave = { titel: todo.titel, beschreibung: todo.beschreibung, status: todo.status};

        this.services.updateToDo(todo.id, todoSave).subscribe(t => {
          this.todos = [];
          this.loadToDo();
        });
      }
    } 
    // To-Do neu erstellt speichern
    else {
      const todoSave = { titel: todo.titel, beschreibung: todo.beschreibung, status: todo.status};

      this.services.addToDo(todoSave).subscribe(() => {
        this.todos = [];
        this.loadToDo();
      });
    }
    this.closePopup();
  }

  // Popup schließen
  closePopup(){
    this.isPopupVisible = false;
    this.currentTodo = null;
  }
}
