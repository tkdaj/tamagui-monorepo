import { Input as TamaguiInput } from 'tamagui';

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}: InputProps) {
  return (
    <TamaguiInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={type === 'password'}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType={type === 'email' ? 'email-address' : 'default'}
      disabled={disabled}
      size="$4"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="white"
      paddingHorizontal="$3"
      paddingVertical="$2"
    />
  );
}
