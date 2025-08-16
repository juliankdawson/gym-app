import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Colors from 'src/components/colors';

interface WelcomeScreenProps {
  navigation: any;
}

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundDark }]}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.backgroundDark}
      />
      
      <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={[styles.appName, { color: colors.text }]}>FitnessApp Title</Text>
          <Text style={[styles.tagline, { color: colors.textMuted }]}>
            Subtitle
          </Text>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[styles.getStartedText, { color: Colors.dark.text }]}>
              Get Started
            </Text>
          </TouchableOpacity>
          
          <View style={styles.loginPrompt}>
            <Text style={[styles.loginText, { color: colors.textMuted }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.loginLink, { color: colors.text }]}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  hero: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 300,
    paddingTop: 200,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 32,
    fontWeight: '400',
  },
  ctaSection: {
    paddingBottom: 40,
  },
  getStartedButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 8,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: '600',
  },
});