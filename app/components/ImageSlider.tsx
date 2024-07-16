import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
    require('../../assets/images/ad-1.png'),
    require('../../assets/images/ad-2.png'),
    require('../../assets/images/ad-3.png'),
    require('../../assets/images/ad-4.png'),
];

const ImageSlider = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollViewRef.current) {
                const newIndex = (currentIndex + 1) % images.length;
                scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true });
                setCurrentIndex(newIndex);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

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
                        <Image source={image} style={{ width: '100%', height: '100%' }} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ImageSlider;
