export function normalLizeInventory(arr) {
  console.log("arr",arr)
  var newArr = [];
  for(var i=0;i<arr.length;i++) {
    if (arr[i].good.length>0) {
      arr[i].good[0].id = arr[i].letter
      newArr = newArr.concat(arr[i].good)
    }
      
  }
  return newArr
}
