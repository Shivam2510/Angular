import { Component } from '@angular/core';
import { CanDeactivateComponent } from '../interface/can-deactivate.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
  standalone: true
})
export class UserEdit implements CanDeactivateComponent {

  protected userForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  })


  protected saveForm(): void {
    console.log(this.userForm.value);

    // Pretend data is saved
    this.userForm.markAsPristine();
  }

  canDeactivate(){
    if(!this.userForm.dirty){
      return true;
    }

     return confirm(
      'You have unsaved changes. Do you really want to leave?'
    );
  }

}
