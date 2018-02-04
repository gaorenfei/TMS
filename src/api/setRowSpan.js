//表格合并功能
export default function setRowSpan(arr, key) {
  let i = 0;
  let max = arr.length;
  while (i < max) {
    let currIndex = i;
    let curr = arr[currIndex];
    let count = 1;
    while (i < max - 1 && arr[i + 1][key] === curr[key]) {
      arr[i + 1][key + "span"] = 0;
      count++;
      i++;
    }
    curr[key + "span"] = count;
    i++;
  }
}
