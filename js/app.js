let logout = document.querySelector(".sticky button");

logout.addEventListener("click", () => {
  localStorage.clear();
  document.location.replace("../pages/login.html");
});
token = localStorage.token;

if (!token) {
  document.location.replace("../pages/login.html");
}

function kutish(cb, delay) {
  let id;
  return function () {
    clearTimeout(id);
    id = setTimeout(() => cb(...arguments), delay);
  };
}

// let src = kutish((e) => {
//   let text = e.target.value.toLowerCase();
//   console.log(text);
//   text = text1;
// }, 300);

let search = document.querySelector(".search");
let grid = document.querySelector(".grid");
let number = document.querySelector(".number");
let newest = document.querySelector(".newest");

search.addEventListener("input", (e) => {
  grid.innerHTML = "";
  let num = 0;
  let text = e.target.value.toLowerCase();
  async function getBooks() {
    let res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${text}&startIndex=20&maxResults=6&orderBy=newest`
    );

    // console.log(res.data?.items);
    let arr = res.data?.items;
    arr.forEach((e) => {
      let box = document.createElement("div");
      box.classList.add("box");
      grid.appendChild(box);
      let imgbox = document.createElement("div");
      imgbox.classList.add("imgbox");
      box.appendChild(imgbox);
      let img = document.createElement("img");
      img.setAttribute("src", `${e.volumeInfo?.imageLinks?.smallThumbnail}`);
      imgbox.appendChild(img);
      let h2 = document.createElement("h2");
      h2.textContent = `${e.volumeInfo?.title}`;
      box.appendChild(h2);
      let p = document.createElement("p");
      p.textContent = `${e.volumeInfo?.authors?.[0]}`;
      box.appendChild(p);
      let p2 = document.createElement("p");
      let slice = e.volumeInfo?.publishedDate?.slice(0, 4);
      p2.textContent = `${slice}`;
      box.appendChild(p2);
      let flex = document.createElement("div");
      flex.classList.add("flex");
      box.appendChild(flex);
      let btnMark = document.createElement("button");
      btnMark.classList.add("btn-mark");
      btnMark.textContent = "Bookmark";
      flex.appendChild(btnMark);
      let btnInfo = document.createElement("button");
      btnInfo.classList.add("btn-info");
      btnInfo.textContent = "More info";
      flex.appendChild(btnInfo);
      let a = document.createElement("a");
      a.setAttribute("href", `${e.volumeInfo?.previewLink}`);
      a.setAttribute("target", "_blank");
      box.appendChild(a);
      let btnRead = document.createElement("button");
      btnRead.classList.add("btn-read");
      btnRead.textContent = "Read";
      a.appendChild(btnRead);
      num++;

      btnInfo.addEventListener("click", () => {
        let body = document.querySelector("body .flex");
        let flex = document.querySelector(".grid");
        let modal = document.createElement("div");
        modal.classList.add("modal");
        body.insertBefore(modal, flex.nextElementSibling);
        let modalName = document.createElement("div");
        modalName.classList.add("modal-name");
        modal.appendChild(modalName);
        let h2 = document.createElement("h2");
        h2.textContent = `${e.volumeInfo?.title}`;
        modalName.appendChild(h2);
        let i = document.createElement("i");
        i.classList.add("fa-solid");
        i.classList.add("fa-xmark");
        modalName.appendChild(i);
        let img = document.createElement("img");
        img.setAttribute("src", `${e.volumeInfo?.imageLinks?.thumbnail}`);
        modal.appendChild(img);
        let p = document.createElement("p");
        p.classList.add("text");
        p.textContent = `${e.volumeInfo?.description}`;
        modal.appendChild(p);
        let authors = document.createElement("div");
        authors.classList.add("authors");
        modal.appendChild(authors);
        let h31 = document.createElement("h3");
        h31.textContent = "Author:";
        authors.appendChild(h31);
        let aup1 = document.createElement("p");
        aup1.textContent = `${e.volumeInfo?.authors?.[0]}`;
        authors.appendChild(aup1);
        if (e.volumeInfo?.authors?.[1]) {
          let aup2 = document.createElement("p");
          aup2.textContent = `${e.volumeInfo?.authors?.[1]}`;
          authors.appendChild(aup2);
        }
        let published = document.createElement("div");
        published.classList.add("published");
        modal.appendChild(published);
        let h32 = document.createElement("h3");
        h32.textContent = "Published:";
        published.appendChild(h32);
        let pu1 = document.createElement("p");
        pu1.textContent = `${e.volumeInfo?.publishedDate?.slice(0, 4)}`;
        published.appendChild(pu1);
        let publishers = document.createElement("div");
        publishers.classList.add("publishers");
        modal.appendChild(publishers);
        let h33 = document.createElement("h3");
        h33.textContent = "Publishers:";
        publishers.appendChild(h33);
        let pub1 = document.createElement("p");
        pub1.textContent = `${e.volumeInfo?.publisher}`;
        publishers.appendChild(pub1);
        let categories = document.createElement("div");
        categories.classList.add("categories");
        modal.appendChild(categories);
        let h34 = document.createElement("h3");
        h34.textContent = "Categories:";
        categories.appendChild(h34);
        let cat1 = document.createElement("p");
        cat1.textContent = `${e.volumeInfo?.categories?.[0]}`;
        categories.appendChild(cat1);
        if (e.volumeInfo?.categories?.[1]) {
          let aup2 = document.createElement("p");
          cat2.textContent = `${e.volumeInfo?.categories?.[1]}`;
          categories.appendChild(cat2);
        }
        let a = document.createElement("a");
        a.setAttribute("href", `${e.volumeInfo?.previewLink}`);
        a.setAttribute("target", "_blank");
        modal.appendChild(a);
        let button = document.createElement("button");
        button.textContent = "Read";
        a.appendChild(button);

        i.addEventListener("click", () => {
          modal.remove();
        });
      });
      btnMark.addEventListener("click", () => {
        let bookmark = document.querySelector(".bookmarks");
        let save = document.createElement("div");
        save.classList.add("save");
        bookmark.appendChild(save);
        let text = document.createElement("div");
        text.classList.add("texts");
        save.appendChild(text);
        let h3 = document.createElement("h3");
        h3.textContent = `${e.volumeInfo.title}`;
        text.appendChild(h3);
        let p = document.createElement("p");
        p.textContent = `${e.volumeInfo?.authors?.[0]}`;
        text.appendChild(p);
        let a = document.createElement("a");
        a.setAttribute("href", `${e.volumeInfo?.previewLink}`);
        a.setAttribute("target", "_blank");
        save.appendChild(a);
        let i = document.createElement("i");
        i.classList.add("fa-solid");
        i.classList.add("fa-book-open");
        a.appendChild(i);
        let a1 = document.createElement("a");
        save.appendChild(a1);
        let i1 = document.createElement("i");
        i1.classList.add("fa-solid");
        i1.classList.add("fa-delete-left");
        a1.appendChild(i1);
        localStorage.setItem(
          `${e.volumeInfo.title}`,
          `${e.volumeInfo.title}, ${e.volumeInfo?.authors?.[0]}`
        );

        i1.addEventListener("click", () => {
          localStorage.removeItem(`${e.volumeInfo.title}`);
          save.remove();
        });
      });
      console.log(e.volumeInfo);
    });

    number.textContent = `${num}`;
  }

  getBooks();
});
number.textContent = 0;
