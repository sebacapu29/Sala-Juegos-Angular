export class DateTimeHelper {

    static date:Date = new Date();;

    constructor(){
    }
    static getFechaYHora(){    
       return DateTimeHelper.date.toLocaleDateString() + " - "+ DateTimeHelper.date.toLocaleTimeString();
    }
}
