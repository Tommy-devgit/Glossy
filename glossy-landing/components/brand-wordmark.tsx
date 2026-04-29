type BrandWordmarkProps = {
  className?: string;
};

export function BrandWordmark({ className = "" }: BrandWordmarkProps) {
  return (
    <span className={`font-brand inline-block -translate-y-[0.06em] lowercase leading-none ${className}`.trim()}>
      glossy
    </span>
  );
}
