import TransactionsTable from "@/components/admin/payments/transactions-table";

export default function TransactionsPage() {
  return (
    <div className="px-[20px] py-[20px]">
      <div className="mb-[18px]">
        <h1 className="text-[24px] font-semibold">
          Transactions
        </h1>

        <p className="mt-[4px] text-[14px] text-muted-foreground">
          View and manage all payment transactions.
        </p>
      </div>

      <TransactionsTable />
    </div>
  );
}