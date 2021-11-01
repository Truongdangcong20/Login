import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { User } from '../model/user.model';
import { AuthenService } from '../services/authen.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild('modalAddEdit', { static: false })
  public modalAddEdit!: ModalDirective;
  user = new User();
  userInfo: any;
  isEdit: boolean = false;
  lstUsers: User[] = [];
  constructor(
    private userService: UserService,
    private authenService: AuthenService
  ) {}

  ngOnInit() {
    this.loadData();
    this.userInfo = this.authenService.getLoggedInUser();
    console.log(this.userInfo.username);
  }

  loadData() {
    this.userService.GetAll().subscribe((response: any) => {
      this.lstUsers = response;
    });
  }

  loadUserById(id: any) {
    this.userService.getEdit(id).subscribe((response: any) => {
      this.user.username = response.username;
      this.user._id = response._id;
    });
  }

  showAddModal() {
    this.user = new User();
    this.isEdit = false;
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.isEdit = true;
    this.loadUserById(id);
    this.user.password = '';
    this.user.newPass = '';
    this.modalAddEdit.show();
  }

  saveChange() {
    if (this.user._id == undefined) {
      this.userService.addUser(JSON.stringify(this.user)).subscribe(
        () => {
          this.loadData();
          this.modalAddEdit.hide();
        },
        (error) => console.log(error)
      );
    } else {
      console.log(this.user);
      this.userService.updateUser(JSON.stringify(this.user)).subscribe(
        () => {
          this.loadData();
          this.modalAddEdit.hide();
        },
        (error) => console.log(error)
      );
    }
  }

  deleteUser(id: any) {
    if (confirm('Bạn có muốn xóa User')) {
      this.userService.deleteUser(id).subscribe((response: any) => {
        console.log(response);
        this.loadData();
      });
    }
  }
}
