async function createQuestionHtmlElements(qNo, ques, Options) {
    const ATA = document.getElementById("questions")

    const div = document.createElement("div")
    div.setAttribute("data-qNo", qNo)
    div.setAttribute("id", qNo)
    div.classList.add("flex", "justify-between")

    ATA.appendChild(div)

    const div1 = document.createElement("div")
    div1.classList.add("select-none", "w-full", "mb-16", "flex",  "p-2", "bg-white", "rounded-lg", "border-l-8", "pl-8", "border-black", "shadow-md")

    const div4 = document.createElement("div")
    div4.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")

    const div5 = document.createElement("div")
    div5.classList.add("ml-1")
    div1.appendChild(div4)
    div1.appendChild(div5)

    div.appendChild(div1)

    textarea = document.createElement("textarea")
    textarea.classList.add("overflow-hidden", "text-xl", "pt-6", "font-medium", "placeholder-opacity-80", "max-h-56", "min-h-text-head", "border", "border-transparent", "w-auto", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textarea.innerHTML = ques
    textarea.disabled = true;

    const div8 = document.createElement("div")
    div8.classList.add("border-t-2")
    div4.appendChild(textarea)
    div4.appendChild(div8)

    const div9 = document.createElement("div")
    div9.classList.add("mt-4")

    div4.appendChild(div9)

    const div17 = document.createElement("div")
    div17.setAttribute("id", "optionGenerator"+qNo)

    div9.appendChild(div17)

    // Options
    if (Options != null) {
        if (Options.length != 0) {
            for (let i = 0; i < Options.length; i++) {
                const opt = Options[i]["opt"];
                const repeat = Options[i]["repeat"];
                
                const divv = document.createElement("div")
                divv.classList.add("flex", "justify-between", "mt-4")
    
                const divv1 = document.createElement("div")
                divv1.classList.add("m-1")
    
                const divv2 = document.createElement("div")
                divv2.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")
    
                divv.appendChild(divv1)
                divv.appendChild(divv2)
    
                textareaa = document.createElement("textarea")
                textareaa.classList.add("overflow-hidden", "pt-2", "border-gray-200", "placeholder-opacity-80", "max-h-44", "min-h-text-opt", "border-transparent", "w-auto", "h-10",  "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
                textareaa.setAttribute("placeholder", "Kullanıcı cevap vermedi.")
                textareaa.innerHTML = opt
                textareaa.disabled = true;
                divv2.appendChild(textareaa)
    
                const textareaaa = document.createElement("textarea")
                textareaaa.classList.add("overflow-hidden", "text-center", "pt-2", "border-gray-200", "placeholder-opacity-80", "resize-x", "min-h-text-opt", "border-transparent", "max-w-repeat", "w-16", "h-10",  "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
                textareaaa.innerHTML = repeat
                textareaaa.disabled = true;
    
                divv1.appendChild(textareaaa)
                div17.appendChild(divv)
            }
        }
    }
}

async function createFormHtmlElement(fid, fName, fDesc) {
    const info = document.getElementById("info")
    info.dataset.form = fid
    document.getElementById("info-name").value = fName
    document.getElementById("info-desc").value = fDesc
}

window.onload = async function() {
    const u = window.location.search.substring(1).split("&")[0].split("=")[1]
    const f = window.location.search.substring(1).split("&")[1].split("=")[1]

    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/f/'+u+'/'+f, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
    })
    .then(response => response.json())
    .then(data => {
        const fname = data["name"]
        const fdesc = data["desc"]
        createFormHtmlElement(f,fname,fdesc)
        const response = fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/f/'+u+'/'+f+"/response", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var flag = 0
            if (data != null) {
                var numOfQues = data.length
                for (let i = 0; i < numOfQues; i++) {
                    console.log(numOfQues)
                    const question = data[i];
                    console.log(i)
                    const ques = question["ques"]
                    const answers = question["opt"]
                    if (answers != null) {
                        const answers_by_opt = []
                        answers.sort();
                        var current = "";
                        var cnt = 0;
                        for (let j = 0; j < answers.length; j++) {
                            if (answers[j] != current) {
                                if (cnt > 0) {
                                    answers_by_opt.push({
                                        "opt": current,
                                        "repeat": cnt
                                    })
                                    //document.write(current + ' comes --> ' + cnt + ' times<br>');
                                }
                                current = answers[j];
                                cnt = 1;
                            } else {
                                cnt++;
                            }
                        }
                        if (cnt > 0) {
                            answers_by_opt.push({
                                "opt": current,
                                "repeat": cnt
                            })
                            //document.write(current + ' comes --> ' + cnt + ' times');
                        }
                        console.log(answers_by_opt)
                        createQuestionHtmlElements(i,ques,answers_by_opt)
                        flag = 1
                    }
                    /////
                    // opt -> ["Seçenek", "Seçenek"] -> array elementlerini tek hale getir 
                    // {"opt": "", "opt_repeated": 15}
                    /////       
                }
                if (!flag) {
                    const resp = document.getElementById("response")
                    resp.innerHTML = "Anketinize yanıt gönderilmedi."
                }
            } else {
                const resp = document.getElementById("response")
                resp.innerHTML = "Anketinize yanıt gönderilmedi."
            }
        })
        .catch(error => {
            //window.location.replace("http://surveybuilder.cloud/auth/login");
        });
    })
    .catch(error => {
       // window.location.replace("http://surveybuilder.cloud/auth/login");
    })
}