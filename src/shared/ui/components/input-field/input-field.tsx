
import { UseFormRegister, Path, FieldValues } from "react-hook-form";
import cn from 'classnames';


type TInputFieldProps<T extends FieldValues> = {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
};

export const InputField = <T extends FieldValues>({ label, type, placeholder, register, name, error }: TInputFieldProps<T>) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={cn('input input-primary w-full', { ['input-error']: error })}
      />
      {error && <span className="text-error text-[12px]">{error}</span>}
    </div>
  );
};