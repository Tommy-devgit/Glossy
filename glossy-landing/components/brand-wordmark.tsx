type BrandWordmarkProps = {
  className?: string;
};

export function BrandWordmark({ className = "" }: BrandWordmarkProps) {
  return <span className={`font-brand lowercase leading-none ${className}`.trim()}>glossy</span>;
}
