const url = "https://api.tvmaze.com/shows/82/episodes";
const select = document.querySelector("#list");
const container = document.querySelector("#container");
const search = document.querySelector("#search");
function showCards(list) {
  list.map((item) => {
    const name = item.name;
    const h3 = document.createElement("h3");
    h3.append(name);
    document.body.appendChild(h3);
    const image = item.image;
    const img = document.createElement("img");
    img.src = image.medium;
    document.body.appendChild(img);
    img.classList.add("img");
    const summary = item.summary;
    const summaryText=summary.substring(3,summary.length-4)
    const p = document.createElement("p");
    p.append(summary);
    const links = item.url;
    const a = document.createElement("a");
    a.append(links);
    a.innerText = "Play";
    a.href = links;
    const section = document.createElement("section");
    section.append(h3, img, a);
    container.append(section);
    // container.append(p);
    section.append(p);
    p.classList.add("summary");
    img.title="Summary of this episode :"+summaryText;
    section.classList.add("border");
  });
}
function handelLinks(list) {
  img.addEventListener("click", () => {});
}
function handelSelect(list) {
  select.addEventListener("change", () => {
    if (select.value === "All Episodes") {
      container.innerText = "";
      showCards(list);
    } else {
      const selectMoive = list.filter(
        (element) => element.name === select.value
      );
      console.log(selectMoive);
      container.innerText = "";
      showCards(selectMoive);
    }
  });
}
function handelSearch(list) {
  search.addEventListener("input", (event) => {
    console.log(event.target);
    const searchMoives = list.filter((element) =>
      element.name.includes(event.target.value)
    );
    container.innerText = "";
    showCards(searchMoives);
  });
}
const getData = () => {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      const list = jsonData;
      showCards(list);
      for (const element of list) {
        const option = document.createElement("option");
        option.textContent = element.name;
        select.append(option);
      }

      handelSelect(list);
      handelSearch(list);
    });

};
getData();
