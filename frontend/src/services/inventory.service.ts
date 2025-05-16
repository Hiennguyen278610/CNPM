interface iventory {
  _id: string;
  ingredientID: string;
  qty: number;
}
interface recipe {
  _id: string;
  dishID: string;
  ingredientID: string;
  amountRequired: number;
}
export function updateInventory(id: string, qty: number) {
  return fetch(
    `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/inventory/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qty }),
    }
  ).then((res) => res.json());
}
export function getRecipe(dishID: string): Promise<recipe[]> {
  return fetch(
    `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/recipe/find-by-dish?dishID=${dishID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  // tai sao recipe lay ra lai la` mang rong~~~~~ ?????
    .then((res) => res.json())
}
export function getInventory(ingredientID: string): Promise<iventory> {
  return fetch(
    `http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/inventory/find-by-ingredient?ingredientID=${ingredientID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}
