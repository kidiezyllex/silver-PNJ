import { userData } from "./userData.js";
let menuBars = document.querySelector(".fa-bars");
let menu = document.querySelector("header > .header-menu");
menuBars.onclick = () => {
  menu.style.height = `${menu.scrollHeight}px`;
  menuBars.classList.toggle("fa-bars");

  menuBars.classList.toggle("fa-times");
  if (!menuBars.classList.contains("fa-times")) {
    menu.style.height = "0px";
  }
};

let header = document.querySelector("header");
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos < currentScrollPos) {
    header.style.display = "none";
    document.querySelector(".header-menu").style.display = "none";
  } else if (prevScrollpos > currentScrollPos) {
    header.style.display = "flex";
    document.querySelector(".header-menu").style.display = "block";
  }
  prevScrollpos = currentScrollPos;
};

let logInButtonInHeader = document.querySelector(".header .log-in");
logInButtonInHeader.addEventListener("click", function () {
  let logInFormTem = `<div class="modal">
    <div class="login-form">
      <h1>Đăng nhập</h1>
      <form method="post">
        <div class="input-box">
          <span>Tên người dùng</span>
          <div class="input">
            <ion-icon name="person-outline"></ion-icon>
            <input type="text" required class="username" />
          </div>
        </div>
        <div class="input-box">
          <span>Mật khẩu</span>
          <div class="input">
            <ion-icon name="key-outline"></ion-icon>
            <input type="password" required class="password" />
          </div>
        </div>
        <h2><a href="#">Quên mật khẩu?</a></h2>
        <input type="submit" value="Đăng nhập" class="login-button"/>
        <h2>Hoặc đăng nhập với</h2>
        <ul>
          <li><a href="https://vi-vn.facebook.com/"><i class="fa-brands fa-facebook-f"></i></a></li>
          <li><a href="https://twitter.com/i/flow/login"><i class="fa-brands fa-twitter"></i></a></li>
          <li><a href="https://accounts.google.com/ServiceLogin"><i class="fa-brands fa-google"></i></a></li>
        </ul>
      </form>
    </div>
  </div>`;
  document.body.insertAdjacentHTML("beforeend", logInFormTem);

  let inputList = document.querySelectorAll(
    ".login-form .input-box .input input"
  );

  inputList.forEach(function (it) {
    it.addEventListener("focus", (event) => {
      event.target.parentNode.parentNode.style =
        "border-bottom: 2px solid #4496D4";
      event.target.previousSibling.previousSibling.style = "color: #4496D4";
      let alert = document.querySelector(".alert");
      if (alert !== null)
        event.target.parentNode.parentNode.querySelector(".alert").remove();
    });

    it.addEventListener("blur", (event) => {
      event.target.parentNode.parentNode.style =
        "border-bottom: 2px solid #eee";
      event.target.previousSibling.previousSibling.style = "color: #737373";

      if (it.value.trim() === "") {
        let emptyFieldAlertTem = `<div class="alert">
        <div class="icon">
          <ion-icon name="warning-outline"></ion-icon>
        </div>
        <span>Field không được trống!</span>
      </div>`;

        it.parentNode.parentNode.insertAdjacentHTML(
          "beforeend",
          emptyFieldAlertTem
        );
      }
    });
  });

  let userName = document.querySelector(
    ".login-form .input-box .input .username"
  );
  let passWord = document.querySelector(
    ".login-form .input-box .input .password"
  );
  let userNameData, passWordData;
  userName.onkeyup = function (event) {
    userNameData = event.target.value;
  };
  passWord.onkeyup = function (event) {
    passWordData = event.target.value;
  };

  let loginButtonInForm = document.querySelector(".login-form .login-button");
  loginButtonInForm.addEventListener("click", function (event) {
    let counterUserName = 0,
      counterPassword = 0;

    userData.forEach(function (it) {
      if (
        (userNameData.toLowerCase() == it.userName.toLowerCase()) &
        (passWordData === it.passWord)
      ) {
        document.querySelector(".modal").remove();

        loading();

        let headerButton = document.querySelector(".header-button");
        logInButtonInHeader.style.display = "none";
        signUpButton.style.display = "none";
        let userTem = `
        <div class="user">
        <h2>${it.fullName}</h2>
          <div class="user-avatar">
            <img src=${it.avatar} alt="" />
          </div>
        </div>`;

        headerButton.insertAdjacentHTML("beforeend", userTem);

        let userMenuTem = `<div class="user-menu">
          <div class="header-menu">
            <div class="user-avatar">
              <img src=${it.avatar} alt="" />
            </div>
            <h1>${it.fullName}</h1>
          </div>
          <div class="menu">
            <ul>
              <li>
                Thông tin cá nhân <ion-icon name="person-outline"></ion-icon>
              </li>
              <li>Giỏ hàng <ion-icon name="cart-outline"></ion-icon></li>
              <li>Cài đặt <ion-icon name="settings-outline"></ion-icon></li>
              <li>Theo dõi <ion-icon name="duplicate-outline"></ion-icon></li>
              <li>Yêu thích <ion-icon name="heart-outline"></ion-icon></li>
              <li class="logout">Đăng xuất <ion-icon name="log-out-outline"></ion-icon></li>
            </ul>
            <div class="back">Quay lại</div>
          </div>
        </div>`;

        document
          .querySelector("header")
          .insertAdjacentHTML("beforeend", userMenuTem);
        let userMenu = document.querySelector(".user-menu");

        let userButton = document.querySelector(".user");
        userButton.addEventListener("click", function (event) {
          userMenu.style.transform = "translateX(0%)";
          document.body.addEventListener("click", function (event) {
            if (
              !event.target.matches(".user-menu") &&
              !userMenu.contains(event.target) &&
              !event.target.matches(".user")
            ) {
              userMenu.style.transform = "translateX(100%)";
            }
          });
        });

        let backButton = document.querySelector(".header .user-menu .back");
        backButton.addEventListener("click", function (event) {
          userMenu.style.transform = "translateX(100%)";
        });

        let logoutButton = document.querySelector(
          ".header .user-menu ul li.logout"
        );
        logoutButton.addEventListener("click", function (event) {
          document.querySelector(".header .user-menu .menu").remove();
          document.querySelector(".header .user").remove();
          loading();
          logInButton.style.display = "flex";
          signUpButton.style.display = "flex";
        });
      }
      else if (userNameData.toLowerCase() === it.userName.toLowerCase()) {
        counterUserName++;
      } else if (passWordData === it.passWord) {
        counterPassword++;
      }
    });

    if (counterUserName === 0) {
      let alertUserNameTem = `<div class="alert">
        <div class="icon">
          <ion-icon name="warning-outline"></ion-icon>
        </div>
        <span>Tên người dùng không tồn tại!</span>
      </div>`;

      userName.parentNode.parentNode.insertAdjacentHTML(
        "beforeend",
        alertUserNameTem
      );
      event.preventDefault();
    }

    else if (counterPassword === 0) {
      let alertPasswordTem = `<div class="alert">
        <div class="icon">
          <ion-icon name="warning-outline"></ion-icon>
        </div>
        <span>Sai mật khẩu!</span>
      </div>`;

      passWord.parentNode.parentNode.insertAdjacentHTML(
        "beforeend",
        alertPasswordTem
      );
      event.preventDefault();
    }
  });
});

let signUpButton = document.querySelector(".header .sign-up");
signUpButton.addEventListener("click", function (event) {
  let signUpFormTem = `<div class="modal">
     <div class="signup-form">
       <h1>Đăng ký</h1>
       <form method="post">
         <div class="input-box">
           <span>Tên người dùng</span>
           <div class="input">
             <ion-icon name="person-outline"></ion-icon>
             <input type="text" required class="username" />
           </div>
         </div>
         <div class="input-box">
           <span>Mật khẩu</span>
           <div class="input">
             <ion-icon name="key-outline"></ion-icon>
             <input type="password" required class="password" />
           </div>
         </div>
         <div class="input-box">
           <span>Email</span>
           <div class="input">
             <ion-icon name="mail-outline"></ion-icon>
             <input type="email" required class="password" />
           </div>
         </div>
         <div class="checkbox">
           <input type="checkbox" />
           <span>Tôi đã đọc và đồng ý với các điều khoản</span>
         </div>
         <input type="submit" value="Tạo tài khoản" class="signup-button" />
       </form>
     </div>
   </div>`;

  document.body.insertAdjacentHTML("beforeend", signUpFormTem);
});

document.addEventListener("click", function (event) {
  if (event.target.matches(".modal")) {
    event.target.parentNode.removeChild(event.target);
  }
  if (event.target.matches(".modal-search")) {
    event.target.style.transform = "translateX(100vw)";
  }
});

function loading() {
  let loadingTem = `<div class="modal-loading">
  <div class="sk-cube-grid">
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
  </div>
</div>`;
  document.body.insertAdjacentHTML("beforeend", loadingTem);
  setTimeout(function () {
    document.querySelector(".modal-loading").remove();
  }, 1500);
}
