import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
}


async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    
    if (result) {
        return JSON.parse(result);
    } else {
        return null
    }
}


export default {
    save,
    getValueFor
}