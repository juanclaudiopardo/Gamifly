import { Entypo } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MenuListItemProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const MenuListItem = ({
  icon,
  title,
  subtitle,
  onPress,
}: MenuListItemProps) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center' }}
      onPress={onPress}
    >
      {icon}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ fontWeight: '500' }}>{title}</Text>
          {subtitle && (
            <Text style={{ fontSize: 10, color: '#838383' }}>{subtitle}</Text>
          )}
        </View>
        <Entypo name='chevron-small-right' size={24} color='#89919D' />
      </View>
    </TouchableOpacity>
  );
};
