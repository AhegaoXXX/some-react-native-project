import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Animated, FlatList, useWindowDimensions, ActivityIndicator, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const { width } = useWindowDimensions();
  const [animation, setAnimation] = useState(new Animated.Value(0))
  const colorInterpolation = animation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    outputRange: ["rgb(255, 0, 0)", "rgb(255, 165, 0)", "rgb(255, 255, 0)", "rgb(0, 128, 0)", "rgb(0, 0, 255)", "rgb(75, 0, 130)", "rgb(238, 130, 238)", "rgb(75, 0, 130)", "rgb(0, 0, 255)", "rgb(0, 128, 0)", "rgb(255, 255, 0)"]
  })
  const fontInterpolation = animation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
    outputRange: [40, 45, 50, 55, 60, 65, 60, 55, 50, 45, 40],
  })
  const animatedStyle = {
    color: colorInterpolation,
    fontSize: fontInterpolation,
  }

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 4,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 10,
        duration: 3000,
        useNativeDriver: false
      }),
      { iterations: Infinity },
    ).start();
  }, []);

  return (
    <View>
      <View style={styles.main}>
        <Animated.Text style={{
          ...styles.mainTitle, ...animatedStyle,

        }}>
          Deep Dark Fantasies
        </Animated.Text>
        <View style={styles.blockPreview}>
          <Text style={styles.blockPreviewText}>Dungeon Master</Text>
          <Image
            source={{
              uri: 'https://i1.sndcdn.com/avatars-000411292317-dt2f28-t500x500.jpg',
            }}
            style={{
              width: 200, height: 200,
            }}
          />
        </View>
        <TextInput
          style={{
            height: 40,
            width: 220,
            borderColor: 'gray',
            borderWidth: 1,
            paddingLeft: 10,
          }}
          placeholder="Type your credit card"
          placeholderTextColor="gray"
        />

          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <StatusBar backgroundColor="black" style='light' />
      </View >
      </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  mainTitle: {
    fontSize: 40,
  },
  blockPreview: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  blockPreviewText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
