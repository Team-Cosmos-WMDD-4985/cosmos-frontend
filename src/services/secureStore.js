import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}


async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    console.log("token is ", result)
    if (result) {
        return result;
    } else {
        return null
    }
}


export default {
    save,
    getValueFor
}