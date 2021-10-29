import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('modalAddEdit', { static: false })
  public modalAddEdit!: ModalDirective;
  form: any = {
    _id: null,
    username: null,
    password: null,
    newPass: null
  };
  isEdit: boolean = false;
  lstUsers: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.GetAll()
      .subscribe((response: any) => {
        this.lstUsers = response;
      });
  }

  loadUserById(id: any) {
    this.userService.getEdit(id)
      .subscribe((response: any) => {
        this.form.username = response.username;
        this.form._id = response._id;
      });
  }

  showAddModal() {
    this.form = {};
    this.isEdit = false;
    this.modalAddEdit.show();
  }

  showEditModal(id: any) {
    this.isEdit = true;
    this.loadUserById(id);
    this.form.password = null;
    this.form.newPass = null;
    this.modalAddEdit.show();
  }

  saveChange() {
    if (this.form._id == undefined) {
      this.userService.addUser(JSON.stringify(this.form))
        .subscribe(() => {
          this.loadData();
          this.modalAddEdit.hide();
        }, error => console.log(error));
    }
    else {
      console.log(this.form);
      this.userService.updateUser(JSON.stringify(this.form))
        .subscribe(() => {
          this.loadData();
          this.modalAddEdit.hide();
        }, error => console.log(error));
    }
  }

  deleteUser(id: any) {
    if (confirm("Bạn có muốn xóa User")) {
      this.userService.deleteUser(id).subscribe((response: any) => {
        console.log(response);
        this.loadData();
      });
    }
  }
}
