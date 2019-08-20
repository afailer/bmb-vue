/**
 * Created by pangda on 2019/8/5.
 */
export const  deepclone = (obj) => {
  if(obj === null) {
    return null
  }
  if(
    typeof obj === 'number' ||
    typeof obj === 'string' ||
    typeof obj === 'boolean'
  ){
    return obj
  }

  if(Array.isArray(obj)){
    const newArr = []
    obj.forEach(item => {
      newArr.push(deepclone(item))
    })
    return newArr
  }

  if(typeof obj === 'object'){
    const newObj = {}
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      newObj[key] = deepclone(value)
    })
    return newObj;
  }
}
