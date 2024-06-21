// ImageSlider.js
import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import { styled } from 'nativewind';

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
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <View className="flex-1 items-center justify-center mb-4">
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false} // Disable manual scrolling
                className="w-full h-full"
            >
                {images.map((image, index) => (
                    <View key={index} className="w-screen h-full">
                        <Image source={image} className="w-full h-full" />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default styled(ImageSlider);
