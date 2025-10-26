const addTicketBtn = document.querySelector(".addTicket-btn");
const addTicketForm = document.querySelector(".addTicket-form");
const list = document.querySelector('.list');
const searchArea = document.querySelector(".search-area");
const allInput = document.querySelectorAll('input');        //一次選取全部 input

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


//  -----Model層-----
let data = [];
const api = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json';
async function getBackendData() {
    try {
        const response = await axios.get(api)
            data = response.data;
            renderData(data);
            renderChart(getChartData(data));            
    } 
    catch (error) {
        console.error(`getBackendDataAPI error: ${error.message}`)
    }
}
getBackendData();

const cityData = [
    "基隆","台北","新北","桃園","新竹","苗栗","台中","南投","彰化",
    "雲林","嘉義","台南","高雄","屏東","台東","花蓮","宜蘭","澎湖","金門","連江"
];


//Model層-新增資料
function addData(arrData) { 
    arrData.push({
        id: Date.now(),
        name: ticketName.value,
        imgUrl: ticketImgUrl.value,
        area: ticketRegion.value,
        description: ticketDescription.value,
        group: ticketNum.value,
        price: ticketPrice.value,
        rate: ticketRate.value
    });
};

//Model層-篩選資料
let filterData = [];
function getFilterData(regionSearchValue) {
    filterData = data.filter((item) => regionSearchValue === item.area);
};

//Model層-刪除資料
function removeData(id) { 
    const indexData = data.findIndex(item => item.id === id);
    if (indexData === -1) return false;
    data.splice(indexData, 1);
};

//Model層-處理 chart 資料
function getChartData(data) { 
    const totalObj = {};
    data.forEach( item =>{
        if (totalObj[item.area] === undefined) {
            totalObj[item.area] = 1;
        }else{
            totalObj[item.area] += 1 
        }
    })
    return Object.entries(totalObj);
}


//  ------View層------
//View層-渲染 option
function renderOption(selectClass, textContent) {
    selectClass.innerHTML = `<option value="" disabled selected hidden>${textContent}</option>`;

    if (selectClass === regionSearch) {     //若為 搜尋欄 (regionSearch) 要多添加 全部地區
    selectClass.innerHTML = `
    <option value="" disabled selected hidden>${textContent}</option>
    <option value="全部地區">全部地區</option>
    `};

    cityData.forEach(item =>{
        selectClass.innerHTML += `<option value="${item}">${item}</option>`;
    });
};

//View層-渲染資料
function renderData(arrData) {
    //清空舊的 data
    clearBeforeValue();
    searchResultText.textContent = `本次搜尋共 ${arrData.length} 筆資料`;

    if (arrData.length === 0) {
        cantFindArea.style.display = "block";
        return;
    }

    let forEachData = '';       //先把得到的資料存在這裡
    //渲染 ticketCard
    arrData.forEach((item) => {
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
        <button type="button" data-id="${item.id}" class="delBtn">刪除</button type="button">
    </div>
    </li>
    `;
});
cantFindArea.style.display = "none";
list.innerHTML = forEachData;
};

//View層-清除上一筆輸入的資料
function clearBeforeValue() {
    list.innerHTML = "";
    allInput.forEach((input) => (input.value = ""));
    ticketRegion.value = "";
    ticketRate.value = "";
    textarea.value = "";
};
renderOption(ticketRegion, "請選擇景點地區");  //渲染 option
renderOption(regionSearch, "地區搜尋");  //渲染 option

//View層-篩選 "地區搜尋" 當下的 value 資料，並 render
function updateViewAfterFilter(regionSearchValue,filterData) { 

    if (regionSearchValue === "全部地區") {
        renderData(data);
        renderChart(getChartData(data));
        return;
    }
    if (filterData.length === 0){
        renderData(filterData);
        cantFindArea.style.display = 'block';
        return;
    }
    renderData(filterData); //若都符合，就 render filterData
};

//View層-更新刪除指定 資料 的畫面
function updateViewAfterDelete(currentRegion) { 
    if (!currentRegion || currentRegion === "" || currentRegion === "全部地區") {
        renderData(data);
        renderChart(getChartData(data));
        return;
    }
    // 重新套用 篩選資料
    const newFilter = data.filter((item) => item.area === currentRegion);
    if (newFilter.length === 0) {
        renderOption(regionSearch, "地區搜尋");
        renderData(newFilter)
        renderChart(getChartData(data));
        cantFindArea.style.display = "block";
        searchResultText.textContent = `本次搜尋共 ${newFilter.length} 筆資料`;
    } else {
        renderData(newFilter);
        renderChart(getChartData(data));
    }
};

//View層-渲染 chart 圖表
function renderChart(chartData) {
    const chart = c3.generate({
    data: {
        columns: chartData,      
        type : 'donut',
    },
    donut: { title: "地區" },
    size: { height: 250 },
    });
};


//  ------Controller層------
//Controller層-監聽 全部 input 改變事件 
allInput.forEach((input, index) =>{
    input.addEventListener("change", (e) => {
    if (e.target.value.trim() === "") {
        necessaryText[index].style.display = "block";   // 顯示提示文字
    } else {
        necessaryText[index].style.display = "none";      // 隱藏提示文字
    }
    });
});

//Controller層-監聽 地區欄位 (ticketRegion) 、 套票星級(ticketRate) 及 套票描述 (textarea) 改變事件 
function selectListener(element, spanClass) {
    element.addEventListener("change", (e) => {
        if (e.target.value.trim() === "") {
            spanClass.style.display = "block"; // 顯示提示文字
        } else {
            spanClass.style.display = "none"; // 隱藏提示文字
        }
    });
};
selectListener(ticketRegion, selectNecessaryText);
selectListener(ticketRate, betweenNecessaryText);
selectListener(ticketDescription, textareaNecessaryText);

//Controller層-新增按鈕 及 送出前檢查所有欄位
addTicketBtn.addEventListener("click", (e) => {
    e.preventDefault(); // 若 form 有 action，避免自動刷新頁面(移除掉 預設行為)

    //檢查 所有input 是否填寫正確
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
    renderChart(getChartData(data));
});

//Controller層-篩選 地區搜尋的符合資料
regionSearch.addEventListener('change', (e)=>{
    const regionSearchValue = e.target.value;
    
    getFilterData(regionSearchValue);
    updateViewAfterFilter(regionSearchValue,filterData);
});

//Controller層-刪除指定 資料
list.addEventListener('click', (e)=>{
    if(!e.target.classList.contains('delBtn')) return;      //防呆
    const id = Number(e.target.dataset.id); 
    removeData(id);

    // 刪除後，依目前篩選狀態重新 render
    const currentRegion = regionSearch.value;
    updateViewAfterDelete(currentRegion);
});


