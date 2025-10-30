import { Button } from '@/components/ui/button';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

export function FilterButton({
  label,
  isActive,
  onClick,
  count,
}: FilterButtonProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      onClick={onClick}
      className="whitespace-nowrap cursor-pointer"
    >
      {label}
      {count !== undefined && count > 0 && (
        <span className="ml-1 text-xs opacity-70">({count})</span>
      )}
    </Button>
  );
}
