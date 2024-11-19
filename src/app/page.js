'use client'
import Dropdown from "@/components/Dropdown";
import Viewarr from "@/components/Viewarr";
import { useEffect, useState } from "react";
import { PiTimer } from "react-icons/pi";
import { TbMailFast } from "react-icons/tb";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Home() {
  const [arr, setArr] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState('Select Algorithm');
  const [activateSort, setActivateSort] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    let temp = [];
    for (let i = 1; i <= 100; i++)
      temp.push(i * 2);
    setArr(temp);
  }, []);

  const shuffle = (myArr) => {
    // Fisher Yates shuffle algorithm
    let temp = [...myArr];
    for (let i = 99; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    setArr(temp);
  }

  async function bubbleSort(myArr) {
    const n = myArr.length;
    for (let i = 0; i < n; ++i) {
      let flag = true;
      for (let j = 1; j < n - i; j++) {
        if (myArr[j] < myArr[j - 1]) {
          [myArr[j - 1], myArr[j]] = [myArr[j], myArr[j - 1]];
          flag = false;
        }
        setArr([...myArr]);
        await new Promise(resolve => setTimeout(resolve, 3));
      }
      if (flag) break;
    }
  }

  async function insertionSort(myArr) {
    let n = myArr.length;
    for (let i = 1; i < n; i++) {
      let currentElement = myArr[i];
      let j = i - 1;

      while (j >= 0 && myArr[j] > currentElement) {
        myArr[j + 1] = myArr[j];
        setArr([...myArr])
        await new Promise(resolve => setTimeout(resolve, 3));
        j--;
      }

      myArr[j + 1] = currentElement;
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));
    }
  }

  async function selectionSort(myArr) {
    const n = myArr.length;
    for (let i = 0; i < n; ++i) {
      let mini = myArr[i];
      let minIdx = i;
      for (let j = i + 1; j < n; ++j) {
        if (myArr[j] < mini) {
          mini = myArr[j];
          minIdx = j;
        }
        setArr([...myArr]);
        await new Promise(resolve => setTimeout(resolve, 3));
      }

      [myArr[i], myArr[minIdx]] = [myArr[minIdx], myArr[i]];
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));
    }
  }

  async function merge(start, mid, end, myArr) {
    let i = start;
    let j = mid + 1;
    let k = 0;
    let temp = new Array(end - start + 1);

    while (i <= mid && j <= end) {
      if (myArr[i] > myArr[j])
        temp[k++] = myArr[j++];
      else
        temp[k++] = myArr[i++];
    }

    while (i <= mid)
      temp[k++] = myArr[i++];
    while (j <= end)
      temp[k++] = myArr[j++];

    for (let x = 0; x < (end - start + 1); ++x)
      myArr[start + x] = temp[x];

    setArr([...myArr])
    await new Promise(resolve => setTimeout(resolve, 3));
  }

  async function mergeSort(myArr, l, r) {
    if (l < r) {
      let mid = Math.floor((r - l) / 2) + l;
      await mergeSort(myArr, l, mid);
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));

      await mergeSort(myArr, mid + 1, r);
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));

      await merge(l, mid, r, myArr);
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));
    }
  }

  async function quickSort(myArr, low, high) {
    if (low < high) {
      const pivotIdx = await partition(myArr, low, high);
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));

      await quickSort(myArr, low, pivotIdx - 1);
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));

      await quickSort(myArr, pivotIdx + 1, high);
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));
    }
  }

  async function partition(myArr, low, high) {
    const pivot = myArr[high];
    let idx = low;

    for (let i = low; i < high; ++i) {
      if (myArr[i] < pivot) {
        [myArr[idx], myArr[i]] = [myArr[i], myArr[idx]];
        setArr([...myArr]);
        await new Promise(resolve => setTimeout(resolve, 3));
        idx++;
      }
    }

    [myArr[high], myArr[idx]] = [myArr[idx], myArr[high]];
    setArr([...myArr]);
    await new Promise(resolve => setTimeout(resolve, 3));
    return idx;
  }

  async function countSort(myArr) {
    let arrLength = 100;
    let maxElement = 201;
    let countArray = new Array(maxElement).fill(0);
    for (let i = 0; i < arrLength; i++) {
      countArray[myArr[i]]++;
    }

    let currSum = 0;
    for (let i = 0; i < maxElement; i++) {
      currSum += countArray[i];
      countArray[i] = currSum;
    }

    let tempArr = new Array(arrLength);
    for (let i = arrLength - 1; i >= 0; i--) {
      tempArr[--countArray[myArr[i]]] = myArr[i];
    }

    for (let i = 0; i < arrLength; i++) {
      myArr[i] = tempArr[i];
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));
    }
  }

  // Heapify function in JavaScript
  async function heapify(myArr, n, i) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    let largest = i;

    if (leftIdx < n && myArr[leftIdx] > myArr[largest]) {
      largest = leftIdx;
    }

    if (rightIdx < n && myArr[rightIdx] > myArr[largest]) {
      largest = rightIdx;
    }

    if (largest !== i) {
      [myArr[i], myArr[largest]] = [myArr[largest], myArr[i]];

      await heapify(myArr, n, largest);
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));
    }
  }

  // Build max-heap function
  async function buildHeap(myArr, n) {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(myArr, n, i);
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));
    }
  }

  // HeapSort function in JavaScript
  async function heapSort(myArr) {
    const n = myArr.length;
    await buildHeap(myArr, n);
    setArr([...myArr]);
    await new Promise(resolve => setTimeout(resolve, 3));

    for (let i = n - 1; i >= 0; i--) {
      [myArr[i], myArr[0]] = [myArr[0], myArr[i]];

      await buildHeap(myArr, i);
      setArr([...myArr]);
      await new Promise(resolve => setTimeout(resolve, 3));
    }
  }

  const sortFunc = async (myArr) => {
    setActivateSort(true);
    switch (selectedAlgo) {
      case "Select Algorithm":
        toast("Select an Algorithm Buddy 🫡.");
        setActivateSort(false);
        break;
      case "Insertion Sort":
        setStartTime(Date.now());
        await insertionSort(myArr);
        setActivateSort(false);
        setEndTime(Date.now());
        break;
      case "Selection Sort":
        setStartTime(Date.now());
        await selectionSort(myArr);
        setActivateSort(false);
        setEndTime(Date.now());
        break;
      case "Bubble Sort":
        setStartTime(Date.now());
        await bubbleSort(myArr);
        setActivateSort(false);
        setEndTime(Date.now());
        break;
      case "Merge Sort":
        setStartTime(Date.now());
        await mergeSort(myArr, 0, 99);
        setActivateSort(false);
        setEndTime(Date.now());
        break;
      case "Quick Sort":
        setStartTime(Date.now());
        await quickSort(myArr, 0, 99);
        setActivateSort(false);
        setEndTime(Date.now());
        break;
      case "Heap Sort":
        await heapSort(myArr);
        setActivateSort(false);
        setEndTime(Date.now());
        break;
      case "Count Sort":
        setStartTime(Date.now().toString());
        await countSort(myArr);
        setActivateSort(false);
        setEndTime(Date.now());
        break;
      default:
        break;
    }
  }

  return (
    <section className="flex flex-col items-center justify-between py-24">
      <h1 className="text-xl tracking-wider uppercase">Sorting Visualiser</h1>
      <div className="myContainer">
        <Viewarr arr={arr} />
        {!activateSort && <div className="flex flex-col justify-center items-center">
          <Dropdown selectedAlgo={selectedAlgo} setSelectedAlgo={setSelectedAlgo} />
          <div className="flex justify-center mt-4 flex gap-4">
            <button className="button-30" role="button" onClick={() => sortFunc(arr)}>Start</button>
            <button className="button-30" role="button" onClick={() => { shuffle(arr) }}>Shuffle</button>
          </div>
        </div>}
        <div className='mt-6'>
          {!activateSort ? <span>Time Consumed: {endTime - startTime} ms</span> :
            <PiTimer fontSize={29} />}
        </div>
      </div>
      <footer>
        <Link href='mailto:muditanand2003@gmail.com?subject=Feedback&body=Your%20feedback%20for%20sorting%20visualizer'>
          <div className="rounded px-2 py-1 border border-gray-500 border-2 flex gap-3 justify-center">
            <span className="text-xl">Feedback </span>
            <TbMailFast fontSize={31}/>
          </div>
        </Link>

        <p className="mt-7 text-gray-400">Developer &gt; &nbsp;<Link href="https://me-mudit-anand.vercel.app" className="text-orange-500">Mudit Anand</Link></p>
      </footer>
    </section>
  )
}
