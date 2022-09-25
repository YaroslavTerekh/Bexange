import { AllDataService } from './../all-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-order-content',
  templateUrl: './order-content.component.html',
  styleUrls: ['./order-content.component.scss']
})
export class OrderContentComponent implements OnInit {
  show: number = -1;
  orders: any;
  id: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: AllDataService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; 

    if(this.id == undefined) {
      this.dataService.getAllOrders()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {          
          console.log(res);
          
          this.orders = res; 
        },
        error: err => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      })
    } else {
      this.dataService.getUserOrders(this.id)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => { 
            console.log(res);
                     
            this.orders = res; 
          },
          error: err => {
            this.router.navigate(['/error', { error: JSON.stringify(err) }])
          }
        });          
    }
    
  }

  toggle(num: number) {
    this.show = num;
  }
}
