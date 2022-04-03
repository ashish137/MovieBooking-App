const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

// console.log(typeof ticketPrice);
console.log(movieSelect);

// Save Selected Movie Index and Price

const setMovieData = (index, price) => {
    localStorage.setItem('selectedMovieIndex', index);
    localStorage.setItem('selectedMoviePrice', price);
};

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(s => [...seats].indexOf(s));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // console.log(seatsIndex);

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
};

//Get Data from localStorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    seats.forEach((seat, index)=> {
        if (selectedSeats !== null && selectedSeats.length > 0) {
            if (selectedSeats.includes(index)) {
                console.log('found seat at ', index);
                seat.classList.add('selected');
            }
        }
    });

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    console.log('ticketPrice just after', ticketPrice);

    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if (selectedMoviePrice !== null) {
        ticketPrice = selectedMoviePrice;
    }


};

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//seat click event
container.addEventListener('click', e => {

    if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

//Initial cout and total
updateSelectedCount();