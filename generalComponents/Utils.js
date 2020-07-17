import * as ImagePicker from 'expo-image-picker';



export const getDate = (date) => {
  const t_date = new Date(date);
  const year = t_date.getFullYear();
  const month = t_date.getMonth() + 1;
  const day = t_date.getDate();
  const res = `${year} - ${month} - ${day}`;
  return res;
};

export const getDateWithoutSpaces = (date) => {
  const dateString = getDate(date);
  const res = dateString.replace(/ /g,'');
  return res;
};




export const createHeader = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
};


export const openGallery = async(callBackFunction) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      callBackFunction({ uri: result.uri })
    }
  } catch (E) {
    console.log(E);
  }
}