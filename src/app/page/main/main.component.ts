import { Component, NgZone, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import {MatListModule,MatListOption} from '@angular/material/list';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as zonesCvt ,Zones } from '../../model/zones.model';
import { Convert as Booths } from '../../model/booths.moel';
import { json } from 'stream/consumers';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent,
    HttpClientModule,
    MatListModule,
    CommonModule
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
  
})
export class MainComponent  {
  zones = Array<Zones>();
  constructor(private dataService:DataService ,private http:HttpClient){
    http.get(dataService.apiEndpoint+"/get_zones").subscribe((data:any)=>{
        this.zones=zonesCvt.toZones(JSON.stringify(data))
        console.log("zonena",this.zones)      });
  }
}
