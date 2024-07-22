import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

const ImageSlider = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchAdImages = async () => {
            try {
                const snapshot = await firestore().collection('advertisements').get();
                const urls = snapshot.docs.map(doc => doc.data().url);
                setImages(urls);
            } catch (error) {
                console.log('Error fetching ad images: ', error);
            }
        };

        fetchAdImages();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollViewRef.current && images.length > 0) {
                const newIndex = (currentIndex + 1) % images.length;
                scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true });
                setCurrentIndex(newIndex);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, images]);

    return (
        <View className="mb-4">
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                className="w-full"
                style={{ height: 200 }}
            >
                {images.map((image, index) => (
                    <View key={index} style={{ width, height: 200 }}>
                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ImageSlider;
