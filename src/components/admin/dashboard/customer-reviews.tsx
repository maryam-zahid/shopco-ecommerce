import {
  Star,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import {
  reviewDistribution,
} from "@/data/admin/dashboard-data";

const ratingColors: Record<number, string> = {
  5: "#22C55E",
  4: "#84CC16",
  3: "#EAB308",
  2: "#F59E0B",
  1: "#FB7185",
};

export default function CustomerReviews() {
  return (
    <Card
      className="
        h-full
        rounded-[10px]
        border
        border-black/10
        bg-white
        p-0
        shadow-none
      "
    >
      <div className="px-[24px] py-[20px]">
        {/* HEADER */}
        <div>
          <h2
            className="
              text-[14px]
              leading-[20px]
              font-semibold
              text-foreground
            "
          >
            Customer Reviews
          </h2>

          <p
            className="
              mt-[4px]
              text-[14px]
              leading-[20px]
              font-normal
              text-muted-foreground
            "
          >
            Based on 5,500 verified purchases
          </p>
        </div>

        {/* REVIEW SUMMARY */}
        <div
          className="
            mt-[22px]
            grid
            grid-cols-1
            gap-[22px]

            min-[600px]:grid-cols-[150px_1fr]
          "
        >
          {/* SCORE */}
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <div className="flex items-center gap-[3px]">
              {Array.from({ length: 5 }).map(
                (_, index) => (
                  <Star
                    key={index}
                    className="
                      size-[20px]
                      fill-[#FACC15]
                      text-[#FACC15]
                    "
                  />
                ),
              )}
            </div>

            <p
              className="
                mt-[8px]
                text-[30px]
                leading-[36px]
                font-bold
                text-foreground
              "
            >
              4.5
            </p>

            <p
              className="
                mt-[2px]
                text-[12px]
                leading-[16px]
                text-muted-foreground
              "
            >
              out of 5
            </p>
          </div>

          {/* DISTRIBUTION */}
          <div className="flex flex-col gap-[8px]">
            {reviewDistribution.map((item) => (
              <div
                key={item.rating}
                className="
                  grid
                  grid-cols-[34px_1fr_42px]
                  items-center
                  gap-[8px]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-[3px]

                    text-[12px]
                    leading-[16px]
                    font-medium
                    text-foreground
                  "
                >
                  {item.rating}

                  <Star
                    className="
                      size-[11px]
                      fill-current
                    "
                  />
                </div>

                <div
                  className="
                    h-[7px]
                    overflow-hidden
                    rounded-full
                    bg-[#F1F1F1]
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                    "
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor:
                        ratingColors[item.rating],
                    }}
                  />
                </div>

                <span
                  className="
                    text-right
                    text-[12px]
                    leading-[16px]
                    font-normal
                    text-muted-foreground
                  "
                >
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEW CARD */}
        <div
          className="
            mt-[22px]
            rounded-[8px]
            border
            border-black/10
            bg-[#FAFAFA]

            px-[16px]
            py-[14px]
          "
        >
          <div className="flex items-center gap-[2px]">
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <Star
                  key={index}
                  className="
                    size-[15px]
                    fill-[#FACC15]
                    text-[#FACC15]
                  "
                />
              ),
            )}
          </div>

          <h3
            className="
              mt-[6px]
              text-[14px]
              leading-[20px]
              font-medium
              text-foreground
            "
          >
            Exceeded my expectations!
          </h3>

          <p
            className="
              mt-[8px]
              text-[14px]
              leading-[20px]
              font-normal
              text-muted-foreground
            "
          >
            I was skeptical at first, but this
            product has completely changed my
            daily routine. The quality is
            outstanding and it&apos;s so easy to
            use.
          </p>

          <div
            className="
              mt-[12px]
              flex
              flex-wrap
              items-center
              gap-[8px]
            "
          >
            <span
              className="
                text-[12px]
                leading-[16px]
                text-foreground
              "
            >
              Sarah J.
            </span>

            <span
              className="
                rounded-[4px]
                bg-emerald-100

                px-[6px]
                py-[2px]

                text-[12px]
                leading-[16px]
                font-medium
                text-emerald-700
              "
            >
              Verified Purchase
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}