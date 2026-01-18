import type React from 'react';
import { Button as TamaguiButton } from 'tamagui';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ children, onPress, disabled = false, variant = 'primary' }: ButtonProps) {
  return (
    <TamaguiButton
      onPress={onPress}
      disabled={disabled}
      backgroundColor={
        variant === 'primary' ? '$blue10' : variant === 'secondary' ? '$gray10' : 'transparent'
      }
      color={variant === 'outline' ? '$color' : 'white'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor={variant === 'outline' ? '$borderColor' : 'transparent'}
      opacity={disabled ? 0.5 : 1}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      pressStyle={{ opacity: 0.8 }}
      size="$4"
    >
      {children}
    </TamaguiButton>
  );
}
