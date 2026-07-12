import { useAudioPlayer } from 'expo-audio';
import { Check, Gift, HelpCircle, Sparkles, Star, X } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNyota } from '../context/NyotaContext';

const { width, height } = Dimensions.get('window');

// ==========================================
// 1. SERİ: FLUFFY LIFE FİGÜRLERİ
// ==========================================
const FLUFFY_LIFE_FIGURLERI = [
  { id: 'f1', name: 'Unknown\nRoad', image: require('../../assets/images/fluffy_life/unknown_road.png'), isSecret: false },
  { id: 'f2', name: 'Brave\nTogether', image: require('../../assets/images/fluffy_life/brave_together.png'), isSecret: false },
  { id: 'f3', name: 'Warm\nSunlight', image: require('../../assets/images/fluffy_life/warm_sunlight.png'), isSecret: false },
  { id: 'f4', name: 'Calling', image: require('../../assets/images/fluffy_life/calling.png'), isSecret: false },
  { id: 'f5', name: 'See\nLove', image: require('../../assets/images/fluffy_life/see_love.png'), isSecret: false },
  { id: 'f6', name: 'Kitten\nHug', image: require('../../assets/images/fluffy_life/kitten_hug.png'), isSecret: false },
  { id: 'f7', name: 'Dazed', image: require('../../assets/images/fluffy_life/daze.png'), isSecret: false },
  { id: 'f8', name: 'A\nBrief Escape', image: require('../../assets/images/fluffy_life/a_brief_escape.png'), isSecret: false },
  { id: 'f9', name: 'Our\nSecret', image: require('../../assets/images/fluffy_life/our_secret.png'), isSecret: false },
  { id: 'f10', name: 'Lost\nStar', image: require('../../assets/images/fluffy_life/lost_star.png'), isSecret: false },
  { id: 'f11', name: 'Home', image: require('../../assets/images/fluffy_life/home.png'), isSecret: false },
  { id: 'f12', name: 'Little\nMountain', image: require('../../assets/images/fluffy_life/little_mountain.png'), isSecret: false },
  { id: 'f_secret', name: 'Cotton\nCandy Daydream', image: require('../../assets/images/fluffy_life/cotton_candy_daydream.png'), isSecret: true },
];

// ==========================================
// 2. SERİ: GROWING UP BY YOUR WAY FİGÜRLERİ
// ==========================================
const GROWING_UP_FIGURLERI = [
  { id: 'g1', name: 'Growing\nUp', image: require('../../assets/images/growing_up_by_your_way/growing_up.png'), isSecret: false },
  { id: 'g2', name: 'Hidden\nLove', image: require('../../assets/images/growing_up_by_your_way/hidden_love.png'), isSecret: false },
  { id: 'g3', name: 'Time', image: require('../../assets/images/growing_up_by_your_way/time.png'), isSecret: false },
  { id: 'g4', name: 'Into\nMy Heart', image: require('../../assets/images/growing_up_by_your_way/into_my_heart.png'), isSecret: false },
  { id: 'g5', name: 'Friends', image: require('../../assets/images/growing_up_by_your_way/friends.png'), isSecret: false },
  { id: 'g6', name: 'Road', image: require('../../assets/images/growing_up_by_your_way/road.png'), isSecret: false },
  { id: 'g7', name: 'Childhood', image: require('../../assets/images/growing_up_by_your_way/childhood.png'), isSecret: false },
  { id: 'g8', name: 'Poem', image: require('../../assets/images/growing_up_by_your_way/poem.png'), isSecret: false },
  { id: 'g9', name: 'Hi', image: require('../../assets/images/growing_up_by_your_way/hi.png'), isSecret: false },
  { id: 'g10', name: 'Dream', image: require('../../assets/images/growing_up_by_your_way/dream.png'), isSecret: false },
  { id: 'g11', name: 'Feeling', image: require('../../assets/images/growing_up_by_your_way/feeling.png'), isSecret: false },
  { id: 'g12', name: 'Thinking', image: require('../../assets/images/growing_up_by_your_way/thinking.png'), isSecret: false },
  { id: 'g_secret', name: 'Fly\nto Your Own Mountain', image: require('../../assets/images/growing_up_by_your_way/fly_to_your_own_mountain.png'), isSecret: true },
];

// ==========================================
// 3. SERİ: I AM THE SEASONS FİGÜRLERİ
// ==========================================
const SEASONS_FIGURLERI = [
  { id: 's1', name: 'Genesis', image: require('../../assets/images/i_am_the_seasons/genesis.png'), isSecret: false },
  { id: 's2', name: 'Spring\nWisteria', image: require('../../assets/images/i_am_the_seasons/spring_wisteria.png'), isSecret: false },
  { id: 's3', name: 'Bamboo\nAfter Rain', image: require('../../assets/images/i_am_the_seasons/bamboo_after_rain.png'), isSecret: false },
  { id: 's4', name: 'Summer\nMurmurs', image: require('../../assets/images/i_am_the_seasons/summer_murmurs.png'), isSecret: false },
  { id: 's5', name: 'Blue\nSkies Ahead', image: require('../../assets/images/i_am_the_seasons/blue_skies_ahead.png'), isSecret: false },
  { id: 's6', name: 'Sunseeker', image: require('../../assets/images/i_am_the_seasons/sunseeker.png'), isSecret: false },
  { id: 's7', name: 'Autumn\nGlow', image: require('../../assets/images/i_am_the_seasons/autumn_glow.png'), isSecret: false },
  { id: 's8', name: 'Hidden\nin Autumn', image: require('../../assets/images/i_am_the_seasons/hidden_in_autumn.png'), isSecret: false },
  { id: 's9', name: 'Forest\nTapestry', image: require('../../assets/images/i_am_the_seasons/forest_tapestry.png'), isSecret: false },
  { id: 's10', name: 'Snowfall\nBliss', image: require('../../assets/images/i_am_the_seasons/snowfall_bliss.png'), isSecret: false },
  { id: 's11', name: 'Life\nof Leisure', image: require('../../assets/images/i_am_the_seasons/life_of_leisure.png'), isSecret: false },
  { id: 's12', name: 'Cloudwatcher', image: require('../../assets/images/i_am_the_seasons/cloudwatcher.png'), isSecret: false },
  { id: 's_secret', name: 'Walking\ninto Spring', image: require('../../assets/images/i_am_the_seasons/walking_into_spring.png'), isSecret: true },
];

// ==========================================
// 4. SERİ: WE ARE ALL STARS FİGÜRLERİ
// ==========================================
const ALL_STARS_FIGURLERI = [
  { id: 'a1', name: 'Sanctuary\nStar', image: require('../../assets/images/we_are_all_stars/sanctuary_star.png'), isSecret: false },
  { id: 'a2', name: 'Reminiscence\nStar', image: require('../../assets/images/we_are_all_stars/reminiscence_star.png'), isSecret: false },
  { id: 'a3', name: 'Meteor\nShower', image: require('../../assets/images/we_are_all_stars/meteor_shower.png'), isSecret: false },
  { id: 'a4', name: 'Mirrorlight\nStar', image: require('../../assets/images/we_are_all_stars/mirrorlight_star.png'), isSecret: false },
  { id: 'a5', name: 'Nightlight\nStar', image: require('../../assets/images/we_are_all_stars/nightlight_star.png'), isSecret: false },
  { id: 'a6', name: 'Wishing\nStar', image: require('../../assets/images/we_are_all_stars/wishing_star.png'), isSecret: false },
  { id: 'a7', name: 'Wayfinder\nStar', image: require('../../assets/images/we_are_all_stars/wayfinder_star.png'), isSecret: false },
  { id: 'a8', name: 'Fable\nStar', image: require('../../assets/images/we_are_all_stars/fable_star.png'), isSecret: false },
  { id: 'a9', name: 'Bounty\nStar', image: require('../../assets/images/we_are_all_stars/bounty_star.png'), isSecret: false },
  { id: 'a10', name: 'Life-bearing\nStar', image: require('../../assets/images/we_are_all_stars/life_bearing_star.png'), isSecret: false },
  { id: 'a11', name: 'Halo\nStar', image: require('../../assets/images/we_are_all_stars/halo_star.png'), isSecret: false },
  { id: 'a12', name: 'Melody\nStar', image: require('../../assets/images/we_are_all_stars/melody_star.png'), isSecret: false },
  { id: 'a_secret', name: 'Dreamcatcher\nStar', image: require('../../assets/images/we_are_all_stars/dreamcatcher_star.png'), isSecret: true },
];

export default function CollectionScreen() {
  const { starPoints, setStarPoints, ownedNyotas, addNyotaToCollection, activeNyotaId, setActiveNyotaId, isSoundEnabled } = useNyota();

  const popPlayer = useAudioPlayer(require('../../assets/audio/pop.mp3'));

  useEffect(() => {
    if (!ownedNyotas.includes('f1')) {
      addNyotaToCollection('f1');
    }
  }, []);

  const [seciliNyotaId, setSeciliNyotaId] = useState<string | null>(null);
  const [tiklananNyotaAdi, setTiklananNyotaAdi] = useState<string>('');

  // Gacha Odası State'leri
  const [kutuOdasiAcik, setKutuOdasiAcik] = useState(false);
  const [seciliSeriIndex, setSeciliSeriIndex] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [kutuAcildi, setKutuAcildi] = useState(false);
  const [kazanilanNyota, setKazanilanNyota] = useState<any>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  // 🛠️ SAF STATE TABANLI HAFİF ANİMASYON MOTORU (Animated Kütüphanesi Tamamen Devre Dışı!)
  const [holdPercent, setHoldPercent] = useState(0); // Dolum barı genişliği %0 - %100
  const [shakeOffset, setShakeOffset] = useState(0); // Kutu sallanma mesafesi
  const [sparkleScale, setSparkleScale] = useState(0); // Işıltı büyüme boyutu

  const progressInterval = useRef<any>(null);
  const explodeTimeout = useRef<any>(null);

  const seriler = [
    { id: 'fluffy_life', isim: "NYOTA'S FLUFFY LIFE", kutuResmi: require('../../assets/images/fluffy_life/box.png'), figurler: FLUFFY_LIFE_FIGURLERI },
    { id: 'growing_up', isim: "GROWING UP BY YOUR WAY", kutuResmi: require('../../assets/images/growing_up_by_your_way/box.png'), figurler: GROWING_UP_FIGURLERI },
    { id: 'seasons', isim: "I AM THE SEASONS", kutuResmi: require('../../assets/images/i_am_the_seasons/box.png'), figurler: SEASONS_FIGURLERI },
    { id: 'stars', isim: "WE ARE ALL STARS", kutuResmi: require('../../assets/images/we_are_all_stars/box.png'), figurler: ALL_STARS_FIGURLERI },
  ];

  const aktifSeri = seriler[seciliSeriIndex];

  // Frame tabanlı sarsıntı ve dolum takip tetikleyicisi
  useEffect(() => {
    let animationFrameId: number;
    let count = 0;

    const renderLoop = () => {
      if (isHolding && !isExploding && !kutuAcildi) {
        count++;
        if (count % 3 === 0) {
          setShakeOffset(Math.random() > 0.5 ? 12 : -12);
        }
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        setShakeOffset(0);
      }
    };

    if (isHolding) {
      animationFrameId = requestAnimationFrame(renderLoop);
    } else {
      setShakeOffset(0);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHolding, isExploding, kutuAcildi]);

  // Basılı Tutma Başlangıcı
  const handleHoldStart = () => {
    if (starPoints < 500) {
      Alert.alert("Yetersiz Yıldız Puanı", "Kutu açmak için 500 PTS gerekiyor. Yan taraftaki şeffaf alana dokunarak hileyle puan ekleyebilirsin! 😉");
      return;
    }

    setIsHolding(true);
    setHoldPercent(0);

    let currentProgress = 0;
    // 1800ms toplam süre / 30ms adım aralığı = 60 adım. Her adımda %1.66 ekler
    progressInterval.current = setInterval(() => {
      currentProgress += (100 / 60);
      if (currentProgress >= 100) {
        clearInterval(progressInterval.current);
        setHoldPercent(100);
        tetiklePatlamaEfektini();
      } else {
        setHoldPercent(currentProgress);
      }
    }, 30);
  };

  const handleHoldRelease = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    setIsHolding(false);

    if (!isExploding && !kutuAcildi) {
      setHoldPercent(0);
    }
  };

  // 🌟 SAF JS ZAMANLAYICILI IŞILTI/PATLAMA EFEKTİ
  const tetiklePatlamaEfektini = () => {
    setIsHolding(false);
    setIsExploding(true);
    setSparkleScale(0);

    if (isSoundEnabled) {
      popPlayer.seekTo(0);
      popPlayer.play();
    }

    let scaleVal = 0;
    const growInterval = setInterval(() => {
      scaleVal += 0.15;
      if (scaleVal >= 3.5) {
        clearInterval(growInterval);

        // Patlama doruk noktasına ulaşınca söndür ve sonucu göster
        explodeTimeout.current = setTimeout(() => {
          setSparkleScale(0);
          setIsExploding(false);
          gachaSonucunuHesapla();
        }, 150);
      } else {
        setSparkleScale(scaleVal);
      }
    }, 25);
  };

  const gachaSonucunuHesapla = () => {
    setStarPoints(prev => prev - 500);

    const zar = Math.random() * 100;
    let cikan = aktifSeri.figurler[0];

    const normalList = aktifSeri.figurler.filter(f => !f.isSecret);
    const secretItem = aktifSeri.figurler.find(f => f.isSecret);

    if (zar <= 5 && secretItem) {
      cikan = secretItem;
    } else {
      const rIndex = Math.floor(Math.random() * normalList.length);
      cikan = normalList[rIndex];
    }

    const zatenVarMi = ownedNyotas.includes(cikan.id);
    setIsDuplicate(zatenVarMi);
    setKazanilanNyota(cikan);
    setKutuAcildi(true);

    if (zatenVarMi) {
      setStarPoints(prev => prev + 150);
    } else {
      addNyotaToCollection(cikan.id);
    }
  };

  const odayiKapatVitriniYenile = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    if (explodeTimeout.current) clearTimeout(explodeTimeout.current);
    setKutuOdasiAcik(false);
    setKutuAcildi(false);
    setIsExploding(false);
    setKazanilanNyota(null);
    setHoldPercent(0);
    setSparkleScale(0);
  };

  // Temizleme koruması
  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (explodeTimeout.current) clearTimeout(explodeTimeout.current);
    };
  }, []);

  if (kutuOdasiAcik) {
    return (
      <View style={styles.gachaTamEkran}>
        <View style={styles.gachaUstBar}>
          <TouchableOpacity style={styles.gachaKapatButon} onPress={odayiKapatVitriniYenile}>
            <X size={20} color="#AE8875" />
          </TouchableOpacity>
          <Text style={styles.gachaOdaBaslik}>Blind Box Odası</Text>

          {/* 🌟 HİLE ALANI: PTS kutusunun solundaki bu şeffaf alana dokunursan +2000 PTS gelir */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.gizliHileAlani} onPress={() => setStarPoints(p => p + 2000)} />
            <View style={styles.gachaPuanKapsul}>
              <Star size={12} color="#FFE07B" fill="#FFE07B" style={{ marginRight: 4 }} />
              <Text style={styles.gachaPuanText}>{starPoints} PTS</Text>
            </View>
          </View>
        </View>

        {!kutuAcildi ? (
          <View style={styles.gachaMerkezAlani}>
            <Text style={styles.seriSecimEtiket}>SALLAMAK İÇİN KUTUYA BASILI TUT</Text>

            <View style={styles.seriOklarHatti}>
              <TouchableOpacity disabled={seciliSeriIndex === 0 || isHolding} onPress={() => setSeciliSeriIndex(p => p - 1)} style={[styles.okButon, (seciliSeriIndex === 0 || isHolding) && { opacity: 0.3 }]}>
                <Text style={styles.okYazisi}>◀</Text>
              </TouchableOpacity>
              <Text style={styles.seriBaslikMetni}>{aktifSeri.isim}</Text>
              <TouchableOpacity disabled={seciliSeriIndex === seriler.length - 1 || isHolding} onPress={() => setSeciliSeriIndex(p => p + 1)} style={[styles.okButon, (seciliSeriIndex === seriler.length - 1 || isHolding) && { opacity: 0.3 }]}>
                <Text style={styles.okYazisi}>▶</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              onPressIn={handleHoldStart}
              onPressOut={handleHoldRelease}
              disabled={isExploding}
              style={styles.kutuDokunmatikKapsayici}
            >
              {/* 🪵 KUTU VE SALLAMA ALANI */}
              <View style={[styles.kutuGorselKonteyner, { transform: [{ translateX: shakeOffset }], opacity: isExploding ? 0 : 1 }]}>
                <Image source={aktifSeri.kutuResmi} style={styles.gachaDevKutuGorsel} />
              </View>

              {/* 🌟 PATLAMA / IŞILTI EFEKTİ GÖRSEL KATMANI */}
              {isExploding && (
                <View style={[styles.patlamaEfektKatmani, { transform: [{ scale: sparkleScale }] }]}>
                  <Sparkles size={85} color="#FFE07B" />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.gachaAltBarKapsayici}>
              <View style={[styles.gachaHoldDolumBar, { width: `${holdPercent}%` }]} />
              <Text style={styles.gachaAltBarYazi}>
                {isHolding ? 'Kutu Açılıyor, Bırakma! ✨' : 'Kutu Maliyeti: 500 PTS'}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.gachaSonucAlani}>
            <Sparkles size={40} color="#FFE07B" style={{ marginBottom: 10 }} />
            <Text style={styles.tebriklerYazisi}>{isDuplicate ? 'AYNISI ÇIKTI! 🥺' : 'YENİ BİR DOST GELDİ! 🎉'}</Text>

            <View style={[styles.sonucGorselKonteyner, kazanilanNyota?.isSecret && styles.secretGachaBorder]}>
              {kazanilanNyota?.image ? (
                <Image source={kazanilanNyota.image} style={styles.sonucNyotaGorsel} />
              ) : (
                <View style={styles.garsiGorselYokKapsul}>
                  <HelpCircle size={60} color="#FFE07B" />
                </View>
              )}
            </View>

            <Text style={styles.sonucNyotaIsmi}>{kazanilanNyota?.name.replace('\n', ' ')}</Text>
            <Text style={styles.sonucNyotaDetay}>
              {isDuplicate
                ? 'Bu figüre zaten sahiptin. 150 PTS geri cüzdanına eklendi!'
                : `${aktifSeri.isim} koleksiyonunun yeni üyesi vitrindeki yerini aldı!`}
            </Text>

            <TouchableOpacity style={styles.gachaDevamButon} onPress={() => setKutuAcildi(false)}>
              <Text style={styles.gachaDevamButonYazi}>Bir Tane Daha Aç</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FAF0E6' }}>
      <View style={styles.puanBarıHattı}>
        <TouchableOpacity style={styles.gizliHileAlani} onPress={() => setStarPoints(p => p + 2000)} />

        <View style={styles.puanKapsül}>
          <Star size={14} color="#FFE07B" fill="#FFE07B" style={{ marginRight: 4 }} />
          <Text style={styles.puanText}>{starPoints} PTS</Text>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>Nyota</Text>
        <Text style={styles.subTitle}>made by Elif Ceren</Text>

        <TouchableOpacity style={styles.ustKutuAlButon} onPress={() => setKutuOdasiAcik(true)}>
          <Gift size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.ustKutuAlButonYazi}>BLIND BOX ODASINA GİR (500 PTS)</Text>
        </TouchableOpacity>

        <View style={styles.dolapGovdesi}>
          {seriler.map((seri) => (
            <View key={seri.id} style={styles.seriKonteyner}>
              <Text style={styles.seriEtiket}>{seri.isim}</Text>

              <View style={styles.vitrinHatti}>
                <View style={styles.kutuAfishani}>
                  {seri.kutuResmi ? (
                    <Image source={seri.kutuResmi} style={styles.kutuGorseli} />
                  ) : (
                    <Text style={styles.kutuPlaceholderText}>SERİ{'\n'}BOX</Text>
                  )}
                </View>

                <ScrollView horizontal={true} style={styles.rafIcAlani} showsHorizontalScrollIndicator={false}>
                  {seri.figurler.map((figur) => {
                    const acik = ownedNyotas.includes(figur.id);
                    const secili = seciliNyotaId === figur.id;
                    const aktifYoldas = activeNyotaId === figur.id;

                    return (
                      <TouchableOpacity
                        key={figur.id}
                        activeOpacity={0.9}
                        style={[styles.nyotaOdacik, secili && styles.seciliOdacikSınırı]}
                        onPress={() => {
                          setSeciliNyotaId(figur.id);
                          setTiklananNyotaAdi(figur.name);
                        }}
                      >
                        <View style={styles.figurSergiAlani}>
                          {acik && aktifYoldas && (
                            <View style={styles.yoldasRozet}>
                              <Check size={10} color="#FFFFFF" strokeWidth={3} />
                            </View>
                          )}

                          {acik && figur.image ? (
                            <Image source={figur.image} style={styles.nyotaGorseli} />
                          ) : (
                            <View style={[styles.kilitliSiluet, figur.isSecret && styles.secretKilitliBorder]}>
                              <HelpCircle size={24} color={figur.isSecret ? "rgba(255, 224, 123, 0.5)" : "rgba(255, 255, 255, 0.4)"} />
                            </View>
                          )}
                        </View>

                        <Text style={[styles.figuIsmi, figur.isSecret && styles.secretText, secili && styles.seciliYaziRengi]} numberOfLines={2}>
                          {acik ? (figur.isSecret ? `✨ ${figur.name}` : figur.name) : (figur.isSecret ? '[SECRET]' : '???')}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              <View style={styles.ahsapRafTahtasi} />
            </View>
          ))}
        </View>
      </ScrollView>

      {seciliNyotaId && ownedNyotas.includes(seciliNyotaId) && (
        <View style={styles.altSecimPaneli}>
          <Text style={styles.altPanelBaslik}>🎉 Seçilen Figür: {tiklananNyotaAdi.replace('\n', ' ')}</Text>
          {activeNyotaId === seciliNyotaId ? (
            <View style={styles.aktifYoldasKapsul}>
              <Text style={styles.aktifYoldasText}>Şu Anki Odaklanma Arkadaşın ✨</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.birlikteCalisButon}
              onPress={() => setActiveNyotaId(seciliNyotaId)}
            >
              <Text style={styles.birlikteCalisButonYazi}>🤝 Birlikte Çalışalım</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0E6', paddingHorizontal: 15 },
  puanBarıHattı: { position: 'absolute', top: height * 0.055, right: 20, zIndex: 999, flexDirection: 'row', alignItems: 'center' },
  gizliHileAlani: { width: 40, height: 40, backgroundColor: 'transparent' },
  puanKapsül: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  puanText: { fontSize: 12, fontWeight: 'bold', color: '#4A4A4A' },
  mainTitle: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', color: '#76B2E2', marginTop: 40 },
  subTitle: { fontSize: 12, textAlign: 'center', color: '#AE8875', marginBottom: 25, textTransform: 'uppercase', letterSpacing: 2 },

  ustKutuAlButon: { flexDirection: 'row', backgroundColor: '#76B2E2', height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: '#76B2E2', shadowOpacity: 0.25, shadowRadius: 6, elevation: 3 },
  ustKutuAlButonYazi: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold', letterSpacing: 0.5 },

  dolapGovdesi: { backgroundColor: '#AE8875', borderRadius: 24, padding: 12, borderWidth: 4, borderColor: '#8B5A2B', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 8, marginBottom: 120 },
  seriKonteyner: { marginBottom: 25 },
  seriEtiket: { fontSize: 11, fontWeight: '800', color: '#FFFFFF', backgroundColor: 'rgba(74, 74, 74, 0.25)', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 6 },
  vitrinHatti: { flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.06)', borderTopLeftRadius: 14, borderTopRightRadius: 14, padding: 10, alignItems: 'flex-end' },
  kutuAfishani: { width: 80, height: 165, backgroundColor: '#F5C6C6', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#FFFFFF', marginRight: 12, overflow: 'hidden', position: 'relative' },
  kutuGorseli: { width: '100%', height: '100%', resizeMode: 'cover' },
  kutuPlaceholderText: { fontSize: 12, fontWeight: 'bold', color: '#4A4A4A', textAlign: 'center' },
  rafIcAlani: { flexDirection: 'row', flex: 1 },
  nyotaOdacik: { width: 105, height: 165, justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: 5, borderRadius: 16, paddingBottom: 4 },
  seciliOdacikSınırı: { backgroundColor: 'rgba(255, 255, 255, 0.15)' },
  figurSergiAlani: { width: 100, height: 140, justifyContent: 'flex-end', alignItems: 'center', overflow: 'hidden', position: 'relative' },
  yoldasRozet: { position: 'absolute', top: 25, right: 12, width: 16, height: 16, borderRadius: 8, backgroundColor: '#A5D6A7', justifyContent: 'center', alignItems: 'center', zIndex: 99 },
  nyotaGorseli: { width: 115, height: 200, marginBottom: -54, resizeMode: 'contain' },
  kilitliSiluet: { width: 65, height: 100, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  secretKilitliBorder: { borderColor: '#FFE07B', backgroundColor: 'rgba(254, 224, 123, 0.08)' },
  figuIsmi: { fontSize: 11, fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center', marginTop: 6 },
  seciliYaziRengi: { color: '#FFFFFF', fontWeight: 'bold' },
  secretText: { color: '#FFE07B', fontWeight: '700' },
  ahsapRafTahtasi: { height: 16, backgroundColor: '#8B5A2B', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 },

  altSecimPaneli: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, alignItems: 'center', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 10 },
  altPanelBaslik: { fontSize: 14, fontWeight: 'bold', color: '#4A4A4A' },
  birlikteCalisButon: { backgroundColor: '#BEA4C6', width: '100%', height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  birlikteCalisButonYazi: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  aktifYoldasKapsul: { backgroundColor: 'rgba(165, 214, 167, 0.15)', width: '100%', height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#A5D6A7' },
  aktifYoldasText: { color: '#66BB6A', fontSize: 13, fontWeight: 'bold' },

  // 🎁 GACHA ODASI
  gachaTamEkran: { flex: 1, backgroundColor: '#FAF0E6', paddingTop: height * 0.065 },
  gachaUstBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  gachaKapatButon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  gachaOdaBaslik: { fontSize: 18, fontWeight: 'bold', color: '#AE8875' },
  gachaPuanKapsul: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  gachaPuanText: { fontSize: 11, fontWeight: 'bold', color: '#4A4A4A' },
  gachaMerkezAlani: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 40 },
  seriSecimEtiket: { fontSize: 11, fontWeight: 'bold', color: '#76B2E2', letterSpacing: 1.5, textAlign: 'center' },
  seriOklarHatti: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 10 },
  okButon: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
  okYazisi: { fontSize: 14, color: '#AE8875', fontWeight: 'bold' },
  seriBaslikMetni: { fontSize: 18, fontWeight: 'bold', color: '#4A4A4A', textAlign: 'center', flex: 1, paddingHorizontal: 10 },

  kutuDokunmatikKapsayici: { marginVertical: 20, width: 220, height: 300, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  kutuGorselKonteyner: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  gachaDevKutuGorsel: { width: '100%', height: '100%', resizeMode: 'contain' },
  patlamaEfektKatmani: { position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 99 },

  gachaAltBarKapsayici: { width: '100%', height: 48, backgroundColor: '#BEA4C6', borderRadius: 16, justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', marginTop: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  gachaHoldDolumBar: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.35)' },
  gachaAltBarYazi: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold', zIndex: 5 },

  gachaSonucAlani: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  tebriklerYazisi: { fontSize: 21, fontWeight: 'bold', color: '#76B2E2', marginBottom: 20, textAlign: 'center' },
  sonucGorselKonteyner: { width: 200, height: 280, backgroundColor: '#FFFFFF', borderRadius: 28, justifyContent: 'center', alignItems: 'center', padding: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 4 },
  secretGachaBorder: { borderColor: '#FFE07B', borderWidth: 3, backgroundColor: '#FFFDE7' },
  sonucNyotaGorsel: { width: '100%', height: '100%', resizeMode: 'contain' },
  garsiGorselYokKapsul: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 20 },
  sonucNyotaIsmi: { fontSize: 24, fontWeight: 'bold', color: '#4A4A4A', marginTop: 20, textAlign: 'center' },
  sonucNyotaDetay: { fontSize: 13, color: '#AE8875', textAlign: 'center', marginTop: 10, lineHeight: 18, paddingHorizontal: 10 },
  gachaDevamButon: { marginTop: 30, width: '100%', height: 48, backgroundColor: '#76B2E2', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  gachaDevamButonYazi: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' }
});