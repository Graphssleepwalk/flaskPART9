//list.component.ts
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';

import { FlaskBackendService } from '../_helpers/flask-backend.service';

@Component({
    templateUrl: 'list.component.html',
    standalone: true,
    imports: [RouterLink, NgFor, NgIf]
})
export class ListComponent implements OnInit {
    users?: any[];

    constructor(private flaskBackendService: FlaskBackendService) {}

    ngOnInit() {
        this.flaskBackendService.getUsers()
          .then((users: any[]) => {
            this.users = users;
          });
      }
      

      deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        
        this.flaskBackendService.deleteUser(id)
          .then(() => {
            this.users = this.users!.filter(x => x.id !== id);
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      }
      
}

function injectable(arg0: { providedIn: string; }): (target: typeof ListComponent) => void | typeof ListComponent {
    throw new Error('Function not implemented.');
}
