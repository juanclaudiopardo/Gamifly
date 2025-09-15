// components/input.tsx
import * as Haptics from 'expo-haptics';
import React, { forwardRef, useCallback, useMemo } from 'react';
import {
  AccessibilityState,
  GestureResponderEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  text: {
    primary: '#1F2937',
    secondary: '#374151',
    disabled: '#9CA3AF',
    placeholder: '#808080',
    error: '#EF4444',
  },
  border: {
    default: '#D1D5DB',
    error: '#EF4444',
    disabled: '#E5E7EB',
  },
  background: {
    default: '#FFFFFF',
    disabled: '#F9FAFB',
  },
} as const;

interface BaseInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  enableHaptics?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

type InputProps = BaseInputProps &
  Omit<TextInputProps, 'style'> & {
    style?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
  };

export const Input = React.memo(
  forwardRef<TextInput, InputProps>(
    (
      {
        label,
        error,
        leftIcon,
        rightIcon,
        onLeftIconPress,
        onRightIconPress,
        enableHaptics = false,
        accessibilityLabel,
        accessibilityHint,
        style,
        inputStyle,
        labelStyle,
        errorStyle,
        editable = true,
        ...textInputProps
      },
      ref
    ) => {
      const accessibilityState: AccessibilityState = useMemo(
        () => ({
          disabled: !editable,
        }),
        [editable]
      );

      const getContainerStyles = useMemo((): ViewStyle[] => {
        const baseStyles: ViewStyle[] = [styles.container];
        if (style) baseStyles.push(style);
        return baseStyles;
      }, [style]);

      const getInputContainerStyles = useMemo((): ViewStyle[] => {
        const baseStyles: ViewStyle[] = [styles.inputContainer];

        if (error) {
          baseStyles.push(styles.errorInputContainer);
        }
        if (!editable) {
          baseStyles.push(styles.disabledInputContainer);
        }

        return baseStyles;
      }, [error, editable]);

      const getInputStyles = useMemo((): TextStyle[] => {
        const baseStyles: TextStyle[] = [styles.baseInput];

        if (!editable) {
          baseStyles.push(styles.disabledInput);
        }

        if (leftIcon) {
          baseStyles.push(styles.inputWithLeftIcon);
        }
        if (rightIcon) {
          baseStyles.push(styles.inputWithRightIcon);
        }

        if (inputStyle) baseStyles.push(inputStyle);
        return baseStyles;
      }, [editable, leftIcon, rightIcon, inputStyle]);

      const getLabelStyles = useMemo((): TextStyle[] => {
        const baseLabelStyles: TextStyle[] = [styles.floatingLabel];
        if (labelStyle) baseLabelStyles.push(labelStyle);
        return baseLabelStyles;
      }, [labelStyle]);

      const getErrorStyles = useMemo((): TextStyle[] => {
        const baseErrorStyles: TextStyle[] = [styles.baseError];
        if (errorStyle) baseErrorStyles.push(errorStyle);
        return baseErrorStyles;
      }, [errorStyle]);

      const handleLeftIconPress = useCallback(
        (event: GestureResponderEvent) => {
          if (enableHaptics && Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          onLeftIconPress?.();
        },
        [enableHaptics, onLeftIconPress]
      );

      const handleRightIconPress = useCallback(
        (event: GestureResponderEvent) => {
          if (enableHaptics && Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          onRightIconPress?.();
        },
        [enableHaptics, onRightIconPress]
      );

      return (
        <View style={getContainerStyles}>
          {/* Input Container con label flotante */}
          <View style={styles.inputWrapper}>
            {/* Label posicionado absolutamente */}
            {label && (
              <View style={styles.labelContainer}>
                <Text style={getLabelStyles}>{label}</Text>
              </View>
            )}

            <View style={getInputContainerStyles}>
              {/* Left Icon */}
              {leftIcon && (
                <TouchableOpacity
                  style={styles.leftIconContainer}
                  onPress={handleLeftIconPress}
                  disabled={!onLeftIconPress}
                  activeOpacity={onLeftIconPress ? 0.7 : 1}
                  accessibilityRole='button'
                  accessibilityLabel={`Left icon${
                    onLeftIconPress ? ' button' : ''
                  }`}
                >
                  {leftIcon}
                </TouchableOpacity>
              )}

              {/* Input */}
              <TextInput
                ref={ref}
                style={getInputStyles}
                editable={editable}
                placeholderTextColor={
                  !editable ? COLORS.text.disabled : COLORS.text.placeholder
                }
                accessibilityLabel={accessibilityLabel || label}
                accessibilityHint={accessibilityHint}
                accessibilityState={accessibilityState}
                {...textInputProps}
              />

              {/* Right Icon */}
              {rightIcon && (
                <TouchableOpacity
                  style={styles.rightIconContainer}
                  onPress={handleRightIconPress}
                  disabled={!onRightIconPress}
                  activeOpacity={onRightIconPress ? 0.7 : 1}
                  accessibilityRole='button'
                  accessibilityLabel={`Right icon${
                    onRightIconPress ? ' button' : ''
                  }`}
                >
                  {rightIcon}
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Error Message */}
          {error && (
            <Text
              style={getErrorStyles}
              accessibilityRole='text'
              accessibilityLiveRegion='polite'
            >
              {error}
            </Text>
          )}
        </View>
      );
    }
  )
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputWrapper: {
    position: 'relative',
    marginTop: 8, // Espacio para el label flotante
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 120,
    borderWidth: 1,
    borderColor: COLORS.border.default,
    backgroundColor: COLORS.background.default,
    minHeight: 54,
  },
  labelContainer: {
    position: 'absolute',
    top: -10, // Ajusta para centrar sobre el borde
    left: 35, // Alinea con el padding del input
    zIndex: 1,
    paddingHorizontal: 4,
    backgroundColor: COLORS.background.default, // Importante: mismo color que el fondo
  },
  floatingLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text.secondary,
  },
  baseInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.text.primary,
  },
  baseError: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.text.error,
    marginTop: 4,
  },
  errorInputContainer: {
    borderColor: COLORS.border.error,
  },
  disabledInputContainer: {
    backgroundColor: COLORS.background.disabled,
    borderColor: COLORS.border.disabled,
  },
  disabledInput: {
    color: COLORS.text.disabled,
  },
  inputWithLeftIcon: {
    paddingLeft: 6,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIconContainer: {
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    paddingRight: 15,
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Input;
