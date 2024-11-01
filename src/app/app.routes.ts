import { Routes } from '@angular/router';
import { FirstpageComponent } from './page/firstpage/firstpage.component';
import { MainComponent } from './page/main/main.component';
import { BoothpageComponent } from './page/boothpage/boothpage.component';

export const routes: Routes = [
    {path:'',component: FirstpageComponent},
    {path:'main',component:MainComponent},
    {path:'booths',component: BoothpageComponent}
];
