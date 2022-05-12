class UI {
  hidePreloader() {
    const preloader = document.querySelector(".preloader");
    preloader.style.display = "none";
  }

  showNav() {
    const navBar = document.querySelector(".nav");
    navBar.classList.toggle("nav-show");
  }

  videoControl() {
    const btn = document.querySelector(".video-switch-btn");
    if (!btn.classList.contains("btnSlide")) {
      btn.classList.add("btnSlide");
      document.querySelector(".video-item").pause();
    } else {
      btn.classList.remove("btnSlide");
      document.querySelector(".video-item").play();
    }
  }

  checkEmpty(name, lastname, email) {
    let result;
    name === "" || lastname === "" || email === ""
      ? (result = false)
      : (result = true);
    return result;
  }

  showFeedback(text, type) {
    let feedback = document.querySelector(".contact-form-feedback");
    if (type === "success") {
      feedback.classList.add("success");
      feedback.innerText = text;
      this.removeAlert("success");
    } else if (type === "error") {
      feedback.classList.add("error");
      feedback.innerText = text;
      this.removeAlert("error");
    }
  }

  removeAlert(type) {
    setTimeout(() => {
      document.querySelector(".contact-form-feedback").classList.remove(type);
    }, 3000);
  }

  addCustomer(customer) {
    const images = [1, 2, 3];
    let random = Math.floor(Math.random() * images.length);
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = `
    <img src="./img/person${random}.jpeg" alt="avatar" class="person-thumbnail" />
    <h4 class="person-name">${customer.name}</h4>
    <h4 class="person-lastname">${customer.lastname}</h4>`;
    document.querySelector(".contact-card-list").appendChild(div);
  }

  clearFields() {
    document.querySelector(".input-name").value = "";
    document.querySelector(".input-lastname").value = "";
    document.querySelector(".input-email").value = "";
  }

  showModal(event) {
    event.preventDefault();
    if (
      event.target.parentElement.classList.contains("destination-item-icon")
    ) {
      let id = event.target.parentElement.dataset.id;
      const modal = document.querySelector(".destination-modal");
      const modalItem = document.querySelector(".destination-modal-item");
      modal.classList.add("destination-modal-show");
      modalItem.style.backgroundImage = `url(img/grid${id}.jpeg)`;
    }
  }

  closeModal() {
    document.querySelector(".destination-modal").classList.remove("destination-modal-show");
  }
}

class Customer {
  constructor(name, lastname, email) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
  }
}

const eventListeners = () => {
  const ui = new UI();

  window.addEventListener("load", () => {
    ui.hidePreloader();
  });

  const navBtn = document.querySelector(".navBtn");
  navBtn.addEventListener("click", () => {
    ui.showNav();
  });

  const videoSwitch = document.querySelector(".video-switch");
  videoSwitch.addEventListener("click", () => {
    ui.videoControl();
  });

  document
    .querySelector(".contact-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastname = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;

      let value = ui.checkEmpty(name, lastname, email);

      if (value) {
        ui.showFeedback("Thank you!", "success");
        let customer = new Customer(name, lastname, email);
        ui.addCustomer(customer);
        ui.clearFields();
      } else {
        ui.showFeedback("Please, fill all fields", "error");
      }
    });

  const links = document.querySelectorAll(".destinations-item");
  links.forEach((item) => {
    item.addEventListener("click", (event) => {
      ui.showModal(event);
    });
  });

  document
    .querySelector(".destination-modal-close")
    .addEventListener("click", () => {
      ui.closeModal();
    });
};
eventListeners();