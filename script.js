let addlist = document.querySelectorAll('.clickadd')
let popuplay = document.querySelector('.popup-overlay')
let popup = document.querySelector('.popup')

document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains('svgdelete')) {
        let allDeleteButtons = Array.from(document.querySelectorAll('.svgdelete'));
        let allNotes = Array.from(document.querySelectorAll('.note'));
        let index = allDeleteButtons.indexOf(event.target);

        if (index !== -1 && allNotes[index]) {
            allNotes[index].classList.add('fade-out');
            allNotes[index].addEventListener('transitionend', function () {
                this.remove();
            }, { once: true });
        }
    }
});

document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains('svgedit')) {

        let allEditButtons = Array.from(document.querySelectorAll('.svgedit'));
        let allNotes = Array.from(document.querySelectorAll('.note'));
        let currentNoteIndex = allEditButtons.indexOf(event.target);

        if (currentNoteIndex !== -1 && allNotes[currentNoteIndex]) {
            let currentNote = allNotes[currentNoteIndex];

            let popupHTML = `<div class="popup-overlay"></div>
                <div class="popup" data-note-index="${currentNoteIndex}">
                    <img class="cancelsvg" src="cancel.svg" alt="">
                    <textarea class="heading content" rows="6" cols="40">${currentNote.firstElementChild.innerHTML.trim()}</textarea>
                    <textarea class="content" id="myTextarea" rows="14" cols="40">${currentNote.children[1].innerHTML.trim().replace(/^<p>|<\/p>$/g, '')}</textarea>
                    <span class="savebtn">Save</span>
                </div>`;

            document.body.insertAdjacentHTML('beforeend', popupHTML);

        }
    }
});

document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains('cancelsvg')) {
        let popupOverlay = document.querySelector('.popup-overlay');
        let popup = document.querySelector('.popup');

        if (popupOverlay) popupOverlay.remove();
        if (popup) popup.remove();
    }
});

document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains('clickadd')) {

        let allNotes = Array.from(document.querySelectorAll('.note'));

        let popupHTML = `<div class="popup-overlay"></div>
                <div class="popup" data-note-index="-1">
                    <img class="cancelsvg" src="cancel.svg" alt="">
                    <textarea class="heading content" rows="6" cols="40">Title</textarea>
                    <textarea class="content" id="myTextarea" rows="14" cols="40">Note...</textarea>
                    <span class="savebtn">Save</span>
                </div>`;

        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }
});

document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains('savebtn')) {
        let popup = document.querySelector('.popup');
        let noteIndex = parseInt(popup.getAttribute('data-note-index'));

        if (noteIndex == -1) {

            let headingTextarea = popup.querySelector('.heading');
            let contentTextarea = popup.querySelector('#myTextarea');

            let newHeading = headingTextarea.value.trim();
            let newContent = contentTextarea.value.trim();

            const noteContainer = document.querySelector('.notecontainer');

            let htmlstr = `<div class="note">
                <div class="heading">
                    ${newHeading}
                </div>
                <div class="content">
                    <p>${newContent}</p>
                </div>
                <div class="svgs">
                    <img class="svgedit" src="edit.svg" alt="">
                    <img class="svgdelete" src="delete.svg" alt="">
                </div>
            </div>`

            noteContainer.insertAdjacentHTML('afterbegin', htmlstr);

            let popupOverlay = document.querySelector('.popup-overlay');
            if (popupOverlay) popupOverlay.remove();
            if (popup) popup.remove();
        }
        else {

            let headingTextarea = popup.querySelector('.heading');
            let contentTextarea = popup.querySelector('#myTextarea');

            let newHeading = headingTextarea.value.trim();
            let newContent = contentTextarea.value.trim();

            let allNotes = Array.from(document.querySelectorAll('.note'));

            if (allNotes[noteIndex]) {

                allNotes[noteIndex].firstElementChild.innerHTML = newHeading;

                if (newContent && !newContent.startsWith('<p>')) {
                    newContent = `<p>${newContent}</p>`;
                }
                allNotes[noteIndex].children[1].innerHTML = newContent;
            }

            let popupOverlay = document.querySelector('.popup-overlay');
            if (popupOverlay) popupOverlay.remove();
            if (popup) popup.remove();
        }
    }
});
