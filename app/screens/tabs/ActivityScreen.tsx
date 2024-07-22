import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useState} from "react";
import Activity from "../../interfaces/Activity";
import ActivityCard from "../../components/ActivityCard";

const ActivityScreen = () => {

    const [activities, setActivities] = useState<Activity[]>([
        {
            startLocation: 'Panadura',
            destinationLocation: 'Maharagama',
            startTime: '10:00 AM',
            endTime: '11:00 AM',
            date: '2024-07-11',
            duration: 45,
            busNumber: 'TD102'
        },
    ]);

    return (
        <SafeAreaView className='flex-1 bg-background px-4'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {activities ?
                    activities.map((activity, index) => (
                        <ActivityCard
                            key={index}
                            startLocation={activity.startLocation}
                            destinationLocation={activity.destinationLocation}
                            startTime={activity.startTime}
                            endTime={activity.endTime}
                            date={activity.date}
                            duration={activity.duration}
                            busNumber={activity.busNumber}
                        />
                    ))

                    :

                    <View className='flex-1 justify-center items-center'>
                        <Text>No Activities.</Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default ActivityScreen;
