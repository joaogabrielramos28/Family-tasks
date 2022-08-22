import storage from '@react-native-firebase/storage';
const uploadFile = async (uri: string, folder: string) => {
  const timeStamp = new Date().getTime();

  const fetchFile = await fetch(uri);
  const blob = await fetchFile.blob();
  const reference = storage().ref(`/${folder}/${timeStamp}`);

  await reference.put(blob);
  const getDownloadURL = await reference.getDownloadURL();

  return getDownloadURL;
};

export {uploadFile};
