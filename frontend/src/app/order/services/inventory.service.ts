interface StockIssue {
  ingredientName: string;
  availableQty: number;
  requiredQty: number;
  unit: string;
}

export const inventoryService = {
  async checkDishStock(dishId: string, quantity: number): Promise<StockIssue[]> {
    try {
      const BACKEND_URL = `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api`;
      const response = await fetch(`${BACKEND_URL}/inventory/check-dish-stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishId, quantity }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.issues || [];
    } catch (error) {
      console.error('Lỗi khi kiểm tra tồn kho:', error);
      throw error;
    }
  },

  async getMaxDishQuantity(dishId: string): Promise<number> {
    try {
      const BACKEND_URL = `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api`;
      const response = await fetch(`${BACKEND_URL}/inventory/max-dish-quantity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.maxQty ?? 0;
    } catch (error) {
      console.error('Lỗi khi kiểm tra số lượng tối đa:', error);
      throw error;
    }
  },
  
};