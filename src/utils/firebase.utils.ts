import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDLAZmFOsFa9xM2deh4yliieUqQsRu_11s',
  projectId: 'ligapadel-c9ca9',
  storageBucket: 'ligapadel-c9ca9.appspot.com',
  appId: '1:527838204984:web:b44e1551215301e92342cd',
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage };
