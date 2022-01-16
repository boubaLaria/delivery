export function formatDate(date) {
    date =  new Date(date)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' ;
    let jour = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1) 
    let mois = date.getDate()<10 ? '0'+date.getDate():date.getDate()
    return jour+ "/" + mois + "/" + date.getFullYear() + "  " + strTime;
  }