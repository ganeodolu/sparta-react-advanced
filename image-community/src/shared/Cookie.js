const makeExpiredDate = (day) => {  
  let date = new Date();
  date.setDate(date.getDate() + day);
  return date.toUTCString();
}

const Cookie = {
  set: (name, value, day = 5) => {
    document.cookie = `${name}=${value}; expires=${makeExpiredDate(day)}`;
  },
  get: (name) => {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts[1].split(';')[0]
    }
    console.log('해당 쿠키가 없습니다')
  },
  del: (name) => {
    document.cookie = `${name}=; expires=${makeExpiredDate(-1)}` 
  }
}

export default Cookie
