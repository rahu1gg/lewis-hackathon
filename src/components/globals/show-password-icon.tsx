import { EyeIcon, EyeOff } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

export function ShowPasswordIcon({ showPassword, setShowPassword }: { showPassword: boolean; setShowPassword: Dispatch<SetStateAction<boolean>> }) {
  return (
    <button
      type='button'
      className='absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground duration-300 '
      onClick={() => setShowPassword((curr) => !curr)}
    >
      {showPassword ? <EyeIcon size={16} /> : <EyeOff size={16} />}
    </button>
  );
}
