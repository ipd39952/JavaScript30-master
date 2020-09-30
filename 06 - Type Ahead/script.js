const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, cities){
  return cities.filter(item => {
    const regex = new RegExp(wordToMatch, 'gi');
    return item.city.match(regex) || item.state.match(regex);
  });
}
function dispalayMatches(){
  const resultArr = findMatches(this.value, cities);
  //console.log(resultArr);
  const html = resultArr.map(item => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = item.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = item.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(item.population)}</span>
      </li>
    `
  }).join(''); //because map() will return an array and we want just 1 string!
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', dispalayMatches);
searchInput.addEventListener('keyup', dispalayMatches);
