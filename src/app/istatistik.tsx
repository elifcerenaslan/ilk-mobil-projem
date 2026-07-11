import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { BarChart3, Clock, Flame, Award, Sparkles } from 'lucide-react-native';
import { useNyota } from '../context/NyotaContext';

const { width } = Dimensions.get('window');

const MINIK_NYOTA_IMAGES: { [key: string]: any } = {
  'f1': require('../../assets/images/fluffy_life/unknown_road.png'),
  'f2': require('../../assets/images/fluffy_life/brave_together.png'),
  'f3': require('../../assets/images/fluffy_life/warm_sunlight.png'),
  'f4': require('../../assets/images/fluffy_life/calling.png'),
  'f5': require('../../assets/images/fluffy_life/see_love.png'),
  'f6': require('../../assets/images/fluffy_life/kitten_hug.png'),
  'f7': require('../../assets/images/fluffy_life/daze.png'),
  'f8': require('../../assets/images/fluffy_life/a_brief_escape.png'),
  'f9': require('../../assets/images/fluffy_life/our_secret.png'),
  'f10': require('../../assets/images/fluffy_life/lost_star.png'),
  'f11': require('../../assets/images/fluffy_life/home.png'),
  'f12': require('../../assets/images/fluffy_life/little_mountain.png'),
  'f_secret': require('../../assets/images/fluffy_life/cotton_candy_daydream.png'),

  'g1': require('../../assets/images/growing_up_by_your_way/growing_up.png'),
  'g2': require('../../assets/images/growing_up_by_your_way/hidden_love.png'),
  'g3': require('../../assets/images/growing_up_by_your_way/time.png'),
  'g4': require('../../assets/images/growing_up_by_your_way/into_my_heart.png'),
  'g5': require('../../assets/images/growing_up_by_your_way/friends.png'),
  'g6': require('../../assets/images/growing_up_by_your_way/road.png'),
  'g7': require('../../assets/images/growing_up_by_your_way/childhood.png'),
  'g8': require('../../assets/images/growing_up_by_your_way/poem.png'),
  'g9': require('../../assets/images/growing_up_by_your_way/hi.png'),
  'g10': require('../../assets/images/growing_up_by_your_way/dream.png'),
  'g11': require('../../assets/images/growing_up_by_your_way/feeling.png'),
  'g12': require('../../assets/images/growing_up_by_your_way/thinking.png'),
  'g_secret': require('../../assets/images/growing_up_by_your_way/fly_to_your_own_mountain.png'),

  's1': require('../../assets/images/i_am_the_seasons/genesis.png'),
  's2': require('../../assets/images/i_am_the_seasons/spring_wisteria.png'),
  's3': require('../../assets/images/i_am_the_seasons/bamboo_after_rain.png'),
  's4': require('../../assets/images/i_am_the_seasons/summer_murmurs.png'),
  's5': require('../../assets/images/i_am_the_seasons/blue_skies_ahead.png'),
  's6': require('../../assets/images/i_am_the_seasons/sunseeker.png'),
  's7': require('../../assets/images/i_am_the_seasons/autumn_glow.png'),
  's8': require('../../assets/images/i_am_the_seasons/hidden_in_autumn.png'),
  's9': require('../../assets/images/i_am_the_seasons/forest_tapestry.png'),
  's10': require('../../assets/images/i_am_the_seasons/snowfall_bliss.png'),
  's11': require('../../assets/images/i_am_the_seasons/life_of_leisure.png'),
  's12': require('../../assets/images/i_am_the_seasons/cloudwatcher.png'),
  's_secret': require('../../assets/images/i_am_the_seasons/walking_into_spring.png'),

  'a1': require('../../assets/images/we_are_all_stars/sanctuary_star.png'),
  'a2': require('../../assets/images/we_are_all_stars/reminiscence_star.png'),
  'a3': require('../../assets/images/we_are_all_stars/meteor_shower.png'),
  'a4': require('../../assets/images/we_are_all_stars/mirrorlight_star.png'),
  'a5': require('../../assets/images/we_are_all_stars/nightlight_star.png'),
  'a6': require('../../assets/images/we_are_all_stars/wishing_star.png'),
  'a7': require('../../assets/images/we_are_all_stars/wayfinder_star.png'),
  'a8': require('../../assets/images/we_are_all_stars/fable_star.png'),
  'a9': require('../../assets/images/we_are_all_stars/bounty_star.png'),
  'a10': require('../../assets/images/we_are_all_stars/life_bearing_star.png'),
  'a11': require('../../assets/images/we_are_all_stars/halo_star.png'),
  'a12': require('../../assets/images/we_are_all_stars/melody_star.png'),
  'a_secret': require('../../assets/images/we_are_all_stars/dreamcatcher_star.png'),
};

function StatisticsScreen() {
  const { seansGecmisi } = useNyota();

  const toplamDakika = seansGecmisi.reduce((acc, current) => acc + current.sure, 0);
  const toplamSeans = seansGecmisi.length;

  const nyotaSayilari: { [key: string]: number } = {};
  seansGecmisi.forEach(s => {
    nyotaSayilari[s.nyotaId] = (nyotaSayilari[s.nyotaId] || 0) + 1;
  });
  
  let enCokKullanilanId = 'f1';
  let maksSayi = 0;
  Object.keys(nyotaSayilari).forEach(id => {
    if (nyotaSayilari[id] > maksSayi) {
      maksSayi = nyotaSayilari[id];
      enCokKullanilanId = id;
    }
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.mainTitle}>Günlük</Text>
      <Text style={styles.subTitle}>ODAKLANMA GÜNCEN VE BAŞARILARIN</Text>

      <View style={styles.kartlarHatti}>
        <View style={[styles.miniKart, { backgroundColor: '#76B2E2' }]}>
          <Clock size={18} color="#FFFFFF" style={{ marginBottom: 4 }} />
          <Text style={styles.kartSkor}>{toplamDakika}</Text>
          <Text style={styles.kartEtiket}>Toplam Dk</Text>
        </View>

        <View style={[styles.miniKart, { backgroundColor: '#B39DDB' }]}>
          <Flame size={18} color="#FFFFFF" style={{ marginBottom: 4 }} />
          <Text style={styles.kartSkor}>{toplamSeans}</Text>
          <Text style={styles.kartEtiket}>Tam Seans</Text>
        </View>

        <View style={[styles.miniKart, { backgroundColor: '#F5C6C6' }]}>
          <Award size={18} color="#FFFFFF" style={{ marginBottom: 4 }} />
          <View style={styles.kartNyotaGrup}>
            <Image 
              source={MINIK_NYOTA_IMAGES[enCokKullanilanId] || MINIK_NYOTA_IMAGES['f1']} 
              style={styles.kartNyotaIkon} 
            />
          </View>
          <Text style={styles.kartEtiket}>En Sadık Dost</Text>
        </View>
      </View>

      <View style={styles.gecmisKonteyner}>
        <View style={styles.gecmisBaslikSatiri}>
          <BarChart3 size={16} color="#AE8875" />
          <Text style={styles.gecmisBaslikMetin}>Seans Geçmişi Logları</Text>
        </View>

        {seansGecmisi.length === 0 ? (
          <View style={styles.bosGecmisKutusu}>
            <Sparkles size={24} color="#BDBDBD" style={{ marginBottom: 6 }} />
            <Text style={styles.bosGecmisYazi}>Henüz kayıtlı seansın yok.</Text>
            <Text style={styles.bosGecmisAltYazi}>İlk seansını bitirdiğinde dostunun resmi buraya işlenecek! ✨</Text>
          </View>
        ) : (
          seansGecmisi.map((seans) => (
            <View key={seans.id} style={styles.gecmisSatirKart}>
              <View style={styles.satirSolGrup}>
                <View style={styles.satirNyotaHalkasi}>
                  <Image 
                    source={MINIK_NYOTA_IMAGES[seans.nyotaId] || MINIK_NYOTA_IMAGES['f1']} 
                    style={styles.satirNyotaGorsel} 
                  />
                </View>
                <View style={styles.satirMetinKutusu}>
                  <Text style={styles.satirTarihText}>{seans.tarih}</Text>
                  <Text style={styles.satirDetayText}>Odaklanma seansı başarıyla tamamlandı.</Text>
                </View>
              </View>
              <View style={styles.satirSkorKapsul}>
                <Text style={styles.satirSkorYazi}>+{seans.sure} dk</Text>
              </View>
            </View>
          ))
        )}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF0E6', paddingHorizontal: 20 },
  mainTitle: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', color: '#76B2E2', marginTop: 40 },
  subTitle: { fontSize: 11, textAlign: 'center', color: '#AE8875', marginBottom: 25, letterSpacing: 2, fontWeight: '700' },
  kartlarHatti: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 25 },
  miniKart: { width: (width - 60) / 3, paddingVertical: 14, borderRadius: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  kartSkor: { fontSize: 24, fontWeight: '900', color: '#FFFFFF', marginVertical: 2 },
  kartEtiket: { fontSize: 11, fontWeight: '700', color: '#FFFFFF', opacity: 0.9, marginTop: 2, textAlign: 'center' },
  kartNyotaGrup: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center', marginVertical: 1, overflow: 'hidden' },
  kartNyotaIkon: { width: 45, height: 45, resizeMode: 'contain', marginTop: 10 },
  gecmisKonteyner: { width: '100%', gap: 12 },
  gecmisBaslikSatiri: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  gecmisBaslikMetin: { fontSize: 14, fontWeight: 'bold', color: '#AE8875', textTransform: 'uppercase', letterSpacing: 1 },
  bosGecmisKutusu: { padding: 40, backgroundColor: '#FFFFFF', borderRadius: 24, alignItems: 'center', borderWidth: 1.5, borderColor: '#F5C6C6', borderStyle: 'dashed', marginTop: 10 },
  bosGecmisYazi: { fontSize: 14, fontWeight: 'bold', color: '#4A4A4A', marginTop: 4 },
  bosGecmisAltYazi: { fontSize: 11, color: '#AE8875', textAlign: 'center', marginTop: 4, paddingHorizontal: 10, lineHeight: 16 },
  gecmisSatirKart: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 22, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 3, elevation: 1, borderWidth: 1, borderColor: 'rgba(245, 198, 198, 0.25)' },
  satirSolGrup: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  satirNyotaHalkasi: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FAF0E6', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: '#F5C6C6' },
  satirNyotaGorsel: { width: 55, height: 55, resizeMode: 'contain', marginTop: 12 },
  satirMetinKutusu: { flex: 1, gap: 2 },
  satirTarihText: { fontSize: 13, fontWeight: 'bold', color: '#4A4A4A' },
  satirDetayText: { fontSize: 11, color: '#AE8875', fontWeight: '500' },
  satirSkorKapsul: { backgroundColor: 'rgba(118, 178, 226, 0.12)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  satirSkorYazi: { fontSize: 12, fontWeight: 'bold', color: '#76B2E2' }
});

// 🎯 Eksik olan default export garantili bir şekilde en alta yerleştirildi:
export default StatisticsScreen;