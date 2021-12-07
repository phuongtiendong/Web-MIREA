
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("nav-logo").style.width = "50px";
  } else {
    document.getElementById("nav-logo").style.width = "120px";
  }
}