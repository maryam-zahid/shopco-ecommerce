type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`
        m-0
        text-center
        text-[32px]
        leading-[32px]
        font-black
        tracking-[0]
        text-black

        min-[800px]:text-[38px]
        min-[800px]:leading-[38px]

        min-[1200px]:text-[42px]
        min-[1200px]:leading-[42px]

        min-[1920px]:text-[48px]
        min-[1920px]:leading-[48px]

        ${className}
      `}
      style={{
        fontFamily: '"Arial Black", Arial, sans-serif',
        fontWeight: 900,
      }}
    >
      {children}
    </h2>
  );
}