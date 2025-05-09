import { getListTable } from "@/services/table.service";
export default async function QRCodePage() {  
  const listTable = await getListTable();
  return (
    <div className="grid grid-cols-4 items-center justify-center h-screen gap-2">
      {listTable.map((table) => (
        <div key={table._id} className="flex flex-col items-center justify-center  border rounded shadow-lg">
          <h2 className="text-xl font-semibold">{table.tableName}</h2>
          <img
            src={`https://quickchart.io/qr?text=http://localhost:3000?q=${table.qrToken}`}
            alt="QR Code"
            className="w-48 h-48"
          />
        </div>
      ))}
    </div>
  );
};
