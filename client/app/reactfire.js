'use client'
import {FirebaseAppProvider, FirestoreProvider, useFirestore} from 'reactfire'
import {useUser} from '@clerk/nextjs'
import {doc, getDoc, setDoc} from 'firebase/firestore'
import {getFirestore} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'
import {useRouter} from 'next/navigation'
import React from 'react'

const firebaseConfig = {
    apiKey: "AIzaSyBUTvqStb7hoN_dXjCypFb3PdvkM1gD09E",
    authDomain: "sololeveling-90e43.firebaseapp.com",
    projectId: "sololeveling-90e43",
    storageBucket: "sololeveling-90e43.appspot.com",
    messagingSenderId: "1082696752923",
    appId: "1:1082696752923:web:74bf85f73928cde746fdbe",
    measurementId: "G-5MXWPE2TCZ"
  };
  
export default function FirebaseWrapper({children}) {
  const app = initializeApp(firebaseConfig)
  const database = getFirestore(app)
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirestoreProvider sdk={database}>
        {children}
      </FirestoreProvider>
    </FirebaseAppProvider>
  )
}

