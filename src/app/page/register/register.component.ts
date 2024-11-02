import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatLabel,CommonModule,MatInputModule,ReactiveFormsModule,HttpClientModule, MatDividerModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('กรุณากรอกข้อมูลให้ครบถ้วน', 'ปิด', { duration: 3000 });
      return;
    }
  
    const { title, first_name, last_name, phone_number, email, password } = this.registerForm.value;
    const registerData = { title, first_name, last_name, phone_number, email, password };
  
    this.http.post(this.dataService.apiEndpoint+'/register', registerData).subscribe(
      () => {
        this.snackBar.open('สมัครสมาชิกสำเร็จ', 'ปิด', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error during registration:', error); // แสดงข้อผิดพลาดใน console
        if (error.status === 409) {
          this.snackBar.open('อีเมลนี้ถูกใช้แล้ว', 'ปิด', { duration: 3000 });
        } else {
          this.snackBar.open('เกิดข้อผิดพลาดในการสมัครสมาชิก', 'ปิด', { duration: 3000 });
        }
      }
    );
  }
}
