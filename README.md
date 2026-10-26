# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Firebase items API

The app reads and writes item reports through the Express API in `../backend`.
The API stores records in the Firestore `items` collection.

1. Start the backend from the `backend` directory with `npm start`. It uses the
   Firebase service account file in that directory by default. Keep this
   credential private; the repository's root `.gitignore` excludes it. For a
   different credential location, set `FIREBASE_SERVICE_ACCOUNT_PATH` before
   starting the backend.
2. Set `EXPO_PUBLIC_API_URL` to the backend URL in `frontend/.env.local`, for
   example `EXPO_PUBLIC_API_URL=http://localhost:3000` for a local web client.
   For an Android emulator use `http://10.0.2.2:3000`; for a physical device use
   your computer's LAN IP address. The device and computer must be on the same
   network.
3. Start or restart Expo with `npx expo start` after changing the environment
   variable.

The backend defaults to port `3000`; set `PORT` to use another port.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
