import projects from "./projects.js";
const projectContainer = document.getElementById("project-container")

const backstory = document.getElementById("backstory")
const navBar = document.getElementById("navbar")
const scrollStopper = document.getElementById("scroll-stopper")
const listItems = [...scrollStopper.children[0].children[1].children]
const multiplier = 2.75;
const padding = 50 + 9.2;
let time = 0;

listItems.forEach((el, index) => {
  if (!(index === 0)) {
    let prevItemWidth = listItems[index - 1].offsetWidth
    time += (prevItemWidth + padding) * multiplier
    el.style.animationDelay = `${time}ms`;
  }
})

projects.forEach((projObj) => {
  if (projObj.note === "") {
    projectContainer.innerHTML+= `
      <a class="project-tile" href="${projObj.linkHref}" target="_blank">
          <img class="project-image" src="${projObj.imgSrc}" alt="screenshot of linked site" />
          <p class="project-title">${projObj.title}</p>
          <p class="project-description">${projObj.description}</p>
      </a>  
    `
  } else {
    projectContainer.innerHTML+= `
      <a class="project-tile" href="${projObj.linkHref}" target="_blank">
          <img class="project-image" src="${projObj.imgSrc}" alt="screenshot of linked site" />
          <p class="project-title">${projObj.title}</p>
          <p class="project-description">${projObj.description}</p>
          <p class="project-note">${projObj.note}</p>
      </a>  
    `
  }
})