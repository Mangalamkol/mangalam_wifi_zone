import 'dart:async';
import 'dart:developer' as developer;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'firebase_options.dart';
import 'theme.dart';

// Screens
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'screens/coming_soon_screen.dart';
import 'screens/settings_screen.dart';
import 'screens/pdf_upload_screen.dart';
import 'screens/redeem_code_screen.dart';

void main() async {
  // Use runZonedGuarded to catch all errors, sync and async
  await runZonedGuarded(() async {
    WidgetsFlutterBinding.ensureInitialized();
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );

    // Catches errors reported by the Flutter framework
    FlutterError.onError = (FlutterErrorDetails details) {
      developer.log(
        'Flutter error caught',
        name: 'com.mangalam.app.fluttererror',
        error: details.exception,
        stackTrace: details.stack,
        level: 1000, // SEVERE
      );
    };

    // Catches all other Dart errors that are not caught by the Flutter framework
    PlatformDispatcher.instance.onError = (error, stack) {
      developer.log(
        'Platform error caught',
        name: 'com.mangalam.app.platformerror',
        error: error,
        stackTrace: stack,
        level: 1000, // SEVERE
      );
      return true; // Marks the error as handled.
    };

    runApp(
      ChangeNotifierProvider(
        create: (context) => ThemeProvider(),
        child: const MyApp(),
      ),
    );
  }, (error, stack) {
    // Catches errors that occur outside of the Flutter framework.
    developer.log(
      'Zone error caught',
      name: 'com.mangalam.app.zoneerror',
      error: error,
      stackTrace: stack,
      level: 1000, // SEVERE
    );
  });
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, child) {
        return MaterialApp.router(
          title: 'Flutter Modern App',
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode: themeProvider.themeMode,
          routerConfig: _router,
          builder: (context, child) {
            return MediaQuery(
              data: MediaQuery.of(context).copyWith(textScaler: TextScaler.linear(1.3)),
              child: child!,
            );
          },
        );
      },
    );
  }
}

final _router = GoRouter(
  routes: [
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
      redirect: (context, state) {
        final user = FirebaseAuth.instance.currentUser;
        if (user == null) {
          return '/login';
        }
        return null;
      },
    ),
    GoRoute(
      path: '/coming-soon',
      builder: (context, state) => const ComingSoonScreen(),
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => const SettingsScreen(),
    ),
    GoRoute(
      path: '/pdf-upload',
      builder: (context, state) => const PdfUploadScreen(),
    ),
    GoRoute(
      path: '/redeem-code',
      builder: (context, state) => const RedeemCodeScreen(),
    ),
  ],
);
