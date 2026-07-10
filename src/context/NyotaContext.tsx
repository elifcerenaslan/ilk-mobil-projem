import React, { createContext, useState, useContext, ReactNode } from 'react';

// Uygulamadaki tüm Nyota'ların kimlik tanımı
export type NyotaCharacter = {
  id: string;
  name: string;
  series: 'fluffy_life' | 'growing_up' | 'seasons' | 'stars';
  isSecret: boolean;
  image: any;
  imageB: any;
};

// Global hafızada neleri saklayacağız?
type NyotaContextType = {
  starPoints: number;
  setStarPoints: React.Dispatch<React.SetStateAction<number>>;
  ownedNyotas: string[]; // Çıkarılan Nyota'ların id listesi (Envanter)
  addNyotaToCollection: (id: string) => void;
  activeNyotaId: string; // Şu an ana sayfada "Birlikte Çalışalım" denilen Nyota
  setActiveNyotaId: (id: string) => void;
};

const NyotaContext = createContext<NyotaContextType | undefined>(undefined);

export function NyotaProvider({ children }: { children: ReactNode }) {
  // Başlangıç değerleri: 1450 puan ve varsayılan olarak sadece 'unknown_road' açık
  const [starPoints, setStarPoints] = useState<number>(1450);
  const [ownedNyotas, setOwnedNyotas] = useState<string[]>(['unknown_road']);
  const [activeNyotaId, setActiveNyotaId] = useState<string>('unknown_road');

  // Envantere yeni karakter ekleme fonksiyonu
  const addNyotaToCollection = (id: string) => {
    setOwnedNyotas((prev) => {
      if (prev.includes(id)) return prev; // Zaten varsa ekleme
      return [...prev, id];
    });
  };

  return (
    <NyotaContext.Provider value={{
      starPoints,
      setStarPoints,
      ownedNyotas,
      addNyotaToCollection,
      activeNyotaId,
      setActiveNyotaId
    }}>
      {children}
    </NyotaContext.Provider>
  );
}

// Sayfalardan bu hafızaya erişmek için kullanacağımız pratik kanca (Hook)
export function useNyota() {
  const context = useContext(NyotaContext);
  if (!context) {
    throw new Error('useNyota bir NyotaProvider içinde kullanılmalıdır!');
  }
  return context;
}