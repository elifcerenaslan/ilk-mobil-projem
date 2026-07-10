import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Image, ScrollView } from 'react-native';
import { Play, RotateCcw, Compass, Sliders, ChevronLeft, Sparkles, Star, X } from 'lucide-react-native';
import Svg, { G, Path, Text as SVG_YAZI } from 'react-native-svg';
import { useNyota } from '../context/NyotaContext'; 

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

// Çarkın üzerindeki görsel düzeni temsil eden statik dilimler
const DILIMLER = [
  { id: 'unknown_road', dk: 25, renk: '#76B2E2', name: 'Unknown Road', image: require('../../assets/images/fluffy_life/unknown_road.png'), imageB: require('../../assets/images/fluffy_life/unknown_road.png') }, 
  { id: 'fly_to_your_own_mountain', dk: 30, renk: '#B39DDB', name: 'Fly To Your Own Mountain', image: require('../../assets/images/growing_up_by_your_way/fly_to_your_own_mountain.png'), imageB: require('../../assets/images/growing_up_by_your_way/fly_to_your_own_mountain.png') }, 
  { id: 'walking_into_spring', dk: 40, renk: '#F5C6C6', name: 'Walking Into Spring', image: require('../../assets/images/i_am_the_seasons/walking_into_spring.png'), imageB: require('../../assets/images/i_am_the_seasons/walking_into_spring.png') }, 
  { id: 'dreamcatcher_star', dk: 50, renk: '#FFE07B', name: 'Dreamcatcher Star', image: require('../../assets/images/we_are_all_stars/dreamcatcher_star.png'), imageB: require('../../assets/images/we_are_all_stars/dreamcatcher_star.png') }, 
  { id: 'cotton_candy_daydream', dk: 60, renk: '#A5D6A7', name: 'Cotton Candy Daydream', image: require('../../assets/images/fluffy_life/cotton_candy_daydream.png'), imageB: require('../../assets/images/fluffy_life/cotton_candy_daydream.png') },
  { id: 'spring_wisteria', dk: 70, renk: '#76B2E2', name: 'Spring Wisteria', image: require('../../assets/images/i_am_the_seasons/spring_wisteria.png'), imageB: require('../../assets/images/i_am_the_seasons/spring_wisteria.png') },
  { id: 'fable_star', dk: 80, renk: '#F5C6C6', name: 'Fable Star', image: require('../../assets/images/we_are_all_stars/fable_star.png'), imageB: require('../../assets/images/we_are_all_stars/fable_star.png') },
  { id: 'dream', dk: 90, renk: '#B39DDB', name: 'Dream', image: require('../../assets/images/growing_up_by_your_way/dream.png'), imageB: require('../../assets/images/growing_up_by_your_way/dream.png') },
];

// 🌟 TÜM ENVENTERİN GERÇEK GÖRSEL VERİTABANI HARİTASI (Odadaki canlanmayı sağlayan büyük köprü 🎯)
const GLOBAL_NYOTA_IMAGES: { [key: string]: { normal: any; anim: any } } = {
  // 1. Seri: Fluffy Life
  'f1': { normal: require('../../assets/images/fluffy_life/unknown_road.png'), anim: require('../../assets/images/fluffy_life/unknown_road.png') },
  'f2': { normal: require('../../assets/images/fluffy_life/brave_together.png'), anim: require('../../assets/images/fluffy_life/brave_together.png') },
  'f3': { normal: require('../../assets/images/fluffy_life/warm_sunlight.png'), anim: require('../../assets/images/fluffy_life/warm_sunlight.png') },
  'f4': { normal: require('../../assets/images/fluffy_life/calling.png'), anim: require('../../assets/images/fluffy_life/calling.png') },
  'f5': { normal: require('../../assets/images/fluffy_life/see_love.png'), anim: require('../../assets/images/fluffy_life/see_love.png') },
  'f6': { normal: require('../../assets/images/fluffy_life/kitten_hug.png'), anim: require('../../assets/images/fluffy_life/kitten_hug.png') },
  'f7': { normal: require('../../assets/images/fluffy_life/daze.png'), anim: require('../../assets/images/fluffy_life/daze.png') },
  'f8': { normal: require('../../assets/images/fluffy_life/a_brief_escape.png'), anim: require('../../assets/images/fluffy_life/a_brief_escape.png') },
  'f9': { normal: require('../../assets/images/fluffy_life/our_secret.png'), anim: require('../../assets/images/fluffy_life/our_secret.png') },
  'f10': { normal: require('../../assets/images/fluffy_life/lost_star.png'), anim: require('../../assets/images/fluffy_life/lost_star.png') },
  'f11': { normal: require('../../assets/images/fluffy_life/home.png'), anim: require('../../assets/images/fluffy_life/home.png') },
  'f12': { normal: require('../../assets/images/fluffy_life/little_mountain.png'), anim: require('../../assets/images/fluffy_life/little_mountain.png') },
  'f_secret': { normal: require('../../assets/images/fluffy_life/cotton_candy_daydream.png'), anim: require('../../assets/images/fluffy_life/cotton_candy_daydream.png') },

  // 2. Seri: Growing Up by Your Way
  'g1': { normal: require('../../assets/images/growing_up_by_your_way/growing_up.png'), anim: require('../../assets/images/growing_up_by_your_way/growing_up.png') },
  'g2': { normal: require('../../assets/images/growing_up_by_your_way/hidden_love.png'), anim: require('../../assets/images/growing_up_by_your_way/hidden_love.png') },
  'g3': { normal: require('../../assets/images/growing_up_by_your_way/time.png'), anim: require('../../assets/images/growing_up_by_your_way/time.png') },
  'g4': { normal: require('../../assets/images/growing_up_by_your_way/into_my_heart.png'), anim: require('../../assets/images/growing_up_by_your_way/into_my_heart.png') },
  'g5': { normal: require('../../assets/images/growing_up_by_your_way/friends.png'), anim: require('../../assets/images/growing_up_by_your_way/friends.png') },
  'g6': { normal: require('../../assets/images/growing_up_by_your_way/road.png'), anim: require('../../assets/images/growing_up_by_your_way/road.png') },
  'g7': { normal: require('../../assets/images/growing_up_by_your_way/childhood.png'), anim: require('../../assets/images/growing_up_by_your_way/childhood.png') },
  'g8': { normal: require('../../assets/images/growing_up_by_your_way/poem.png'), anim: require('../../assets/images/growing_up_by_your_way/poem.png') },
  'g9': { normal: require('../../assets/images/growing_up_by_your_way/hi.png'), anim: require('../../assets/images/growing_up_by_your_way/hi.png') },
  'g10': { normal: require('../../assets/images/growing_up_by_your_way/dream.png'), anim: require('../../assets/images/growing_up_by_your_way/dream.png') },
  'g11': { normal: require('../../assets/images/growing_up_by_your_way/feeling.png'), anim: require('../../assets/images/growing_up_by_your_way/feeling.png') },
  'g12': { normal: require('../../assets/images/growing_up_by_your_way/thinking.png'), anim: require('../../assets/images/growing_up_by_your_way/thinking.png') },
  'g_secret': { normal: require('../../assets/images/growing_up_by_your_way/fly_to_your_own_mountain.png'), anim: require('../../assets/images/growing_up_by_your_way/fly_to_your_own_mountain.png') },

  // 3. Seri: I Am The Seasons
  's1': { normal: require('../../assets/images/i_am_the_seasons/genesis.png'), anim: require('../../assets/images/i_am_the_seasons/genesis.png') },
  's2': { normal: require('../../assets/images/i_am_the_seasons/spring_wisteria.png'), anim: require('../../assets/images/i_am_the_seasons/spring_wisteria.png') },
  's3': { normal: require('../../assets/images/i_am_the_seasons/bamboo_after_rain.png'), anim: require('../../assets/images/i_am_the_seasons/bamboo_after_rain.png') },
  's4': { normal: require('../../assets/images/i_am_the_seasons/summer_murmurs.png'), anim: require('../../assets/images/i_am_the_seasons/summer_murmurs.png') },
  's5': { normal: require('../../assets/images/i_am_the_seasons/blue_skies_ahead.png'), anim: require('../../assets/images/i_am_the_seasons/blue_skies_ahead.png') },
  's6': { normal: require('../../assets/images/i_am_the_seasons/sunseeker.png'), anim: require('../../assets/images/i_am_the_seasons/sunseeker.png') },
  's7': { normal: require('../../assets/images/i_am_the_seasons/autumn_glow.png'), anim: require('../../assets/images/i_am_the_seasons/autumn_glow.png') },
  's8': { normal: require('../../assets/images/i_am_the_seasons/hidden_in_autumn.png'), anim: require('../../assets/images/i_am_the_seasons/hidden_in_autumn.png') },
  's9': { normal: require('../../assets/images/i_am_the_seasons/forest_tapestry.png'), anim: require('../../assets/images/i_am_the_seasons/forest_tapestry.png') },
  's10': { normal: require('../../assets/images/i_am_the_seasons/snowfall_bliss.png'), anim: require('../../assets/images/i_am_the_seasons/snowfall_bliss.png') },
  's11': { normal: require('../../assets/images/i_am_the_seasons/life_of_leisure.png'), anim: require('../../assets/images/i_am_the_seasons/life_of_leisure.png') },
  's12': { normal: require('../../assets/images/i_am_the_seasons/cloudwatcher.png'), anim: require('../../assets/images/i_am_the_seasons/cloudwatcher.png') },
  's_secret': { normal: require('../../assets/images/i_am_the_seasons/walking_into_spring.png'), anim: require('../../assets/images/i_am_the_seasons/walking_into_spring.png') },

  // 4. Seri: We Are All Stars
  'a1': { normal: require('../../assets/images/we_are_all_stars/sanctuary_star.png'), anim: require('../../assets/images/we_are_all_stars/sanctuary_star.png') },
  'a2': { normal: require('../../assets/images/we_are_all_stars/reminiscence_star.png'), anim: require('../../assets/images/we_are_all_stars/reminiscence_star.png') },
  'a3': { normal: require('../../assets/images/we_are_all_stars/meteor_shower.png'), anim: require('../../assets/images/we_are_all_stars/meteor_shower.png') },
  'a4': { normal: require('../../assets/images/we_are_all_stars/mirrorlight_star.png'), anim: require('../../assets/images/we_are_all_stars/mirrorlight_star.png') },
  'a5': { normal: require('../../assets/images/we_are_all_stars/nightlight_star.png'), anim: require('../../assets/images/we_are_all_stars/nightlight_star.png') },
  'a6': { normal: require('../../assets/images/we_are_all_stars/wishing_star.png'), anim: require('../../assets/images/we_are_all_stars/wishing_star.png') },
  'a7': { normal: require('../../assets/images/we_are_all_stars/wayfinder_star.png'), anim: require('../../assets/images/we_are_all_stars/wayfinder_star.png') },
  'a8': { normal: require('../../assets/images/we_are_all_stars/fable_star.png'), anim: require('../../assets/images/we_are_all_stars/fable_star.png') },
  'a9': { normal: require('../../assets/images/we_are_all_stars/bounty_star.png'), anim: require('../../assets/images/we_are_all_stars/bounty_star.png') },
  'a10': { normal: require('../../assets/images/we_are_all_stars/life_bearing_star.png'), anim: require('../../assets/images/we_are_all_stars/life_bearing_star.png') },
  'a11': { normal: require('../../assets/images/we_are_all_stars/halo_star.png'), anim: require('../../assets/images/we_are_all_stars/halo_star.png') },
  'a12': { normal: require('../../assets/images/we_are_all_stars/melody_star.png'), anim: require('../../assets/images/we_are_all_stars/melody_star.png') },
  'a_secret': { normal: require('../../assets/images/we_are_all_stars/dreamcatcher_star.png'), anim: require('../../assets/images/we_are_all_stars/dreamcatcher_star.png') },
};

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
  const [uygulamaModu, setUygulamaModu] = useState<'mod_secimi' | 'manuel' | 'cark' | 'odaklanma_odasi'>('mod_secimi');
  const [secilenDk, setSecilenDk] = useState(25);
  const [isSpinning, setIsSpinning] = useState(false);
  
  // 🌟 Global Hafıza verilerini dinliyoruz
  const { starPoints, setStarPoints, activeNyotaId } = useNyota(); 

  const [kalanSaniye, setKalanSaniye] = useState(0);
  const [frameActive, setFrameActive] = useState(false); 
  
  const timerRef = useRef<any>(null);
  const animationRef = useRef<any>(null);
  
  const spinValue = useRef(new Animated.Value(0)).current;
  const holdProgress = useRef(new Animated.Value(0)).current; 

  const carkiCevir = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const rastgeleDilimIndex = Math.floor(Math.random() * DILIMLER.length);
    const birDilimDerecesi = 360 / DILIMLER.length;
    const hedefDerece = 360 * 6 - (rastgeleDilimIndex * birDilimDerecesi) - (birDilimDerecesi / 2);

    Animated.timing(spinValue, {
      toValue: hedefDerece,
      duration: 4000, 
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      setSecilenDk(DILIMLER[rastgeleDilimIndex].dk);
      spinValue.setValue(hedefDerece % 360);
    });
  };

  const odaklanmayiBaslat = () => {
    setKalanSaniye(secilenDk * 60);
    setUygulamaModu('odaklanma_odasi');
  };

  useEffect(() => {
    if (uygulamaModu === 'odaklanma_odasi' && kalanSaniye > 0) {
      timerRef.current = setInterval(() => {
        setKalanSaniye((prev) => {
          if (prev <= 1) {
            setStarPoints((currentPoints) => currentPoints + (secilenDk * 10));
            odaklanmayiBitir();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      animationRef.current = setInterval(() => {
        setFrameActive((prev) => !prev);
      }, 800);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [uygulamaModu, kalanSaniye]);

  const odaklanmayiBitir = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationRef.current) clearInterval(animationRef.current);
    setUygulamaModu('mod_secimi');
    holdProgress.setValue(0);
  };

  const handleHoldStart = () => {
    Animated.timing(holdProgress, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        odaklanmayiBitir();
      }
    });
  };

  const handleHoldRelease = () => {
    Animated.timing(holdProgress, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const formatSüre = (toplamSaniye: number) => {
    const dk = Math.floor(toplamSaniye / 60);
    const sn = toplamSaniye % 60;
    return `${dk < 10 ? '0' : ''}${dk}:${sn < 10 ? '0' : ''}${sn}`;
  };

  const spinDestegi = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const dilimAcisi = 360 / DILIMLER.length;

  if (uygulamaModu === 'odaklanma_odasi') {
    const widthInterpolate = holdProgress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    // 🌟 KİLİT ÇÖZÜMÜ: Eğer activeNyotaId bizim yeni 52 karakterlik haritada (`f1`, `g2` vs.) varsa resmini oradan çeker.
    // Eğer çarkın eski statik ID'lerinden biriyse uyumluluk için dönüştürür, hiçbiri yoksa 'f1' (Unknown Road) fırlatır.
    let yoldasAnahtari = activeNyotaId || 'f1';
    
    // Eski çark ID'leri ile yeni ID dilini senkronize eden emniyet dönüşümü
    if (yoldasAnahtari === 'unknown_road') yoldasAnahtari = 'f1';
    if (yoldasAnahtari === 'fly_to_your_own_mountain') yoldasAnahtari = 'g_secret';
    if (yoldasAnahtari === 'walking_into_spring') yoldasAnahtari = 's_secret';
    if (yoldasAnahtari === 'dreamcatcher_star') yoldasAnahtari = 'a_secret';
    if (yoldasAnahtari === 'cotton_candy_daydream') yoldasAnahtari = 'f_secret';
    if (yoldasAnahtari === 'spring_wisteria') yoldasAnahtari = 's2';
    if (yoldasAnahtari === 'fable_star') yoldasAnahtari = 'a8';
    if (yoldasAnahtari === 'dream') yoldasAnahtari = 'g10';

    const odadakiYoldasData = GLOBAL_NYOTA_IMAGES[yoldasAnahtari] || GLOBAL_NYOTA_IMAGES['f1'];

    return (
      <View style={styles.özgünOdaklanmaArkaPlan}>
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
              } as any
            ]}
          >
            <Sparkles size={45} color="rgba(118, 178, 226, 0.05)" />
          </View>
        ))}

        <View style={styles.odaSayaçGrup}>
          <Text style={styles.odaSayaçText}>{formatSüre(kalanSaniye)}</Text>
          <Text style={styles.odaSayaçAltYazi}>ODAKLANILIYOR...</Text>
        </View>

        <View style={styles.odaNyotaMerkez}>
          <Image 
            source={frameActive ? odadakiYoldasData.anim : odadakiYoldasData.normal} 
            style={styles.odaDevNyotaGörsel} 
          />
        </View>

        <View style={styles.odaAltGrup}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPressIn={handleHoldStart}
            onPressOut={handleHoldRelease}
            style={styles.iptalHoldButon}
          >
            <Animated.View style={[styles.iptalDolumBarı, { width: widthInterpolate }]} />
            <X size={18} color="#FF8A80" style={{ marginRight: 6, zIndex: 5 }} />
            <Text style={styles.iptalButonYazisi}>İptal Etmek İçin Basılı Tut</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
            } as any
          ]}
        >
          <Sparkles size={45} color="rgba(118, 178, 226, 0.06)" />
        </View>
      ))}

      <View style={styles.puanBarıHattı}>
        <View style={styles.puanKapsül}>
          <Star size={14} color="#FFE07B" fill="#FFE07B" style={{ marginRight: 4 }} />
          <Text style={styles.puanText}>{starPoints} PTS</Text>
        </View>
      </View>

      {uygulamaModu === 'mod_secimi' ? (
        <View style={styles.tamEkranIcerikModSecimi}>
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
        <View style={styles.tamEkranIcerikInteraktif}>
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

          <View style={styles.yoldaşUyarıKutusu}>
            <Text style={styles.yoldaşUyarıText}>
              ✨ Nyota'nı Koleksiyon sayfasından özgürce seçebilirsin.
            </Text>
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
                          <Path d={pathData} fill={dilim.renk} stroke="#FFFFFF" strokeWidth={2.5} />
                          <SVG_YAZI
                            x={yaziKonum.x}
                            y={yaziKonum.y}
                            fill="#FFFFFF"
                            fontSize="11"
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
                  const fWidth = 55; 
                  const fHeight = 80;
                  const x = RADIUS + radyus * Math.sin((merkezAcisi * Math.PI) / 180) - (fWidth / 2);
                  const y = RADIUS - radyus * Math.cos((merkezAcisi * Math.PI) / 180) - (fHeight / 2);
                  return (
                    <Image 
                      key={index} 
                      source={dilim.image} 
                      style={[styles.mutlakNyotaGorseli, { width: fWidth, height: fHeight, left: x, top: y, transform: [{ rotate: `${merkezAcisi}deg` }] }]}/ >
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
            <TouchableOpacity style={styles.baslatButonu} onPress={odaklanmayiBaslat}>
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
  container: { flex: 1, backgroundColor: '#FAF0E6', position: 'relative' },
  tamEkranIcerikModSecimi: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingVertical: height * 0.05, zIndex: 10 },
  tamEkranIcerikInteraktif: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: height * 0.03, zIndex: 10, paddingBottom: height * 0.06 },
  puanBarıHattı: { position: 'absolute', top: height * 0.065, right: 20, zIndex: 99 },
  puanKapsül: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  puanText: { fontSize: 12, fontWeight: 'bold', color: '#4A4A4A' },
  yoldaşUyarıKutusu: { paddingHorizontal: 20, paddingVertical: 8, backgroundColor: 'rgba(118, 178, 226, 0.12)', borderRadius: 16, marginVertical: 15 },
  yoldaşUyarıText: { fontSize: 12, fontWeight: '600', color: '#76B2E2', textAlign: 'center' },
  özgünOdaklanmaArkaPlan: { flex: 1, backgroundColor: '#FAF0E6', alignItems: 'center', justifyContent: 'space-between', paddingVertical: height * 0.05 },
  odaSayaçGrup: { alignItems: 'center', marginTop: 15, zIndex: 15 },
  odaSayaçText: { fontSize: 78, fontWeight: 'bold', color: '#F5C6C6', fontFamily: 'sans-serif-light', letterSpacing: 1 },
  odaSayaçAltYazi: { fontSize: 11, fontWeight: '800', color: '#AE8875', letterSpacing: 3, marginTop: 2 },
  odaNyotaMerkez: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', zIndex: 15 },
  odaDevNyotaGörsel: { width: 290, height: 390, resizeMode: 'contain' },
  odaAltGrup: { width: '100%', paddingHorizontal: 30, alignItems: 'center', marginBottom: 10, zIndex: 15 },
  iptalHoldButon: { flexDirection: 'row', width: '85%', height: 50, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#F5C6C6', borderRadius: 25, justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 5, elevation: 2 },
  iptalDolumBarı: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: 'rgba(245, 198, 198, 0.45)' },
  iptalButonYazisi: { fontSize: 14, fontWeight: 'bold', color: '#AE8875', zIndex: 5 },
  patternIkonKapsayici: { position: 'absolute' },
  ustGrup: { alignItems: 'center', width: '100%', gap: 12, marginTop: 15 },
  headerAreaSecim: { alignItems: 'center', marginTop: height * 0.05 },
  mainTitleSecim: { fontSize: 42, fontWeight: 'bold', color: '#76B2E2', letterSpacing: 0.5 },
  subTitleSecim: { fontSize: 14, color: '#AE8875', marginTop: 6, fontWeight: '700' },
  headerAreaOda: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, marginTop: 10 },
  miniTitle: { fontSize: 22, fontWeight: 'bold', color: '#76B2E2' },
  geriDonButon: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  geriDonText: { fontSize: 12, color: '#AE8875', fontWeight: '700' },
  sureKonteyner: { alignItems: 'center', backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 22, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2, marginTop: 10 },
  sureText: { fontSize: 52, fontWeight: 'bold', color: '#4A4A4A', lineHeight: 56 },
  dakikaEtiket: { fontSize: 11, fontWeight: '700', color: '#AE8875', letterSpacing: 1.2 },
  secimKutusuKapsayici: { width: '100%', paddingHorizontal: 25, gap: 22 },
  secimButonKart: { padding: 24, borderRadius: 28, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 5 },
  kartIkonHalkasi: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  secimKartBaslik: { fontSize: 19, fontWeight: 'bold', color: '#FFFFFF', marginTop: 4 },
  secimKartAciklama: { fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', textAlign: 'center', marginTop: 6, fontWeight: '500', paddingHorizontal: 10 },
  manuelModMerkez: { width: '100%', alignItems: 'center', marginVertical: 10 },
  manuelBilgiYazi: { fontSize: 14, color: '#AE8875', fontWeight: '700', marginBottom: 20 },
  seritKonteyner: { paddingHorizontal: 20, gap: 16, height: 210, alignItems: 'flex-end' },
  interaktifKart: { width: 100, height: 130, backgroundColor: '#FFFFFF', borderRadius: 26, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2, position: 'relative', borderWidth: 2, borderColor: '#FFFFFF' },
  interaktifKartAktif: { backgroundColor: '#76B2E2', borderColor: '#FFFFFF', height: 145, shadowColor: '#76B2E2', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  kartIçiNyota: { position: 'absolute', width: 75, height: 105, resizeMode: 'contain', top: -65 },
  kartIçiNyotaAktif: { opacity: 1 },
  kartIçiNyotaPasif: { opacity: 0.4 },
  seritDkText: { fontSize: 28, fontWeight: 'bold', color: '#4A4A4A' },
  seritDkTextAktif: { color: '#FFFFFF' },
  seritDkAltYazi: { fontSize: 9, fontWeight: '800', color: '#BDBDBD', letterSpacing: 1 },
  seritDkAltYaziAktif: { color: 'rgba(255, 255, 255, 0.85)' },
  carkMerkezAlani: { width: WHEEL_SIZE, height: WHEEL_SIZE, justifyContent: 'center', alignItems: 'center', position: 'relative', marginVertical: 15 },
  igneSimgesi: { position: 'absolute', top: -14, width: 26, height: 26, backgroundColor: '#FF8A80', borderTopLeftRadius: 13, borderBottomRightRadius: 13, transform: [{ rotate: '45deg' }], zIndex: 999 },
  anaCarkGovdesi: { width: WHEEL_SIZE, height: WHEEL_SIZE, borderRadius: WHEEL_SIZE / 2, overflow: 'hidden', position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 5, backgroundColor: '#FFFFFF' },
  mutlakNyotaGorseli: { position: 'absolute', resizeMode: 'contain', zIndex: 99 },
  carkGobegi: { position: 'absolute', width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFFFFF', top: '50%', left: '50%', marginTop: -17, marginLeft: -17, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 3, zIndex: 100 },
  butonlarHatti: { width: '100%', paddingHorizontal: 25, gap: 12, marginTop: 10 },
  anaButon: { flexDirection: 'row', width: '100%', height: 52, backgroundColor: '#B39DDB', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  pasifButon: { backgroundColor: '#D1C4E9' },
  baslatButonu: { flexDirection: 'row', width: '100%', height: 52, backgroundColor: '#76B2E2', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  butonYazisi: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
});