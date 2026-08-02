/************************************************
            ATP FLEET MANAGEMENT
                script.js
************************************************/


/*=================================================
                المتغيرات العامة
=================================================*/

let selectedVehicle = null;

let selectedStatus = "working";

let pendingRequest = null;

let apiReady = false;

const API_URL =
"https://script.google.com/macros/s/AKfycbz5Fi_yw8z-qHv5MFB1DP_LbB4LcPjwubPPVch9Nb8Opmnf-4RrX4hv8m51WrrnZyI9Gw/exec";
/*=================================================
                عناصر الصفحة
=================================================*/

const homePage =
document.getElementById("homePage");

const registerPage =
document.getElementById("registerPage");

const viewPage =
document.getElementById("viewPage");

const loadingScreen =
document.getElementById("loadingScreen");

const successMessage =
document.getElementById("successMessage");


const vehicleType =
document.getElementById("vehicleType");

const vehicleNumber =
document.getElementById("vehicleNumber");

const driverName =
document.getElementById("driverName");

const otherDriverName =
document.getElementById("otherDriverName");

const vehicleNotes =
document.getElementById("vehicleNotes");

const working =
document.getElementById("working");

const stopped =
document.getElementById("stopped");


/*=================================================
                تحميل الصفحة
=================================================*/

window.onload = function(){

    initializeSystem();

};


/*=================================================
            تهيئة النظام
=================================================*/

function initializeSystem(){

    updateDateTime();

    setInterval(updateDateTime,1000);

    registerEvents();

    renderVehicles();

    startAutoRefresh();

}

/*===============================================
                تسجيل الأحداث
================================================*/

function registerEvents(){

    vehicleType.addEventListener(

        "change",

        loadVehicleNumbers

    );


    vehicleNumber.addEventListener(

        "change",

        loadVehicleInformation

    );


    working.addEventListener(

        "click",

        () => {

            selectWorking();

        }

    );


    stopped.addEventListener(

        "click",

        () => {

            selectStopped();

        }

    );

}


/*===============================================
            اختيار حالة تعمل
================================================*/

function selectWorking(){

    selectedStatus = "working";

    working.classList.add("active");

    stopped.classList.remove("stop-active");

}


/*===============================================
            اختيار حالة متوقفة
================================================*/

function selectStopped(){

    selectedStatus = "stopped";

    stopped.classList.add("stop-active");

    working.classList.remove("active");

}

/*===============================================
            تحميل أرقام المركبات
================================================*/

function loadVehicleNumbers() {

    vehicleNumber.innerHTML =
        "<option value=''>اختر</option>";

    driverName.textContent = "---";

    selectedVehicle = null;

    const type = vehicleType.value;

    if (type === "") return;

    const list = vehicles.filter(vehicle =>
        vehicle.type === type
    );

    list.forEach(vehicle => {

        const option =
        document.createElement("option");

        option.value = vehicle.id;

        option.textContent = vehicle.number;

        vehicleNumber.appendChild(option);

    });

}


/*===============================================
            تحميل بيانات المركبة
================================================*/

function loadVehicleInformation() {

    const id = Number(vehicleNumber.value);

    if (!id) {

        selectedVehicle = null;

        driverName.textContent = "---";

        return;

    }

    selectedVehicle = vehicles.find(vehicle =>
        vehicle.id === id
    );

    if (!selectedVehicle) {

        driverName.textContent = "---";

        return;

    }

    driverName.textContent =
        selectedVehicle.driver;

    vehicleNotes.value =
        selectedVehicle.notes;

    if (selectedVehicle.status === "working") {

        selectWorking();

    } else {

        selectStopped();

    }

}

/*===============================================
        إنشاء طلب تحديث جديد
================================================*/

function createUpdateRequest() {

    if (!selectedVehicle) {

        alert("يرجى اختيار المركبة");

        return null;

    }

    const request = {

        id: generateRequestId(),

        vehicleId: selectedVehicle.id,

        vehicleType: selectedVehicle.type,

        vehicleNumber: selectedVehicle.number,

        currentDriver: selectedVehicle.driver,

        driver:

        otherDriverName.value.trim() ||

        selectedVehicle.driver,

        status: selectedStatus,

        notes: vehicleNotes.value.trim(),

        requestTime:

        new Date().toLocaleString("ar-SA"),

        approved: false,

        approvedBy: "",

        approvedTime: ""

    };

    return request;

}

/*===============================================
        حفظ الطلب وإرسال واتساب
================================================*/

/*===============================================
        حفظ الطلب ثم إرسال واتساب
================================================*/

async function saveAndSendReport() {

    if (!selectedVehicle) {

        alert("يرجى اختيار المركبة");

        return;

    }

    const request = createUpdateRequest();

    if (!request) return;

    const saved = await saveRequest(request);

    if (!saved){

        alert("تعذر حفظ الطلب");

        return;

    }

    pendingRequest = request;

    sendWhatsAppRequest(request);

}


/*===============================================
        إنشاء رسالة واتساب
================================================*/

function sendWhatsAppRequest(request) {

    const approvalLink =
        "approval.html?id=" + request.id;

    const message =

`طلب تحديث حالة مركبة

نوع المركبة:
${VEHICLE_TYPES[request.vehicleType]}

رقم المركبة:
${request.vehicleNumber}

السائق:
${request.driver}

الحالة المطلوبة:
${request.status === "working" ? "تعمل" : "متوقفة"}

الملاحظات:
${request.notes || "-"}

رابط اعتماد الطلب:

${approvalLink}`;

    const url =

"https://wa.me/" +

SUPERVISOR_PHONE +

"?text=" +

encodeURIComponent(message);

    window.open(url,"_blank");

}

/*===============================================
            حفظ الطلب في الخادم
================================================*/

async function saveRequest(request) {

    if (!API_URL) {

        console.warn("API_URL غير محدد");

        return false;

    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                action: "saveRequest",

                data: request

            })

        });

        const result = await response.json();

        return result.success === true;

    }

    catch(error){

        console.error(error);

        alert("تعذر الاتصال بالخادم");

        return false;

    }

}


/*===============================================
            إنشاء رابط الاعتماد
================================================*/

function buildApprovalLink(requestId){

    if(API_URL===""){

        return "";

    }

    return API_URL +

        "?action=approval&id=" +

        encodeURIComponent(requestId);

}



/*===============================================
        إنشاء رسالة واتساب
================================================*/

function buildWhatsAppMessage(request){

    const statusText =

        request.status==="working"

        ? "تعمل"

        : "متوقفة";


    return `طلب تحديث حالة مركبة

نوع المركبة:
${VEHICLE_TYPES[request.vehicleType]}

رقم المركبة:
${request.vehicleNumber}

السائق:
${request.driver}

الحالة المطلوبة:
${statusText}

الملاحظات:
${request.notes || "-"}

رابط الاعتماد:

${buildApprovalLink(request.id)}
`;

}
/*===============================================
            فتح واتساب
================================================*/

function sendWhatsAppRequest(request){

    const message =

        buildWhatsAppMessage(request);


    const whatsappUrl =

        "https://wa.me/" +

        SUPERVISOR_PHONE +

        "?text=" +

        encodeURIComponent(message);


    window.open(

        whatsappUrl,

        "_blank"

    );

}
/*===============================================
        تحميل بيانات المركبات من الخادم
================================================*/

async function loadVehiclesFromServer(){

    if(API_URL===""){

        return;

    }

    try{

        const response = await fetch(

            API_URL + "?action=getVehicles"

        );

        const result = await response.json();

        if(!result.success){

            return;

        }

        updateLocalVehicles(result.vehicles);

        renderVehicles();

    }

    catch(error){

        console.error(error);

    }

}
/*===============================================
        تحديث البيانات المحلية
================================================*/

function updateLocalVehicles(serverVehicles){

    serverVehicles.forEach(serverVehicle=>{

        const localVehicle =

        vehicles.find(v=>v.id===serverVehicle.id);

        if(!localVehicle){

            return;

        }

        localVehicle.driver =

            serverVehicle.driver;

        localVehicle.status =

            serverVehicle.status;

        localVehicle.notes =

            serverVehicle.notes;

        localVehicle.lastUpdate =

            serverVehicle.lastUpdate;

    });

}
/*===============================================
        تحديث تلقائي
================================================*/

function startAutoRefresh(){

    loadVehiclesFromServer();

    setInterval(()=>{

        loadVehiclesFromServer();

    },30000);

}

