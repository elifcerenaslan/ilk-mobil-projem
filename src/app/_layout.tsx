import { Tabs } from 'expo-router';
import { NyotaProvider } from '../context/NyotaContext';

export default function RootLayout() {
  return (
    <NyotaProvider>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#BEA4C6',   
        tabBarInactiveTintColor: '#AE8875', 
        tabBarStyle: { 
          backgroundColor: '#FAF0E6',       
          borderTopWidth: 1,
          borderTopColor: '#F5C6C6',         
          height: 65,
          paddingBottom: 10,
        }, 
        headerShown: false // 🌟 İşte bu kadar! Üstteki o kocaman boşluk tamamen yok oldu.
      }}>
        <Tabs.Screen name="index" options={{ title: 'NyotaFocus' }} />
        <Tabs.Screen name="koleksiyon" options={{ title: 'Koleksiyon' }} />
      </Tabs>
    </NyotaProvider>
  );
}