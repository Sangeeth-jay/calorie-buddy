import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

const index = () => {
  return (
    <View className='w-full h-screen-safe flex-1 flex-col justify-center items-center gap-6'>
      <Text>index</Text>
      <Link href={"/(main-screens)/home"}>Home</Link>
      <Link href={"/(info-screens)/info-1"}>Info Screen</Link>
    </View>
  )
}

export default index