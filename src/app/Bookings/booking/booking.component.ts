import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from 'src/app/Services/booking.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  show=false
  form!:FormGroup
  constructor(private fb:FormBuilder, public bookingService:BookingService, public auth:AuthService, private router:Router){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Destination:[null, [Validators.required, Validators.email]],
      TravelDate:[null, Validators.required]
    })
    this.bookingService.getUserBooking()
  }

  submitForm(){
    this.bookingService.addBooking(this.form.value).subscribe(res=>{
      console.log(res);
      this.bookingService.getUserBooking()      
    })
  }
  showForm(){
  this.show=!this.show
  }
  ShowMore(){
  this.router.navigate(['/book'])
  }
}
