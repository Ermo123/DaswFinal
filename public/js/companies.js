/*async function companyToHTML(company) {
    return await `<div class="media col-8 mt-2" id="modelo">
    <div class="media-left align-self-center mr-3">
        <img class="rounded-circle" style="width: 200px;" src="${company.logo}">
    </div>
    <div class="media-body">
        <h4>${company.name}</h4>
        <p>Location: ${company.location}</p>
    </div>
    <div class="media-right align-self-center">
        <div class="row">
            <a onclick="preloadEditModal('${company.id}')" href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#editModal"><i class="fas fa-pencil-alt edit"></i></a>
        </div>
        <div class="row">
            <a onclick="preloadDeleteModal('${company.id}')" href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash-alt remove"></i></i></a>
        </div>
    </div>
    </div>
    `
}
*/



async function showCompanies() {
    let resp = await fetch('/api/companies', {
        method: 'GET',
        headers: {
            'x-auth': sessionStorage.token
        }
    });

    let companies = await resp.json()
    console.log(companies)

    let div = document.querySelector('#info')

    companies.forEach(xd => {
        div.insertAdjacentHTML("beforeend",

            `<div class="media col-8 mt-2" id="modelo">
    <div class="media-left align-self-center mr-3">
        <img class="rounded-circle" style="width: 200px;" src="${xd.logo}">
    </div>
    <div class="media-body">
        <h4>${xd.nombre}</h4>
        <p>Location: ${xd.location}</p>
    </div>
    <div class="media-right align-self-center">
        <div class="row">
            <a onclick="preloadEditModal('${xd.nombre}')" href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#editModal"><i class="fas fa-pencil-alt edit"></i></a>
        </div>
        <div class="row">
            <a onclick="preloadDeleteModal('${xd.nombre}')" href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash-alt remove"></i></i></a>
        </div>
    </div>
    </div>
    `
        )
    });
}


document.addEventListener('DOMContentLoaded', async () => {

    await showCompanies()
})

async function preloadEditModal(nombre) {

    let resp = await fetch('/api/companies/' + nombre, {
        method: 'GET',
        headers: {
            'x-auth': sessionStorage.token
        }
    });

    let company = await resp.json()
    console.log(company)
    // document.getElementById('companyIdEditModal').value = companyId;
    document.getElementById('editNombre').value = company.nombre;
    document.getElementById('editLogo').value = company.logo;
    document.getElementById('editLocation').value = company.location;
}

async function preloadDeleteModal(nombre) {

    document.getElementById('companyIdDeleteModal').value = nombre;
}




async function editCompany() {
    //event.preventDefault();

    let nombre = document.getElementById('editNombre').value
    let logo = document.getElementById('editLogo').value
    let location = document.getElementById('editLocation').value

    let company = {
        nombre, 
        logo, 
        location
    }

    console.log(company)

    let resp = await fetch('/api/companies/' + nombre, {
        method: 'PUT',
        body: JSON.stringify(company),
        headers: {
            'Content-Type': 'application/json',
            'x-auth': sessionStorage.token
        }
    });

    window.location.href = '/companies';
     console.log(nombre, location, logo)
    //console.log(datos)
}

async function addCompany() {

    let nombre = document.querySelector('input[name="nombre"]').value
    let logo = document.querySelector('input[name="logo"]').value
    let location = document.querySelector('input[name="location"]').value

    let company = {
        nombre, 
        logo, 
        location
    }

    console.log(company)

    let resp = await fetch('/api/companies/', {
        method: 'POST',
        body: JSON.stringify(company),
        headers: {
            'Content-Type': 'application/json',
            'x-auth': sessionStorage.token
        }
    });

    window.location.href = '/companies';
     console.log(nombre, location, logo)
    //console.log(datos)

}


async function deleteCompany() {

    let nombre = document.getElementById('companyIdDeleteModal').value
    console.log(nombre)
    let resp = await fetch('/api/companies/' + nombre, {
        method: 'DELETE',
        headers: {
            'x-auth': sessionStorage.token
        }
    });


    window.location.href = '/companies';

}
