import { openModal, closeModal } from './modals';
import { getData } from './api';

export const authFunk = () => {
  const authBtn = document.getElementById("open-auth-btn");
  const openCartBtn = document.getElementById("open-cart-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const modal = document.getElementById("auth-modal");
  const closeBtns = modal.querySelectorAll(".close-btn");
  const loginBtn = modal.querySelector(".login-btn");

  const login = () => {
    authBtn.classList.add("d-none");
    openCartBtn.classList.remove("d-none");
    logoutBtn.classList.remove("d-none");
    closeModal(modal);
  };

  const logout = () => {
    authBtn.classList.remove("d-none");
    openCartBtn.classList.add("d-none");
    logoutBtn.classList.add("d-none");
  };

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem("auth"));

    if(user) {
      getData('/profile').then((data) => {
        if(
          (data.login && data.login === user.login) && 
          (data.password && data.password === user.password)
        ) {
          login();
        }
      })
    } 
  };

  authBtn.addEventListener("click", () => {
    openModal(modal);
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(modal);
    });
  });

  loginBtn.addEventListener("click", () => {
    const loginInput = modal.querySelector("#login-control");
    const passwordInput = modal.querySelector("#password-control");

    const user = {
      login: loginInput.value,
      password: passwordInput.value,
    };

    getData('/profile').then((data) => {
      if(
        (data.login && data.login === user.login) && 
        (data.password && data.password === user.password)
      ) {
        localStorage.setItem("auth", JSON.stringify(data));
        login();
      } else {
        alert('Невірний логін або пароль');
      }
    })
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("auth");

    logout();
  });

  checkAuth();
};
