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
    div.setAttribute("data-isreq", isRequired)
    div.setAttribute("data-type", 1)
    div.classList.add("flex", "justify-between")

    ATA.appendChild(div)

    const div1 = document.createElement("div")
    div1.classList.add("select-none", "w-full", "mb-4", "flex",  "p-2", "bg-white", "rounded-lg", "border-l-8", "pl-8", "border-black", "shadow-md")

    div.appendChild(div1)

    //
    const div4 = document.createElement("div")
    div4.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full", "flex")

    const div5 = document.createElement("div")
    div5.classList.add("ml-1")
    div1.appendChild(div4)
    div1.appendChild(div5)

    const div20 = document.createElement("div")
    div20.classList.add("flex")
    textarea = document.createElement("textarea")
    textarea.classList.add("resize-none", "overflow-hidden", "text-xl", "pt-6", "font-medium", "placeholder-opacity-80", "max-h-56", "min-h-text-head", "border", "border-transparent", "w-full", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textarea.disabled = true;
    textarea.innerHTML = ques

    div20.append(textarea)

    if (isRequired) {
        const p = document.createElement("p")
        p.classList.add("text-red-600", "text-xl")
        p.innerHTML = "*"
    
        div20.appendChild(p)
    }

    const div8 = document.createElement("div")
    div8.classList.add("border-t-2")
    div4.appendChild(div20)
    div4.appendChild(div8)

    const div9 = document.createElement("div")
    div9.classList.add("mt-4")

    div4.appendChild(div9)

    const div17 = document.createElement("div")
    div17.setAttribute("id", "optionGenerator"+qNo)

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
    
                const divv1 = document.createElement("div")
                divv1.classList.add("m-1")
    
                const divv2 = document.createElement("div")
                divv2.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")
    
                divv.appendChild(divv1)
                divv.appendChild(divv2)
    
                textareaa = document.createElement("textarea")
                textareaa.classList.add("resize-none", "overflow-hidden", "pt-2", "border-gray-200", "placeholder-opacity-80", "max-h-44", "min-h-text-opt", "border-transparent", "w-full", "h-10",  "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
                textareaa.disabled = true;
                textareaa.innerHTML = opt
                divv2.appendChild(textareaa)
    
                const input = document.createElement("input")
                input.classList.add("mt-3")
                input.setAttribute("type", "radio")
                input.setAttribute("name", qNo)
                input.checked = false
            
                divv1.appendChild(input)

    
                div17.appendChild(divv)
                div17.setAttribute("data-optNum", Options.length)
            }
        }
    }

    const div19 = document.createElement("div")
    div19.setAttribute("onclick", "CleanOptions(this,"+ qNo +","+Options.length+")")
    div19.classList.add("w-full", "flex", "justify-end")
    const div21 = document.createElement("span")
    div21.classList.add("text-left", "text-md", "cursor-pointer", "mt-1")
    div21.innerHTML = "Seçimi Temizle"
    div19.appendChild(div21)
    div9.appendChild(div19)
}

async function createQuestionHtmlElements_Paragraph(qid, qNo, isRequired, ques) {
    const ATA = document.getElementById("questions")

    const div = document.createElement("div")
    div.setAttribute("id", qNo)
    div.setAttribute("data-q", qid)
    div.setAttribute("data-qNo", qNo)
    div.setAttribute("data-isreq", isRequired)
    div.setAttribute("data-type", 2)

    div.classList.add("flex", "justify-between")

    ATA.appendChild(div)

    const div1 = document.createElement("div")
    div1.classList.add("select-none", "w-full", "mb-4", "flex",  "p-2", "bg-white", "rounded-lg", "border-l-8", "pl-8", "border-black", "shadow-md")


    div.appendChild(div1)

    const div4 = document.createElement("div")
    div4.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")

    div1.appendChild(div4)

    const div20 = document.createElement("div")
    div20.classList.add("flex")
    textarea = document.createElement("textarea")
    textarea.classList.add("resize-none", "overflow-hidden", "text-xl", "pt-6", "font-medium", "placeholder-opacity-80", "max-h-56", "min-h-text-head", "border", "border-transparent", "w-full", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textarea.disabled = true;
    textarea.innerHTML = ques

    div20.append(textarea)

    if (isRequired) {
        const p = document.createElement("p")
        p.classList.add("text-red-600", "text-xl")
        p.innerHTML = "*"
    
        div20.appendChild(p)
    }

    const div8 = document.createElement("div")
    div8.classList.add("border-t-2")
    div4.appendChild(div20)
    div4.appendChild(div8)

    const div9 = document.createElement("div")
    div9.classList.add("mt-4", "flex")

    div4.appendChild(div9)

    const div10 = document.createElement("div")
    div10.classList.add("flex", "justify-between")

    div9.appendChild(div10)

    const div11 = document.createElement("div")
    div11.classList.add("m-1")
    
    div10.appendChild(div11)

    const svgg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svgg.classList.add("w-8", "h-8")

    div11.appendChild(svgg)
    const gg = document.createElementNS("http://www.w3.org/2000/svg", "g")
    svgg.appendChild(gg)
    const pathh = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pathh.setAttributeNS(null, "d", "M5 7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7c-3.8 7.6-3.6 9.9-3.3 9.9c.3.1 3.4-6.5 6.7-9.2c5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3c1.3-1.2 2.4-1.5 3.5-1.7c.9-.2 1.8-.4 3-1.2c2.2-1.6 1.9-5.5 1.8-5.7z")
    gg.appendChild(pathh)

    textarea1 = document.createElement("textarea")
    textarea1.setAttribute("maxlength", 500)
    textarea1.classList.add("overflow-hidden", "text-md", "pt-6", "font-medium", "placeholder-opacity-80", "max-h-56", "min-h-text-head", "border", "border-transparent", "w-full", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textarea1.setAttribute("placeholder", "Cevabınız...")
    div9.appendChild(textarea1)
}

async function createQuestionHtmlElements_Multiple(qid, qNo, isRequired, ques, Options) {
    const ATA = document.getElementById("questions")

    const div = document.createElement("div")
    div.setAttribute("data-qNo", qNo)
    div.setAttribute("data-q", qid)
    div.setAttribute("id", qNo)
    div.setAttribute("data-isreq", isRequired)
    div.classList.add("flex", "justify-between")
    div.setAttribute("data-type", 3)

    ATA.appendChild(div)

    const div1 = document.createElement("div")
    div1.classList.add("select-none", "w-full", "mb-4", "flex",  "p-2", "bg-white", "rounded-lg", "border-l-8", "pl-8", "border-black", "shadow-md")

    div.appendChild(div1)


    //
    const div4 = document.createElement("div")
    div4.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")

    const div5 = document.createElement("div")
    div5.classList.add("ml-1")
    div1.appendChild(div4)
    div1.appendChild(div5)

    const div20 = document.createElement("div")
    div20.classList.add("flex")
    textarea = document.createElement("textarea")
    textarea.classList.add("resize-none", "overflow-hidden", "text-xl", "pt-6", "font-medium", "placeholder-opacity-80", "max-h-56", "min-h-text-head", "border", "border-transparent", "w-full", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
    textarea.disabled = true;
    textarea.innerHTML = ques

    div20.append(textarea)

    if (isRequired) {
        const p = document.createElement("p")
        p.classList.add("text-red-600", "text-xl")
        p.innerHTML = "*"
    
        div20.appendChild(p)
    }

    const div8 = document.createElement("div")
    div8.classList.add("border-t-2")
    div4.appendChild(div20)
    div4.appendChild(div8)

    const div9 = document.createElement("div")
    div9.classList.add("mt-4")

    div4.appendChild(div9)

    const div17 = document.createElement("div")
    div17.setAttribute("id", "optionGenerator"+qNo)

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
    
                const divv1 = document.createElement("div")
                divv1.classList.add("m-1")
    
                const divv2 = document.createElement("div")
                divv2.classList.add("grid", "grid-cols-1", "gap-y-1", "w-full")
    
                divv.appendChild(divv1)
                divv.appendChild(divv2)
    
                textareaa = document.createElement("textarea")
                textareaa.classList.add("resize-none", "overflow-hidden", "pt-2", "border-gray-200", "placeholder-opacity-80", "max-h-44", "min-h-text-opt", "border-transparent", "w-auto", "h-10",  "rounded-md", "focus:outline-none", "focus:ring-2", "focus:border-transparent")
                textareaa.disabled = true;
                textareaa.innerHTML = opt
                divv2.appendChild(textareaa)
    
                const input = document.createElement("input")
                input.classList.add("mt-3")
                input.setAttribute("type", "checkbox")
                input.checked = false
            
                divv1.appendChild(input)
    
                div17.appendChild(divv)
                div17.setAttribute("data-optNum", Options.length)
            }
        }
    }

    const div19 = document.createElement("div")
    div19.setAttribute("onclick", "CleanOptions(this,"+ qNo +","+Options.length+")")
    div19.classList.add("w-full", "flex", "justify-end")
    const div21 = document.createElement("span")
    div21.classList.add("text-left", "text-md", "cursor-pointer", "mt-1")
    div21.innerHTML = "Seçimi Temizle"
    div19.appendChild(div21)
    div9.appendChild(div19)
}

async function CleanOptions(element, qno, optno) {
    if (optno != 0) {
        for (let i = 1; i <= optno; i++) {
            const el = document.getElementById(qno+"-"+i)
            el.firstChild.firstChild.checked = false       
        }
    }
}

async function SendForm() {
    var Send = true
    const answers = []
    const form_el = document.getElementById("info")
    const fid = form_el.dataset.form

    const ques_el = document.getElementById("questions")
    const numbersOfQues = ques_el.dataset.numberq
    for (let i = 1; i <= numbersOfQues; i++) {
        if (!Send) {
            break
        }
        const ques = document.getElementById(i)
        const qid = ques.dataset.q
        const type = ques.dataset.type
        const isReq = ques.dataset.isreq
        if (type == "1") {
            var x = 0
            const gen = document.getElementById("optionGenerator"+i)
            const optsNum = parseInt(gen.dataset.optnum)
            if (optsNum != 0) {
                for (let j = 1; j <= optsNum; j++) {
                    const opt_el = document.getElementById(i+"-"+j)
                    if (opt_el.firstChild.firstChild.checked) {
                        answers.push({
                            "quesID": qid,
                            "opt": opt_el.children[1].firstChild.innerHTML,
                            "optNum": j
                        })
                        x = 1
                        break
                    }
                }
                if (isReq && x == 0) {
                    Send = false
                }
            }
        }
        if (type == "2") {
            const gen = document.getElementById(i)
            const ans = gen.firstChild.firstChild.children[2].children[1].value
            if (isReq && ans != "") {
                answers.push({
                    "quesID": qid,
                    "opt": ans
                })
            } else {
                Send = false
            }
        }
        if (type == "3") {
            var n = 0
            const gen = document.getElementById("optionGenerator"+i)
            const optsNum = parseInt(gen.dataset.optnum)
            for (let j = 1; j <= optsNum; j++) {
                const opt_el = document.getElementById(i+"-"+j)
                if (opt_el.firstChild.firstChild.checked) {
                    answers.push({
                        "quesID": qid,
                        "opt": opt_el.children[1].firstChild.innerHTML,
                        "optNum": j
                    })
                    n = ++n
                }
            }
            if (isReq && n == 0) {
                Send = false
            }
        }
    }

    if (Send) {
        console.log(answers)
        const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/f/'+fid+'/view?data='+Buffer.from(JSON.stringify(answers)).toString("base64"), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
            }
            //body: JSON.stringify(answers)
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                window.location.replace("http://localhost:8000");
            }
        })
    } else {
        alert("Gerekli tüm soruları cevaplayınız.")
    }
}

window.onload = async function() {
    const f = window.location.search.substring(1).split("=")[1]
    const response = await fetch('http://0ecca7ee7d50468a9a6c8ab453478b5e.apic.ap-southeast-3.huaweicloudapis.com'+'/api/v1/f/'+f+"/view", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraW5iZXphdG9nbHVAZ21haWwuY29tIiwiZXhwIjoxNjcyNjU2MDY4LCJsYXN0bmFtZSI6IkJlemF0b8SfbHUiLCJuYW1lIjoiQWvEsW4iLCJwYXNzd29yZCI6ImFraW4xMjM0In0.C9U5y9L1sIrlYQ7I6XZcfBREgvQtWInO3TbkFuCGp4c"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data["isVisible"]) {
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

        } else {
            window.location.replace("http://localhost:8000");
        }
    })
    .catch(error => {
        window.location.replace("http://localhost:8000/auth/login");
    });
}