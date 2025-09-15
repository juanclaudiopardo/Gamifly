import { Input } from '@/components/ui';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Image
          source={require('@/assets/images/userAvatar.png')}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: '#E5E5E5',
          }}
        />

        <Input
          style={{ flex: 1, marginBottom: 5 }}
          leftIcon={<EvilIcons name='search' size={24} color='black' />}
          rightIcon={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 1,
                  height: 20,
                  backgroundColor: '#D1D5DB',
                  marginRight: 12,
                }}
              />
              <TouchableOpacity onPress={() => console.log('Filter pressed')}>
                <Ionicons name='options-outline' size={20} color='#7E899A' />
              </TouchableOpacity>
            </View>
          }
          placeholder='Search here'
        />
        <TouchableOpacity
          onPress={() => console.log('Scan pressed')}
          style={{
            backgroundColor: 'white',
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Feather name='shopping-bag' size={24} color='black' />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.content}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>Hola, {user?.name || 'Usuario'}</Text>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Información de la sesión</Text>
          <Text style={styles.cardText}>
            Has iniciado sesión correctamente con {user?.email}
          </Text>
          <Text style={styles.cardText}>
            Explora las diferentes secciones usando los botones de abajo.
          </Text>
        </View>

        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Navegar a:</Text>

          <Link href='/profile' asChild>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>📱 Mi Perfil</Text>
              <Text style={styles.navButtonSubtext}>
                Ve y edita tu información personal
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href='/notifications' asChild>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>🔔 Notificaciones</Text>
              <Text style={styles.navButtonSubtext}>
                Revisa tus notificaciones recientes
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href='/activity' asChild>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>📊 Actividad Reciente</Text>
              <Text style={styles.navButtonSubtext}>
                Historial de tu actividad
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 8,
  },
  navigationSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  navButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  navButtonSubtext: {
    fontSize: 14,
    color: '#666',
  },
});
