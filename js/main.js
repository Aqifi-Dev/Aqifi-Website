const modalbtn = document.querySelector(".modal_submit");
const popupmodal = document.querySelector(".ModalPopUp");
const mainmodal = document.querySelector(".Modal1");
const closemodal = document.querySelector(".popupmodalclose");

modalbtn.addEventListener("click", function() {
    mainmodal.style.display = "none";
    popupmodal.style.display = "block";
});

closemodal.addEventListener("click", function() {
    mainmodal.style.display = "none";
    popupmodal.style.display = "none";
});

