import * as firebase from 'firebase';

export const uploadImage = async (uri, imageName) =>{
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref =firebase.storage().ref().child('images/'+imageName);
    return ref.put(blob);

  } 