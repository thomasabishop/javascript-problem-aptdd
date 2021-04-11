Below I have outlined my approach to Question Three, using the test case, and where I ran into difficulty.

Create a multidimensional array, that has each interval grouped by the worker:

```
const workers = lib.retrieveInputData('./data/test-data.txt', 'utf-8');

// Text wrangling, to extract the intervals cleanly:
let multiDimensionArr = workers.map((x) => x.replace(/(\d@)|\s/g, ''));
multiDimensionArr = multiDimensionArr.map((x) => x.replace(/[\[\]']+/g, ''));
multiDimensionArr = multiDimensionArr.map((x) => x.split(','));
``` 

Then use earlier function to partition the date strings into objects with the keys `start/end`. Also convert into JS Date instances:

```
multiDimensionArr = multiDimensionArr.map((x) =>
  x.map((y) => lib.partitionIntervals(y))
);
```

This gives us:
```
[S
  [
    { start: 2020-01-01T02:45:00.000Z, end: 2020-01-01T04:30:00.000Z },
    { start: 2020-01-01T00:15:00.000Z, end: 2020-01-01T02:00:00.000Z }
  ],
  [
    { start: 2020-01-01T04:15:00.000Z, end: 2020-01-01T04:30:00.000Z },
    { start: 2020-01-01T00:15:00.000Z, end: 2020-01-01T01:30:00.000Z },
    { start: 2020-01-01T02:00:00.000Z, end: 2020-01-01T03:30:00.000Z }
  ],
  [
    { start: 2020-01-01T02:00:00.000Z, end: 2020-01-01T03:30:00.000Z },
    { start: 2020-01-01T04:00:00.000Z, end: 2020-01-01T04:45:00.000Z },
    { start: 2020-01-01T00:45:00.000Z, end: 2020-01-01T01:15:00.000Z }
  ]
]
```

The next part was the Achilles heel for me. I needed a way to compare each interval with every other interval in each sub array.
For example, say we have: `[[A, B], [C, D, E], [F, G]]`

I would want to be able to execute a function on each of the following pairs:
`A/C, A/D, A/E, A/F, A,G, B/C, B/D...`

And so one, in a recursive  fashion till each had been compared.

This function would be a test for overlap. I was planning to use the [moment-range](https://github.com/rotaready/moment-range) library to create range pairs and then use the `overlap()` method to first identify the overlap and then merge the overlaps with `intersect()`.
The problem wasn't the function, it was the data structure and how to loop through a multi-dimensional array. 

I was able to write a function that achieved the above for a one-dimensional array. For example, for an array `[A, B, C, D]`, create sub-arrays of `[A/B, A/C, A/D, B/C, B/D, C/D]`. This is the function:
```

function seekOverlaps(arr) {
  const overlapStore = [];
  const determineOverlaps = function () {
    for (let i = 0; i < arr.length; i++) {
      let running = arr.length - i;
      if (running === 1) {
        arr.shift();
        break;
      }
      overlapStore.push({
        intersection: [arr[0].intersect(arr[i + 1])],
      });
    }
    return arr;
  };
  while (arr.length > 1) {
    determineOverlaps(arr);
  }
  return overlapStore;
}
```

Another approach I considered, which is hackish, was to find the intersecting intervals, abstracted from the specific worker,and then filter the multidimensional array against the intervals for matches. But this gave me no way to be sure that I wasn't counting the same worker twice. I think this is where a hashmap would be useful. But I am not familiar in practice with this and was unable to apply it.