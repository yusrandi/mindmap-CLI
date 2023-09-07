import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';

const usersCollection = firestore().collection('users');
const gamesCollection = firestore().collection('games');
const historiesCollection = firestore().collection('histories');

export {usersCollection, gamesCollection, historiesCollection}