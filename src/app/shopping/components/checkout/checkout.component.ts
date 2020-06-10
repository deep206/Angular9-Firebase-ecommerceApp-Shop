import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy { 
  
  cart;
  cartSubscription: Subscription;
  

  constructor(
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => {
      let temp: any;
      // temp = cart.payload.child('/items').val();
      this.cart = new ShoppingCart(temp);
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}