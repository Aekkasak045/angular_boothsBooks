import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatCardModule,MatFormField,MatLabel,CommonModule,MatInputModule,ReactiveFormsModule,HttpClientModule,MatDivider]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('กรุณากรอกข้อมูลให้ครบถ้วน', 'ปิด', { duration: 3000 });
      return;
    }

    const { username, password } = this.loginForm.value;
    const loginData = { username, password };

    this.http.post('API_ENDPOINT/login', loginData).subscribe(
      (response: any) => {
        if (response.success) {
          this.snackBar.open('เข้าสู่ระบบสำเร็จ', 'ปิด', { duration: 3000 });
          this.router.navigate(['/home']); // เปลี่ยนไปหน้า Home หลังเข้าสู่ระบบสำเร็จ
        } else {
          this.snackBar.open('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'ปิด', { duration: 3000 });
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.snackBar.open('เกิดข้อผิดพลาดในการเข้าสู่ระบบ', 'ปิด', { duration: 3000 });
      }
    );
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
