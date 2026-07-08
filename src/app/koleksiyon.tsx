import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { HelpCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// ==========================================
// 1. SERİ: FLUFFY LIFE FİGÜRLERİ
// ==========================================
const FLUFFY_LIFE_FIGURLERI = [
  { id: 'f1', name: 'Unknown Road', image: require('../../assets/images/fluffy_life/unknown_road.png'), isUnlocked: true, isSecret: false }, 
  { id: 'f2', name: 'Brave Together', image: require('../../assets/images/fluffy_life/brave_together.png'), isUnlocked: false, isSecret: false }, 
  { id: 'f3', name: 'Warm Sunlight', image: require('../../assets/images/fluffy_life/warm_sunlight.png'), isUnlocked: false, isSecret: false },
  { id: 'f4', name: 'Calling', image: require('../../assets/images/fluffy_life/calling.png'), isUnlocked: false, isSecret: false },
  { id: 'f5', name: 'See Love', image: require('../../assets/images/fluffy_life/see_love.png'), isUnlocked: false, isSecret: false },
  { id: 'f6', name: 'Kitten Hug', image: require('../../assets/images/fluffy_life/kitten_hug.png'), isUnlocked: false, isSecret: false },
  { id: 'f7', name: 'Dazed', image: require('../../assets/images/fluffy_life/daze.png'), isUnlocked: false, isSecret: false },
  { id: 'f8', name: 'A Brief Escape', image: require('../../assets/images/fluffy_life/a_brief_escape.png'), isUnlocked: false, isSecret: false },
  { id: 'f9', name: 'Our Secret', image: require('../../assets/images/fluffy_life/our_secret.png'), isUnlocked: false, isSecret: false },
  { id: 'f10', name: 'Lost Star', image: require('../../assets/images/fluffy_life/lost_star.png'), isUnlocked: false, isSecret: false },
  { id: 'f11', name: 'Home', image: require('../../assets/images/fluffy_life/home.png'), isUnlocked: false, isSecret: false },
  { id: 'f12', name: 'Little Mountain', image: require('../../assets/images/fluffy_life/little_mountain.png'), isUnlocked: false, isSecret: false },
  { id: 'f_secret', name: 'Cotton Candy Daydream', image: null, isUnlocked: false, isSecret: true },
];

// ==========================================
// 2. SERİ: GROWING UP BY YOUR WAY FİGÜRLERİ
// ==========================================
const GROWING_UP_FIGURLERI = [
  { id: 'g1', name: 'Growing Up', image: require('../../assets/images/growing_up_by_your_way/growing_up.png'), isUnlocked: true, isSecret: false }, 
  { id: 'g2', name: 'Hidden Love', image: require('../../assets/images/growing_up_by_your_way/hidden_love.png'), isUnlocked: false, isSecret: false },
  { id: 'g3', name: 'Time', image: require('../../assets/images/growing_up_by_your_way/time.png'), isUnlocked: false, isSecret: false },
  { id: 'g4', name: 'Into My Heart', image: require('../../assets/images/growing_up_by_your_way/into_my_heart.png'), isUnlocked: false, isSecret: false },
  { id: 'g5', name: 'Friends', image: require('../../assets/images/growing_up_by_your_way/friends.png'), isUnlocked: false, isSecret: false },
  { id: 'g6', name: 'Road', image: require('../../assets/images/growing_up_by_your_way/road.png'), isUnlocked: false, isSecret: false },
  { id: 'g7', name: 'Childhood', image: require('../../assets/images/growing_up_by_your_way/childhood.png'), isUnlocked: false, isSecret: false },
  { id: 'g8', name: 'Poem', image: require('../../assets/images/growing_up_by_your_way/poem.png'), isUnlocked: false, isSecret: false },
  { id: 'g9', name: 'Hi', image: require('../../assets/images/growing_up_by_your_way/hi.png'), isUnlocked: false, isSecret: false },
  { id: 'g10', name: 'Dream', image: require('../../assets/images/growing_up_by_your_way/dream.png'), isUnlocked: false, isSecret: false },
  { id: 'g11', name: 'Feeling', image: require('../../assets/images/growing_up_by_your_way/feeling.png'), isUnlocked: false, isSecret: false },
  { id: 'g12', name: 'Thinking', image: require('../../assets/images/growing_up_by_your_way/thinking.png'), isUnlocked: false, isSecret: false },
  { id: 'g_secret', name: 'Fly to Your Own Mountain', image: require('../../assets/images/growing_up_by_your_way/fly_to_your_own_mountain.png'), isUnlocked: false, isSecret: true },
];

// ==========================================
// 3. SERİ: I AM THE SEASONS FİGÜRLERİ
// ==========================================
const SEASONS_FIGURLERI = [
  { id: 's1', name: 'Genesis', image: require('../../assets/images/i_am_the_seasons/genesis.png'), isUnlocked: true, isSecret: false }, 
  { id: 's2', name: 'Spring Wisteria', image: require('../../assets/images/i_am_the_seasons/spring_wisteria.png'), isUnlocked: false, isSecret: false },
  { id: 's3', name: 'Bamboo After Rain', image: require('../../assets/images/i_am_the_seasons/bamboo_after_rain.png'), isUnlocked: false, isSecret: false },
  { id: 's4', name: 'Summer Murmurs', image: require('../../assets/images/i_am_the_seasons/summer_murmurs.png'), isUnlocked: false, isSecret: false },
  { id: 's5', name: 'Blue Skies Ahead', image: require('../../assets/images/i_am_the_seasons/blue_skies_ahead.png'), isUnlocked: false, isSecret: false },
  { id: 's6', name: 'Sunseeker', image: require('../../assets/images/i_am_the_seasons/sunseeker.png'), isUnlocked: false, isSecret: false },
  { id: 's7', name: 'Autumn Glow', image: require('../../assets/images/i_am_the_seasons/autumn_glow.png'), isUnlocked: false, isSecret: false },
  { id: 's8', name: 'Hidden in Autumn', image: require('../../assets/images/i_am_the_seasons/hidden_in_autumn.png'), isUnlocked: false, isSecret: false },
  { id: 's9', name: 'Forest Tapestry', image: require('../../assets/images/i_am_the_seasons/forest_tapestry.png'), isUnlocked: false, isSecret: false },
  { id: 's10', name: 'Snowfall Bliss', image: require('../../assets/images/i_am_the_seasons/snowfall_bliss.png'), isUnlocked: false, isSecret: false },
  { id: 's11', name: 'Life of Leisure', image: require('../../assets/images/i_am_the_seasons/life_of_leisure.png'), isUnlocked: false, isSecret: false },
  { id: 's12', name: 'Cloudwatcher', image: require('../../assets/images/i_am_the_seasons/cloudwatcher.png'), isUnlocked: false, isSecret: false },
  { id: 's_secret', name: 'Walking into Spring', image: require('../../assets/images/i_am_the_seasons/walking_into_spring.png'), isUnlocked: false, isSecret: true },
];

// ==========================================
// 4. SERİ: WE ARE ALL STARS FİGÜRLERİ (YENİ EKLEDİĞİN SERİ 🚀)
// ==========================================
const ALL_STARS_FIGURLERI = [
  { id: 'a1', name: 'Sanctuary Star', image: require('../../assets/images/we_are_all_stars/sanctuary_star.png'), isUnlocked: true, isSecret: false }, // Test için açık
  { id: 'a2', name: 'Reminiscence Star', image: require('../../assets/images/we_are_all_stars/reminiscence_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a3', name: 'Meteor Shower', image: require('../../assets/images/we_are_all_stars/meteor_shower.png'), isUnlocked: false, isSecret: false },
  { id: 'a4', name: 'Mirrorlight Star', image: require('../../assets/images/we_are_all_stars/mirrorlight_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a5', name: 'Nightlight Star', image: require('../../assets/images/we_are_all_stars/nightlight_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a6', name: 'Wishing Star', image: require('../../assets/images/we_are_all_stars/wishing_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a7', name: 'Wayfinder Star', image: require('../../assets/images/we_are_all_stars/wayfinder_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a8', name: 'Fable Star', image: require('../../assets/images/we_are_all_stars/fable_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a9', name: 'Bounty Star', image: require('../../assets/images/we_are_all_stars/bounty_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a10', name: 'Life-bearing Star', image: require('../../assets/images/we_are_all_stars/life_bearing_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a11', name: 'Halo Star', image: require('../../assets/images/we_are_all_stars/halo_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a12', name: 'Melody Star', image: require('../../assets/images/we_are_all_stars/melody_star.png'), isUnlocked: false, isSecret: false },
  { id: 'a_secret', name: 'Dreamcatcher Star', image: require('../../assets/images/we_are_all_stars/dreamcatcher_star.png'), isUnlocked: false, isSecret: true },
];

export default function CollectionScreen() {
  const seriler = [
    { id: 1, isim: "NYOTA'S FLUFFY LIFE", kutuResmi: require('../../assets/images/fluffy_life/box.png'), figurler: FLUFFY_LIFE_FIGURLERI },
    { id: 2, isim: "GROWING UP BY YOUR WAY", kutuResmi: require('../../assets/images/growing_up_by_your_way/box.png'), figurler: GROWING_UP_FIGURLERI },
    { id: 3, isim: "I AM THE SEASONS", kutuResmi: require('../../assets/images/i_am_the_seasons/box.png'), figurler: SEASONS_FIGURLERI },
    { id: 4, isim: "WE ARE ALL STARS", kutuResmi: require('../../assets/images/we_are_all_stars/box.png'), figurler: ALL_STARS_FIGURLERI },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.mainTitle}>Nyota</Text>
      <Text style={styles.subTitle}>made by Elif Ceren</Text>

      <View style={styles.dolapGovdesi}>
        {seriler.map((seri) => (
          <View key={seri.id} style={styles.seriKonteyner}>
            <Text style={styles.seriEtiket}>{seri.isim}</Text>
            
            <View style={styles.vitrinHatti}>
              
              {/* KUTU AFİŞ ALANI */}
              <View style={styles.kutuAfishani}>
                {seri.kutuResmi ? (
                  <Image source={seri.kutuResmi} style={styles.kutuGorseli} />
                ) : (
                  <Text style={styles.kutuPlaceholderText}>SERİ{'\n'}BOX</Text>
                )}
              </View>

              {/* FİGÜR RAFI */}
              <ScrollView 
                horizontal={true} 
                style={styles.rafIcAlani} 
                showsHorizontalScrollIndicator={false}
              >
                {seri.figurler.map((figur) => (
                  <View key={figur.id} style={styles.nyotaOdacik}>
                    
                    <View style={styles.figurSergiAlani}>
                      {figur.isUnlocked && figur.image ? (
                        <Image source={figur.image} style={styles.nyotaGorseli} />
                      ) : (
                        <View style={[styles.kilitliSiluet, figur.isSecret && styles.secretKilitliBorder]}>
                          <HelpCircle size={24} color={figur.isSecret ? "rgba(255, 224, 123, 0.5)" : "rgba(255, 255, 255, 0.4)"} />
                        </View>
                      )}
                    </View>

                    <Text style={[styles.figuIsmi, figur.isSecret && styles.secretText]} numberOfLines={1}>
                      {figur.isUnlocked ? (figur.isSecret ? `✨ ${figur.name}` : figur.name) : (figur.isSecret ? '[SECRET]' : '???')}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.ahsapRafTahtasi} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E6',
    paddingHorizontal: 15,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#76B2E2',
    marginTop: 20,
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#AE8875',
    marginBottom: 25,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  dolapGovdesi: {
    backgroundColor: '#AE8875',
    borderRadius: 24,
    padding: 12,
    borderWidth: 4,
    borderColor: '#8B5A2B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 60,
  },
  seriKonteyner: {
    marginBottom: 25,
  },
  seriEtiket: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: 'rgba(74, 74, 74, 0.25)',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  vitrinHatti: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    padding: 10,
    alignItems: 'flex-end', 
  },
  kutuAfishani: {
    width: 80,
    height: 165,
    backgroundColor: '#F5C6C6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    marginRight: 12,
    overflow: 'hidden',
  },
  kutuGorseli: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  kutuPlaceholderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  rafIcAlani: {
    flex: 1,
    flexDirection: 'row',
  },
  nyotaOdacik: {
    width: 105, 
    height: 165, 
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  figurSergiAlani: {
    width: 100,
    height: 140, 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    overflow: 'hidden',
  },
  nyotaGorseli: {
    width: 115, 
    height: 200, 
    marginBottom: -54, 
    resizeMode: 'contain',
  },
  kilitliSiluet: {
    width: 65,
    height: 100, 
    backgroundColor: 'rgba(255, 255, 255, 0.12)', 
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  secretKilitliBorder: {
    borderColor: '#FFE07B',
    backgroundColor: 'rgba(254, 224, 123, 0.08)',
  },
  figuIsmi: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 6,
  },
  secretText: {
    color: '#FFE07B',
    fontWeight: '700',
  },
  ahsapRafTahtasi: {
    height: 16,
    backgroundColor: '#8B5A2B',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});