"use client";

import {
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  CheckCircle2,
  Search,
  X,
} from "lucide-react";

import {
  toggleCustomerActiveAction,
} from "@/actions/admin-customer.actions";

type CustomerRow = {
  id: string;

  name: string;
  email: string;

  emailVerified:
    | string
    | null;

  isActive: boolean;

  orderCount: number;
  reviewCount: number;
  addressCount: number;

  totalSpent: number;

  createdAt: string;
};

type Props = {
  initialCustomers: CustomerRow[];
};

export default function AdminCustomersClient({
  initialCustomers,
}: Props) {
  const [customers, setCustomers] =
    useState(initialCustomers);

  const [search, setSearch] =
    useState("");

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    if (!message) return;

    const timer =
      window.setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 2600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [message]);

  const filteredCustomers =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return customers;
      }

      return customers.filter(
        (customer) =>
          customer.name
            .toLowerCase()
            .includes(query) ||
          customer.email
            .toLowerCase()
            .includes(query),
      );
    }, [
      customers,
      search,
    ]);

  function handleToggle(
    customer: CustomerRow,
  ) {
    startTransition(async () => {
      const result =
        await toggleCustomerActiveAction({
          userId:
            customer.id,

          isActive:
            !customer.isActive,
        });

      setIsError(
        !result.success,
      );

      setMessage(
        result.message,
      );

      if (!result.success) {
        return;
      }

      setCustomers((current) =>
        current.map((item) =>
          item.id ===
          customer.id
            ? {
                ...item,
                isActive:
                  !item.isActive,
              }
            : item,
        ),
      );
    });
  }

  return (
    <>
      {message && (
        <div
          className="
            fixed
            right-[24px]
            top-[24px]
            z-[9999]

            w-[390px]
            max-w-[calc(100%_-_32px)]

            overflow-hidden
            rounded-[12px]

            border
            border-black/10

            bg-white

            shadow-[0_12px_40px_rgba(0,0,0,0.16)]
          "
        >
          <div
            className="
              flex
              min-h-[76px]
              items-center
              gap-[12px]

              px-[18px]
            "
          >
            <div
              className={`
                flex
                h-[32px]
                w-[32px]
                shrink-0
                items-center
                justify-center
                rounded-full

                ${
                  isError
                    ? "bg-red-50 text-red-600"
                    : "bg-black text-white"
                }
              `}
            >
              {isError ? (
                <X className="size-[18px]" />
              ) : (
                <CheckCircle2 className="size-[18px]" />
              )}
            </div>

            <p
              className="
                text-[13px]
                font-medium
                text-black
              "
            >
              {message}
            </p>
          </div>

          <div
            className={
              isError
                ? "h-[3px] bg-red-600"
                : "h-[3px] bg-black"
            }
          />
        </div>
      )}

      {/* SEARCH */}

      <div
        className="
          mb-[16px]

          flex
          h-[46px]
          max-w-[420px]
          items-center
          gap-[10px]

          rounded-[9px]

          bg-white

          px-[13px]
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.22)",
        }}
      >
        <Search
          className="
            size-[17px]
            shrink-0
            text-black/40
          "
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value,
            )
          }
          placeholder="Search customer name or email"
          className="
            min-w-0
            flex-1

            border-0
            bg-transparent

            text-[13px]
            text-black

            outline-none

            placeholder:text-black/35
          "
        />
      </div>

      {/* TABLE */}

      <div
        className="
          overflow-x-auto

          rounded-[14px]

          bg-white
        "
        style={{
          border:
            "1.5px solid rgba(0,0,0,0.14)",
        }}
      >
        <table
          className="
            w-full
            min-w-[1150px]
            border-collapse
          "
        >
          <thead className="bg-[#F8F8F8]">
            <tr>
              <Header>
                Customer
              </Header>

              <Header>
                Joined
              </Header>

              <Header>
                Orders
              </Header>

              <Header>
                Total Spent
              </Header>

              <Header>
                Reviews
              </Header>

              <Header>
                Addresses
              </Header>

              <Header>
                Status
              </Header>

              <Header>
                Action
              </Header>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map(
              (customer) => (
                <tr
                  key={customer.id}
                  className="
                    border-t
                    border-black/10

                    transition-colors

                    hover:bg-black/[0.015]
                  "
                >
                  <Cell>
                    <p
                      className="
                        font-semibold
                        text-black
                      "
                    >
                      {
                        customer.name
                      }
                    </p>

                    <p
                      className="
                        mt-[2px]

                        text-[11px]
                        text-black/45
                      "
                    >
                      {
                        customer.email
                      }
                    </p>
                  </Cell>

                  <Cell>
                    {new Date(
                      customer.createdAt,
                    ).toLocaleDateString(
                      "en-US",
                      {
                        year:
                          "numeric",

                        month:
                          "short",

                        day:
                          "numeric",
                      },
                    )}
                  </Cell>

                  <Cell>
                    {
                      customer.orderCount
                    }
                  </Cell>

                  <Cell>
                    <span
                      className="
                        font-semibold
                        text-black
                      "
                    >
                      $
                      {customer.totalSpent.toFixed(
                        2,
                      )}
                    </span>
                  </Cell>

                  <Cell>
                    {
                      customer.reviewCount
                    }
                  </Cell>

                  <Cell>
                    {
                      customer.addressCount
                    }
                  </Cell>

                  <Cell>
                    <span
                      className={`
                        inline-flex

                        rounded-full

                        px-[10px]
                        py-[5px]

                        text-[10px]
                        font-semibold

                        ${
                          customer.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }
                      `}
                    >
                      {customer.isActive
                        ? "Active"
                        : "Disabled"}
                    </span>
                  </Cell>

                  <Cell>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        handleToggle(
                          customer,
                        )
                      }
                      className="
                        h-[38px]

                        rounded-[8px]

                        bg-white

                        px-[14px]

                        text-[11px]
                        font-semibold
                        text-black

                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                      style={{
                        border:
                          "1.5px solid rgba(0,0,0,0.26)",
                      }}
                    >
                      {customer.isActive
                        ? "Disable Account"
                        : "Activate Account"}
                    </button>
                  </Cell>
                </tr>
            ))}

            {filteredCustomers.length ===
              0 && (
              <tr>
                <td
                  colSpan={8}
                  className="
                    px-[20px]
                    py-[70px]

                    text-center

                    text-[13px]
                    text-black/45
                  "
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Header({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <th
      className="
        px-[16px]
        py-[13px]

        text-left

        text-[11px]
        font-semibold
        uppercase
        tracking-[0.035em]
        text-black/50
      "
    >
      {children}
    </th>
  );
}

function Cell({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <td
      className="
        px-[16px]
        py-[15px]

        align-middle

        text-[13px]
        text-black/60
      "
    >
      {children}
    </td>
  );
}