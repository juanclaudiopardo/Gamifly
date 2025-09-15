import * as Haptics from 'expo-haptics';
import React, { useCallback, useMemo } from 'react';
import {
  AccessibilityState,
  GestureResponderEvent,
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  checked: '#0FB758',
  border: '#63666B',
  white: '#FFFFFF',
  text: '#63666B',
  disabled: '#9CA3AF',
} as const;

interface BaseCheckboxProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  enableHaptics?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  onValueChange?: (checked: boolean) => void;
}

export type CheckboxProps = BaseCheckboxProps &
  Omit<PressableProps, 'style' | 'disabled'> & {
    style?: ViewStyle;
    labelStyle?: TextStyle;
  };

export const Checkbox: React.FC<CheckboxProps> = React.memo(
  ({
    label,
    checked = false,
    disabled = false,
    enableHaptics = false,
    accessibilityLabel,
    accessibilityHint,
    style,
    labelStyle,
    onValueChange,
    ...pressableProps
  }) => {
    const accessibilityState: AccessibilityState = useMemo(
      () => ({
        disabled,
        checked,
      }),
      [disabled, checked]
    );

    const getCheckboxStyles = useMemo(
      () =>
        (pressed: boolean): ViewStyle[] => {
          const baseStyles: ViewStyle[] = [styles.checkbox];

          if (checked) {
            baseStyles.push(styles.checkedCheckbox);
          }

          if (disabled) {
            baseStyles.push(styles.disabledCheckbox);
          }

          if (pressed && !disabled) {
            baseStyles.push(styles.pressedCheckbox);
          }

          return baseStyles;
        },
      [checked, disabled]
    );

    const getLabelStyles = useMemo((): TextStyle[] => {
      const baseStyles: TextStyle[] = [styles.label];

      if (disabled) {
        baseStyles.push(styles.disabledLabel);
      }

      return baseStyles;
    }, [disabled]);

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        if (!disabled) {
          if (enableHaptics && Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          onValueChange?.(!checked);
        }
      },
      [disabled, enableHaptics, checked, onValueChange]
    );

    return (
      <Pressable
        {...pressableProps}
        disabled={disabled}
        onPress={handlePress}
        style={[styles.container, style]}
        accessibilityRole='checkbox'
        accessibilityLabel={accessibilityLabel || label}
        accessibilityHint={accessibilityHint}
        accessibilityState={accessibilityState}
      >
        {({ pressed }) => (
          <>
            <View style={getCheckboxStyles(pressed)}>
              {checked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[...getLabelStyles, labelStyle]}>{label}</Text>
          </>
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  checkedCheckbox: {
    backgroundColor: COLORS.checked,
    borderColor: COLORS.checked,
  },
  disabledCheckbox: {
    borderColor: COLORS.disabled,
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  pressedCheckbox: {
    transform: [{ scale: 0.95 }],
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 2,
  },
  disabledLabel: {
    color: COLORS.disabled,
    opacity: 0.6,
  },
});
