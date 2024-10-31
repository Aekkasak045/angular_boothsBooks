import { Component, NgZone, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import {MatListModule,MatListOption} from '@angular/material/list';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,HttpClientModule,MatListModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
  
})
export class MainComponent  {
  constructor(private dataService:DataService ,private http:HttpClient){
    http.get(dataService.apiEndpoint+"/get_zones").subscribe
      ((data:any)=>console.log(data));
  }
}
