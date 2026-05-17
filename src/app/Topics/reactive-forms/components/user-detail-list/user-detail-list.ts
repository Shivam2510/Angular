import { Component, inject, OnInit } from '@angular/core';
import { UserDataList } from '../../services/user-data-list';
import { AsyncPipe, NgFor } from '@angular/common';
import { userData } from '../../models/userData.interface';

@Component({
  selector: 'user-detail-list',
  imports: [AsyncPipe],
  templateUrl: './user-detail-list.html',
  styleUrl: './user-detail-list.scss',
  standalone: true
})
export class UserDetailList implements OnInit {

  private userDetailService = inject(UserDataList);
  protected userDetails = this.userDetailService.userData$;

  ngOnInit(): void {
  }
  
  protected editDetails(user: userData){
    this.userDetailService.setSelectedUser(user);
  }
}
