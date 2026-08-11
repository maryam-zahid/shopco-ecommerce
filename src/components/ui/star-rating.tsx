type StarRatingProps = {
  rating: number;
};

function FullStar() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        fill="#FFC633"
        d="M10 0.8L12.84 6.55L19.18 7.47L14.59 11.94L15.67 18.25L10 15.27L4.33 18.25L5.41 11.94L0.82 7.47L7.16 6.55L10 0.8Z"
      />
    </svg>
  );
}

function HalfStar() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="half-star">
          <stop offset="50%" stopColor="#FFC633" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>

      <path
        fill="url(#half-star)"
        d="M10 0.8L12.84 6.55L19.18 7.47L14.59 11.94L15.67 18.25L10 15.27L4.33 18.25L5.41 11.94L0.82 7.47L7.16 6.55L10 0.8Z"
      />
    </svg>
  );
}

export default function StarRating({ rating }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-[11px] min-[800px]:gap-[13px]">
      <div
        className="
          flex
          h-[15.5px]
          items-center
          gap-[4.4px]

          min-[800px]:h-[18.5px]
          min-[800px]:gap-[5.3px]
        "
      >
        {Array.from({ length: fullStars }).map((_, index) => (
          <span
            key={index}
            className="
              h-[15.5px]
              w-[15.5px]

              min-[800px]:h-[18.5px]
              min-[800px]:w-[18.5px]
            "
          >
            <FullStar />
          </span>
        ))}

        {hasHalfStar && (
          <span
            className="
              h-[15.5px]
              w-[15.5px]

              min-[800px]:h-[18.5px]
              min-[800px]:w-[18.5px]
            "
          >
            <HalfStar />
          </span>
        )}
      </div>

      <span
        className="
          whitespace-nowrap
          text-[12px]
          leading-[16px]
          text-black

          min-[800px]:text-[14px]
          min-[800px]:leading-[19px]
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 400,
        }}
      >
        {rating}/5
      </span>
    </div>
  );
}