import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from 'src/app/Services/booking.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-update-booking',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent {
  show=false
  id!:string
  form!:FormGroup
  constructor(private fb:FormBuilder,private route:ActivatedRoute, public bookingService:BookingService,private router:Router){

  }

  ngOnInit(): void {
     
    this.form = this.fb.group({
      Destination:[null, [Validators.required, Validators.email]],
      TravelDate:[null, Validators.required]
    })
    // this.bookingService.getUserBooking()

    this.route.params.subscribe((param:Params)=>{
      this.bookingService.getOneBooking(param['id']).subscribe(res=>{
        this.id=param['id']
         let date =new Date(res.TravelDate).toISOString().slice(0,10)         
        this.form.setValue({
          Destination:res.Destination,
          TravelDate:date
        })
       
      })
    })
  }

  submitForm(){
    this.bookingService.updateBooking(this.id, this.form.value).subscribe()
    this.router.navigate(['../'],{relativeTo:this.route})
    this.bookingService.getUserBooking()
  }
}
