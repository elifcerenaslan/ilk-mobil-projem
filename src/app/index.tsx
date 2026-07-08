import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Image, ScrollView } from 'react-native';
import { Play, RotateCcw, Compass, Sliders, ChevronLeft, Sparkles } from 'lucide-react-native';
import Svg, { G, Path, Text as SVG_YAZI } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.82;
const RADIUS = WHEEL_SIZE / 2;

type PatternItem = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: string;
  scale: number;
};

const DILIMLER = [
  { dk: 25, renk: '#76B2E2', name: 'Unknown Road', image: require('../../assets/images/fluffy_life/unknown_road.png') }, 
  { dk: 30, renk: '#B39DDB', name: 'Fly To Your Own Mountain', image: require('../../assets/images/growing_up_by_your_way/fly_to_your_own_mountain.png') }, 
  { dk: 40, renk: '#F5C6C6', name: 'Walking Into Spring', image: require('../../assets/images/i_am_the_seasons/walking_into_spring.png') }, 
  { dk: 50, renk: '#FFE07B', name: 'Dreamcatcher Star', image: require('../../assets/images/we_are_all_stars/dreamcatcher_star.png') }, 
  { dk: 60, renk: '#A5D6A7', name: 'Unknown Road Alt', image: require('../../assets/images/fluffy_life/cotton_candy_daydream.png') }, 
];

const BACKGROUND_PATTERN: PatternItem[] = [
  { top: '8%', left: '8%', rotate: '15deg', scale: 0.8 },
  { top: '12%', right: '10%', rotate: '-25deg', scale: 0.9 },
  { top: '35%', left: '75%', rotate: '35deg', scale: 0.75 },
  { top: '45%', left: '-8%', rotate: '-15deg', scale: 1.1 },
  { bottom: '30%', right: '8%', rotate: '20deg', scale: 0.85 },
  { bottom: '10%', left: '12%', rotate: '-30deg', scale: 1.0 },
  { bottom: '5%', right: '15%', rotate: '12deg', scale: 0.75 },
];

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const createArcPath = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${x} ${y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
};

export default function HomeScreen() {
  const [uygulamaModu, setUygulamaModu] = useState<'mod_secimi' | 'manuel' | 'cark'>('mod_secimi');
  const [secilenDk, setSecilenDk] = useState(25);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  const carkiCevir = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const rastgeleDilimIndex = Math.floor(Math.random() * DILIMLER.length);
    const birDilimDerecesi = 360 / DILIMLER.length;
    const hedefDerece = 360 * 5 - (rastgeleDilimIndex * birDilimDerecesi) - (birDilimDerecesi / 2);

    Animated.timing(spinValue, {
      toValue: hedefDerece,
      duration: 3500,
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      setSecilenDk(DILIMLER[rastgeleDilimIndex].dk);
      spinValue.setValue(hedefDerece % 360);
    });
  };

  const spinDestegi = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const dilimAcisi = 360 / DILIMLER.length;

  return (
    <View style={styles.container}>
      {/* 🚀 ARTIK SIFIR HATA! TİP SIKILIĞINI BYPASS EDEN YENİ INLINE SARMAL 🚀 */}
      {BACKGROUND_PATTERN.map((item, index) => (
        <View
          key={index}
          style={[
            styles.patternIkonKapsayici,
            {
              top: item.top || undefined,
              bottom: item.bottom || undefined,
              left: item.left || undefined,
              right: item.right || undefined,
              transform: [{ rotate: item.rotate }, { scale: item.scale }],
            } as any // TypeScript'i sakinleştiren sihirli anahtar
          ]}
        >
          <Sparkles size={45} color="rgba(118, 178, 226, 0.25)" />
        </View>
      ))}

      {uygulamaModu === 'mod_secimi' ? (
        <View style={styles.tamEkranIcerik}>
          <View style={styles.headerAreaSecim}>
            <Text style={styles.mainTitleSecim}>Nyota Focus</Text>
            <Text style={styles.subTitleSecim}>Odaklanma ritmini sen belirle</Text>
          </View>
          <View style={styles.secimKutusuKapsayici}>
            <TouchableOpacity style={[styles.secimButonKart, { backgroundColor: '#76B2E2' }]} onPress={() => setUygulamaModu('manuel')}>
              <View style={styles.kartIkonHalkasi}>
                <Sliders size={26} color="#76B2E2" />
              </View>
              <Text style={styles.secimKartBaslik}>Süremi Kendim Seçeceğim</Text>
              <Text style={styles.secimKartAciklama}>Zaman yönetimini tamamen eline al, dakikanı kendin belirle.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secimButonKart, { backgroundColor: '#B39DDB' }]} onPress={() => setUygulamaModu('cark')}>
              <View style={styles.kartIkonHalkasi}>
                <Compass size={26} color="#B39DDB" />
              </View>
              <Text style={styles.secimKartBaslik}>Şansımı Çark Belirlesin</Text>
              <Text style={styles.secimKartAciklama}>Nyota çarkını çevir, kaderinde çıkan gizemli süreye odaklan!</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 20 }} />
        </View>
      ) : (
        <View style={styles.tamEkranIcerik}>
          <View style={styles.ustGrup}>
            <View style={styles.headerAreaOda}>
              <TouchableOpacity onPress={() => setUygulamaModu('mod_secimi')} style={styles.geriDonButon}>
                <ChevronLeft size={18} color="#AE8875" />
                <Text style={styles.geriDonText}>Değiştir</Text>
              </TouchableOpacity>
              <Text style={styles.miniTitle}>Nyota Focus</Text>
              <View style={{ width: 65 }} />
            </View>
            <View style={styles.sureKonteyner}>
              <Text style={styles.sureText}>{secilenDk}</Text>
              <Text style={styles.dakikaEtiket}>DAKİKA</Text>
            </View>
          </View>
          {uygulamaModu === 'manuel' ? (
            <View style={styles.manuelModMerkez}>
              <Text style={styles.manuelBilgiYazi}>Sürene karar ver, Nyota'nı canlandır:</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.seritKonteyner}>
                {DILIMLER.map((dilim) => {
                  const isAktif = secilenDk === dilim.dk;
                  return (
                    <TouchableOpacity
                      key={dilim.dk}
                      activeOpacity={0.9}
                      style={[styles.interaktifKart, isAktif && styles.interaktifKartAktif]}
                      onPress={() => setSecilenDk(dilim.dk)}
                    >
                      <Image 
                        source={dilim.image} 
                        style={[styles.kartIçiNyota, isAktif ? styles.kartIçiNyotaAktif : styles.kartIçiNyotaPasif]} 
                      />
                      <Text style={[styles.seritDkText, isAktif && styles.seritDkTextAktif]}>{dilim.dk}</Text>
                      <Text style={[styles.seritDkAltYazi, isAktif && styles.seritDkAltYaziAktif]}>DAKİKA</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.carkMerkezAlani}>
              <View style={styles.igneSimgesi} />
              <Animated.View style={[styles.anaCarkGovdesi, { transform: [{ rotate: spinDestegi }] }]}>
                <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
                  <G x={RADIUS} y={RADIUS}>
                    {DILIMLER.map((dilim, index) => {
                      const baslangicAcisi = index * dilimAcisi;
                      const bitisAcisi = baslangicAcisi + dilimAcisi;
                      const pathData = createArcPath(0, 0, RADIUS, baslangicAcisi, bitisAcisi);
                      const yaziKonum = polarToCartesian(0, 0, RADIUS * 0.76, baslangicAcisi + dilimAcisi / 2);
                      return (
                        <G key={index}>
                          <Path d={pathData} fill={dilim.renk} stroke="#FFFFFF" strokeWidth={3} />
                          <SVG_YAZI
                            x={yaziKonum.x}
                            y={yaziKonum.y}
                            fill="#FFFFFF"
                            fontSize="14"
                            fontWeight="900"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            transform={`rotate(${baslangicAcisi + dilimAcisi / 2}, ${yaziKonum.x}, ${yaziKonum.y})`}
                          >
                            {`${dilim.dk} dk`}
                          </SVG_YAZI>
                        </G>
                      );
                    })}
                  </G>
                </Svg>
                {DILIMLER.map((dilim, index) => {
                  const merkezAcisi = (index * dilimAcisi) + (dilimAcisi / 2);
                  const radyus = RADIUS * 0.42; 
                  const fWidth = 65;
                  const fHeight = 90;
                  const x = RADIUS + radyus * Math.sin((merkezAcisi * Math.PI) / 180) - (fWidth / 2);
                  const y = RADIUS - radyus * Math.cos((merkezAcisi * Math.PI) / 180) - (fHeight / 2);
                  return (
                    <Image 
                      key={index} 
                      source={dilim.image} 
                      style={[styles.mutlakNyotaGorseli, { width: fWidth, height: fHeight, left: x, top: y, transform: [{ rotate: `${merkezAcisi}deg` }] }]} 
                    />
                  );
                })}
                <View style={styles.carkGobegi} />
              </Animated.View>
            </View>
          )}
          <View style={styles.butonlarHatti}>
            {uygulamaModu === 'cark' && (
              <TouchableOpacity style={[styles.anaButon, isSpinning && styles.pasifButon]} onPress={carkiCevir} disabled={isSpinning}>
                <RotateCcw size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.butonYazisi}>{isSpinning ? 'Nyota Seçiliyor...' : 'Çarkı Çevir'}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.baslatButonu}>
              <Play size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.butonYazisi}>Odaklanmayı Başlat</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E6',
    position: 'relative',
  },
  tamEkranIcerik: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.05,
    zIndex: 10,
  },
  patternNyotaSiluet: {
    position: 'absolute',
    width: 70,
    height: 100,
    resizeMode: 'contain',
    opacity: 0.05,
  },
  patternIkonKapsayici: {
    position: 'absolute',
  },
  ustGrup: {
    alignItems: 'center',
    width: '100%',
    gap: 12, 
  },
  headerAreaSecim: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  mainTitleSecim: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#76B2E2',
    letterSpacing: 0.5,
  },
  subTitleSecim: {
    fontSize: 14,
    color: '#AE8875',
    marginTop: 6,
    fontWeight: '700',
  },
  headerAreaOda: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  miniTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#76B2E2',
  },
  geriDonButon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  geriDonText: {
    fontSize: 12,
    color: '#AE8875',
    fontWeight: '700',
  },
  sureKonteyner: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sureText: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#4A4A4A',
    lineHeight: 56,
  },
  dakikaEtiket: {
    fontSize: 11,
    fontWeight: '700',
    color: '#AE8875',
    letterSpacing: 1.2,
  },
  secimKutusuKapsayici: {
    width: '100%',
    paddingHorizontal: 25,
    gap: 22,
  },
  secimButonKart: {
    padding: 24,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  kartIkonHalkasi: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  secimKartBaslik: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  secimKartAciklama: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  manuelModMerkez: {
    width: '100%',
    alignItems: 'center',
  },
  manuelBilgiYazi: {
    fontSize: 14,
    color: '#AE8875',
    fontWeight: '700',
    marginBottom: 20,
  },
  seritKonteyner: {
    paddingHorizontal: 20,
    gap: 16,
    height: 210, 
    alignItems: 'flex-end',
  },
  interaktifKart: {
    width: 100,
    height: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  interaktifKartAktif: {
    backgroundColor: '#76B2E2',
    borderColor: '#FFFFFF',
    height: 145, 
    shadowColor: '#76B2E2',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  kartIçiNyota: {
    position: 'absolute',
    width: 75,
    height: 105,
    resizeMode: 'contain',
    top: -65, 
  },
  kartIçiNyotaAktif: {
    opacity: 1,
    transform: [{ scale: 1.25 }], 
  },
  kartIçiNyotaPasif: {
    opacity: 0.4, 
    transform: [{ scale: 0.9 }],
  },
  seritDkText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  seritDkTextAktif: {
    color: '#FFFFFF',
  },
  seritDkAltYazi: {
    fontSize: 9,
    fontWeight: '800',
    color: '#BDBDBD',
    letterSpacing: 1,
  },
  seritDkAltYaziAktif: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  carkMerkezAlani: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 5,
  },
  igneSimgesi: {
    position: 'absolute',
    top: -14,
    width: 26,
    height: 26,
    backgroundColor: '#FF8A80',
    borderTopLeftRadius: 13,
    borderBottomRightRadius: 13,
    transform: [{ rotate: '45deg' }],
    zIndex: 999,
  },
  anaCarkGovdesi: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: '#FFFFFF',
  },
  mutlakNyotaGorseli: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: 99,
  },
  carkGobegi: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    top: '50%',
    left: '50%',
    marginTop: -17,
    marginLeft: -17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 100,
  },
  butonlarHatti: {
    width: '100%',
    paddingHorizontal: 25,
    gap: 12,
  },
  anaButon: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    backgroundColor: '#B39DDB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pasifButon: {
    backgroundColor: '#D1C4E9',
  },
  baslatButonu: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    backgroundColor: '#76B2E2',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  butonYazisi: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});