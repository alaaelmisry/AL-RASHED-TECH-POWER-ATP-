/************************************************
            ATP FLEET MANAGEMENT
                data.js
************************************************/


/*=================================================
                إعدادات النظام
=================================================*/

// كلمة مرور صفحة عرض المركبات
const PASSWORD = "1234";

// رقم المشرف الذي ستصل إليه رسالة واتساب
// يكتب بصيغة دولية بدون علامة +
const SUPERVISOR_PHONE = "9665XXXXXXXX";

// رابط Google Apps Script
// سيتم وضعه بعد نشر المشروع
const API_URL = "";

// اسم الشركة
const COMPANY_NAME = "شركة الراشد للتقنية والطاقة";

// اسم النظام
const SYSTEM_NAME = "ATP Fleet Management";


/*=================================================
            أنواع المركبات
=================================================*/

const VEHICLE_TYPES = {

    PRIVATE: "المركبات الصغيرة",

    TRUCKS: "رؤوس الشاحنات والقاطرات",

    EQUIPMENT: "المعدات الكبيرة والصغيرة"

};


/*=================================================
            حالات المركبات
=================================================*/

const VEHICLE_STATUS = {

    WORKING: "working",

    STOPPED: "stopped"

};


/*=================================================
        إنشاء رقم طلب تلقائي
=================================================*/

function generateRequestId(){

    const now = new Date();

    const yyyy = now.getFullYear();

    const mm = String(now.getMonth()+1).padStart(2,"0");

    const dd = String(now.getDate()).padStart(2,"0");

    const hh = String(now.getHours()).padStart(2,"0");

    const mi = String(now.getMinutes()).padStart(2,"0");

    const ss = String(now.getSeconds()).padStart(2,"0");

    return `ATP-${yyyy}${mm}${dd}-${hh}${mi}${ss}`;

}

/*=================================================
            إنشاء كائن مركبة
=================================================*/

function createVehicle(id, type, number, driver){

    return{

        id:id,

        type:type,

        number:number,

        driver:driver,

        status:"working",

        notes:"",

        lastUpdate:"",

        requestId:"",

        approved:true,

        approvedBy:"",

        approvedAt:""

    };

}


/*=================================================
                بيانات المركبات
=================================================*/

const vehicles = [

/*=================================================
        بيانات المركبات
=================================================*/

const vehicles = [

/*=================================================
        المركبات الصغيرة
=================================================*/

const privateVehicles = [

createVehicle(1,"PRIVATE","7983","ALAA"),
createVehicle(2,"PRIVATE","2175","AYMAN"),
createVehicle(3,"PRIVATE","2181","TARIQ"),
createVehicle(4,"PRIVATE","9306","AMMAR"),
createVehicle(5,"PRIVATE","9311","ARGY"),
createVehicle(6,"PRIVATE","9520","MOSTFA"),
createVehicle(7,"PRIVATE","9521","SHBAZ"),
createVehicle(8,"PRIVATE","6163","OKAIRY"),
createVehicle(9,"PRIVATE","6167","KHODAIR"),
createVehicle(10,"PRIVATE","2190","WAGHAT"),
createVehicle(11,"PRIVATE","2204","SAJJAD"),
createVehicle(12,"PRIVATE","2141","ALADIN"),
createVehicle(13,"PRIVATE","2199","REDA"),
createVehicle(14,"PRIVATE","4682","JACOUB"),
createVehicle(15,"PRIVATE","4683","ZESHAN"),
createVehicle(16,"PRIVATE","4688","ZESHAN"),
createVehicle(17,"PRIVATE","4685","WAQAS"),
createVehicle(18,"PRIVATE","5383","MUDATHR"),
createVehicle(19,"PRIVATE","6102","ADLY"),
createVehicle(20,"PRIVATE","7843","FARES"),
createVehicle(21,"PRIVATE","8191","ARFA"),
createVehicle(22,"PRIVATE","4284","GAZALY")

];

/*=================================================
        رؤوس الشاحنات والقاطرات
=================================================*/

const truckVehicles = [

createVehicle(23,"TRUCKS","4552","RAFIQ"),
createVehicle(24,"TRUCKS","4553","SAHBAZ"),
createVehicle(25,"TRUCKS","4554","ADHAM"),
createVehicle(26,"TRUCKS","4556","BAKR"),
createVehicle(27,"TRUCKS","4557","ZIA UR"),
createVehicle(28,"TRUCKS","4558","RADI"),
createVehicle(29,"TRUCKS","4559","RAMDAN"),
createVehicle(30,"TRUCKS","2924","NO DRIVER"),
createVehicle(31,"TRUCKS","2932","MUDATHER"),
createVehicle(32,"TRUCKS","2950","NO DRIVER"),
createVehicle(33,"TRUCKS","4676","LAKBA"),
createVehicle(34,"TRUCKS","4677","SAMI"),
createVehicle(35,"TRUCKS","2062","SHEVNDR"),
createVehicle(36,"TRUCKS","2087","KISHOR"),
createVehicle(37,"TRUCKS","6031","MENA"),
createVehicle(38,"TRUCKS","6032","NO DRIVER"),
createVehicle(39,"TRUCKS","6033","SAFIL"),
createVehicle(40,"TRUCKS","3162","NO DRIVER")

];

/*=================================================
        المعدات الكبيرة والصغيرة
=================================================*/

const equipmentVehicles = [

createVehicle(41,"EQUIPMENT","1817","PADAM"),
createVehicle(42,"EQUIPMENT","2400","ADHAM"),
createVehicle(43,"EQUIPMENT","6219","RAM KUMAR"),
createVehicle(44,"EQUIPMENT","6900","PAPUSH"),
createVehicle(45,"EQUIPMENT","7470","OTHMAN"),
createVehicle(46,"EQUIPMENT","9956","ZOHIB"),
createVehicle(47,"EQUIPMENT","7772","NO OPERATOR"),
createVehicle(48,"EQUIPMENT","1384","SUNIL"),
createVehicle(49,"EQUIPMENT","HITACHI","MANSOR"),
createVehicle(50,"EQUIPMENT","7674","KHUSIRAM"),
createVehicle(51,"EQUIPMENT","GCB1","GULAM F"),
createVehicle(52,"EQUIPMENT","GCB2","NO OPERATOR"),
createVehicle(53,"EQUIPMENT","1182","RAJA"),
createVehicle(54,"EQUIPMENT","6023","NO OPERATOR"),
createVehicle(55,"EQUIPMENT","FORKLIFT","NOUR"),
createVehicle(56,"EQUIPMENT","BOBCAT","OTHMAN"),
createVehicle(57,"EQUIPMENT","BOMAG1","LALBABU"),
createVehicle(58,"EQUIPMENT","BOMAG2","LUQMAN")

];

/*=================================================
        جميع المركبات
=================================================*/

const vehicles = [

    ...privateVehicles,

    ...truckVehicles,

    ...equipmentVehicles

];

  
