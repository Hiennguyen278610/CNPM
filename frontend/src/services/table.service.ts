interface Table {
  _id: string;
  tableName: string;
  qrToken: string;
}
export function getListTable(): Promise<Table[]> {
  return fetch(`http://localhost:${process.env.NEXT_PUBLIC_PORT_BACK_END}/backend/api/table/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
export function getTableByQrToken(qrToken: string): Promise<Table> {
  return fetch(`http://localhost:${process.env.NEXT_PUBLIC_PORT_BACK_END}/backend/api/table/qr/${qrToken}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}