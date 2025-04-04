import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private http: HttpClient // Inject HttpClient here
  ) {
    this.cartItems = this.cartService.getCartItems();
  }

  incrementQuantity(item: any) {
    item.quantity = (item.quantity || 0) + 1;
  }

  decrementQuantity(item: any) {
    if (item.quantity && item.quantity > 0) {
      item.quantity--;
    }
  }

  confirmOrder(item: any) {
    const orderData = {
      name: item.name,
      price: item.price,
      description: item.description,
      quantity: item.quantity
    };

    this.http.post('http://localhost:8080/api/orders', orderData).subscribe(
      (response: any) => {
        const message = `Order confirmed for: ${response.name} (Quantity: ${response.quantity})`;
        console.log(message);
        alert(message);
      },
      (error: any) => {
        console.error('Error confirming order:', error);
      }
    );
  }

  deleteItem(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
}
