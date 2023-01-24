const modalbtn = document.querySelector('.modal_submit');
const popupmodal = document.querySelector('.ModalPopUp');
const mainmodal = document.querySelector('.Modal1');
const closemodal = document.querySelector('.popupmodalclose');

modalbtn.addEventListener('click', function () {
  mainmodal.style.display = 'none';
  popupmodal.style.display = 'block';
});

closemodal.addEventListener('click', function () {
  mainmodal.style.display = 'none';
  popupmodal.style.display = 'none';
});

// Dfinity code
const domain = 'http://localhost:3000';
const lg = console.log;
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim().length === 0);

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  lg('----------== submit button clicked');
  const buttonId = document.activeElement.id;
  lg('buttonId:', buttonId, typeof buttonId);
  let outText = '';

  if (buttonId === 'get-metadata') {
    lg('--== get-metadata detected');
    const button = e.target.querySelector('#get-metadata');

    const nft_id = document.getElementById('nft_id').value.toString();
    lg('nft_id:', nft_id);
    if (isEmpty(nft_id)) {
      outText = 'input is empty';
    } else if (isNaN(nft_id)) {
      outText = 'input is not a number';
    } else {
      lg('input is valid');
      button.setAttribute('disabled', true);
      const input = Number(nft_id);
      lg('input:', input, typeof input);
      //const metadata_out = await test(input);
      const metadata_out = await getMetadata(input);
      outText = metadata_out.Ok;
      lg('metadata_out:', metadata_out, ', outText:', outText);
      button.removeAttribute('disabled');
    }
  } else if (buttonId === 'mint-nft') {
    lg('--== mint-nft detected');
    const button = e.target.querySelector('#mint-nft');
    const nft_metadata = document
      .getElementById('nft_metadata')
      .value.toString();
    lg('nft_metadata:', nft_metadata);

    const nft_to = document.getElementById('nft_to').value.toString();
    lg('nft_to:', nft_to);
    //const nft_to_principal = Principal.fromText(nft_to);
    //'hvnpv-7tz4x-urwpp-mtaw3-75xzo-v5mwr-b43ba-qgrtn-pc4kv-zy2dg-tqe';
    button.setAttribute('disabled', true);

    const out = await mintNftforall(nft_metadata, nft_to);
    button.removeAttribute('disabled');
  } else {
  }
  lg('outText:', outText);
  document.getElementById('metadata').innerText = outText;

  return false;
});

async function mintNftforall(nft_metadata, nft_to) {
  console.log(
    'mintNftforall(). nft_metadata:',
    nft_metadata,
    ', nft_to:',
    nft_to
  );
  const url = domain + '/ic/mintNftforall';
  const data = { content: nft_metadata, textone: nft_to };
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    //mode: 'cors'
  };
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        console.log('response', response);
        return response.text();
      })
      .then((data) => {
        console.log('data', data); //JSON.stringify(data)
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error.toString());
      });
  });
}

async function getMetadata(nft_id) {
  console.log('getMetadata() nft_id:', nft_id);
  const url = domain + '/ic/' + nft_id;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      //mode: 'cors'
    },
  };
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        resolve(text);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        reject(error);
      });
  });
}

async function test(nft_id) {
  console.log('test(). nft_id:', nft_id);
  const url = domain + '/ic/' + 'test';
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      //mode: 'cors'
    },
  };
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        resolve(text);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        reject(error);
      });
  });
}
