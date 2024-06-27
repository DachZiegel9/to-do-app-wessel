import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoComponent } from "./to-do/to-do.component";
import { CommonModule } from '@angular/common';
import { ToDoPopupComponent } from './to-do-popup/to-do-popup.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ToDoComponent, ToDoPopupComponent]
})
export class AppComponent {
  title = '';
}
