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


let webSocket = Stomp.client('ws://localhost:8080/websocket');
function bid(auctionId) {
    const emailInput = document.querySelector('#auction__my_email');
    const bidInput = document.querySelector('#auction__my_bid');
    let email = emailInput.value;
    let bid = bidInput.value;
    webSocket.send(`/app/rt-auction/bid/${auctionId}`, {}, JSON.stringify({price: bid, email: email}))
}


fetch(`http://localhost:8080/api/auction/${auctionId}`).then(resp => resp.json()).then(auction => {
    const reservationStartDate = new Date(auction.stay.reservationStartDate*1000).toISOString().split('T')[0];
    const reservationEndDate = new Date(auction.stay.reservationStartDate*1000).toISOString().split('T')[0];
    const auctionStartDate = new Date(auction.startDate*1000).toISOString().split('.')[0].replace('T', ' ');
    const auctionEndDate = new Date(auction.endDate*1000).toISOString().split('.')[0].replace('T', ' ');
    const roomName = auction.stay.roomDto.name;
    const accommodationCapacity = auction.stay.roomDto.accommodationCapacity;
    console.log(auction)
    let auctionDiv;
    if (auction.auctionStatus === 'CREATED') {
        auctionDiv = `
            <div class="auction">
                <h2>Licytacja zaplanowana</h2>
            </div>
        `;
    } else {
        if (auction.auctionStatus === 'FINISHED') {
            auctionDiv = `
                <div class="auction finished">
                    <h2>Licytacja zakończona</h2>    
                    <h3>Wygrał: ${auction.auctionWinner}</h3>  
                </div>
            `;
        } else if (auction.auctionStatus === 'STARTED') {
            auctionDiv = `
                <div class="auction current">
                    <h2>Licytacja trwa</h2>
                    <h3>Weź udział w licytacji</h3>
                    <label>Email</label>
                    <input type="text" placeholder="user@example.com" id="auction__my_email">
                    <label style="margin-left: 30px;">Kwota</label>
                    <input type="number" placeholder="2000" id="auction__my_bid">
                    <button style="margin-left: 10px;" onclick="bid(${auction.id})">Licytuj</button>
                    
                    <h3>Aktualnie najwyższa oferta:</h3>
                    <h4>${auction.actualPrice}</h4>
                </div>
            `;
            let connectCallback = function() { console.log("connected"); };
            webSocket.connect({}, connectCallback);
        }
        if (auction.bidHistory && !auction.bidHistory.empty()) {
            auctionDiv += '<div id="bid_history"><ol>';
            auction.bidHistory.forEach(bid => {
                auctionDiv += '<li>${bid.id}</li>';
            });
            auctionDiv += '</div></ol>';
        }
    }
    auctionContainer.innerHTML += `
                <h2>${roomName}</h2>
                <h3><i>Dla ${accommodationCapacity} osób</i></h3>
                <h4>Termin: ${reservationStartDate} - ${reservationEndDate}</h4>
                ${auctionDiv}
    `;
});
