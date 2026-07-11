import { Tabs } from 'expo-router';
import { Timer, Library, BarChart3 } from 'lucide-react-native'; // 🌟 BarChart3 ikonu eklendi
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
        headerShown: false 
      }}>
        {/* 1. SEKME: NYOTA FOCUS (Ana Sayfa) */}
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: 'NyotaFocus',
            tabBarIcon: ({ color, size }) => (
              <Timer size={size} color={color} /> 
            )
          }} 
        />
        
        {/* 2. SEKME: KOLEKSİYON (Dolap Odası) */}
        <Tabs.Screen 
          name="koleksiyon" 
          options={{ 
            title: 'Koleksiyon',
            tabBarIcon: ({ color, size }) => (
              <Library size={size} color={color} /> 
            )
          }} 
        />

        {/* 3. SEKME: İSTATİSTİK ODASI (Yeni!) */}
        <Tabs.Screen 
          name="istatistik" 
          options={{ 
            title: 'Günlük',
            tabBarIcon: ({ color, size }) => (
              <BarChart3 size={size} color={color} /> // 🎯 İstatistik çubuk grafik ikonu
            )
          }} 
        />
      </Tabs>
    </NyotaProvider>
  );
}
