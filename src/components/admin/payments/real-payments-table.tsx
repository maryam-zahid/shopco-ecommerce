// import Link from "next/link";

// type PaymentRow = {
//   id: string;

//   attemptNumber: number;

//   provider: string;

//   amount: number;

//   currency: string;

//   status: string;

//   stripeCheckoutSessionId:
//     | string
//     | null;

//   stripePaymentIntentId:
//     | string
//     | null;

//   failureMessage:
//     | string
//     | null;

//   createdAt: Date;

//   customer: {
//     name: string;
//     email: string;
//   };

//   order: {
//     orderNumber: string;
//     status: string;
//     paymentStatus: string;
//   };
// };

// type RealPaymentsTableProps = {
//   payments: PaymentRow[];
// };

// export default function RealPaymentsTable({
//   payments,
// }: RealPaymentsTableProps) {
//   return (
//     <div
//       className="
//         overflow-x-auto

//         rounded-[14px]

//         border
//         border-black/10

//         bg-white
//       "
//     >
//       <table
//         className="
//           w-full
//           min-w-[1100px]
//           border-collapse
//         "
//       >
//         <thead className="bg-[#F8F8F8]">
//           <tr>
//             <Header>
//               Order
//             </Header>

//             <Header>
//               Customer
//             </Header>

//             <Header>
//               Provider
//             </Header>

//             <Header>
//               Attempt
//             </Header>

//             <Header>
//               Amount
//             </Header>

//             <Header>
//               Payment Status
//             </Header>

//             <Header>
//               Date
//             </Header>

//             <Header>
//               Details
//             </Header>
//           </tr>
//         </thead>

//         <tbody>
//           {payments.map(
//             (payment) => (
//               <tr
//                 key={payment.id}
//                 className="
//                   border-t
//                   border-black/10
//                 "
//               >
//                 <Cell>
//                   <Link
//                     href={`/admin/orders`}
//                     className="
//                       font-semibold
//                       text-black
//                     "
//                   >
//                     {
//                       payment.order
//                         .orderNumber
//                     }
//                   </Link>

//                   <p
//                     className="
//                       mt-[3px]
//                       text-[11px]
//                       text-black/45
//                     "
//                   >
//                     {
//                       payment.order
//                         .status
//                     }
//                   </p>
//                 </Cell>

//                 <Cell>
//                   <p
//                     className="
//                       font-medium
//                       text-black
//                     "
//                   >
//                     {
//                       payment.customer
//                         .name
//                     }
//                   </p>

//                   <p
//                     className="
//                       mt-[2px]
//                       text-[11px]
//                       text-black/45
//                     "
//                   >
//                     {
//                       payment.customer
//                         .email
//                     }
//                   </p>
//                 </Cell>

//                 <Cell>
//                   <Badge>
//                     {
//                       payment.provider
//                     }
//                   </Badge>
//                 </Cell>

//                 <Cell>
//                   #
//                   {
//                     payment.attemptNumber
//                   }
//                 </Cell>

//                 <Cell>
//                   <span
//                     className="
//                       font-semibold
//                       text-black
//                     "
//                   >
//                     $
//                     {payment.amount.toFixed(
//                       2,
//                     )}
//                   </span>

//                   <p
//                     className="
//                       mt-[2px]
//                       text-[10px]
//                       uppercase
//                       text-black/40
//                     "
//                   >
//                     {
//                       payment.currency
//                     }
//                   </p>
//                 </Cell>

//                 <Cell>
//                   <Badge>
//                     {
//                       payment.status
//                     }
//                   </Badge>

//                   {payment.failureMessage && (
//                     <p
//                       className="
//                         mt-[4px]
//                         max-w-[180px]
//                         truncate

//                         text-[11px]
//                         text-red-600
//                       "
//                       title={
//                         payment.failureMessage
//                       }
//                     >
//                       {
//                         payment.failureMessage
//                       }
//                     </p>
//                   )}
//                 </Cell>

//                 <Cell>
//                   {payment.createdAt.toLocaleDateString(
//                     "en-US",
//                     {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     },
//                   )}
//                 </Cell>

//                 <Cell>
//                   {payment.stripeCheckoutSessionId ? (
//                     <div
//                       className="
//                         max-w-[180px]
//                       "
//                     >
//                       <p
//                         className="
//                           truncate
//                           text-[11px]
//                           text-black/60
//                         "
//                         title={
//                           payment.stripeCheckoutSessionId
//                         }
//                       >
//                         Session:{" "}
//                         {
//                           payment.stripeCheckoutSessionId
//                         }
//                       </p>

//                       {payment.stripePaymentIntentId && (
//                         <p
//                           className="
//                             mt-[3px]
//                             truncate
//                             text-[11px]
//                             text-black/45
//                           "
//                           title={
//                             payment.stripePaymentIntentId
//                           }
//                         >
//                           PI:{" "}
//                           {
//                             payment.stripePaymentIntentId
//                           }
//                         </p>
//                       )}
//                     </div>
//                   ) : (
//                     <span
//                       className="
//                         text-[12px]
//                         text-black/35
//                       "
//                     >
//                       —
//                     </span>
//                   )}
//                 </Cell>
//               </tr>
//             ),
//           )}

//           {payments.length ===
//             0 && (
//             <tr>
//               <td
//                 colSpan={8}
//                 className="
//                   px-[20px]
//                   py-[70px]

//                   text-center

//                   text-[14px]
//                   text-black/45
//                 "
//               >
//                 No payment
//                 attempts yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function Header({
//   children,
// }: {
//   children:
//     React.ReactNode;
// }) {
//   return (
//     <th
//       className="
//         px-[16px]
//         py-[13px]

//         text-left

//         text-[11px]
//         font-semibold
//         uppercase
//         tracking-[0.04em]
//         text-black/50
//       "
//     >
//       {children}
//     </th>
//   );
// }

// function Cell({
//   children,
// }: {
//   children:
//     React.ReactNode;
// }) {
//   return (
//     <td
//       className="
//         px-[16px]
//         py-[15px]

//         align-middle

//         text-[13px]
//         text-black/60
//       "
//     >
//       {children}
//     </td>
//   );
// }

// function Badge({
//   children,
// }: {
//   children:
//     React.ReactNode;
// }) {
//   return (
//     <span
//       className="
//         inline-flex

//         rounded-full

//         border
//         border-black/10

//         bg-[#F8F8F8]

//         px-[9px]
//         py-[4px]

//         text-[10px]
//         font-semibold
//         text-black
//       "
//     >
//       {children}
//     </span>
//   );
// }

type PaymentRow = {
  id: string;

  attemptNumber: number;

  provider: string;

  amount: number;

  currency: string;

  status: string;

  stripeCheckoutSessionId:
    | string
    | null;

  stripePaymentIntentId:
    | string
    | null;

  failureMessage:
    | string
    | null;

  createdAt: string;

  customer: {
    id: string;
    name: string;
    email: string;
  };

  order: {
    id: string;

    orderNumber: string;

    status: string;

    paymentStatus: string;

    paymentMethod: string;

    total: number;
  };
};

type RealPaymentsTableProps = {
  payments: PaymentRow[];
};

export default function RealPaymentsTable({
  payments,
}: RealPaymentsTableProps) {
  return (
    <div
      className="
        overflow-x-auto

        rounded-[12px]

        border
        border-black/10

        bg-white
      "
    >
      <table
        className="
          w-full
          min-w-[1050px]
          border-collapse
        "
      >
        <thead className="bg-[#F8F8F8]">
          <tr>
            <Header>Order</Header>
            <Header>Customer</Header>
            <Header>Provider</Header>
            <Header>Attempt</Header>
            <Header>Amount</Header>
            <Header>Status</Header>
            <Header>Date</Header>
            <Header>Stripe Reference</Header>
          </tr>
        </thead>

        <tbody>
          {payments.map(
            (payment) => (
              <tr
                key={payment.id}
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
                      whitespace-nowrap
                      font-semibold
                      text-black
                    "
                  >
                    {
                      payment.order
                        .orderNumber
                    }
                  </p>

                  <p
                    className="
                      mt-[3px]
                      text-[11px]
                      text-black/40
                    "
                  >
                    Order:{" "}
                    {
                      payment.order
                        .status
                    }
                  </p>
                </Cell>

                <Cell>
                  <p
                    className="
                      font-medium
                      text-black
                    "
                  >
                    {
                      payment.customer
                        .name
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
                      payment.customer
                        .email
                    }
                  </p>
                </Cell>

                <Cell>
                  <Badge>
                    {payment.provider}
                  </Badge>
                </Cell>

                <Cell>
                  #{payment.attemptNumber}
                </Cell>

                <Cell>
                  <p
                    className="
                      font-semibold
                      text-black
                    "
                  >
                    $
                    {payment.amount.toFixed(
                      2,
                    )}
                  </p>

                  <p
                    className="
                      mt-[2px]
                      text-[10px]
                      uppercase
                      text-black/40
                    "
                  >
                    {payment.currency}
                  </p>
                </Cell>

                <Cell>
                  <Badge
                    status={
                      payment.status
                    }
                  >
                    {payment.status}
                  </Badge>

                  {payment.failureMessage && (
                    <p
                      className="
                        mt-[4px]
                        max-w-[190px]
                        truncate

                        text-[11px]
                        text-red-600
                      "
                      title={
                        payment.failureMessage
                      }
                    >
                      {
                        payment.failureMessage
                      }
                    </p>
                  )}
                </Cell>

                <Cell>
                  {new Date(
                    payment.createdAt,
                  ).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </Cell>

                <Cell>
                  {payment.stripeCheckoutSessionId ? (
                    <div className="max-w-[190px]">
                      <p
                        className="
                          truncate
                          text-[11px]
                          text-black/55
                        "
                        title={
                          payment.stripeCheckoutSessionId
                        }
                      >
                        {
                          payment.stripeCheckoutSessionId
                        }
                      </p>

                      {payment.stripePaymentIntentId && (
                        <p
                          className="
                            mt-[3px]
                            truncate
                            text-[11px]
                            text-black/40
                          "
                          title={
                            payment.stripePaymentIntentId
                          }
                        >
                          {
                            payment.stripePaymentIntentId
                          }
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-black/30">
                      —
                    </span>
                  )}
                </Cell>
              </tr>
            ),
          )}

          {payments.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="
                  px-[20px]
                  py-[70px]

                  text-center

                  text-[14px]
                  text-black/45
                "
              >
                No payment attempts yet.
                Card payment attempts will appear
                here after Stripe is configured.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Header({
  children,
}: {
  children: React.ReactNode;
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
        tracking-[0.04em]
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
  children: React.ReactNode;
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

function Badge({
  children,
  status,
}: {
  children: React.ReactNode;
  status?: string;
}) {
  const className =
    status === "PAID"
      ? "border-green-200 bg-green-50 text-green-700"
      : status === "FAILED"
        ? "border-red-200 bg-red-50 text-red-700"
        : status === "EXPIRED"
          ? "border-black/10 bg-black/5 text-black/50"
          : "border-black/10 bg-[#F8F8F8] text-black";

  return (
    <span
      className={`
        inline-flex

        rounded-full

        border

        px-[9px]
        py-[4px]

        text-[10px]
        font-semibold

        ${className}
      `}
    >
      {children}
    </span>
  );
}