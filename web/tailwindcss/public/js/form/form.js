async function CreateQuestion_One() {
    const el = document.getElementById("questions");
    const numbers_of_q = el.dataset.numberq
    const numOf_ques = parseInt(numbers_of_q)

    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]
    let data = {
        "type": 1
    }
    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/q/'+u+'/'+f+'?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
        //  body: JSON.stringify({
        //      "type": 1
        //  })
    })
    .then(response => response.text())
    .then(data => {
        const opt = [{
            "number": 1,
            "opt": "Seçenek"
        }]
        createQuestionHtmlElements_One(data.split('"')[1], numOf_ques+1, false, "Soru", opt)
        el.dataset.numberq = numOf_ques+1
    })
}

async function CreateQuestion_Paragraph() {
    const el = document.getElementById("questions");
    const numbers_of_q = el.dataset.numberq
    const numOf_ques = parseInt(numbers_of_q)

    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]
    let data = {
        "type": 2
    }
    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/q/'+u+'/'+f+'?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
        //body: JSON.stringify({
        //    "type": 2
        //})
    })
    .then(response => response.text())
    .then(data => {
        createQuestionHtmlElements_Paragraph(data.split('"')[1], numOf_ques+1, false, "Soru")
        el.dataset.numberq = numOf_ques+1
    })
}

async function CreateQuestion_Multiple() {
    const el = document.getElementById("questions");
    const numbers_of_q = el.dataset.numberq
    const numOf_ques = parseInt(numbers_of_q)

    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]
    let data = {
        "type": 3
    }
    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/q/'+u+'/'+f+'?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
        //  body: JSON.stringify({
        //      "type": 3
        //  })
    })
    .then(response => response.text())
    .then(data => {
        const opt = [{
            "number": 1,
            "opt": "İşaretleyiniz"
        }]
        createQuestionHtmlElements_Multiple(data.split('"')[1], numOf_ques+1, false, "Soru", opt)
        el.dataset.numberq = numOf_ques+1
    })
}

async function SaveQuestionChanges(element) {
    question_no = element.dataset.qno
    const el = document.getElementById(question_no)
    const ques = el.firstChild.firstChild.firstChild.value
    const isRequired = el.firstChild.firstChild.children[2].children[1].firstChild.firstChild.firstChild.checked
    
    const q = element.getAttribute("id")
    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]

    if (ques != "") {
        const el_opts = el.firstChild.firstChild.children[2].firstChild
        const opt_num = el_opts.dataset.optnum
        if (opt_num != 0) {
            const options = []
            for (let i = 0; i < opt_num; i++) {
                const opt = el_opts.children[i].children[1].firstChild.value
                options.push({
                    "opt": opt
                });
            }
            let data = {
                "ques": ques,
                "isrequired": isRequired,
                "options": options
            }
            const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/q/'+u+'/'+f+'/'+q+'?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
                }
                //body: data
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById("response").innerHTML = "Yaptığınız değişiklikler kaydedildi."
                } else {
                    document.getElementById("response").innerHTML = "Soru silinemedi."
                }
            });

        }
    }
}

async function SaveQuestionChanges_Paragraph(element) {
    question_no = element.dataset.qno
    const el = document.getElementById(question_no)
    const ques = el.firstChild.firstChild.firstChild.value
    const isRequired = el.firstChild.firstChild.children[2].firstChild.children[1].firstChild.firstChild.firstChild.checked
    
    const q = element.getAttribute("id")
    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]

    if (ques != "") {
        let data = {
            "ques": ques,
            "isrequired": isRequired,
        }
        const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/q/'+u+'/'+f+'/'+q+'?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
            }
            //body: data
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("response").innerHTML = "Yaptığınız değişiklikler kaydedildi."
            } else {
                document.getElementById("response").innerHTML = "Soru silinemedi."
            }
        });
    }
}

async function DeleteQuestion(element) {
    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]

    const numbers_of_q = element.dataset.qno
    const qNo = parseInt(numbers_of_q)

    const q = element.getAttribute("id")

    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/q/'+u+'/'+f+'/'+q, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
    })
    .then(response => {
        if (response.ok) {
            const main = document.getElementById("questions");
            const numOf_ques = parseInt(main.dataset.numberq)
            main.dataset.numberq = numOf_ques - 1
            const del = document.getElementById(qNo)
            del.remove()
            for (let i = qNo+1; i <= numOf_ques; i++) {
                const elem = document.getElementById(i)
                elem.dataset.qno = i-1
                elem.setAttribute("id", i-1);

                const del_btn = elem.lastChild
                del_btn.dataset.qno = i-1

                const save_btn =  elem.firstChild.firstChild.children[2].lastChild
                save_btn.dataset.qno = i-1

                const copy_btn =  elem.firstChild.firstChild.children[2].children[1].lastChild
                copy_btn.dataset.qno = i-1

                //  const opt_del_btn =  elem.firstChild.firstChild.children[2].firstChild.firstChild.lastChild
                //  opt_del_btn.dataset.qno = i-1
                //  const opt_del_btn_up =  elem.firstChild.firstChild.children[2].firstChild.firstChild
                //  opt_del_btn_up.getAttribute("id").s

                //  const elee = document.getElementById("optionGenerator"+qNo)
                //  optNum = parseInt(elee.dataset.optnum)
                //  for (let j = 1; j <= optNum; j++) {
                //      const elementtt = document.getElementById(qNo+"-"+j)
                //      qNo = --qNo
                //      elementtt.id = qNo+"-"+j
                //      const del_btn = elementtt.lastChild
                //      del_btn.dataset.qno = qNo - 1
                //  }

                const create_opt_btn = elem.firstChild.children[1].firstChild
                create_opt_btn.dataset.qno = qNo - 1
            } 
            document.getElementById("response").innerHTML = "Yaptığınız değişiklikler kaydedildi." 
        } else {
            document.getElementById("response").innerHTML = "Soru silinemedi."
        }
    })
    .catch(error => {
        console.log(error);
    });
}

async function createOptionHtmlElements_One(qNo, option, qid) {
    const ATA = document.getElementById("optionGenerator"+qNo);
    if (option == null) {
        ATA.dataset.optnum = 1
    } else {
        ATA.dataset.optnum = option.length + 1
    }

    const number = option["number"];
    const opt = option["opt"];
                
    const divv = document.createElement("div")
    divv.classList.add("flex", "justify-between", "mt-4")
    divv.setAttribute("id", qNo + "-" + number)
    // Delete Question Button
    const divv4= document.createElement("div")
    divv4.classList.add("ml-6", "shadow-lg", "w-6", "h-6", "bg-red-600", "rounded-md", "cursor-pointer")
    divv4.setAttribute("onclick", "DeleteOption(this)")
    divv4.setAttribute("id", qid)
    divv4.setAttribute("data-qNo", qNo)
    divv4.setAttribute("data-optNo", number)
    const divv3 = document.createElement("div")
    divv3.classList.add("select-none", "text-center", "text-sm")
    divv3.innerHTML = "x"
    divv4.appendChild(divv3)
    //
    const divv1 = document.createElement("div")
    divv1.classList.add("m-1")
    const divv2 = document.createElement("div")
    divv2.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")
    divv.appendChild(divv1)
    divv.appendChild(divv2)
    divv.appendChild(divv4)
    textareaa = document.createElement("textarea")
    textareaa.setAttribute("maxlength", 500)
    textareaa.classList.add("overflow-hidden", "pt-2", "border-gray-200", "placeholder-opacity-80", "max-h-44", "min-h-text-opt", "border-transparent", "w-auto", "h-10",  "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textareaa.setAttribute("placeholder", "Seçenek")
    textareaa.innerHTML = opt
    divv2.appendChild(textareaa)
    const svgg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svgg.classList.add("w-8", "h-8")
    divv1.appendChild(svgg)
    const gg = document.createElementNS("http://www.w3.org/2000/svg", "g")
    svgg.appendChild(gg)
    const pathh = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pathh.setAttributeNS(null, "d", "M18 24c3.3 0 6-2.7 6-6s-2.7-6-6-6s-6 2.7-6 6s2.7 6 6 6zH18M18 14C20 14 22 16 22 18C22 20 20 22 18 22C16 22 14 20 14 18C14 16 16 14 18 14M18 16C19 16 20 17 20 18C20 19 19 20 18 20C17 20 16 19 16 18C16 17 17 16 18 16")
    gg.appendChild(pathh)
    ATA.appendChild(divv)
}

async function createOptionHtmlElements_Multiple(qNo, option, qid) {
    const ATA = document.getElementById("optionGenerator"+qNo);
    if (option == null) {
        ATA.dataset.optnum = 1
    } else {
        ATA.dataset.optnum = option.length + 1
    }


    const number = option["number"];
    const opt = option["opt"];
                
    const divv = document.createElement("div")
    divv.classList.add("flex", "justify-between", "mt-4")
    divv.setAttribute("id", qNo + "-" + number)
    // Delete Question Button
    const divv4= document.createElement("div")
    divv4.classList.add("ml-6", "shadow-lg", "w-6", "h-6", "bg-red-600", "rounded-md", "cursor-pointer")
    divv4.setAttribute("onclick", "DeleteOption(this)")
    divv4.setAttribute("id", qid)
    divv4.setAttribute("data-qNo", qNo)
    divv4.setAttribute("data-optNo", number)
    const divv3 = document.createElement("div")
    divv3.classList.add("select-none", "text-center", "text-sm")
    divv3.innerHTML = "x"
    divv4.appendChild(divv3)
    //
    const divv1 = document.createElement("div")
    divv1.classList.add("m-1")
    const divv2 = document.createElement("div")
    divv2.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")
    divv.appendChild(divv1)
    divv.appendChild(divv2)
    divv.appendChild(divv4)
    textareaa = document.createElement("textarea")
    textareaa.setAttribute("maxlength", 500)
    textareaa.classList.add("overflow-hidden", "pt-2", "border-gray-200", "placeholder-opacity-80", "max-h-44", "min-h-text-opt", "border-transparent", "w-auto", "h-10",  "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textareaa.setAttribute("placeholder", "Seçenek")
    textareaa.innerHTML = opt
    divv2.appendChild(textareaa)
    const svgg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svgg.classList.add("w-8", "h-8")
    divv1.appendChild(svgg)
    const gg = document.createElementNS("http://www.w3.org/2000/svg", "g")
    svgg.appendChild(gg)
    const pathh = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pathh.setAttributeNS(null, "d", "M5 5 25 5 25 25 5 25 5 5M8 8 8 22 22 22 22 8 8 8M10 15 12 13.5 14.5 16 18.5 9.5 20 11.5 15 19.5 10 15")
    gg.appendChild(pathh)
    ATA.appendChild(divv)
}

async function CreateOption_One(element) {
    const qNo = element.dataset.qno
    const gen = document.getElementById("optionGenerator"+qNo);
    const numbers_of_o = parseInt(gen.dataset.optnum)
    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]
    const q = element.getAttribute("id")
    let data = {
        type: 1
    }
    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/o/'+u+'/'+f+'/'+q+'?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
        //  body: JSON.stringify({
        //      type: 1
        //  })
    })
    .then(response => {
        if (response.ok) {
            const opt = {
                "number": numbers_of_o + 1,
                "opt": "Seçenek"
            }
            createOptionHtmlElements_One(qNo, opt, q)
            gen.dataset.optnum = numbers_of_o+1
        }
    })
    .catch(error => {
        console.log(error);
    });

}

async function CreateOption_Multiple(element) {
    const qNo = element.dataset.qno
    const gen = document.getElementById("optionGenerator"+qNo);
    const numbers_of_o = parseInt(gen.dataset.optnum)
    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]
    const q = element.getAttribute("id")
    let data = {
        type: 3
    }
    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/o/'+u+'/'+f+'/'+q+'?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
        //  body: JSON.stringify({
        //      type: 3
        //  })
    })
    .then(response => {
        if (response.ok) {
            const opt = {
                "number": numbers_of_o + 1,
                "opt": "İşaretleyiniz"
            }
            createOptionHtmlElements_Multiple(qNo, opt, q)
            gen.dataset.optnum = numbers_of_o+1
        }
    })
    .catch(error => {
        console.log(error);
    });

}

async function DeleteOption(element) {
    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]

    const q = element.getAttribute("id")
    const optNo = parseInt(element.dataset.optno)

    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/o/'+u+'/'+f+'/'+q+'/'+optNo, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
    })
    .then(response => {
        if (response.ok) {
            const qNo = parseInt(element.dataset.qno)
            
            const del = document.getElementById(qNo+"-"+optNo)
            del.remove()
            const gen = document.getElementById("optionGenerator"+qNo)
            const numbersOfOptions = parseInt(gen.dataset.optnum)
            gen.dataset.optnum = numbersOfOptions - 1
            for (let i = (optNo+1); i <= numbersOfOptions; i++) {
                console.log(i)
                const elem = document.getElementById(qNo+"-"+i)
                const attr = qNo + "-" + (i - 1)
                elem.setAttribute("id", attr)
                const last_child = elem.lastChild
                last_child.dataset.optno = i-1
            }
            //document.getElementById("response").innerHTML = "Yaptığınız değişiklikler kaydedildi." 
        } else {
            //document.getElementById("response").innerHTML = "Soru silinemedi."
        }
    })
    .catch(error => {
        console.log(error);
    });
}

async function SaveFormChanges() {
    const newName = document.getElementById("info-name").value
    const newDesc = document.getElementById("info-desc").value
    if (newName != "" && newDesc != "") {
        const u = window.location.search.substring(1).split("&")[0].split("=")[1]
        const f = window.location.search.substring(1).split("&")[1].split("=")[1]
        let data = {
            "name": newName,
            "desc": newDesc,
        }
        const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/f/'+u+'/'+f+'?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
            }
            //body: data
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("response").innerHTML = "Yaptığınız değişiklikler kaydedildi." 
            } else {
                document.getElementById("response").innerHTML = "Soru silinemedi."
            }
        });
    }
}

async function createFormHtmlElement(fid, fName, fDesc) {
    const info = document.getElementById("info")
    info.dataset.form = fid
    document.getElementById("info-name").value = fName
    document.getElementById("info-desc").value = fDesc
}

async function createQuestionHtmlElements_One(qid, qNo, isRequired, ques, Options) {
    const ATA = document.getElementById("questions")

    const div = document.createElement("div")
    div.setAttribute("data-qNo", qNo)
    div.setAttribute("data-q", qid)
    div.setAttribute("id", qNo)
    div.classList.add("flex", "justify-between")

    ATA.appendChild(div)

    const div1 = document.createElement("div")
    div1.classList.add("select-none", "w-full", "mb-16", "flex",  "p-2", "bg-white", "rounded-lg", "border-l-8", "pl-8", "border-black", "shadow-md")

    // Delete Question Button
    const div2 = document.createElement("div")
    div2.classList.add("ml-6", "shadow-lg", "w-8", "h-8", "bg-red-600", "rounded-md", "cursor-pointer")
    div2.setAttribute("onclick", "DeleteQuestion(this)")
    div2.setAttribute("id", qid)
    div2.setAttribute("data-qNo", qNo)

    div.appendChild(div1)
    div.appendChild(div2)

    const div3 = document.createElement("div")
    div3.classList.add("select-none", "text-center", "text-lg")
    div3.innerHTML = "x"
    div2.appendChild(div3)

    //
    const div4 = document.createElement("div")
    div4.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")

    const div5 = document.createElement("div")
    div5.classList.add("ml-1")
    div1.appendChild(div4)
    div1.appendChild(div5)

    // Add Option Button
    const div6 = document.createElement("div")
    div6.classList.add("shadow-lg", "w-8", "h-8", "bg-green-100", "rounded-md", "cursor-pointer")
    div6.setAttribute("onclick", "CreateOption_One(this)")
    div6.setAttribute("data-qNo", qNo)
    div6.setAttribute("id", qid)

    const div7 = document.createElement("div")
    div7.classList.add("select-none", "text-center", "text-lg")
    div7.innerHTML = "+"

    div6.appendChild(div7)
    div5.appendChild(div6)
    ////////

    textarea = document.createElement("textarea")
    textarea.setAttribute("maxlength", 500)
    textarea.classList.add("overflow-hidden", "text-xl", "pt-6", "font-medium", "placeholder-opacity-80", "max-h-56", "min-h-text-head", "border", "border-transparent", "w-auto", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textarea.setAttribute("placeholder", "Soru")
    textarea.innerHTML = ques

    const div8 = document.createElement("div")
    div8.classList.add("border-t-2")
    div4.appendChild(textarea)
    div4.appendChild(div8)

    const div9 = document.createElement("div")
    div9.classList.add("mt-4")

    div4.appendChild(div9)

    const div17 = document.createElement("div")
    div17.setAttribute("id", "optionGenerator"+qNo)
    if (Options != null) {
        div17.dataset.optnum = Options.length
    } else {
        div17.dataset.optnum = 0
    }

    div9.appendChild(div17)

    // Options
    if (Options != null) {
        if (Options.length != 0 && Options != null) {
            for (let i = 0; i < Options.length; i++) {
                const option = Options[i];
                const number = option["number"];
                const opt = option["opt"];
                
                const divv = document.createElement("div")
                divv.classList.add("flex", "justify-between", "mt-4")
                divv.setAttribute("id", qNo + "-" + number)
    
                // Delete Question Button
                const divv4= document.createElement("div")
                divv4.classList.add("ml-6", "shadow-lg", "w-6", "h-6", "bg-red-600", "rounded-md", "cursor-pointer")
                divv4.setAttribute("onclick", "DeleteOption(this)")
                divv4.setAttribute("id", qid)
                divv4.setAttribute("data-qNo", qNo)
                divv4.setAttribute("data-optNo", number)
    
                const divv3 = document.createElement("div")
                divv3.classList.add("select-none", "text-center", "text-sm")
                divv3.innerHTML = "x"
                divv4.appendChild(divv3)
    
                //
    
                const divv1 = document.createElement("div")
                divv1.classList.add("m-1")
    
                const divv2 = document.createElement("div")
                divv2.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")
    
                divv.appendChild(divv1)
                divv.appendChild(divv2)
                divv.appendChild(divv4)
    
                textareaa = document.createElement("textarea")
                textareaa.setAttribute("maxlength", 500)
                textareaa.classList.add("overflow-hidden", "pt-2", "border-gray-200", "placeholder-opacity-80", "max-h-44", "min-h-text-opt", "border-transparent", "w-auto", "h-10",  "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
                textareaa.setAttribute("placeholder", "Seçenek")
                textareaa.innerHTML = opt
                divv2.appendChild(textareaa)
    
                const svgg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
                svgg.classList.add("w-8", "h-8")
            
                divv1.appendChild(svgg)
                const gg = document.createElementNS("http://www.w3.org/2000/svg", "g")
                svgg.appendChild(gg)
                const pathh = document.createElementNS("http://www.w3.org/2000/svg", "path")
                pathh.setAttributeNS(null, "d", "M18 24c3.3 0 6-2.7 6-6s-2.7-6-6-6s-6 2.7-6 6s2.7 6 6 6zH18M18 14C20 14 22 16 22 18C22 20 20 22 18 22C16 22 14 20 14 18C14 16 16 14 18 14M18 16C19 16 20 17 20 18C20 19 19 20 18 20C17 20 16 19 16 18C16 17 17 16 18 16")
                gg.appendChild(pathh)
    
                div17.appendChild(divv)
                div17.setAttribute("data-optNum", Options.length)
            }
        }
    }


    const div10 = document.createElement("div")
    div10.classList.add("w-full", "flex", "justify-end")

    div9.appendChild(div10)

    const div11 = document.createElement("div")
    const div12 = document.createElement("div")
    div12.classList.add("flex", "ml-4", "cursor-pointer")
    div12.setAttribute("onclick", "CopyQuestion(this,1)")
    div12.setAttribute("id", qid)
    div12.setAttribute("data-qNo", qNo)


    div10.appendChild(div11)
    div10.appendChild(div12)

    div10.appendChild(div11)
    div10.appendChild(div12)

    const div13 = document.createElement("div")
    div13.classList.add("relative", "inline-block", "w-4", "align-middle", "select-none", "transition", "duration-200", "ease-in")
    const label = document.createElement("label")
    label.classList.add("text-xs", "text-gray-700")
    label.innerHTML = "Gerekli"

    const input = document.createElement("input")
    input.setAttribute("type", "checkbox")
    input.checked = isRequired
    div13.appendChild(input)
    div11.appendChild(div13)
    div11.appendChild(label)

    const div14 = document.createElement("div")
    div14.classList.add("mr-1")

    const label2 = document.createElement("label")
    label2.classList.add("text-xs", "mt-1", "text-gray-700")
    label2.innerHTML = "Kopyala"

    div12.appendChild(div14)
    div12.appendChild(label2)

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.classList.add("w-8", "h-8")

    div14.appendChild(svg)
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    svg.appendChild(g)
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttributeNS(null, "d", "M8 5 25 5 25 25 8 25 8 5M11 8 11 22 22 22 22 8 11 8M7 14 4 14 4 29 22 29 22 26 7 26 7 14")
    g.appendChild(path)

    // Save Button
    const div15 = document.createElement("div")
    div15.classList.add("shadow-lg", "mt-4", "w-auto", "h-8", "bg-blue-200", "rounded-md", "cursor-pointer")
    div15.setAttribute("id", qid)
    div15.setAttribute("onclick", "SaveQuestionChanges(this)")
    div15.setAttribute("data-qNo", qNo)
    div9.appendChild(div15)


    const div16 = document.createElement("div")
    div16.classList.add("select-none", "text-center", "text-lg")
    div16.innerHTML = "Kaydet"
    div15.appendChild(div16)
}

async function createQuestionHtmlElements_Paragraph(qid, qNo, isRequired, ques) {
    const ATA = document.getElementById("questions")

    const div = document.createElement("div")
    div.setAttribute("id", qNo)
    div.setAttribute("data-q", qid)
    div.setAttribute("data-qNo", qNo)

    div.classList.add("flex", "justify-between")

    ATA.appendChild(div)

    const div1 = document.createElement("div")
    div1.classList.add("select-none", "w-full", "mb-16", "flex",  "p-2", "bg-white", "rounded-lg", "border-l-8", "pl-8", "border-black", "shadow-md")

    // Delete Question Button
    const div2 = document.createElement("div")
    div2.classList.add("ml-6", "shadow-lg", "w-8", "h-8", "bg-red-600", "rounded-md", "cursor-pointer")
    div2.setAttribute("onclick", "DeleteQuestion(this)")
    div2.setAttribute("id", qid)
    div2.setAttribute("data-qNo", qNo)

    div.appendChild(div1)
    div.appendChild(div2)

    const div3 = document.createElement("div")
    div3.classList.add("select-none", "text-center", "text-lg")
    div3.innerHTML = "x"
    div2.appendChild(div3)

    //
    const div4 = document.createElement("div")
    div4.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")

    div1.appendChild(div4)

    textarea = document.createElement("textarea")
    textarea.setAttribute("maxlength", 500)
    textarea.classList.add("overflow-hidden", "text-xl", "pt-6", "font-medium", "placeholder-opacity-80", "max-h-56", "min-h-text-head", "border", "border-transparent", "w-auto", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textarea.setAttribute("placeholder", "Soru")
    textarea.innerHTML = ques

    const div8 = document.createElement("div")
    div8.classList.add("border-t-2")
    div4.appendChild(textarea)
    div4.appendChild(div8)

    const div9 = document.createElement("div")
    div9.classList.add("mt-4")

    div4.appendChild(div9)

    const div10 = document.createElement("div")
    div10.classList.add("flex", "justify-between")

    div9.appendChild(div10)

    const div11 = document.createElement("div")
    div11.classList.add("m-1")
    const div12 = document.createElement("div")
    div12.classList.add("w-full", "flex", "justify-end")

    div10.appendChild(div11)
    div10.appendChild(div12)

    const div17 = document.createElement("div")
    div12.appendChild(div17)

    const svgg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svgg.classList.add("w-8", "h-8")

    div11.appendChild(svgg)
    const gg = document.createElementNS("http://www.w3.org/2000/svg", "g")
    svgg.appendChild(gg)
    const pathh = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pathh.setAttributeNS(null, "d", "M5 7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7c-3.8 7.6-3.6 9.9-3.3 9.9c.3.1 3.4-6.5 6.7-9.2c5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3c1.3-1.2 2.4-1.5 3.5-1.7c.9-.2 1.8-.4 3-1.2c2.2-1.6 1.9-5.5 1.8-5.7z")
    gg.appendChild(pathh)

    const div13 = document.createElement("div")
    div13.classList.add("relative", "inline-block", "w-4", "align-middle", "select-none", "transition", "duration-200", "ease-in")
    const label = document.createElement("label")
    label.classList.add("text-xs", "text-gray-700")
    label.innerHTML = "Gerekli"

    const input = document.createElement("input")
    input.setAttribute("type", "checkbox")
    input.checked = isRequired
    div13.appendChild(input)
    div17.appendChild(div13)
    div17.appendChild(label)

    const div18 = document.createElement("div")
    div18.classList.add("flex", "ml-4", "cursor-pointer")
    div18.setAttribute("onclick", "CopyQuestion_Paragraph(this)")
    div18.setAttribute("id", qid)
    div18.setAttribute("data-qNo", qNo)
    
    const div14 = document.createElement("div")
    div14.classList.add("mr-1")

    const label2 = document.createElement("label")
    label2.classList.add("text-xs", "mt-1", "text-gray-700")
    label2.innerHTML = "Kopyala"

    div18.appendChild(div14)
    div18.appendChild(label2)

    div12.appendChild(div18)

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.classList.add("w-8", "h-8")

    div14.appendChild(svg)
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    svg.appendChild(g)
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttributeNS(null, "d", "M8 5 25 5 25 25 8 25 8 5M11 8 11 22 22 22 22 8 11 8M7 14 4 14 4 29 22 29 22 26 7 26 7 14")
    g.appendChild(path)

    // Save Button
    const div15 = document.createElement("div")
    div15.classList.add("shadow-lg", "mt-4", "w-auto", "h-8", "bg-blue-200", "rounded-md", "cursor-pointer")
    div15.setAttribute("id", qid)
    div15.setAttribute("onclick", "SaveQuestionChanges_Paragraph(this)")
    div15.setAttribute("data-qNo", qNo)

    const div16 = document.createElement("div")
    div16.classList.add("select-none", "text-center", "text-lg")
    div16.innerHTML = "Kaydet"
    div15.appendChild(div16)

    div4.appendChild(div15)
}

async function createQuestionHtmlElements_Multiple(qid, qNo, isRequired, ques, Options) {
    const ATA = document.getElementById("questions")

    const div = document.createElement("div")
    div.setAttribute("data-qNo", qNo)
    div.setAttribute("data-q", qid)
    div.setAttribute("id", qNo)
    div.classList.add("flex", "justify-between")

    ATA.appendChild(div)

    const div1 = document.createElement("div")
    div1.classList.add("select-none", "w-full", "mb-16", "flex",  "p-2", "bg-white", "rounded-lg", "border-l-8", "pl-8", "border-black", "shadow-md")

    // Delete Question Button
    const div2 = document.createElement("div")
    div2.classList.add("ml-6", "shadow-lg", "w-8", "h-8", "bg-red-600", "rounded-md", "cursor-pointer")
    div2.setAttribute("onclick", "DeleteQuestion(this)")
    div2.setAttribute("id", qid)
    div2.setAttribute("data-qNo", qNo)

    div.appendChild(div1)
    div.appendChild(div2)

    const div3 = document.createElement("div")
    div3.classList.add("select-none", "text-center", "text-lg")
    div3.innerHTML = "x"
    div2.appendChild(div3)

    //
    const div4 = document.createElement("div")
    div4.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")

    const div5 = document.createElement("div")
    div5.classList.add("ml-1")
    div1.appendChild(div4)
    div1.appendChild(div5)

    // Add Option Button
    const div6 = document.createElement("div")
    div6.classList.add("shadow-lg", "w-8", "h-8", "bg-green-100", "rounded-md", "cursor-pointer")
    div6.setAttribute("onclick", "CreateOption_Multiple(this)")
    div6.setAttribute("id", qid)
    div6.setAttribute("data-qNo", qNo)

    const div7 = document.createElement("div")
    div7.classList.add("select-none", "text-center", "text-lg")
    div7.innerHTML = "+"

    div6.appendChild(div7)
    div5.appendChild(div6)
    ////////

    textarea = document.createElement("textarea")
    textarea.setAttribute("maxlength", 500)
    textarea.classList.add("overflow-hidden", "text-xl", "pt-6", "font-medium", "placeholder-opacity-80", "max-h-56", "min-h-text-head", "border", "border-transparent", "w-auto", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textarea.setAttribute("placeholder", "Soru")
    textarea.innerHTML = ques

    const div8 = document.createElement("div")
    div8.classList.add("border-t-2")
    div4.appendChild(textarea)
    div4.appendChild(div8)

    const div9 = document.createElement("div")
    div9.classList.add("mt-4")

    div4.appendChild(div9)

    const div17 = document.createElement("div")
    div17.setAttribute("id", "optionGenerator"+qNo)
    if (Options != null) {
        div17.dataset.optnum = Options.length
    } else {
        div17.dataset.optnum = 0
    }

    div9.appendChild(div17)

    // Options
    if (Options != null) {
        if (Options.length != 0) {
            for (let i = 0; i < Options.length; i++) {
                const option = Options[i];
                const number = option["number"];
                const opt = option["opt"];
                
                const divv = document.createElement("div")
                divv.classList.add("flex", "justify-between", "mt-4")
                divv.setAttribute("id", qNo + "-" + number)
    
                // Delete Question Button
                const divv4= document.createElement("div")
                divv4.classList.add("ml-6", "shadow-lg", "w-6", "h-6", "bg-red-600", "rounded-md", "cursor-pointer")
                divv4.setAttribute("onclick", "DeleteOption(this)")
                divv4.setAttribute("id", qid)
                divv4.setAttribute("data-qNo", qNo)
                divv4.setAttribute("data-optNo", number)
    
                const divv3 = document.createElement("div")
                divv3.classList.add("select-none", "text-center", "text-sm")
                divv3.innerHTML = "x"
                divv4.appendChild(divv3)
    
                //
    
                const divv1 = document.createElement("div")
                divv1.classList.add("m-1")
    
                const divv2 = document.createElement("div")
                divv2.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")
    
                divv.appendChild(divv1)
                divv.appendChild(divv2)
                divv.appendChild(divv4)
    
                textareaa = document.createElement("textarea")
                textareaa.setAttribute("maxlength", 500)
                textareaa.classList.add("overflow-hidden", "pt-2", "border-gray-200", "placeholder-opacity-80", "max-h-44", "min-h-text-opt", "border-transparent", "w-auto", "h-10",  "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
                textareaa.setAttribute("placeholder", "Seçenek")
                textareaa.innerHTML = opt
                divv2.appendChild(textareaa)
    
                const svgg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
                svgg.classList.add("w-8", "h-8")
            
                divv1.appendChild(svgg)
                const gg = document.createElementNS("http://www.w3.org/2000/svg", "g")
                svgg.appendChild(gg)
                const pathh = document.createElementNS("http://www.w3.org/2000/svg", "path")
                pathh.setAttributeNS(null, "d", "M5 5 25 5 25 25 5 25 5 5M8 8 8 22 22 22 22 8 8 8M10 15 12 13.5 14.5 16 18.5 9.5 20 11.5 15 19.5 10 15")
                gg.appendChild(pathh)
    
                div17.appendChild(divv)
                div17.setAttribute("data-optNum", Options.length)
            }
        }
    }


    const div10 = document.createElement("div")
    div10.classList.add("w-full", "flex", "justify-end")

    div9.appendChild(div10)

    const div11 = document.createElement("div")
    const div12 = document.createElement("div")
    div12.classList.add("flex", "ml-4", "cursor-pointer")
    div12.setAttribute("onclick", "CopyQuestion(this,3)")
    div12.setAttribute("id", qid)
    div12.setAttribute("data-qNo", qNo)

    div10.appendChild(div11)
    div10.appendChild(div12)

    const div13 = document.createElement("div")
    div13.classList.add("relative", "inline-block", "w-4", "align-middle", "select-none", "transition", "duration-200", "ease-in")
    const label = document.createElement("label")
    label.classList.add("text-xs", "text-gray-700")
    label.innerHTML = "Gerekli"

    const input = document.createElement("input")
    input.setAttribute("type", "checkbox")
    input.checked = isRequired
    div13.appendChild(input)
    div11.appendChild(div13)
    div11.appendChild(label)

    const div14 = document.createElement("div")
    div14.classList.add("mr-1")

    const label2 = document.createElement("label")
    label2.classList.add("text-xs", "mt-1", "text-gray-700")
    label2.innerHTML = "Kopyala"

    div12.appendChild(div14)
    div12.appendChild(label2)

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.classList.add("w-8", "h-8")

    div14.appendChild(svg)
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    svg.appendChild(g)
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttributeNS(null, "d", "M8 5 25 5 25 25 8 25 8 5M11 8 11 22 22 22 22 8 11 8M7 14 4 14 4 29 22 29 22 26 7 26 7 14")
    g.appendChild(path)

    // Save Button
    const div15 = document.createElement("div")
    div15.classList.add("shadow-lg", "mt-4", "w-auto", "h-8", "bg-blue-200", "rounded-md", "cursor-pointer")
    div15.setAttribute("id", qid)
    div15.setAttribute("onclick", "SaveQuestionChanges(this)")
    div15.setAttribute("data-qNo", qNo)
    div9.appendChild(div15)


    const div16 = document.createElement("div")
    div16.classList.add("select-none", "text-center", "text-lg")
    div16.innerHTML = "Kaydet"
    div15.appendChild(div16)
}


async function CopyQuestion(element, ques_type) {
    const elem = document.getElementById("questions");
    const numbers_of_q = elem.dataset.numberq
    const numOf_ques = parseInt(numbers_of_q)

    question_no = element.dataset.qno
    const el = document.getElementById(question_no)
    const ques = el.firstChild.firstChild.firstChild.value
    const isRequired = el.firstChild.firstChild.children[2].children[1].firstChild.firstChild.firstChild.checked
    
    if (ques != "") {
        const el_opts = el.firstChild.firstChild.children[2].firstChild
        const opt_num = el_opts.dataset.optnum
        if (opt_num != 0) {
            const options = []
            for (let i = 0; i < opt_num; i++) {
                const opt = el_opts.children[i].children[1].firstChild.value
                options.push({
                    "opt": opt,
                    "number": i+1
                });
            }
            const data = {
                "ques": ques,
                "type": ques_type,
                "isrequired": isRequired,
                "options": options,
            }
            const u = window.location.search.substring(1).split("&")[0].split("=")[1]
            const f = window.location.search.substring(1).split("&")[1].split("=")[1]
            const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/q/'+u+'/'+f+'/copy?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
                }
                //body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(data => {
                if (ques_type == 1) {
                    createQuestionHtmlElements_One(data.split('"')[1], numOf_ques+1, isRequired, ques, options)
                }
                if (ques_type == 3) {
                    createQuestionHtmlElements_Multiple(data.split('"')[1], numOf_ques+1, isRequired, ques, options)
                }
                elem.dataset.numberq = numOf_ques+1
            })
        }
    }
    
}

async function CopyQuestion_Paragraph(element) {
    const elem = document.getElementById("questions");
    const numbers_of_q = elem.dataset.numberq
    const numOf_ques = parseInt(numbers_of_q)

    question_no = element.dataset.qno
    const el = document.getElementById(question_no)
    const ques = el.firstChild.firstChild.firstChild.value
    const isRequired = el.firstChild.firstChild.children[2].firstChild.children[1].firstChild.firstChild.firstChild.checked
    
    if (ques != "") {
        const el_opts = el.firstChild.firstChild.children[2].firstChild
        const opt_num = el_opts.dataset.optnum
        if (opt_num != 0) {
            const options = []
            for (let i = 0; i < opt_num; i++) {
                const opt = el_opts.children[i].children[1].firstChild.value
                options.push({
                    "opt": opt
                });
            }
            const data = {
                "ques": ques,
                "type": 2,
                "isrequired": isRequired,
                "options": options,
            }
            const u = window.location.search.substring(1).split("&")[0].split("=")[1]
            const f = window.location.search.substring(1).split("&")[1].split("=")[1]
            const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/q/'+u+'/'+f+'/copy?data='+Buffer.from(JSON.stringify(data)).toString("base64"), {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
                }
                //body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(data => {
                createQuestionHtmlElements_Paragraph(data.split('"')[1], numOf_ques+1, isRequired, ques)
                elem.dataset.numberq = numOf_ques+1
            })
        }
    }
    
}

window.onload = async function() {
    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]
    const view = document.getElementById("view_form")
    view.setAttribute("href", "http://surveybuilder.cloud/form/view?f="+f)
    const view_resp = document.getElementById("view_response")
    view_resp.setAttribute("href", "http://surveybuilder.cloud/form/answer?u="+u+"&f="+f)
    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/f/'+u+'/'+f, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
    })
    .then(response => response.json())
    .then(data => {
        const name = data["name"]
        const desc = data["desc"]
        const questions = data["questions"]
        createFormHtmlElement(f, name, desc);
        const ATA = document.getElementById("questions")
        
        if (questions != null) {
            if (questions.length != 0) {
                ATA.dataset.numberq = questions.length
                for (let i = 0; i < questions.length; i++) {
                    const question = questions[i];
                    const qid = question["_id"]
                    const ques = question["ques"];
                    const ques_type = question["type"];
                    const no = question["no"];
                    const isrequired = question["isrequired"];
                    const after = question["after"];
                    const options = question["options"];
                    ////////////////
                    if (ques_type == 1) {
                        createQuestionHtmlElements_One(qid, no, isrequired, ques, options)
                    }
                    if (ques_type == 2) {
                        createQuestionHtmlElements_Paragraph(qid, no, isrequired, ques, options)
                    }
                    if (ques_type == 3) {
                        createQuestionHtmlElements_Multiple(qid, no, isrequired, ques, options)
                    }
                }
            } else {
                ATA.dataset.numberq = "0"
            }
        } else {
            ATA.dataset.numberq = "0"
        }
    })
    .catch(error => {
        window.location.replace("http://surveybuilder.cloud/auth/login");
    });
}