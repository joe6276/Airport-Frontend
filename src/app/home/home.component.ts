import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../State/appState';
import { CountState } from '../State/Reducers/counterReducer';
import { DecreaseValue, IncreaseValue } from '../State/Actions/counterActions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  ngOnInit(): void {
    this.store.select(CountState).subscribe(state=>{
      // console.log(state);
       this.count=state
    })
  }
count!:number
 constructor(private store:Store<AppState>){}
  Add(){
  this.store.dispatch(IncreaseValue({increaseBy:2}))
  }
  Minus(){
    this.store.dispatch(DecreaseValue({decreaseBy:3}))
  }
}
