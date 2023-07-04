const main = document.querySelector("main");

const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);

  const hour = time.getHours();
  const minutes = time.getMinutes();
  const second = time.getSeconds();
  if (hour > 0) return `${hour}시간 전`;
  else if (minutes > 0) return `${minutes}분 전`;
  else if (second >= 0) return `${second}초 전`;
  else "방금 전";
};

const renderData = (data) => {
  data.reverse().forEach(async (obj) => {
    const itemListDiv = document.createElement("div");
    itemListDiv.className = "items-list";

    const itemImgDiv = document.createElement("div");
    itemImgDiv.className = "item-list__img";

    const itemsImg = document.createElement("img");

    const res = await fetch(`/items/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    itemsImg.src = url;

    const itemInfoDiv = document.createElement("div");
    itemInfoDiv.className = "item-list__info";

    const infoTitleDiv = document.createElement("div");
    infoTitleDiv.className = "item-list__info-titleitem-list__info-title";
    infoTitleDiv.innerText = obj.title;

    const infoMetaDiv = document.createElement("div");
    infoMetaDiv.className = "item-list__info-meta";
    infoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

    const infoPirce = document.createElement("div");
    infoPirce.className = "item-list__info-price";
    infoPirce.innerText = obj.price;

    itemImgDiv.appendChild(itemsImg);
    itemInfoDiv.appendChild(infoTitleDiv);
    itemInfoDiv.appendChild(infoMetaDiv);
    itemInfoDiv.appendChild(infoPirce);

    itemListDiv.appendChild(itemImgDiv);
    itemListDiv.appendChild(itemInfoDiv);

    main.appendChild(itemListDiv);
  });
};

//get 요청은 body가 필요가 없습니다.
const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
