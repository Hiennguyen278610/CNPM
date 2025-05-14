interface Table {
  _id: string;
  tableName: string;
  qrToken: string;
}
export function getListTable(): Promise<Table[]> {
  return fetch(`http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/table/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
export function getTableByQrToken(qrToken: string): Promise<Table> {
  return fetch(`http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/table/qr/${qrToken}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
export function createCustomer(){
  return fetch(`http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/customer/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
export function deleteCustomer(id: string){
  return fetch(`http://${process.env.NEXT_PUBLIC_IPURL}:${process.env.NEXT_PUBLIC_URL_BACK_END}/backend/api/customer/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}