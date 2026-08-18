"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Columns3,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

type AdminOrderRow = {
  id: string;
  orderNumber: string;

  customerName: string;
  customerEmail: string;

  status: OrderStatus;

  paymentStatus: string;
  paymentMethod: string;

  total: number;

  createdAt: string;

  productName: string;
  productImage: string | null;

  category: string;

  itemCount: number;
};

type Props = {
  initialOrders: AdminOrderRow[];
};

type Tab =
  | "ALL"
  | "COMPLETED"
  | "PROCESSED"
  | "RETURNED"
  | "CANCELLED";

type ColumnKey =
  | "id"
  | "product"
  | "price"
  | "customer"
  | "date"
  | "type"
  | "status";

const PAGE_SIZE = 10;

export default function AdminOrdersTable({
  initialOrders,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState<Tab>("ALL");

  const [statusOpen, setStatusOpen] =
    useState(false);

  const [
    categoryOpen,
    setCategoryOpen,
  ] = useState(false);

  const [
    columnsOpen,
    setColumnsOpen,
  ] = useState(false);

  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  const [
    selectedStatuses,
    setSelectedStatuses,
  ] = useState<string[]>([]);

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<string[]>([]);

  const [
    selectedRows,
    setSelectedRows,
  ] = useState<string[]>([]);

  const [page, setPage] =
    useState(1);

  const [visibleColumns, setVisibleColumns] =
    useState<Record<ColumnKey, boolean>>({
      id: true,
      product: true,
      price: true,
      customer: true,
      date: true,
      type: true,
      status: true,
    });

  const categories =
    useMemo(() => {
      return Array.from(
        new Set(
          initialOrders.map(
            (order) =>
              order.category,
          ),
        ),
      ).sort();
    }, [initialOrders]);

  const statuses = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ];

  const filtered =
    useMemo(() => {
      const term =
        search
          .trim()
          .toLowerCase();

      return initialOrders.filter(
        (order) => {
          const matchesSearch =
            !term ||
            order.orderNumber
              .toLowerCase()
              .includes(term) ||
            order.productName
              .toLowerCase()
              .includes(term) ||
            order.customerName
              .toLowerCase()
              .includes(term) ||
            order.customerEmail
              .toLowerCase()
              .includes(term);

          let matchesTab = true;

          if (
            activeTab ===
            "COMPLETED"
          ) {
            matchesTab =
              order.status ===
              "DELIVERED";
          }

          if (
            activeTab ===
            "PROCESSED"
          ) {
            matchesTab =
              order.status ===
                "PROCESSING" ||
              order.status ===
                "SHIPPED" ||
              order.status ===
                "OUT_FOR_DELIVERY";
          }

          if (
            activeTab ===
            "RETURNED"
          ) {
            matchesTab = false;
          }

          if (
            activeTab ===
            "CANCELLED"
          ) {
            matchesTab =
              order.status ===
              "CANCELLED";
          }

          const matchesStatus =
            selectedStatuses.length ===
              0 ||
            selectedStatuses.includes(
              order.status,
            );

          const matchesCategory =
            selectedCategories.length ===
              0 ||
            selectedCategories.includes(
              order.category,
            );

          return (
            matchesSearch &&
            matchesTab &&
            matchesStatus &&
            matchesCategory
          );
        },
      );
    }, [
      initialOrders,
      search,
      activeTab,
      selectedStatuses,
      selectedCategories,
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filtered.length /
        PAGE_SIZE,
    ),
  );

  const safePage = Math.min(
    page,
    totalPages,
  );

  const displayed =
    filtered.slice(
      (safePage - 1) *
        PAGE_SIZE,

      safePage * PAGE_SIZE,
    );

  function toggleStatus(
    value: string,
  ) {
    setPage(1);

    setSelectedStatuses(
      (current) =>
        current.includes(value)
          ? current.filter(
              (item) =>
                item !== value,
            )
          : [
              ...current,
              value,
            ],
    );
  }

  function toggleCategory(
    value: string,
  ) {
    setPage(1);

    setSelectedCategories(
      (current) =>
        current.includes(value)
          ? current.filter(
              (item) =>
                item !== value,
            )
          : [
              ...current,
              value,
            ],
    );
  }

  function toggleRow(
    id: string,
  ) {
    setSelectedRows(
      (current) =>
        current.includes(id)
          ? current.filter(
              (item) =>
                item !== id,
            )
          : [...current, id],
    );
  }

  function toggleAllDisplayed() {
    const ids =
      displayed.map(
        (order) => order.id,
      );

    const allSelected =
      ids.every((id) =>
        selectedRows.includes(id),
      );

    setSelectedRows(
      (current) =>
        allSelected
          ? current.filter(
              (id) =>
                !ids.includes(id),
            )
          : Array.from(
              new Set([
                ...current,
                ...ids,
              ]),
            ),
    );
  }

  return (
    <div className="w-full">
      {/* ============================
          TABS
      ============================= */}

      <div
        className="
          inline-flex
          items-center
          rounded-[8px]
          bg-[#F3F3F3]
          p-[3px]
        "
      >
        <TabButton
          label="All"
          active={
            activeTab === "ALL"
          }
          onClick={() => {
            setActiveTab("ALL");
            setPage(1);
          }}
        />

        <TabButton
          label="Completed"
          active={
            activeTab ===
            "COMPLETED"
          }
          onClick={() => {
            setActiveTab(
              "COMPLETED",
            );
            setPage(1);
          }}
        />

        <TabButton
          label="Processed"
          active={
            activeTab ===
            "PROCESSED"
          }
          onClick={() => {
            setActiveTab(
              "PROCESSED",
            );
            setPage(1);
          }}
        />

        <TabButton
          label="Returned"
          active={
            activeTab ===
            "RETURNED"
          }
          onClick={() => {
            setActiveTab(
              "RETURNED",
            );
            setPage(1);
          }}
        />

        <TabButton
          label="Canceled"
          active={
            activeTab ===
            "CANCELLED"
          }
          onClick={() => {
            setActiveTab(
              "CANCELLED",
            );
            setPage(1);
          }}
        />
      </div>

      {/* ============================
          FILTER BAR
      ============================= */}

      <div
        className="
          mt-[20px]

          flex
          items-center
          justify-between
          gap-[12px]
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-[8px]
          "
        >
          <div
            className="
              flex
              h-[36px]
              w-[380px]
              max-w-full
              items-center
              gap-[8px]

              rounded-[7px]
              bg-white
              px-[11px]
            "
            style={{
              border:
                "1px solid #D9D9D9",
            }}
          >
            <Search className="size-[15px] shrink-0 text-black/40" />

            <input
              value={search}
              onChange={(
                event,
              ) => {
                setSearch(
                  event.target.value,
                );
                setPage(1);
              }}
              placeholder="Search orders..."
              className="
                min-w-0
                flex-1
                border-0
                bg-transparent
                text-[12px]
                text-black
                outline-none

                placeholder:text-black/40
              "
            />
          </div>

          <div className="relative">
            <FilterButton
              label="Status"
              onClick={() => {
                setStatusOpen(
                  !statusOpen,
                );

                setCategoryOpen(
                  false,
                );

                setColumnsOpen(
                  false,
                );
              }}
            />

            {statusOpen && (
              <DropdownPanel
                title="Status"
              >
                {statuses.map(
                  (status) => (
                    <DropdownOption
                      key={status}
                      checked={selectedStatuses.includes(
                        status,
                      )}
                      label={formatStatus(
                        status,
                      )}
                      onClick={() =>
                        toggleStatus(
                          status,
                        )
                      }
                    />
                  ),
                )}
              </DropdownPanel>
            )}
          </div>

          <div className="relative">
            <FilterButton
              label="Category"
              onClick={() => {
                setCategoryOpen(
                  !categoryOpen,
                );

                setStatusOpen(
                  false,
                );

                setColumnsOpen(
                  false,
                );
              }}
            />

            {categoryOpen && (
              <DropdownPanel
                title="Category"
              >
                {categories.map(
                  (category) => (
                    <DropdownOption
                      key={category}
                      checked={selectedCategories.includes(
                        category,
                      )}
                      label={
                        category
                      }
                      onClick={() =>
                        toggleCategory(
                          category,
                        )
                      }
                    />
                  ),
                )}
              </DropdownPanel>
            )}
          </div>
        </div>

        {/* COLUMNS */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setColumnsOpen(
                !columnsOpen,
              );

              setStatusOpen(
                false,
              );

              setCategoryOpen(
                false,
              );
            }}
            className="
              flex
              h-[36px]
              w-[42px]
              items-center
              justify-center

              rounded-[7px]
              bg-white

              text-black

              shadow-[0_1px_3px_rgba(0,0,0,0.06)]
            "
            style={{
              border:
                "1px solid #D9D9D9",
            }}
            aria-label="Columns"
          >
            <Columns3 className="size-[15px]" />
          </button>

          {columnsOpen && (
            <div
              className="
                absolute
                right-0
                top-[42px]
                z-[100]

                w-[150px]

                rounded-[7px]
                bg-white

                py-[6px]

                shadow-[0_8px_25px_rgba(0,0,0,0.14)]
              "
              style={{
                border:
                  "1px solid #D9D9D9",
              }}
            >
              {(
                [
                  [
                    "id",
                    "Id",
                  ],
                  [
                    "product",
                    "Product_name",
                  ],
                  [
                    "price",
                    "Price",
                  ],
                  [
                    "customer",
                    "Customer",
                  ],
                  [
                    "date",
                    "Date",
                  ],
                  [
                    "type",
                    "Type",
                  ],
                  [
                    "status",
                    "Status",
                  ],
                ] as const
              ).map(
                ([
                  key,
                  label,
                ]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setVisibleColumns(
                        (
                          current,
                        ) => ({
                          ...current,

                          [key]:
                            !current[
                              key
                            ],
                        }),
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-[9px]

                      px-[11px]
                      py-[7px]

                      text-left
                      text-[12px]
                      text-black

                      hover:bg-[#F7F7F7]
                    "
                  >
                    <Check
                      className={`size-[14px] ${
                        visibleColumns[
                          key
                        ]
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />

                    {label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* ============================
          TABLE
      ============================= */}

      <div
        className="
          mt-[16px]
          overflow-x-auto
          rounded-[7px]
          bg-white
        "
        style={{
          border:
            "1px solid #DDDDDD",
        }}
      >
        <table
          className="
            w-full
            min-w-[1040px]
            border-collapse
          "
        >
          <thead>
            <tr className="bg-[#FAFAFA]">
              <th
                className="
                  w-[42px]
                  px-[8px]
                  py-[10px]
                  text-center
                "
              >
                <RowCheckbox
                  checked={
                    displayed.length >
                      0 &&
                    displayed.every(
                      (order) =>
                        selectedRows.includes(
                          order.id,
                        ),
                    )
                  }
                  onClick={
                    toggleAllDisplayed
                  }
                />
              </th>

              {visibleColumns.id && (
                <Header>#</Header>
              )}

              {visibleColumns.product && (
                <Header>
                  Product
                </Header>
              )}

              {visibleColumns.price && (
                <Header>
                  Price ↕
                </Header>
              )}

              {visibleColumns.customer && (
                <Header>
                  Customer
                </Header>
              )}

              {visibleColumns.date && (
                <Header>
                  Date ↕
                </Header>
              )}

              {visibleColumns.type && (
                <Header>
                  Type
                </Header>
              )}

              {visibleColumns.status && (
                <Header>
                  Status ↕
                </Header>
              )}

              <th className="w-[44px]" />
            </tr>
          </thead>

          <tbody>
            {displayed.map(
              (order) => (
                <tr
                  key={order.id}
                  className="
                    border-t
                    border-[#E5E5E5]

                    hover:bg-[#FCFCFC]
                  "
                >
                  <td
                    className="
                      px-[8px]
                      py-[8px]
                      text-center
                    "
                  >
                    <RowCheckbox
                      checked={selectedRows.includes(
                        order.id,
                      )}
                      onClick={() =>
                        toggleRow(
                          order.id,
                        )
                      }
                    />
                  </td>

                  {visibleColumns.id && (
                    <Cell>
                      <Link
                        href={`/admin/orders/${order.orderNumber}`}
                        className="
                          text-[11px]
                          font-medium
                          text-black/55

                          hover:text-black
                        "
                      >
                        #
                        {order.orderNumber
                          .replace(
                            "SHOP-",
                            "",
                          )
                          .slice(
                            0,
                            5,
                          )}
                      </Link>
                    </Cell>
                  )}

                  {visibleColumns.product && (
                    <Cell>
                      <div
                        className="
                          flex
                          items-center
                          gap-[11px]
                        "
                      >
                        <div
                          className="
                            relative

                            h-[42px]
                            w-[42px]
                            shrink-0

                            overflow-hidden

                            rounded-[6px]
                            bg-[#F0EEED]
                          "
                        >
                          {order.productImage ? (
                            <Image
                              src={
                                order.productImage
                              }
                              alt={
                                order.productName
                              }
                              fill
                              sizes="42px"
                              className="object-contain p-[2px]"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[8px] text-black/30">
                              No image
                            </div>
                          )}
                        </div>

                        <div>
                          <Link
                            href={`/admin/orders/${order.orderNumber}`}
                            className="
                              text-[12px]
                              font-medium
                              text-black

                              hover:underline
                            "
                          >
                            {
                              order.productName
                            }
                          </Link>

                          {order.itemCount >
                            1 && (
                            <p className="mt-[1px] text-[9px] text-black/40">
                              +
                              {order.itemCount -
                                1}{" "}
                              more
                            </p>
                          )}
                        </div>
                      </div>
                    </Cell>
                  )}

                  {visibleColumns.price && (
                    <Cell>
                      <span className="text-[12px] font-medium text-black">
                        $
                        {order.total.toFixed(
                          2,
                        )}
                      </span>
                    </Cell>
                  )}

                  {visibleColumns.customer && (
                    <Cell>
                      <p className="text-[12px] font-semibold text-black">
                        {
                          order.customerName
                        }
                      </p>

                      <p className="mt-[1px] text-[10px] text-black/45">
                        {
                          order.customerEmail
                        }
                      </p>
                    </Cell>
                  )}

                  {visibleColumns.date && (
                    <Cell>
                      <span className="text-[11px] text-black/70">
                        {new Date(
                          order.createdAt,
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month:
                              "short",

                            day:
                              "2-digit",

                            year:
                              "numeric",
                          },
                        )}
                      </span>
                    </Cell>
                  )}

                  {visibleColumns.type && (
                    <Cell>
                      <span className="text-[11px] text-black/70">
                        Sale
                      </span>
                    </Cell>
                  )}

                  {visibleColumns.status && (
                    <Cell>
                      <StatusBadge
                        status={
                          order.status
                        }
                      />
                    </Cell>
                  )}

                  <td
                    className="
                      relative
                      px-[8px]
                      py-[8px]
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu ===
                            order.id
                            ? null
                            : order.id,
                        )
                      }
                      className="
                        flex
                        h-[30px]
                        w-[30px]
                        items-center
                        justify-center

                        rounded-[5px]

                        hover:bg-black/[0.04]
                      "
                    >
                      <MoreHorizontal className="size-[15px]" />
                    </button>

                    {openMenu ===
                      order.id && (
                      <div
                        className="
                          absolute
                          right-[8px]
                          top-[38px]
                          z-[100]

                          w-[130px]

                          rounded-[6px]
                          bg-white

                          py-[5px]

                          shadow-[0_8px_24px_rgba(0,0,0,0.14)]
                        "
                        style={{
                          border:
                            "1px solid #D9D9D9",
                        }}
                      >
                        <p className="px-[10px] py-[6px] text-[10px] text-black/45">
                          Actions
                        </p>

                        <Link
                          href={`/admin/orders/${order.orderNumber}`}
                          className="
                            block
                            px-[10px]
                            py-[7px]

                            text-[11px]
                            text-black

                            hover:bg-[#F5F5F5]
                          "
                        >
                          Order Details
                        </Link>

                        <Link
                          href={`/admin/orders/${order.orderNumber}#delivery-status`}
                          className="
                            block
                            px-[10px]
                            py-[7px]

                            text-[11px]
                            text-black

                            hover:bg-[#F5F5F5]
                          "
                        >
                          Edit
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ),
            )}

            {displayed.length ===
              0 && (
              <tr>
                <td
                  colSpan={10}
                  className="
                    px-[20px]
                    py-[70px]
                    text-center

                    text-[12px]
                    text-black/45
                  "
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ============================
          FOOTER
      ============================= */}

      <div
        className="
          mt-[14px]

          flex
          items-center
          justify-between
          gap-[12px]
        "
      >
        <p
          className="
            text-[11px]
            text-black/50
          "
        >
          {selectedRows.length} of{" "}
          {filtered.length} row(s)
          selected.
        </p>

        <div
          className="
            flex
            items-center
            gap-[7px]
          "
        >
          <button
            type="button"
            disabled={
              safePage <= 1
            }
            onClick={() =>
              setPage(
                Math.max(
                  1,
                  safePage - 1,
                ),
              )
            }
            className="
              inline-flex
              h-[34px]
              items-center
              justify-center
              gap-[5px]

              rounded-[6px]

              bg-white

              px-[11px]

              text-[11px]
              font-medium
              text-black

              disabled:cursor-not-allowed
              disabled:opacity-40
            "
            style={{
              border:
                "1px solid #D9D9D9",
            }}
          >
            <ChevronLeft className="size-[13px]" />
            Previous
          </button>

          <button
            type="button"
            disabled={
              safePage >=
              totalPages
            }
            onClick={() =>
              setPage(
                Math.min(
                  totalPages,
                  safePage + 1,
                ),
              )
            }
            className="
              inline-flex
              h-[34px]
              items-center
              justify-center
              gap-[5px]

              rounded-[6px]

              bg-white

              px-[11px]

              text-[11px]
              font-medium
              text-black

              disabled:cursor-not-allowed
              disabled:opacity-40
            "
            style={{
              border:
                "1px solid #D9D9D9",
            }}
          >
            Next
            <ChevronRight className="size-[13px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   TABS
========================================= */

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        h-[30px]
        rounded-[6px]

        px-[10px]

        text-[11px]
        font-medium

        ${
          active
            ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            : "text-black/50 hover:text-black"
        }
      `}
    >
      {label}
    </button>
  );
}

/* =========================================
   FILTER BUTTON
========================================= */

function FilterButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        min-h-[36px]
        min-w-[88px]

        items-center
        justify-center

        gap-[7px]

        rounded-[7px]

        px-[12px]
        py-[8px]

        text-[11px]
        font-medium
        leading-[16px]

        whitespace-nowrap

        transition-colors

        hover:bg-[#F7F7F7]
      "
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #D9D9D9",
        color: "#111111",
      }}
    >
      <PlusCircle
        className="
          h-[15px]
          w-[15px]
          shrink-0
        "
        style={{
          color: "#111111",
        }}
      />

      <span
        className="
          flex
          items-center
          justify-center
          leading-[16px]
        "
        style={{
          color: "#111111",
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* =========================================
   DROPDOWN
========================================= */

function DropdownPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        absolute
        left-0
        top-[42px]
        z-[100]

        w-[210px]

        overflow-hidden

        rounded-[7px]

        bg-white

        shadow-[0_8px_25px_rgba(0,0,0,0.14)]
      "
      style={{
        border:
          "1px solid #D9D9D9",
      }}
    >
      <div
        className="
          flex
          h-[38px]
          items-center
          gap-[7px]

          border-b
          border-black/10

          px-[10px]
        "
      >
        <Search className="size-[14px] text-black/40" />

        <span className="text-[11px] text-black/45">
          {title}
        </span>
      </div>

      <div className="p-[5px]">
        {children}
      </div>
    </div>
  );
}

function DropdownOption({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-[8px]

        rounded-[5px]

        px-[7px]
        py-[7px]

        text-left
        text-[11px]
        text-black

        ${
          checked
            ? "bg-[#EEEEF2]"
            : "hover:bg-[#F7F7F7]"
        }
      `}
    >
      <span
        className="
          flex
          h-[15px]
          w-[15px]
          shrink-0
          items-center
          justify-center

          rounded-[4px]

          bg-white
        "
        style={{
          border:
            "1px solid #D5D5D5",
        }}
      >
        {checked && (
          <Check className="size-[11px]" />
        )}
      </span>

      {label}
    </button>
  );
}

/* =========================================
   TABLE
========================================= */

function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      className="
        px-[11px]
        py-[10px]

        text-left

        text-[11px]
        font-medium
        text-black/70
      "
    >
      {children}
    </th>
  );
}

function Cell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td
      className="
        px-[11px]
        py-[8px]

        align-middle
      "
    >
      {children}
    </td>
  );
}

function RowCheckbox({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        h-[16px]
        w-[16px]
        items-center
        justify-center

        rounded-[4px]

        bg-white
      "
      style={{
        border:
          "1px solid #D2D2D2",
      }}
    >
      {checked && (
        <Check className="size-[11px]" />
      )}
    </button>
  );
}

/* =========================================
   STATUS
========================================= */

function StatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  let styles =
    "border-[#F59E0B] bg-[#FFF7E8] text-[#B45309]";

  if (
    status === "DELIVERED"
  ) {
    styles =
      "border-[#16A34A] bg-[#ECFDF3] text-[#15803D]";
  }

  if (
    status === "SHIPPED" ||
    status ===
      "OUT_FOR_DELIVERY"
  ) {
    styles =
      "border-[#D1D5DB] bg-[#E5E7EB] text-[#374151]";
  }

  if (
    status === "CANCELLED"
  ) {
    styles =
      "border-[#EF4444] bg-[#FEF2F2] text-[#B91C1C]";
  }

  if (
    status === "CONFIRMED" ||
    status ===
      "PROCESSING"
  ) {
    styles =
      "border-[#22C55E] bg-[#ECFDF3] text-[#15803D]";
  }

  return (
    <span
      className={`
        inline-flex
        h-[21px]
        items-center
        justify-center

        rounded-full
        border

        px-[8px]

        text-[9px]
        font-medium

        ${styles}
      `}
    >
      {formatStatus(status)}
    </span>
  );
}

function formatStatus(
  status: string,
) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase(),
    );
}