interface order {
  _id: string;
  customerID: string;
  tableID: string;
  orderStatus: number;
  totalPrice: number;
}
export function getOrderByCustomerIdAndTableId(
  customerID: string,
  tableID: string
): Promise<order> {
  return fetch(
    `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/order/find-by-customer-table?customerID=${customerID}&tableID=${tableID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}
export function updateOrder(id: string, orderStatus: number) {
  return fetch(
    `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/order/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderStatus }),
    }
  ).then((res) => res.json());
}