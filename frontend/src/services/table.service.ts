interface Table {
  _id: string;
  tableName: string;
  qrToken: string;
}
export function getListTable(): Promise<Table[]> {
  return fetch("http://localhost:8080/backend/api/table/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
export function getTableByQrToken(qrToken: string): Promise<Table> {
  return fetch(`http://localhost:8080/backend/api/table/qr/${qrToken}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}