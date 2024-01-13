const redirectToLogin = () => window.location.replace('login.html');
const userId = localStorage.getItem('userId');
const makeRequest = url => fetch(url, { method: 'GET' }) 

if (false && userId === null) redirectToLogin();




// profile picture

// const image = fetch()
// document.getElementById('user-profile').src = image;


// cards

function makeCard({ title, company, description, location, email, salary }) {
    return new DOMParser().parseFromString(`
    <div class="card">
        <div>
            <h2>${title}</h2>
            <small>${company}</small>
        </div>
        <div class="card-details">
            <p>
                <span class="material-symbols-outlined">location_on</span>
                ${location}
            </p>
            <p>
                <span class="material-symbols-outlined">mail</span>
                ${email}
            </p>
            <p>
                <span class="material-symbols-outlined">attach_money</span>
                ${salary}
            </p>
        </div>
        <p class="card-description">${description}</p>
    </div>
    `, 'text/html').body.children[0];
}

const container = document.getElementById('cards-container');
const offers = [];
for (let n = 1; n< 10; n++)
    container.appendChild(makeCard({
        title: 'job '+n,
        company: 'company '+n,
        description: 'come work at our'.repeat(n),
        location: 'brebeuf montreal',
        email: 'business@company'+n+'.com',
        salary: ''+1000*n,
    }));