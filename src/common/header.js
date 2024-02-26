import React from 'react'
import { TouchableOpacity, Image, Text } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({iconUrl, dimension}) => {
  
  return (
    // <Text>Header</Text>
    <TouchableOpacity style={styles.btnContainer}>
      <Image 
        source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn