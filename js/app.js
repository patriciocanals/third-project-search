//Variables
const divResult = document.querySelector('#result');
const selectBrand = document.querySelector('#brand');
const selectYear = document.querySelector('#year');
const selectMin = document.querySelector('#minimum');
const selectMax = document.querySelector('#maximum');
const selectTransmission = document.querySelector('#transmission');
const selectColor = document.querySelector('#color');
const dateMax = new Date().getFullYear();
const dateMin = dateMax - 10;

//Creating an object with serching data
const data = {
    brand:'',
    year:'',
    min:'',
    max:'',
    transmission:'',
    color:'',
} 
//EL for selects
selectBrand.addEventListener('change',e=>{
    data.brand = e.target.value;
    carFilter();
})
selectYear.addEventListener('change',e=>{
    data.year = e.target.value;
    carFilter();
})
selectMin.addEventListener('change',e=>{
    data.min = e.target.value;
    carFilter();
})
selectMax.addEventListener('change',e=>{
    data.max = e.target.value;
    carFilter();
})
selectTransmission.addEventListener('change',e=>{
    data.transmission = e.target.value;
    carFilter();
})
selectColor.addEventListener('change',e=>{
    data.color = e.target.value;
    console.log(data);
    carFilter();
})

//Events
document.addEventListener('DOMContentLoaded',()=>{
    showCars(cars);
    fillYearSelect();
})

//Functions
function showCars(cars){
    cleanHTML();
    cars.forEach(car => {
        const {brand,year,model,price,color,transmission} = car;
        const carHTML = document.createElement('p');

        carHTML.textContent = `
            ${year} ${brand} ${model} ${transmission} - Color: ${color} - Value: $${price} 
        `;

        divResult.appendChild(carHTML);
    })
}

function cleanHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}

function fillYearSelect(){
    for(let i = dateMax; i>=dateMin; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

function carFilter(){
    const result = cars.filter(brandFilter).filter(yearFilter).filter(minFilter).filter(maxFilter).filter(transmissionFilter).filter(colorFilter);
    if(result.length){
        showCars(result);
    } else {
        noResults();
    }
}
function noResults(){
    cleanHTML();
    const noResults = document.createElement('div');
    noResults.classList.add('alert','error');
    noResults.textContent = 'No Results';
    result.appendChild(noResults);
}

function brandFilter(car){
    const {brand} = data;
    if(brand){
        return car.brand === brand;
    }
    return car;
}
function yearFilter(car){
    const {year} = data;
    if(year){
        return car.year === parseInt(year);
    }
    return car;
}
function minFilter(car){
    const {min} = data;
    if(min){
        return car.price >= min;
    }
    return car;
}
function maxFilter(car){
    const {max} = data;
    if(max){
        return car.price <= max;
    }
    return car;
}
function transmissionFilter(car){
    const {transmission} = data;
    if(transmission){
        return car.transmission === transmission;
    }
    return car;
}
function colorFilter(car){
    const {color} = data;
    if(color){
        return car.color === color;
    }
    return car;
}