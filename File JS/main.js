// Nama : M. Iqbal Rivaldi

// Proses Inisialisasi
const inputBook = document.querySelector('#inputBook');
const inputBookTitle = document.querySelector('#inputBookTitle');
const inputBookAuthor = document.querySelector('#inputBookAuthor');
const inputBookYear = document.querySelector('#inputBookYear');
const inputBookIsComplete = document.querySelector('#inputBookIsComplete');
const bookSubmit = document.querySelector('#bookSubmit');
const dataID = 'dataId';

// Proses Action Data
function templateArtikel(title, author, year, isComplete) {
  const book_item = document.createElement('article');
  book_item.classList.add('book_item');

  const judul = document.createElement('h3');
  judul.innerText = title;

  const penulis = document.createElement('p');
  penulis.innerText = author;

  const tahun = document.createElement('p');
  tahun.innerText = year;

  book_item.appendChild(judul);
  book_item.appendChild(penulis);
  book_item.appendChild(tahun);

  const action = document.createElement('div');
  action.classList.add('action');
  if (isComplete) {
    action.appendChild(tombolBelum());
    action.appendChild(tombolHapus());
    book_item.appendChild(action);
  } else {
    action.appendChild(tombolSelesai());
    action.appendChild(tombolHapus());
    book_item.appendChild(action);
  }
  return book_item;
}

function templateLoad(title, author, year, isComplete) {
  const book_item = document.createElement('article');
  book_item.classList.add('book_item');

  const judul = document.createElement('h3');
  judul.innerText = title;

  const penulis = document.createElement('p');
  penulis.innerText = 'Penulis: ' + author;

  const tahun = document.createElement('p');
  tahun.innerText = 'Tahun: ' + year;

  book_item.appendChild(judul);
  book_item.appendChild(penulis);
  book_item.appendChild(tahun);

  const action = document.createElement('div');
  action.classList.add('action');
  if (isComplete) {
    action.appendChild(tombolBelum());
    action.appendChild(tombolHapus());
    book_item.appendChild(action);
  } else {
    action.appendChild(tombolSelesai());
    action.appendChild(tombolHapus());
    book_item.appendChild(action);
  }
  return book_item;
}

function tombolSelesai() {
  return createButton('green', 'Selesai Kamu dibaca', function (event) {
    sudahBaca(event.target.parentElement.parentElement);
  });
}

function tombolBelum() {
  return createButton('green', 'Belum selesai Kamu Baca', function (event) {
    belumBaca(event.target.parentElement.parentElement);
  });
}

function tombolHapus() {
  return createButton('red', 'Hapus buku', function (event) {
    removeData(event.target.parentElement.parentElement);
  });
}

function removeData(parent) {
  const konfirmasi = confirm('Kamu Yakin Ingin Manghapus Data ini?');

  if (konfirmasi) {
    const posisiData = findIndex(parent[dataID]);
    data.splice(posisiData, 1);
    parent.remove();
    updateToStorage();
  } else {
    console.log('Proses Hapus Data Kamu Tidak Berhasil!');
  }
}

function sudahBaca(elemenData) {
  const title = elemenData.querySelector('.book_item > h3').innerText;
  const author = elemenData.querySelectorAll('.book_item > p')[0].innerText;
  const year = elemenData.querySelectorAll('.book_item > p')[1].innerText;
  const newData = templateArtikel(title, author, year, true);
  const datas = findData(elemenData[dataID]);

  datas.isComplete = true;
  newData[dataID] = datas.id;
  completeBookshelfList.append(newData);
  elemenData.remove();
  updateToStorage();
}

function belumBaca(elemenData) {
  const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  const title = elemenData.querySelector('.book_item > h3').innerText;
  const author = elemenData.querySelectorAll('.book_item > p')[0].innerText;
  const year = elemenData.querySelectorAll('.book_item > p')[1].innerText;
  const newData = templateArtikel(title, author, year, false);
  const datas = findData(elemenData[dataID]);

  datas.isComplete = false;
  newData[dataID] = datas.id;
  incompleteBookshelfList.append(newData);
  elemenData.remove();
  updateToStorage();
}

function createButton(buttonTypeClass, baca, eventListen) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.innerText = baca;
  button.addEventListener('click', function (event) {
    eventListen(event);
    event.stopPropagation();
  });
  return button;
}

function addData() {
  const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  const completeBookshelfList = document.getElementById('completeBookshelfList');

  const datas = templateArtikel(inputBookTitle.value, 'Penulis: ' + inputBookAuthor.value, 'Tahun: ' + inputBookYear.value, inputBookIsComplete.checked);
  const objekData = Objek(inputBookTitle.value, inputBookAuthor.value, inputBookYear.value, inputBookIsComplete.checked);
  datas[dataID] = objekData.id;
  data.push(objekData);
  if (inputBookIsComplete.checked) {
    completeBookshelfList.append(datas);
  } else {
    incompleteBookshelfList.append(datas);
  }
  updateToStorage();
}

function findDatabyTitle() {
  const searchBookTitle = document.querySelector('#searchBookTitle');
  const find = searchBookTitle.value.toLowerCase();
  const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  const childincomplete = incompleteBookshelfList.getElementsByTagName('article');

  for (let i = 0; i < childincomplete.length; i++) {
    const heading = childincomplete[i].getElementsByTagName('h3')[0];
    let textValue = heading.textContent || heading.innerText;
    if (textValue.toLowerCase().indexOf(find) > -1) {
      childincomplete[i].style.display = '';
    } else {
      childincomplete[i].style.display = 'none';
    }
  }
  const completeBookshelfList = document.getElementById('completeBookshelfList');
  const childcomplete = completeBookshelfList.getElementsByTagName('article');
  for (let i = 0; i < childcomplete.length; i++) {
    const heading = childcomplete[i].getElementsByTagName('h3')[0];
    let textValue = heading.textContent || heading.innerText;
    if (textValue.toLowerCase().indexOf(find) > -1) {
      childcomplete[i].style.display = '';
    } else {
      childcomplete[i].style.display = 'none';
    }
  }
}

function refreshData() {
  let incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  let completeBookshelfList = document.getElementById('completeBookshelfList');
  for (const datas of data) {
    const newData = templateLoad(datas.title, datas.author, datas.year, datas.isComplete);
    newData[dataID] = datas.id;
    if (datas.isComplete) {
      completeBookshelfList.append(newData);
    } else {
      incompleteBookshelfList.append(newData);
    }
  }
}

// Proses load Data
document.addEventListener('DOMContentLoaded', () => {
  const searchBook = document.querySelector('#searchBook');
  inputBook.addEventListener('submit', (event) => {
    event.preventDefault();
    addData();
  });
  searchBook.addEventListener('submit', (event) => {
    event.preventDefault();
    findDatabyTitle();
  });
  if (storageIfExist()) {
    loadDataStorage();
  }
});

document.addEventListener('dataSaved', () => {
  console.log('Data telah tersimpan');
});

document.addEventListener('loadData', () => {
  refreshData();
});

// Datanya
let data = [];
const KEY = 'BOOK';

function storageIfExist() {
  if (typeof Storage == undefined) {
    alert('Coba Cek Browser Kamu Yaa, Karena Tidak Mendukung Local Storage!');
    return false;
  }
  return true;
}

function saveData() {
  localStorage.setItem(KEY, JSON.stringify(data));
  document.dispatchEvent(new Event('dataSaved'));
}

function loadDataStorage() {
  let parseData = JSON.parse(localStorage.getItem(KEY));
  if (parseData !== null) {
    data = parseData;
  }
  document.dispatchEvent(new Event('loadData'));
}

function updateToStorage() {
  if (storageIfExist()) saveData();
}

function Objek(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

function findData(dataId) {
  for (const datas of data) {
    if (datas.id === dataId) {
      return datas;
    }
  }
  return null;
}

function findIndex(dataId) {
  let index = 0;
  for (const datas of data) {
    if (datas.id === dataId) return index;

    index++;
  }
  return -1;
}
