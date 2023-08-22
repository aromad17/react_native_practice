import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from "@expo/vector-icons";
import { Asset } from 'expo-asset';

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font));

const loadImages = (images) => images.map(image => {
  if (typeof image === "string") {
    return Image.prefetch(image);
  } else {
    return Asset.loadAsync(image);
  }
}
);

export default function App() {

  const [ready, setReady] = useState(false);

  const onFinish = () => {
    setReady(true);
  }

  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([require("./me.jpeg"), "https://velog.velcdn.com/images/aromad17/post/04414d6d-0909-4260-aed7-bdba7274235a/image.jpeg"]);
    console.log(fonts);
    console.log(images);
    // await Font.loadAsync(Ionicons.font);
    // await Asset.loadAsync(require('./me.jpeg'));
    // await Image.prefetch("https://velog.velcdn.com/images/aromad17/post/04414d6d-0909-4260-aed7-bdba7274235a/image.jpeg");
    await Promise.all([...fonts, ...images])
  };


  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return <Text>we are done loading.</Text>

}

