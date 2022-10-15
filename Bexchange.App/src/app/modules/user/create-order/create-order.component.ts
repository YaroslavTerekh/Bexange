import { StateDictionary } from 'src/app/models/StateDictionary';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/services/book.service";
import { Order } from "src/app/models/Order";
import { AuthorizationService } from "src/app/services/authorization.service";
import { OrderService } from "src/app/services/order.service";
import { debounceTime, distinctUntilChanged, map, tap } from "rxjs/operators";
import { fromEvent } from "rxjs";
import { Book } from "src/app/models/Book";
import { OrderRequest } from 'src/app/models/OrderRequest';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})

@UntilDestroy()
export class CreateOrderComponent implements OnInit {
  userId: number = this.authorizationService.getUserId();
  stateDict: StateDictionary = new StateDictionary();
  books: Book[] = [];
  book!: Book;
  bookImg: any;
  activeBookIndex!: number;
  activeBookId!: number;
  

  constructor(
    private orderService: OrderService,
    private bookService: BookService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.bookService.getBook(this.route.snapshot.params['id'])
    .pipe(untilDestroyed(this))
    .subscribe({
      next: res => {      
        this.book = res;
  
        this.bookService.getImage(this.book.image?.id)
          .pipe(untilDestroyed(this))
          .subscribe(res => {
            this.bookImg = this.createImageFromBlob(res);
          })
      }
    });

    this.bookService.getUserBooks(this.authorizationService.getUserId())
      .pipe(
        untilDestroyed(this),
        map(res => {
          res.forEach(b => {
            if(b.state == 1) {
              this.books.push(b);
            }
          })
        })  
      )
      .subscribe();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.bookImg = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  createOrder() {
    let order: OrderRequest = {
      id: 0,
      firstBookId: this.book.id,
      secondBookId: this.activeBookId, 
    }

    this.orderService.addOrder(order)
      .subscribe(res => {
        this.router.navigate(['/orders/user/',this.userId]);
      });
  }

}
