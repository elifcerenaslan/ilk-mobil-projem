import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Her bir seans geçmişinin veri yapısı
export type FocusSession = {
  id: string;
  tarih: string;
  sure: number;
  nyotaId: string;
};

type NyotaContextType = {
  starPoints: number;
  setStarPoints: React.Dispatch<React.SetStateAction<number>>;
  ownedNyotas: string[];
  addNyotaToCollection: (id: string) => void;
  activeNyotaId: string;
  setActiveNyotaId: (id: string) => void;
  seansGecmisi: FocusSession[];
  seansEkle: (sure: number, nyotaId: string) => void;
};

const NyotaContext = createContext<NyotaContextType | undefined>(undefined);

export const NyotaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [starPoints, setStarPoints] = useState<number>(0);
  const [ownedNyotas, setOwnedNyotas] = useState<string[]>(['f1']); 
  const [activeNyotaId, setActiveNyotaId] = useState<string>('f1');
  const [seansGecmisi, setSeansGecmisi] = useState<FocusSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. HAFIZADAN TÜM VERİLERİ ÇEK
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const savedPoints = await AsyncStorage.getItem('@NyotaFocus:points');
        const savedNyotas = await AsyncStorage.getItem('@NyotaFocus:owned_nyotas');
        const savedActiveNyota = await AsyncStorage.getItem('@NyotaFocus:active_nyota');
        const savedHistory = await AsyncStorage.getItem('@NyotaFocus:history');

        if (savedPoints !== null) setStarPoints(parseInt(savedPoints, 10));
        if (savedNyotas !== null) setOwnedNyotas(JSON.parse(savedNyotas));
        if (savedActiveNyota !== null) setActiveNyotaId(savedActiveNyota);
        if (savedHistory !== null) setSeansGecmisi(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Hafıza yüklenirken hata oluştu:", e);
      } finally {
        setLoading(false);
      }
    };

    loadPersistedData();
  }, []);

  // 2. PUAN DEĞİŞTİKÇE KAYDET
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem('@NyotaFocus:points', starPoints.toString());
    }
  }, [starPoints, loading]);

  // 3. KOLEKSİYON DEĞİŞTİKÇE KAYDET
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem('@NyotaFocus:owned_nyotas', JSON.stringify(ownedNyotas));
    }
  }, [ownedNyotas, loading]);

  // 4. GEÇMİŞ DEĞİŞTİKÇE KAYDET
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem('@NyotaFocus:history', JSON.stringify(seansGecmisi));
    }
  }, [seansGecmisi, loading]);

  const addNyotaToCollection = (id: string) => {
    setOwnedNyotas((prev) => {
      if (!prev.includes(id)) return [...prev, id];
      return prev;
    });
  };

  const updateActiveNyota = async (id: string) => {
    setActiveNyotaId(id);
    try {
      await AsyncStorage.setItem('@NyotaFocus:active_nyota', id);
    } catch (e) {
      console.error("Aktif Nyota kaydedilemedi:", e);
    }
  };

  // 🌟 YENİ SEANS GEÇMİŞİ EKLEME FONKSİYONU
  const seansEkle = (sure: number, nyotaId: string) => {
    const simdi = new Date();
    const formatliTarih = simdi.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' }) + 
      ', ' + simdi.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    const yeniSeans: FocusSession = {
      id: Math.random().toString(36).substring(7),
      tarih: formatliTarih,
      sure: sure,
      nyotaId: nyotaId
    };

    setSeansGecmisi((prev) => [yeniSeans, ...prev]); // En yeni seans en üstte görünsün
  };

  return (
    <NyotaContext.Provider value={{ 
      starPoints, 
      setStarPoints, 
      ownedNyotas, 
      addNyotaToCollection, 
      activeNyotaId, 
      setActiveNyotaId: updateActiveNyota,
      seansGecmisi,
      seansEkle
    }}>
      {!loading && children}
    </NyotaContext.Provider>
  );
};

export const useNyota = () => {
  const context = useContext(NyotaContext);
  if (!context) throw new Error('useNyota, NyotaProvider içinde kullanılmalıdır.');
  return context;
};