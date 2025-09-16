import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  actionHref?: string;
  onActionPress?: () => void;
}

export const SectionHeader = ({
  title,
  actionText = 'See all',
  actionHref,
  onActionPress,
}: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionHref ? (
        <Link asChild href={actionHref}>
          <TouchableOpacity onPress={onActionPress}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        </Link>
      ) : onActionPress ? (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
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
    marginHorizontal: 20,
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