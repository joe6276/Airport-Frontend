import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from 'src/app/Interfaces';
import { BookingService } from 'src/app/Services/booking.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Observable} from 'rxjs'
@Component({
  selector: 'app-single-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-booking.component.html',
  styleUrls: ['./single-booking.component.css']
})
export class SingleBookingComponent implements OnInit {
  booking$!:Observable<Booking>
  id!:string
  constructor(private bookingService:BookingService, private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe((param:Params)=>{
      this.id=param['id']
      this.booking$= this.bookingService.getOneBooking(param['id'])
    })
  }
  Update(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }
  Delete(){
    this.bookingService.deleteBooking(this.id).subscribe()
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
