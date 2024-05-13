import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';

const usersCollection = firestore().collection('users');
const gamesCollection = firestore().collection('games');
const historiesCollection = firestore().collection('histories');
const usersDatabaseRef = database().ref('users');
const historiesDatabaseRef = database().ref('histories');
const gamesDatabaseRef = database().ref('games');
const materisDatabaseRef = database().ref('materis');

export {usersCollection, gamesCollection, historiesCollection, usersDatabaseRef, historiesDatabaseRef, gamesDatabaseRef, materisDatabaseRef}