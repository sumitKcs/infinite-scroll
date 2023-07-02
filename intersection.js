const count = 10;
let index = 0;

function addItems() {
    //A DocumentFragment is essentially a "mini" document that can be used as a temporary container for DOM nodes. It is not part of the main document tree, so any modifications made to the fragment will not cause reflow or repaint in the browser.
  const fragment = document.createDocumentFragment();

  for (let i = index + 1; i <= index + count; ++i) {
    const item = document.createElement("p");

    item.classList.add("item");
    item.textContent = `#${i}`;

    fragment.appendChild(item);
  }

  document.getElementById("list").appendChild(fragment);
  index += count;
}

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    addItems();
  });
});

io.observe(document.getElementById("watch_end_of_document"));

addItems();


