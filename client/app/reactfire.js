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
        <Redirect firestore={database} />
        {children}
      </FirestoreProvider>
    </FirebaseAppProvider>
  )
}

const Redirect = () => {
  const {user} = useUser()
  const router = useRouter()
  const firestore = useFirestore()

  const checkAndRedirect = React.useCallback(async () => {
    if (!user?.primaryEmailAddress) {
      return
    }

    const userEmail = user.primaryEmailAddress.emailAddress
    const userCollectionRef = doc(firestore, 'users', userEmail)

    try {
      const docSnap = await getDoc(userCollectionRef)
      if (!docSnap.exists()) {
        // Collection does not exist, create it
        await setDoc(userCollectionRef, {authorized: false})
        router.push('/')
      } else {
        // Collection exists, check if authorized
        if (!docSnap.data().authorized) {
          router.push('/')
        }
      }
    } catch (error) {
      console.error('Error checking user authorization:', error)
      // Handle any errors, e.g., redirect or show a message
    }
    console.log('User is authorized')
  }, [user, router])

  React.useEffect(() => {
    checkAndRedirect()
  }, [user, router, checkAndRedirect])

  return null
}