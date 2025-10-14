let data = [
    {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
        "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
    },
    {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
        "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description:
        "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
    },
    {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
        "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
        "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
    },
];

const cityData = [
    { city: "基隆" },
    { city: "台北" },
    { city: "新北" },
    { city: "桃園" },
    { city: "新竹" },
    { city: "苗栗" },
    { city: "台中" },
    { city: "南投" },
    { city: "彰化" },
    { city: "雲林" },
    { city: "嘉義" },
    { city: "台南" },
    { city: "高雄" },
    { city: "屏東" },
    { city: "台東" },
    { city: "花蓮" },
    { city: "宜蘭" },
    { city: "澎湖" },
    { city: "金門" },
    { city: "連江" },
];

const addTicketBtn = document.querySelector(".addTicket-btn");
const addTicketForm = document.querySelector(".addTicket-form");
const list = document.querySelector('.list');
const allInput = document.querySelectorAll('input');        //一次選取全部 input
const searchArea = document.querySelector(".search-area");

//各欄位選取
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const textarea = document.querySelector("textarea");

//各必填欄選取
const necessaryText = document.querySelectorAll(".necessaryText");
const selectNecessaryText = document.querySelector(".selectNecessaryText");
const textareaNecessaryText = document.querySelector(".textareaNecessaryText");
const betweenNecessaryText = document.querySelector(".betweenNecessaryText");

//各搜尋區選取
const regionSearch = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");
const cantFindArea = document.querySelector(".cantFind-area");
const delBtn = document.querySelector(".delBtn");

//渲染 option
function renderOption(selectClass, textContent) {
    selectClass.innerHTML = `<option value="" disabled selected hidden>${textContent}</option>`;

    if (selectClass === regionSearch) {     //若為 搜尋欄 (regionSearch) 要多添加 全部地區
    selectClass.innerHTML = `
    <option value="" disabled selected hidden>${textContent}</option>
    <option value="全部地區">全部地區</option>
    `};

    cityData.forEach(item =>{
        selectClass.innerHTML += `
        <option value="${item.city}">${item.city}</option>
        `;
    });
}

// 渲染資料
function renderData(arrData) {
    //清空舊的 data
    clearBeforeValue();
    searchResultText.textContent = `本次搜尋共 ${arrData.length} 筆資料`;

    let forEachData = '';       //先把得到的資料存在這裡
    //渲染 ticketCard
    arrData.forEach((item, index) => {
        forEachData += `
    <li class="ticketCard">

    <div class="ticketCard-img">
        <a href="#">
        <img src="${item.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
    </div>

    <div class="ticketCard-content">
        <div>
            <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
        </h3>
        <p class="ticketCard-description">
            ${item.description}
        </p>
        </div>
        <div class="ticketCard-info">
        <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
        </p>
        </div>
        <button type="button" data-num="${item.id}" class="delBtn">刪除</button type="button">
    </div>
    </li>

        `;
    });
    cantFindArea.style.display = "none";
    list.innerHTML = forEachData;
};
renderData(data);
renderOption(ticketRegion, "請選擇景點地區");  //渲染 option
renderOption(regionSearch, "地區搜尋");  //渲染 option

//新增資料
function addData(arrData) { 
    arrData.push({
        id: data.length,
        name: ticketName.value,
        imgUrl: ticketImgUrl.value,
        area: ticketRegion.value,
        description: ticketDescription.value,
        group: ticketNum.value,
        price: ticketPrice.value,
        rate: ticketRate.value
    });
}

//清除上一筆輸入的資料
function clearBeforeValue() {
    list.innerHTML = "";
    allInput.forEach((input) => (input.value = ""));
    ticketRegion.value = "";
    ticketRate.value = "";
    textarea.value = "";
}

//監聽 全部 input 改變事件 
allInput.forEach((input, index) =>{
    input.addEventListener("change", (e) => {
    if (e.target.value.trim() === "") {
        necessaryText[index].style.display = "block";   // 顯示提示文字
    } else {
      necessaryText[index].style.display = "none";      // 隱藏提示文字
    }
    });
})

//監聽 地區欄位 (ticketRegion) 、 套票星級(ticketRate) 及 套票描述 (textarea) 改變事件 
function selectListener(element, spanClass) {
    element.addEventListener("change", (e) => {
        if (e.target.value.trim() === "") {
        spanClass.style.display = "block"; // 顯示提示文字
        } else {
        spanClass.style.display = "none"; // 隱藏提示文字
        }
    });
}
selectListener(ticketRegion, selectNecessaryText);
selectListener(ticketRate, betweenNecessaryText);
selectListener(ticketDescription, textareaNecessaryText);

//新增按鈕 及 送出前檢查所有欄位
addTicketBtn.addEventListener("click", (e) => {
e.preventDefault(); // 若 form 有 action，避免自動刷新頁面(移除掉 預設行為)

//檢查 所有input
let isWrite = true;     //先給 狀態 以便檢查到 未填寫 就終止 程式碼運行
allInput.forEach((input, index) => {
    if (input.value.trim() === "") {
        necessaryText[index].style.display = "block";
        isWrite= false;
    }else{
        necessaryText[index].style.display = "none";
    }
});

//檢查 地區欄位 (select) 、 套票星級(ticketRate) 及 套票描述 (textarea) 是否有填寫資料
function checkInput(element, spanClass) { 
    if (element.value.trim() === '') {
        spanClass.style.display = "block";
        isWrite = false;
    }else{
        spanClass.style.display = "none";
    }
}
checkInput(ticketRegion, selectNecessaryText);
checkInput(ticketRate, betweenNecessaryText);
checkInput(ticketDescription, textareaNecessaryText);

if (!isWrite) return alert('請填寫正確資料');   //若有未填寫 就終止程式碼運行 並跳出 '請填寫正確資料'

addData(data);
renderData(data);
});

let filterData = [];
//篩選 符合資料 ， 並 render 符合當下 value 的資料
regionSearch.addEventListener('change', (e)=>{
    filterData = data.filter((item) => e.target.value === item.area); //把符合的資料 篩選到 filterData
    
    if (e.target.value === "地區搜尋") return ;        
    if (e.target.value === "全部地區") {
        renderData(data);
        return;
    }else if (filterData.length === 0){
        renderData(filterData);
        cantFindArea.style.display = 'block';
        return;
    }
    
    renderData(filterData);     //若都符合，就 render filterData
});

//刪除指定 資料
list.addEventListener('click', (e)=>{
    const id = Number(e.target.dataset.num); 
    const indexInData = data.findIndex(item => item.id === id);

    if (indexInData === -1) return; // 沒找到就跳出
    data.splice(indexInData, 1);

    // 刪除後，依目前篩選狀態重新 render
    const currentRegion = regionSearch.value;

    if (!currentRegion || currentRegion === "" || currentRegion === "全部地區") {
        renderData(data);
    } else {
        // 重新套用篩選
        const newFilter = data.filter((item) => item.area === currentRegion);
        if (newFilter.length === 0) {
            clearBeforeValue();
            cantFindArea.style.display = "block";
            searchResultText.textContent = `本次搜尋共 ${newFilter.length} 筆資料`;
        } else {
            renderData(newFilter);
        }
    }
});


