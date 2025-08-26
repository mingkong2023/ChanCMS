
// 无限极分类tree
export function tree(arr, pid = 0) {
  if(arr.length === 0){
    return []
  }
  let result = [];
  arr.forEach((item) => {
    if (item.pid === pid) {
      let children = tree(arr, item.id);
      if (children.length) {
        item.children = children;
      }
      item.level = 1;
      result.push(item);
    }
  });
  return result;
}

// 返回id父级所有栏目 位置
export function treeById(id, source) {
  const arr = [];
  const findId = (id, source) => {
    for (let i = 0, item; i < source.length; i++) {
      item = source[i];
      if (item.id == id) {
        arr.unshift(item);
        if (item.pid != 0) {
          findId(item.pid, source);
        }
      }
    }
  };
  findId(id, source);
  const _path = [];
  arr.forEach((item) => {
    _path.push("/" + item.pinyin);
    item.path = _path.join("");
  });
  return arr;
}