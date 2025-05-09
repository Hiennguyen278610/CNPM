import { Dish } from './dish.service';
import { Option } from './option.service';

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedOptions: Option[];
  totalPrice: number;
}

class CartService {
  private cart: CartItem[] = [];

  addToCart(dish: Dish, quantity: number, selectedOptions: Option[]) {
    const totalPrice = this.calculateTotalPrice(dish.dishPrice, selectedOptions) * quantity;
    const existingItem = this.cart.find(item => 
      item.dish._id === dish._id && 
      this.areOptionsEqual(item.selectedOptions, selectedOptions)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = this.calculateTotalPrice(dish.dishPrice, selectedOptions) * existingItem.quantity;
    } else {
      this.cart.push({
        dish,
        quantity,
        selectedOptions,
        totalPrice
      });
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity > 0) {
      const item = this.cart[index];
      item.quantity = quantity;
      item.totalPrice = this.calculateTotalPrice(item.dish.dishPrice, item.selectedOptions) * quantity;
    }
  }

  getCart() {
    return this.cart;
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + item.totalPrice, 0);
  }

  clearCart() {
    this.cart = [];
  }

  private calculateTotalPrice(basePrice: number, options: Option[]): number {
    const optionsPrice = options.reduce((total, option) => total + option.optionPrice, 0);
    return basePrice + optionsPrice;
  }

  private areOptionsEqual(options1: Option[], options2: Option[]): boolean {
    if (options1.length !== options2.length) return false;
    return options1.every(option1 => 
      options2.some(option2 => option2._id === option1._id)
    );
  }
}

export const cartService = new CartService(); 