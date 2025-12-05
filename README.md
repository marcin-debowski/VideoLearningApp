# YouTube LEARN

Aplikacja mobilna z wyświetlaniem filmików. Zbudowana w React Native z Expo.

## 📱 Opis

YouTube LEARN to aplikacja, która umożliwia:

- Przeglądanie popularnych filmów edukacyjnych z YouTube
- Wyszukiwanie filmów po słowach kluczowych
- Odtwarzanie filmów z własnymi kontrolkami
- Sortowanie wyników według różnych kryteriów
- Tryb pełnoekranowy z automatyczną rotacją

## 🛠️ Technologie

- **React Native** - framework do budowy aplikacji mobilnych
- **Expo SDK 54** - platforma do rozwoju aplikacji React Native
- **TypeScript** - typowany JavaScript
- **React Navigation** - nawigacja w aplikacji
- **react-native-video** - odtwarzanie wideo
- **expo-screen-orientation** - zarządzanie orientacją ekranu
- **react-native-svg** - obsługa ikon SVG
- **Axios** - komunikacja z API

## 📋 Wymagania

- Node.js (v18 lub nowszy)
- npm lub yarn
- Android Studio z Android SDK (dla development build)
- Emulator Android lub fizyczne urządzenie z USB Debugging

## 🚀 Instalacja i uruchomienie

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/marcin-debowski/VideoLearningApp.git
cd VideoLearningApp
```

### 2. Zainstaluj zależności

```bash
npm install
```

### 3. Skonfiguruj zmienne środowiskowe

Utwórz plik `.env` w głównym katalogu projektu:

```env
EXPO_PUBLIC_YOUTUBE_API_KEY=twoj_klucz_api_youtube
```

> **Uwaga:** Aby uzyskać klucz API YouTube, przejdź do [Google Cloud Console](https://console.cloud.google.com/), utwórz projekt i włącz YouTube Data API v3.

### 4. Skonfiguruj Android Studio

Ustaw zmienne środowiskowe:

```powershell
# Windows PowerShell
$env:JAVA_HOME = "C:\sciezka\do\AndroidStudio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
```

### 5. Wygeneruj natywny projekt

```bash
npx expo prebuild
```

### 6. Uruchom aplikację

```bash
npx expo run:android
```

Aplikacja zostanie zbudowana i uruchomiona na emulatorze lub podłączonym urządzeniu.

> **Uwaga:** Aplikacja używa `react-native-video`, który wymaga natywnego buildu. Nie działa z Expo Go.

## 📱 Ekrany aplikacji

### LoginScreen

Ekran powitalny z logo aplikacji i przyciskiem logowania jako gość.

### HomeScreen

Główny ekran z listą popularnych filmów edukacyjnych. Możliwość sortowania wyników.

### SearchScreen

Ekran wyszukiwania filmów z YouTube.

### VideoPlayerScreen

Odtwarzacz wideo z:

- Kontrolkami play/pause
- Przewijaniem ±10 sekund
- Paskiem postępu
- Trybem pełnoekranowym
- Informacjami o filmie (tytuł, kanał, opis, statystyki)
- Zakładkami Details/Notes

## 📝 API

Aplikacja korzysta z **YouTube Data API v3** do pobierania:

- Listy popularnych filmów edukacyjnych
- Wyników wyszukiwania
- Szczegółów filmów

## 👤 Autor

**Marcin Dębowski**

- GitHub: [@marcin-debowski](https://github.com/marcin-debowski)
