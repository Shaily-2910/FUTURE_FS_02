/* Dark Mode */

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
    }
    else{
        localStorage.setItem("theme","light");
    }

});

if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark-mode");
}

/* Typing Animation */

const words = [
    "Web Developer",
    "C++ Programmer",
    "Node.js Developer",
    "Computer Science Student"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.getElementById("typing");

function typeEffect(){

    let currentWord = words[wordIndex];

    if(!isDeleting){
        typing.textContent =
        currentWord.substring(0,charIndex+1);

        charIndex++;

        if(charIndex === currentWord.length){
            isDeleting = true;

            setTimeout(typeEffect,1500);
            return;
        }
    }
    else{

        typing.textContent =
        currentWord.substring(0,charIndex-1);

        charIndex--;

        if(charIndex===0){
            isDeleting=false;
            wordIndex=(wordIndex+1)%words.length;
        }
    }

    setTimeout(typeEffect,isDeleting?70:120);
}

typeEffect();

/* Project Filter */

const filterButtons =
document.querySelectorAll(".filter-btn");

const projects =
document.querySelectorAll(".project-card");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const filter =
        button.getAttribute("data-filter");

        projects.forEach(project=>{

            if(
                filter==="all" ||
                project.classList.contains(filter)
            ){
                project.style.display="block";
            }
            else{
                project.style.display="none";
            }

        });

    });

});

/* Scroll Reveal Animation */

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

const sections =
document.querySelectorAll(".section");

sections.forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});

/* Visitor Counter */

let visitors =
localStorage.getItem("visitors");

if(!visitors){
    visitors = 0;
}

visitors++;

localStorage.setItem(
    "visitors",
    visitors
);

document.getElementById(
    "visitorCount"
).innerText =
`Visitors: ${visitors}`;

/* Contact Form */

const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener(
    "submit",
    async (e)=>{

        e.preventDefault();

        const data = {

            name:
            document.getElementById("name").value,

            email:
            document.getElementById("email").value,

            subject:
            document.getElementById("subject").value,

            message:
            document.getElementById("message").value

        };

        try{

            const response =
            await fetch(
                "http://localhost:5000/api/contact",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify(data)
                }
            );

            const result =
            await response.json();

            document.getElementById(
                "responseMessage"
            ).innerText =
            result.message;

            contactForm.reset();

        }
        catch(error){

            document.getElementById(
                "responseMessage"
            ).innerText =
            "Failed to send message.";

        }

    }
);

/* Mobile Menu */

const hamburger =
document.querySelector(".hamburger");

const navLinks =
document.querySelector(".nav-links");

hamburger.addEventListener("click",()=>{

    navLinks.classList.toggle("active");

});

/* Back to Top Button */

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){
        backToTop.style.display = "block";
    }
    else{
        backToTop.style.display = "none";
    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

/* Loader Screen */

window.addEventListener("load",()=>{

    const loader =
    document.getElementById("loader");

    loader.style.display = "none";

});