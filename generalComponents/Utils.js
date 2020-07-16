import * as firebase from 'firebase';

export const uploadImage = async (uri, imageName) =>{
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref =firebase.storage().ref().child('images/'+imageName);
    return ref.put(blob);

  };

  export const getDate = (date) => {
    const t_date = new Date(date);
    const year = t_date.getFullYear();
    const month = t_date.getMonth() + 1;
    const day = t_date.getDate();
    const res = `${year} - ${month} - ${day}`;
    return res;
  };


  export const createHeader =  (token) =>{
    const headers = {
      'Authorization' : `Bearer ${token}`
  }
return headers;
  } 