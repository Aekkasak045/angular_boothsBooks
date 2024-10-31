import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-firstpage',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatDividerModule,RouterLink],
  templateUrl: './firstpage.component.html',
  styleUrl: './firstpage.component.scss'
})
export class FirstpageComponent {

}
