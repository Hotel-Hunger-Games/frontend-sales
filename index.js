const urlParams = new URLSearchParams(window.location.search);
const eventsContainer = document.querySelector('.stays-grid');
fetch('http://localhost:8080/api/auction').then(resp => resp.json()).then(data => {
   data.forEach(auction => {
       const reservationStartDate = new Date(auction.stay.reservationStartDate*1000).toISOString().split('T')[0];
       const reservationEndDate = new Date(auction.stay.reservationStartDate*1000).toISOString().split('T')[0];
       const auctionStartDate = new Date(auction.startDate*1000).toISOString().split('.')[0].replace('T', ' ');
       const auctionEndDate = new Date(auction.endDate*1000).toISOString().split('.')[0].replace('T', ' ');
       const roomName = auction.stay.roomDto.name;
       const accommodationCapacity = auction.stay.roomDto.accommodationCapacity;
       let button;
       if (auction.auctionStatus === 'FINISHED') {
           button = '<button class="button-53 disabled" role="button" disabled>Licytacja zakończona</button>';
       } else if (auction.auctionStatus === 'STARTED') {
           urlParams.set('id', auction.id)
           button = '<a href="auction.html?'+urlParams+'"><button class="button-53 current" role="button">Licytacja trwa</button></a>';
       } else {
           urlParams.set('id', auction.id)
           button = '<a href="auction.html?'+urlParams+'"><button class="button-53" role="button">Licytacja zaplanowana</button></a>';
       }
       // console.log(auction);
       const price = auction.actualPrice;
       eventsContainer.innerHTML += `
            <article class="stays-grid-item">
              <div>
                <h2>${roomName}</h2>
                <h3><i>Dla ${accommodationCapacity} osób</i></h3>
                <h4>Termin: ${reservationStartDate} - ${reservationEndDate}</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mauris nunc, condimentum ultrices mauris vitae, convallis sollicitudin tortor. Integer ante eros, luctus non nibh at, auctor iaculis neque. Suspendisse lobortis pretium libero, blandit fermentum sapien eleifend sit amet. Cras ullamcorper quam mi, eu iaculis metus aliquam non. Phasellus dignissim metus congue nisl suscipit consequat. Integer eros erat, convallis vel enim quis, aliquet rhoncus odio. Curabitur a vestibulum tellus. Donec maximus mi vel augue placerat molestie. .</p>
                Aktualna cena: <b>${price} zł</b>
                ${button}
                <p><i>początek licytacji: ${auctionStartDate}</i></p>
                <p><i>koniec licytacji: ${auctionEndDate}</i></p>
              </div>
            </article>
    `;
   })
});
// eventsContainer.innerHTML += `<div/>`;
