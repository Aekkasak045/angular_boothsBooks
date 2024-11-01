import { Component, NgZone, OnInit } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import {MatListModule,MatListOption} from '@angular/material/list';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as boothsCvt,Booths } from '../../model/booths.moel';
import { json } from 'stream/consumers';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boothpage',
  standalone: true,
  imports: [HeaderComponent,
    FooterComponent,
    HttpClientModule,
    MatListModule,
    CommonModule,
  RouterModule],
  templateUrl: './boothpage.component.html',
  styleUrl: './boothpage.component.scss'
})
export class BoothpageComponent {
  booths = Array<Booths>();
  zoneId: number | null = null;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.zoneId = params['zone_id'] ? +params['zone_id'] : null;
      this.loadBooths();
    });
  }

  loadBooths(): void {
    let url = `${this.dataService.apiEndpoint}/get_booths`;
    if (this.zoneId) {
      url += `?zone_id=${this.zoneId}`;
    }

    this.http.get(url).subscribe(
      (data: any) => {
        this.booths = boothsCvt.toBooths(JSON.stringify(data));
        console.log("Loaded booths:", this.booths);
      },
      (error) => {
        console.error("Error loading booths:", error);
      }
    );
  }
}
