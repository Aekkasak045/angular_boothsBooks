import { Component, NgZone, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import {MatListModule,MatListOption} from '@angular/material/list';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as zonesCvt ,Zones } from '../../model/zones.model';
import { Convert as boothsCvt,Booths } from '../../model/booths.moel';
import { json } from 'stream/consumers';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditzoneComponent } from '../editzone/editzone.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent,
    HttpClientModule,
    MatListModule,
    CommonModule,
    RouterModule,
    EditzoneComponent,
    MatDialogModule

    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
  
})
export class MainComponent  {
  zones = Array<Zones>();
  booths = Array<Booths>();
  selectedzone:any;
  constructor(private dataService:DataService ,private http:HttpClient,private dialog: MatDialog){
    http.get(dataService.apiEndpoint+"/get_zones").subscribe((data:any)=>{
        this.zones=zonesCvt.toZones(JSON.stringify(data))
        console.log("zonena",this.zones)      });
  }
  viewDetail(zoneId: number): void {
    console.log("Selected Zone ID:", zoneId);
    this.http.get(`${this.dataService.apiEndpoint}/get_booths_by_zone/${zoneId}`).subscribe(
      (data: any) => {
        this.booths = boothsCvt.toBooths(JSON.stringify(data)); // Convert and store booth data
        console.log("Booths in Zone:", this.booths);
      },
      (error) => {
        console.error("Error fetching booths:", error);
      }
    );
  }

  loadZones(): void {
    this.http.get(this.dataService.apiEndpoint + '/get_zones').subscribe((data: any) => {
      this.zones = zonesCvt.toZones(JSON.stringify(data));
    });
  }
  editZone(zoneId: number): void {
    const dialogRef = this.dialog.open(EditzoneComponent, {
      data: { zoneId }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'updated') {
        this.loadZones();
      }
    });
  }

}
