import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Services{
    private url = 'http://localhost:3000/routes/todo';

    constructor(private http: HttpClient) {}

    // ruft Daten über die angegebene URL über http get ab und gibt die Daten zurück
    getToDo(): Observable<any> {
        return this.http.get<any>(this.url);
    }

    // ruft Daten über die angegebene URL über http post ab und gibt die Daten zurück
    addToDo(todo: {titel: string, beschreibung: string, status: string}): Observable<any> {
        return this.http.post<any>(this.url, todo);
    }

    // ruft Daten über die angegebene URL über http put ab und gibt die Daten zurück
    updateToDo(ID: number, todo: {titel: string, beschreibung: string, status: string}): Observable<any> {
        return this.http.put<any>(`${this.url}/${ID}`, todo);
    }

    // ruft Daten über die angegebene URL über http delete ab und gibt die Daten zurück
    deleteToDo(ID: number): Observable<any> {
        return this.http.delete(`${this.url}/${ID}`);
    }
}