const getSingleton = () => {
  let data;

  return (onSuccess, onError) => {
    if (data) {
      return onSuccess(data);
    }

    fetch('https://28.javascript.pages.academy/kekstagram/data')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Не получилось загрузить данные с сервера');
      })
      .then((response) => {
        data = response;
        onSuccess(response);
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
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onError();
    })
    .catch(() => onError());

export { sendData, createLoader };
