import { Product } from './../models/product';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: ShoppingCart = new ShoppingCart(null);
  shoppingCartItemCount: number;
  shoppingCart: ShoppingCart;
  
  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  getQuantity(product: Product) {
    if (!this.cart) { return 0; }

    const item = this.cart.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  clearCart() {
    this.cartService.clearCart();
  }
  
  async ngOnInit() {
    const cart$ = await this.cartService.getCart();
    cart$.subscribe( temp => {
      let data: any;    
      // data = temp.payload.child('/items').val();
      this.cart = new ShoppingCart(data);
      this.shoppingCartItemCount = this.cart.totalItemsCount;
    });
  }

}