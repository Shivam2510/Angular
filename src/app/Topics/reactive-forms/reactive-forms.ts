import { Component, effect, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserDataList } from './services/user-data-list';
import { userData } from './models/userData.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserDetailList } from './components/user-detail-list/user-detail-list';

@Component({
  selector: 'reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule, UserDetailList],
  templateUrl: './reactive-forms.html',
  styleUrls: ['./reactive-forms.scss'],
})
export class ReactiveForms implements OnInit {
  private userService = inject(UserDataList);

  protected userForm!: FormGroup;

  private selectedUser = toSignal(this.userService.selectedUser$);

  constructor() {
    this.listenSelectedUser();
  }

  ngOnInit(): void {
    this.initializeForm();
    // this.listenSelectedUser();
  }

  private initializeForm(): void {
    this.userForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      occupation: new FormControl(''),
      terms: new FormControl(false),
    });
  }

  private listenSelectedUser(): void {
    effect(() => {
      const user = this.selectedUser();

      if (user) {
        this.userForm.patchValue(user);
      }
    });
  }

  protected userDetailSubmit(): void {
    if(this.selectedUser()){
      let updateUserDetails = {
        id: this.selectedUser()?.id,
        ...this.userForm.value,
      }

      this.userService.updateUserDetails(updateUserDetails);
    }
    else{
      const userDetail: userData = {
        id: crypto.randomUUID(),
        ...this.userForm.value,
      };

      this.userService.setUserData(userDetail);
    }
    this.userForm.reset();
  }
}