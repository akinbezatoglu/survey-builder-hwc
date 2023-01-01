async function CreateForm() {
    const forms = document.querySelector('#forms');
    await fetch("http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com"+'/api/v1/f/'+forms.dataset.u, {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.text())
    .then(data => {
        const main_el = document.getElementById("forms")
        const uid = main_el.dataset.u;
        const last_form_el = main_el.lastChild;
        if (last_form_el == null) {
            const numOf_forms = 0
            createHomeFormElements(numOf_forms+1, uid, data.split('"')[1], "Adsız Başlık");
        } else {
            const numOf_forms = parseInt(last_form_el.getAttribute("id"));
            createHomeFormElements(numOf_forms+1, uid, data.split('"')[1], "Adsız Başlık");
        }
    });
}

async function DeleteForm(name) {
    //api/v1/f/{userid}/{formid}
    const id = name.getAttribute("name")
    const fid = document.getElementById(id).dataset.f;
    uid = document.getElementById("forms").dataset.u;
    await fetch("http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com"+'/api/v1/f/'+uid+'/'+fid, {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    });
    document.getElementById(id).remove()
}

async function createHomeFormElements(i, u, f, n) {
    const randColorCode = Math.floor(Math.random()*16777215).toString(16);
    const ATA = document.getElementById("forms")

    const div = document.createElement("div")
    div.setAttribute("id", i)
    div.setAttribute("data-f", f)
    div.classList.add("flex", "justify-evenly")

    const a = document.createElement("a")
    a.classList.add("select-none", "w-32", "h-64")
    a.setAttribute("href", "http://surveybuilder.cloud/form/edit.html?u="+u+"&f="+f)

    const bt = document.createElement("button")
    bt.classList.add("select-none", "text-lg", "font-mono", "mb-48", "ml-4")
    bt.setAttribute("onclick", "DeleteForm(this)")
    bt.setAttribute("name", i)
    bt.innerHTML = "X"

    const div2 = document.createElement("div")
    div2.classList.add("flex", "justify-end", "text-right", "shadow-lg", "w-32,", "h-32", "border-2", "border-gray-500")
    div2.setAttribute("style", "background-color:"+"#"+randColorCode+";")

    const p = document.createElement("p")
    p.classList.add("text-base", "font-mono", "my-1", "text-center", "border-2", "w-32", "border-gray-500", "overflow-clip", "overflow-hidden", "bg-white")
    p.innerHTML = n

    a.appendChild(div2)
    a.appendChild(p)
    div.appendChild(a)
    div.appendChild(bt)
    ATA.appendChild(div)
}

function Logout() {
    localStorage.removeItem("token")
    window.location.replace("http://auth.surveybuilder.cloud");
}

window.onload = function() {
    const forms = document.querySelector('#forms');
    const response = fetch("http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com"+'/api/v1/auth', {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
    })
    .then(response => response.json())
    .then(data => {
        const uid = data["_id"]
        forms.dataset.u = uid
        const name = data["name"]
        const lastname = data["lastname"]
        document.getElementById('User').innerHTML = name + " " + lastname
        const resp = fetch("http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com"+'/api/v1/f/'+uid, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.length != 0) {
                for (let i = 0; i < data.length; i++) {
                    const form = data[i];
                    fid = form["_id"]
                    fName = form["name"]
                    createHomeFormElements(i+1, uid, fid, fName);
                }
            }
        })
    })
    .catch(error => {
        window.location.replace("http://auth.surveybuilder.cloud");
    });
}
