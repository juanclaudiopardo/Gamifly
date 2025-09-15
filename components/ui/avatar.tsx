import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Image, ImageProps, ImageSource } from 'expo-image';

/**
 * Available avatar sizes
 * @public
 */
export type AvatarSize = 'small' | 'medium' | 'large' | number;

/**
 * Base properties for the Avatar component
 * @interface AvatarProps
 */
export interface AvatarProps extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * The image source for the avatar
   * Can be a URI string, require() statement, or ImageSource object
   * @example
   * source="https://example.com/avatar.jpg"
   * source={require('./avatar.png')}
   * source={{ uri: 'https://example.com/avatar.jpg' }}
   */
  source?: ImageSource | string | number;

  /**
   * Size of the avatar
   * @default 'medium'
   *
   * - `small`: 40x40px
   * - `medium`: 56x56px
   * - `large`: 80x80px
   * - `number`: Custom size in pixels
   */
  size?: AvatarSize;

  /**
   * Border radius of the avatar
   * @default 32
   * Set to half of size for circular avatars
   */
  borderRadius?: number;

  /**
   * Custom styles for the outer container
   * @default { padding: 16, backgroundColor: '#F5F6F7', borderRadius: 32 }
   *
   * Pass custom styles to override defaults or add additional styles.
   * To remove the container styling completely, pass an empty object: {}
   *
   * @example
   * // Override background color
   * containerStyle={{
   *   ...defaultContainerStyle,
   *   backgroundColor: '#FFFFFF'
   * }}
   *
   * // Remove container styling
   * containerStyle={{}}
   */
  containerStyle?: ViewStyle;

  /**
   * Text to display when no image is available
   * Typically user initials
   * @example "JD" for "John Doe"
   */
  fallbackText?: string;

  /**
   * Custom fallback element to render when image fails or no source
   * Takes precedence over fallbackText
   */
  fallback?: React.ReactNode;

  /**
   * Background color for fallback state
   * @default '#E5E5E5'
   */
  fallbackBackgroundColor?: string;

  /**
   * Text color for fallback text
   * @default '#666666'
   */
  fallbackTextColor?: string;

  /**
   * Show loading indicator while image loads
   * @default true
   */
  showLoadingIndicator?: boolean;

  /**
   * Color of the loading indicator
   * @default '#999999'
   */
  loadingIndicatorColor?: string;

  /**
   * Custom styles for the avatar container
   */
  style?: ViewStyle;

  /**
   * Custom styles for the fallback text
   */
  fallbackTextStyle?: TextStyle;

  /**
   * Additional props to pass to the Expo Image component
   */
  imageProps?: Partial<ImageProps>;

  /**
   * Accessibility label for screen readers
   * @default "User avatar"
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint for screen readers
   */
  accessibilityHint?: string;

  /**
   * Opacity when pressed (TouchableOpacity)
   * Only applies when onPress is provided
   * @default 0.7
   */
  activeOpacity?: number;
}

/**
 * Get avatar dimensions based on size prop
 */
const getAvatarSize = (size: AvatarSize): number => {
  if (typeof size === 'number') {
    return size;
  }

  switch (size) {
    case 'small':
      return 40;
    case 'large':
      return 80;
    case 'medium':
    default:
      return 56;
  }
};

/**
 * Get font size for fallback text based on avatar size
 */
const getFallbackFontSize = (avatarSize: number): number => {
  return Math.floor(avatarSize * 0.4);
};

/**
 * A versatile and accessible avatar component using Expo Image
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with image URL
 * <Avatar
 *   source="https://example.com/avatar.jpg"
 *   size="medium"
 * />
 *
 * // With fallback text (initials)
 * <Avatar
 *   source={{ uri: userImageUrl }}
 *   fallbackText="JD"
 *   size="large"
 * />
 *
 * // Circular avatar
 * <Avatar
 *   source={profileImage}
 *   size={60}
 *   borderRadius={30}
 * />
 *
 * // Pressable avatar
 * <Avatar
 *   source={avatarUrl}
 *   onPress={handleAvatarPress}
 *   accessibilityLabel="User profile picture"
 *   accessibilityHint="Tap to view profile"
 * />
 *
 * // Custom fallback element
 * <Avatar
 *   source={userImage}
 *   fallback={<Icon name="person" size={24} color="#666" />}
 *   size="small"
 * />
 *
 * // With custom container style (social login button style)
 * <Avatar
 *   source={require('@/assets/icons/google.png')}
 *   size={24}
 *   containerStyle={{
 *     padding: 16,
 *     backgroundColor: '#F5F6F7',
 *     borderRadius: 32
 *   }}
 * />
 * ```
 *
 * @remarks
 * - Uses Expo Image for optimized loading and caching
 * - Supports fallback content when image fails or is not provided
 * - Fully accessible with screen reader support
 * - Memoized for performance
 * - Supports both preset sizes and custom dimensions
 *
 * @since 1.0.0
 */
export const Avatar: React.FC<AvatarProps> = React.memo(
  ({
    source,
    size = 'medium',
    borderRadius = 32,
    containerStyle = {
      padding: 16,
      backgroundColor: '#F5F6F7',
      borderRadius: 32,
    },
    fallbackText,
    fallback,
    fallbackBackgroundColor = '#E5E5E5',
    fallbackTextColor = '#666666',
    showLoadingIndicator = true,
    loadingIndicatorColor = '#999999',
    style,
    fallbackTextStyle,
    imageProps,
    accessibilityLabel = 'User avatar',
    accessibilityHint,
    activeOpacity = 0.7,
    onPress,
    disabled,
    ...pressableProps
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Calculate avatar dimensions
    const avatarSize = useMemo(() => getAvatarSize(size), [size]);

    // Calculate font size for fallback text
    const fallbackFontSize = useMemo(
      () => getFallbackFontSize(avatarSize),
      [avatarSize]
    );

    // Container styles
    const containerStyles = useMemo<ViewStyle[]>(() => {
      const baseStyles: ViewStyle[] = [
        styles.container,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius,
        },
      ];
      if (style) {
        baseStyles.push(style);
      }
      return baseStyles;
    }, [avatarSize, borderRadius, style]);

    // Fallback container styles
    const fallbackContainerStyles = useMemo<ViewStyle[]>(
      () => [
        styles.fallbackContainer,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius,
          backgroundColor: fallbackBackgroundColor,
        },
      ],
      [avatarSize, borderRadius, fallbackBackgroundColor]
    );

    // Fallback text styles
    const textStyles = useMemo<TextStyle[]>(() => {
      const baseStyles: TextStyle[] = [
        styles.fallbackText,
        {
          fontSize: fallbackFontSize,
          color: fallbackTextColor,
        },
      ];
      if (fallbackTextStyle) {
        baseStyles.push(fallbackTextStyle);
      }
      return baseStyles;
    }, [fallbackFontSize, fallbackTextColor, fallbackTextStyle]);

    // Handle image load start
    const handleLoadStart = useCallback(() => {
      setIsLoading(true);
      setHasError(false);
    }, []);

    // Handle image load end
    const handleLoadEnd = useCallback(() => {
      setIsLoading(false);
    }, []);

    // Handle image error
    const handleError = useCallback(() => {
      setIsLoading(false);
      setHasError(true);
    }, []);

    // Determine if we should show fallback
    const shouldShowFallback = !source || hasError;

    // Render fallback content
    const renderFallback = () => {
      if (fallback) {
        return fallback;
      }

      if (fallbackText) {
        return (
          <Text style={textStyles} numberOfLines={1}>
            {fallbackText}
          </Text>
        );
      }

      return null;
    };

    // Prepare image source
    const imageSource = useMemo(() => {
      if (!source) return undefined;

      if (typeof source === 'string') {
        return { uri: source };
      }

      return source;
    }, [source]);

    // Render avatar content
    const avatarContent = (
      <View style={containerStyles}>
        {shouldShowFallback ? (
          <View style={fallbackContainerStyles}>{renderFallback()}</View>
        ) : (
          <>
            <Image
              source={imageSource}
              style={[
                styles.image,
                {
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius,
                },
              ]}
              contentFit='cover'
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onError={handleError}
              {...imageProps}
            />
            {isLoading && showLoadingIndicator && (
              <View style={[styles.loadingContainer, { borderRadius }]}>
                <ActivityIndicator size='small' color={loadingIndicatorColor} />
              </View>
            )}
          </>
        )}
      </View>
    );

    // Always wrap with container since we have default containerStyle
    const content = <View style={containerStyle}>{avatarContent}</View>;

    // If onPress is provided, wrap in TouchableOpacity
    if (onPress) {
      return (
        <TouchableOpacity
          {...pressableProps}
          onPress={onPress}
          disabled={disabled}
          activeOpacity={activeOpacity}
          accessibilityRole='imagebutton'
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
        >
          {content}
        </TouchableOpacity>
      );
    }

    // Otherwise, render content directly
    return (
      <View
        accessible
        accessibilityRole='image'
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        {content}
      </View>
    );
  }
);

/**
 * Display name for React DevTools
 */
Avatar.displayName = 'Avatar';

/**
 * StyleSheet containing all avatar styles
 * @internal
 */
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});
