import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //@viewChild o TypeScript acessa e traz os valores do formulario do Template(html)
  @ViewChild('login')loginForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.loginForm.value);
    //TODO: Integrar com AuthService
  }
}
