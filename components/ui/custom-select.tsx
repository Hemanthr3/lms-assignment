import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';

export interface CustomSelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  className?: string;
  placeholder?: string;
}

const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ className, value, onChange, options, placeholder = 'Select...' }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <div
        ref={containerRef}
        className={cn('relative inline-block', className)}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-medium',
            'hover:bg-accent hover:text-accent-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'transition-colors',
            isOpen && 'ring-2 ring-ring ring-offset-2'
          )}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <ChevronDown
            className={cn(
              'ml-2 h-4 w-4 text-muted-foreground transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md border border-input bg-popover shadow-lg animate-in fade-in-0 zoom-in-95">
            <div className="p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus:bg-accent focus:text-accent-foreground',
                    value === option.value && 'bg-accent/50 font-medium'
                  )}
                >
                  <span className="flex-1 text-left">{option.label}</span>
                  {value === option.value && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = 'CustomSelect';

export { CustomSelect };
