import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#BEA4C6',   // Aktif sekme: Senin o mistik lavanta tonun
      tabBarInactiveTintColor: '#AE8875', // Aktif olmayan sekme: Ahşap tonu
      tabBarStyle: { 
        backgroundColor: '#FAF0E6',       // Alt bar: Çok soft, lüks bir fildişi/krem tonu
        borderTopWidth: 1,
        borderTopColor: '#F5C6C6',         // Üstüne çok ince pembe bir çizgi
        height: 65,
        paddingBottom: 10,
      }, 
      headerStyle: { 
        backgroundColor: '#FAF0E6',       // Üst barı da aynı soft krem yapıyoruz, kaba durmasın
        elevation: 0,                     // Android gölgesini siler
        shadowOpacity: 0,                 // iOS gölgesini siler
      }, 
      headerTintColor: '#AE8875',         // Başlık yazısı şık bir ahşap tonu
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
    }}>
      <Tabs.Screen name="index" options={{ title: 'NyotaFocus' }} />
      <Tabs.Screen name="koleksiyon" options={{ title: 'Koleksiyon' }} />
    </Tabs>
  );
}