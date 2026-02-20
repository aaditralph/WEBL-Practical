
const fun_page_button = document.getElementById("fun-page");
const about_page_button = document.getElementById("about-page");
const portfolio_page_button = document.getElementById("portfolio-page-button");

const changePage = (page_name_final) => {
    document.getElementById("fun_page").classList.remove("active");
    document.getElementById("about_page").classList.remove("active");
    document.getElementById("portfolio_page").classList.remove("active");
    document.getElementById(page_name_final).classList.add("active");
}

fun_page_button.onclick = () => changePage("fun_page");
about_page_button.onclick = () =>changePage("about_page");
portfolio_page_button.onclick = () =>changePage("portfolio_page");

const fun_button = document.getElementById("fun-button");
const remove_button = document.getElementById("remove-button");
const button_list = document.getElementById("button-list");

const bg3_items = ["Astarion", "Gale", "Shadowheart", "Lae'zel", "Wyll"];

fun_button.onclick = () => {
        const random_item = bg3_items[Math.floor(Math.random() * bg3_items.length)];
        const new_li = document.createElement("li");
        new_li.textContent = random_item;
        button_list.appendChild(new_li);
    
}

remove_button.onclick = () => {
    if (button_list.children.length > 0) {
        button_list.removeChild(button_list.lastElementChild);
    }
}

const default_color = document.getElementById("default-color");
const color_button_1 = document.getElementById("color-button-1");
const color_button_2 = document.getElementById("color-button-2");
const color_button_3 = document.getElementById("color-button-3");


default_color.onclick = () => {
    document.body.style.backgroundColor = "#0f0f0f";
}
color_button_1.onclick = () => {
    document.body.style.backgroundColor = "#2c3e50";
}

color_button_2.onclick = () => {
    document.body.style.backgroundColor = "#34495e";
}

color_button_3.onclick = () => {
    document.body.style.backgroundColor = "#7f8c8d";
}

