import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userData } from '../models/userData.interface';

@Injectable({
  providedIn: 'root',
})
export class UserDataList {
  private userData = new BehaviorSubject<userData[] | []> ([]);
  private selectedUser  = new BehaviorSubject<userData | null> (null);

  public userData$ = this.userData.asObservable();
  public selectedUser$ = this.selectedUser.asObservable();

  public setUserData(userDetails:userData):void {
    const currentData = this.userData.value;
    this.userData.next([...currentData, userDetails]);
  }

  public setSelectedUser(userDetail: userData){
    this.selectedUser.next(userDetail);
  }

  public clearSelectedUser(): void {
    this.selectedUser.next(null);
  }

  public updateUserDetails(updateUserDetails: userData): void {
    const updatedUserDetails = this.userData.value.map((user) =>
      user.id === updateUserDetails.id
        ? { ...user, ...updateUserDetails }
        : user
    );

    this.userData.next(updatedUserDetails);
    this.clearSelectedUser();
  }
}
