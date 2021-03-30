const arrayButton = document.getElementById('arr_submit');
const arrayInp = document.getElementById('array');
const sortButton = document.getElementById('start_sorting');
const startingArrayWin = document.getElementById('starting_array');
const sortedArrayWin = document.getElementById('sorted_array');
let array = [];

//Сonverting string from input to array. Space or comma separated values
function stringToArray (string) {
  
  let arr = [];
  let value = '';
  if (string !== '') {
    //added comma of space separated values to array
    for (let i = 0; i < string.length; i++) {
      if (string[i] !== ' ' && string[i] !== ',') {
        value += string[i];
      }

      if ((string[i] === ' ' || string[i] === ',' || i === (string.length - 1)) && value !== '')  {
      arr.push(value);
      value = '';
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (!isNaN(arr[i])) {
        arr[i] = Number(arr[i]);
      }
    }
  } else {
    arr = false;
  }
  return arr;  
}


//transfering input to array
arrayButton.addEventListener('click', () => {
  let string = arrayInp.value;
  array = [];
  console.log(stringToArray(string));
  array = stringToArray(string);
  if (array === false) {
    alert('Введите массив')
  } else {
  sortedArrayWin.innerHTML = "";
  arrToHTML(startingArrayWin, array)
  }
});

function arrToHTML (element, arr) {
  element.innerHTML = "";
  arr.forEach( (value) =>{
    let spanArr = document.createElement("SPAN");
    spanArr.textContent = `${value}`;
    const att = document.createAttribute("class");
    att.value = "element";
    spanArr.setAttributeNode(att);
    element.appendChild(spanArr);
  });
}

//filter



// sorting funtions declaration
function bubleSort(arr) {
  for (let i = 0, endI = arr.length - 1; i < endI; i++) {
  let wasSwap = false;
  for (let j = 0, endJ = endI - i; j < endJ; j++) {
      if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          wasSwap = true;
      }
  }
  if (!wasSwap) break;
}
return arr;
};
  

function quickSort(arr) {
  if (arr.length <2 ) return arr;
  
  let pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

function insertionSort(arr) {
  for (let i = 1, l = arr.length; i < l; i++) {
    const current = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > current) {
        arr[j] = arr[j - 1];
        j--;
    }
    arr[j] = current;
}
return arr;
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
  }
  return arr;
}



function mergeSort(arr) {
  if (!arr && !arr.length) {
    return null;
  }

  if (arr.length < 2) {
    return arr
  }

  let center = Math.floor(arr.length / 2);
  let arrLeft = arr.slice(0, center);
  let arrRight = arr.slice(center);
  return mergeSortedArr(mergeSort(arrLeft), mergeSort(arrRight));

}


//Действие кнопки "Выбрать и сортировать"
sortButton.addEventListener('click', () => {
  let sortedArr = [];
  sortedArr = [...array];
  console.log(sortedArr);
  sortedArr = chooseSort(sortedArr);
  arrToHTML(sortedArrayWin, sortedArr);
  
})



//subfunction for mergeSort function
function mergeSortedArr(arr1, arr2) {
  let Arr = [];
  while(arr1.length && arr2.length) {
    (arr1[0] < arr2[0]) ? Arr.push(arr1.shift()) : Arr.push(arr2.shift());
    
  }
  return [...Arr, ...arr1, ...arr2];
}


//function choosing sort method

function chooseSort(arr) {
  const sort = document.getElementById('sorting_method').value;
  switch (sort) {
    case "bubble_sort":
      return bubleSort(arr);
      break;
    case "quick_sort":
      return quickSort(arr);
      break;
    case "merge_sort":
      return mergeSort(arr);
      break;
    case "insert_sort":
      return insertionSort(arr);
      break;
    case "select_sort":
      return selectionSort(arr);
      break;
    default: 
    return bubleSort(arr);   
  }
}