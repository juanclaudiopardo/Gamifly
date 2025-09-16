import { Link } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Href } from 'expo-router';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  actionHref?: Href;
  containerStyle?: ViewStyle;
}

export const SectionHeader = ({
  title,
  actionText = 'See all',
  actionHref,
  containerStyle,
}: SectionHeaderProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      {actionHref ? (
        <Link asChild href={actionHref}>
          <TouchableOpacity>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        </Link>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  actionText: {
    fontSize: 12,
    color: '#4E4E4E',
  },
});
