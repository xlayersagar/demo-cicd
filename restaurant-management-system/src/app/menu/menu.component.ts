import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { MenuService } from '../auth/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  selectedItem: any = null;

  newItemName: string = '';
  newItemPrice: number = 0;
  newItemDescription: string = '';

  editItemName: string = '';
  editItemPrice: number = 0;
  editItemDescription: string = '';

  constructor(
    private router: Router,
    private cartService: CartService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.fetchMenuItems();
  }

  fetchMenuItems() {
    this.menuService.getMenuItems().subscribe(
      (data) => {
        this.menuItems = data;
      },
      (error) => {
        console.error('Error fetching menu items:', error);
      }
    );
  }

  addItem() {
    const newItem = {
      name: this.newItemName,
      price: this.newItemPrice,
      description: this.newItemDescription
    };
    
    this.menuService.addMenuItem(newItem).subscribe(
      (response) => {
        this.menuItems.push(response);
        this.resetNewItemFields();
      },
      (error) => {
        console.error('Error adding menu item:', error);
      }
    );
  }

  editItem(item: any) {
    this.selectedItem = item;
    this.editItemName = item.name;
    this.editItemPrice = item.price;
    this.editItemDescription = item.description;
  }

  updateItem() {
    const updatedItem = {
      name: this.editItemName,
      price: this.editItemPrice,
      description: this.editItemDescription
    };

    const index = this.menuItems.findIndex((item) => item.name === this.selectedItem.name);

    if (index !== -1) {
      this.menuService.updateMenuItem(this.selectedItem._id, updatedItem).subscribe(
        (response) => {
          this.menuItems[index] = response;
          this.cancelEdit();
        },
        (error) => {
          console.error('Error updating menu item:', error);
        }
      );
    }
  }

  deleteItem(item: any) {
    const index = this.menuItems.indexOf(item);
    if (index !== -1) {
      this.menuService.deleteMenuItem(item._id).subscribe(
        () => {
          this.menuItems.splice(index, 1);
          if (this.selectedItem === item) {
            this.cancelEdit();
          }
        },
        (error) => {
          console.error('Error deleting menu item:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.selectedItem = null;
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
    this.router.navigate(['/order']);
  }

  private resetNewItemFields() {
    this.newItemName = '';
    this.newItemPrice = 0;
    this.newItemDescription = '';
  }
}
