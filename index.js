const eventsContainer = document.querySelector('.stays-grid');
for (let i=0; i<10; i++) {
    eventsContainer.innerHTML += `
            <article class="stays-grid-item">
              <div>
                <h2>Pokój ${i + 1}</h2>
                <h4>${i + 1} VII 2023 - ${i + 8} VII 2023</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mauris nunc, condimentum ultrices mauris vitae, convallis sollicitudin tortor. Integer ante eros, luctus non nibh at, auctor iaculis neque. Suspendisse lobortis pretium libero, blandit fermentum sapien eleifend sit amet. Cras ullamcorper quam mi, eu iaculis metus aliquam non. Phasellus dignissim metus congue nisl suscipit consequat. Integer eros erat, convallis vel enim quis, aliquet rhoncus odio. Curabitur a vestibulum tellus. Donec maximus mi vel augue placerat molestie. .</p>
                <a href="#"><button class="button-53" role="button">Licytacja</button></a>
              </div>
            </article>
    `;
}
// eventsContainer.innerHTML += `<div/>`;
