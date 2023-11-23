let clickingAreaNode = document.querySelector(".js-clicking-area-container");
let skillsContainerNode = document.querySelector(".js-skills-container");
let employeeContainerNode = document.querySelector(".js-employee-container");
let timerAreaNode = document.querySelector(".js-timer-area");
let goldAreaNode = document.querySelector(".js-gold-area");

const CHANGE_TYPE = {
  SKILL: "SKILL",
  EMPLOYEE: "EMPLOYEE",
  TIME: "TIME",
  GOLD: "GOLD",
  ALL: "ALL",
};

// állapottér
let { 
  secounds, 
  gold, 
  goldPerClick, 
  goldPerSec, 
  skillList, 
  employeeList, 
  startTimestamp, 
  skillsChanged,
  employeeChanged,
} = getInitialState();


function getInitialState() {
  return {
    intervalId: setInterval(administrateTime, 120),
    startTimestamp: new Date().getTime(),
    secounds: 0,
    gold: 0,
    goldPerClick: 1,
    goldPerSec: 0,
    skillList: [
      {
          skillName: "Aranykutatás",
          goldPerClickIncrement: 1,
          description: "Ahol a víz áramlását akadályik megváltoztatják, aranyat találunk.",
          amount: 0,
          price: 10,
          link: "./pictures/prospector.png",
  
      },
      {
        skillName: "Bagolyidámítás",
        goldPerClickIncrement: 10,
        description: "Bagályok betanítását készpénzre válthatjuk. Magasabb szinten postabaglyokat is nevelhetünk.",
        amount: 0,
        price: 200,
        link: "./pictures/owl.png",
  
    },
    {
      skillName: "Gyógyfőzet készítés",
      goldPerClickIncrement: 25,
      description: "Minél jobban kitanuljuk a gyógyfőzetek készítését annál több gyógyfőzetet tudunk értékesíteni aranyért.",
      amount: 0,
      price: 750,
      link: "./pictures/potion.png",
  
  },
  {
    skillName: "Kereskedelem",
    goldPerClickIncrement: 100,
    description: "Varázstárgyak készítésével és eladásával profitot zsebelhetünk be.",
    amount: 0,
    price: 4000,
    link: "./pictures/barter.png",
  
  },
  {
    skillName: "Alkímia",
    goldPerClickIncrement: 300,
    description: "Az aranykészítés tudománya titkos recept alapján.",
    amount: 0,
    price: 15000,
    link: "./pictures/alkcmely.png",
  
  },
  {
    skillName: "Varázstudomány",
    goldPerClickIncrement: 1000,
    description: "Az alkímia hatását tovább erősíti és oktatási tevékenységet is végezhetünk.",
    amount: 0,
    price: 100000,
    link: "./pictures/wizzard.png",
  
  },
                ],
    employeeList: [
    {
        employeeName: "Aranykutató",
        goldPerSecIncrement: 1,
        description: "Aranyat keres és talál",
        amount: 0,
        price: 100,
        link: "./pictures/aranykutato.png",

    },
    {
      employeeName: "Bagolyidomár",
      goldPerSecIncrement: 5,
      description: "Szerződés munkatársként baglyokat tanít.",
      amount: 0,
      price: 400,
      link: "./pictures/idomar.png",

  },
  {
    employeeName: "Gyógyfőfet készítő",
    goldPerSecIncrement: 10,
    description: "Gyógyfőzeteket készít és értékesít a piacon.",
    amount: 0,
    price: 1500,
    link: "./pictures/gyogyfozet.png",

},
{
  employeeName: "Kereskedő",
  goldPerSecIncrement: 100,
  description: "Varázstárgyakat készít és értékesít.",
  amount: 0,
  price: 8000,
  link: "./pictures/trader.png",

},
{
  employeeName: "Varázsló Professzor",
  goldPerSecIncrement: 250,
  description: "Tanulókat képez ki. Szabadidejében Alkímiával foglalkozik.",
  amount: 0,
  price: 30000,
  link: "./pictures/proff.png",

},
{
  employeeName: "Befektető kacsa",
  goldPerSecIncrement: 1000,
  description: "Dagobert bácsihoz hasonló szakértelemmel kezeli és fialtatja a vagyonodat.",
  amount: 0,
  price: 200000,
  link: "./pictures/kacsa.png",

}
                  ],
  };
}

function administrateTime() {
  let currentTimestamp = new Date().getTime();
  let elapsedTime = Math.floor((currentTimestamp - startTimestamp) / 1000);
  let rewardSeconds = elapsedTime - secounds;
  if (rewardSeconds > 0) {
    gold += goldPerSec * rewardSeconds;
    secounds = elapsedTime;
    render(CHANGE_TYPE.TIME);
  }
}

/******************************* click event listeners ************************************* */
function handleGoldClicked(event) {
      if (event.target.dataset.enable_click === "true") {
        gold += goldPerClick;
        render(CHANGE_TYPE.GOLD);
      }
}

function handleSkillsClicked(event) {
  let clickIndex = event.target.dataset.index;
    if (typeof clickIndex !== 'undefined') {
    let clickedSkill = skillList[clickIndex];
    if ( gold < clickedSkill.price) {
      alert("Nem áll rendelkezésedre elég arany.");
      return;
    }
    gold -= clickedSkill.price;
    goldPerClick += clickedSkill.goldPerClickIncrement;
    clickedSkill.amount += 1;
    render(CHANGE_TYPE.SKILL);
    }
}

function handleEmployeeClicked(event) {
  let clickIndex = event.target.dataset.index;
  if (typeof clickIndex !== 'undefined') {
  let clickedEmployee = employeeList[clickIndex];
  if ( gold < clickedEmployee.price) {
    alert("Nem áll rendelkezésedre elég arany.");
    return;
  }
  gold -= clickedEmployee.price;
  goldPerSec += clickedEmployee.goldPerSecIncrement;
  clickedEmployee.amount += 1;
  render(CHANGE_TYPE.EMPLOYEE);
  }
}

/******************************* templates ************************************* */
/* PRE: 0<= Price <= 999999 */
function formantPrice(price) {
  if (price < 1000)  return price; 
  let kValue = price / 1000;
  return `${kValue}K`;
}

function getTimerAreaTemplate() {
  return`
          <p><strong>${secounds} másodperc</strong></p>
      `;
  }

  function getGoldAreaTemplate() {
    return`
            <p><strong>${gold} arany</p></strong>
            <p>${goldPerClick} arany / klikk</p>
            <p>${goldPerSec} arany / mp</p>
        `;
    }
  


function getSkill({skillName, goldPerClickIncrement, description, amount, price, link}, index) {
return `
<tr>
<td>
  <p><strong>${skillName} (${goldPerClickIncrement} arany / klikk)</p></strong>
  <p>${description} </p>
</td>
<td class="upgrade-stats-cell">
  <p>db: ${amount} </p>
  <p>ár: ${formantPrice(price)} </p>
</td>
<td>
  <img class="skill-image" src="${link} " alt="${skillName}" data-index="${index}" />
</td>
</tr>`
}


function getEmployee({ employeeName, goldPerSecIncrement, description, amount, price, link}, index)  {
    return `
    <tr>
    <td>
        <img class="skill-image" src="${link} " alt="${employeeName}" data-index="${index}" />
      </td> 
      <td class="upgrade-stats-cell">
        <p>db:${amount}</p>
        <p>ár:${formantPrice(price)}</p>
      </td>
      <td>
          <p><strong>${employeeName} (${goldPerSecIncrement} arany / mp)</p></strong>
          <p>${description} </p>
        </td>
</tr>
    `;
}


function getListTemplate(list, getItemTemplate) {
  let html = '';

  let i = 0;
  let hideRemaningItems = false;
 do {
    let item = list[i];
    html += getItemTemplate(item, i);
    if (item.amount === 0) {
      hideRemaningItems = true;
    }
    i += 1;
  }  while (i < list.length && !hideRemaningItems);



  return html;
}


function render(changeType = CHANGE_TYPE.ALL) {
  if (
    changeType === CHANGE_TYPE.ALL || 
    changeType === CHANGE_TYPE.TIME
    ) { 

  timerAreaNode.innerHTML = getTimerAreaTemplate();
    }

  if (changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.SKILL) {
    document.querySelector(".js-skills-tbody").innerHTML = getListTemplate(skillList, getSkill);
    skillsChanged = false;
  }
  if (changeType === CHANGE_TYPE.ALL || changeType === CHANGE_TYPE.EMPLOYEE) {
    document.querySelector(".js-employees-tbody").innerHTML = getListTemplate(employeeList, getEmployee);
    employeeChanged = false;
  }
  goldAreaNode.innerHTML = getGoldAreaTemplate();
  disableImageDragDrop();
}

function disableImageDragDrop() {
  const imgList = document.querySelectorAll("img");

  for (let img of imgList) {
      img.ondragstart = () => false;
}
}
function initialize() {
  let data = getInitialState();
  secounds = data.secounds;
   gold = data.gold;
   goldPerClick = data.goldPerClick;
   goldPerSec = data.goldPerSec;

  clickingAreaNode.addEventListener('click', handleGoldClicked);
  skillsContainerNode.addEventListener("click", handleSkillsClicked);
  employeeContainerNode.addEventListener("click", handleEmployeeClicked);


  render();
}

initialize();