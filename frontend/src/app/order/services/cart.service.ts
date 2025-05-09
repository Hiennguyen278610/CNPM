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
        console.log('Adding to cart with dish:', dish); // Log chi tiết dish
        if (!dish._id || !/^[0-9a-fA-F]{24}$/.test(dish._id)) {
            console.error('Cannot add dish to cart: invalid or missing _id', { dishId: dish._id, dishName: dish.dishName, fullDish: dish });
            throw new Error(`Invalid dish ID for ${dish.dishName}: ${dish._id}`);
        }

        const totalPrice = this.calculateTotalPrice(dish.dishPrice, selectedOptions) * quantity;
        const existingItem = this.cart.find(item =>
            item.dish._id === dish._id &&
            this.areOptionsEqual(item.selectedOptions, selectedOptions)
        );

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice = this.calculateTotalPrice(dish.dishPrice, selectedOptions) * existingItem.quantity;
            console.log('Updated existing item:', existingItem);
        } else {
            const newItem = {
                dish: { ...dish },
                quantity,
                selectedOptions,
                totalPrice,
            };
            this.cart.push(newItem);
            console.log('Added new item:', newItem);
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
        const optionsPrice = options.reduce((total, option) => total + (option.optionPrice || 0), 0);
        return basePrice + optionsPrice;
    }

    private areOptionsEqual(options1: Option[], options2: Option[]): boolean {
        if (options1.length !== options2.length) return false;
        const sortedOptions1 = [...options1].sort((a, b) => (a._id || a.optionName).localeCompare(b._id || b.optionName));
        const sortedOptions2 = [...options2].sort((a, b) => (a._id || a.optionName).localeCompare(b._id || b.optionName));
        return sortedOptions1.every((opt1, index) => {
            const opt2 = sortedOptions2[index];
            return (opt1._id && opt2._id && opt1._id === opt2._id) ||
                   (!opt1._id && !opt2._id && opt1.optionName === opt2.optionName);
        });
    }
}

export const cartService = new CartService();