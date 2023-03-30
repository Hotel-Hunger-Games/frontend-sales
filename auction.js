const urlParams = new URLSearchParams(window.location.search);
let auctionId = urlParams.get('id');
const urlParamsWithoutId = new URLSearchParams(window.location.search);
urlParamsWithoutId.delete('id')

const body = document.querySelector('body');
body.innerHTML = `
<nav>
    <ul>
        <li><a href="./index.html?${urlParamsWithoutId}">Powrót do głównej</a></li>
    </ul>
</nav>` + body.innerHTML;

const auctionContainer = document.querySelector('#auction__div');
fetch(`http://localhost:8080/api/auction/${auctionId}`).then(resp => resp.json()).then(auction => {
    const reservationStartDate = new Date(auction.stay.reservationStartDate*1000).toISOString().split('T')[0];
    const reservationEndDate = new Date(auction.stay.reservationStartDate*1000).toISOString().split('T')[0];
    const auctionStartDate = new Date(auction.startDate*1000).toISOString().split('.')[0].replace('T', ' ');
    const auctionEndDate = new Date(auction.endDate*1000).toISOString().split('.')[0].replace('T', ' ');
    const roomName = auction.stay.roomDto.name;
    const accommodationCapacity = auction.stay.roomDto.accommodationCapacity;
    console.log(auction)
    let auctionDiv;
    if (auction.auctionStatus === 'FINISHED') {
        auctionDiv = `
            <div class="auction finished">
                <h2>Licytacja zakończona</h2>      
            </div>
        `;
    } else if (auction.auctionStatus === 'STARTED') {
        
        auctionDiv = `
            <div class="auction current">
                <h2>Licytacja trwa</h2>
            </div>
        `;
    } else {
        auctionDiv = `
            <div class="auction">
                <h2>Licytacja zaplanowana</h2>
            </div>
        `;
    }
    auctionContainer.innerHTML += `
                <h2>${roomName}</h2>
                <h3><i>Dla ${accommodationCapacity} osób</i></h3>
                <h4>Termin: ${reservationStartDate} - ${reservationEndDate}</h4>   
                ${auctionDiv} 
    `;
});
