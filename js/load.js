const getSingleton = () => {
  let data;

  return (onSuccess, onError) => {
    if (data) {
      return onSuccess(data);
    }

    fetch('https://28.javascript.pages.academy/kekstagram/data')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Не получилось загрузить данные с сервера');
      })
      .then((res2) => {
        data = res2;
        onSuccess(res2);
      })
      .catch((err) => onError(err));
  };
};

const createLoader = getSingleton();

const sendData = (onSuccess, onError, body) =>
  fetch(
    'https://28.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    }
  )
    .then((res) => {
      if (res.ok) {
        onSuccess();
        return;
      }
      onError();
    })
    .catch(() => onError());

export { sendData, createLoader };
