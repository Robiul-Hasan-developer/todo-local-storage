  // ********************* Toast Notification Js start *********************
  export function toastMessage(messageType, messageTitle, messageText, messageIcon) {
    let toastContainer = document.querySelector('#toast-container'); 

    let toast = document.createElement('div');
    toast.className = `toast-message ${messageType}`;

    toast.innerHTML = `
        <div class="toast-message__content">
            <span class="toast-message__icon">
                <i class="${messageIcon}"></i>
            </span>
            <div class="flex-grow-1">
                <div class="d-flex align-items-start justify-content-between mb-1">
                    <h6 class="toast-message__title">${messageTitle}</h6>
                    <button type="button" class="toast-message__close">
                        <i class="ph-bold ph-x"></i>
                    </button>
                </div>
                <span class="toast-message__text">${messageText}</span>
            </div>
        </div>
        <div class="progress__bar"></div>
    `;

    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('active');
    }, 50);

    let totalDuration = 3500;
    let startTime = Date.now();
    let remainingTime = totalDuration;
    let toastTimeout = setTimeout(hideToast, remainingTime);

    function hideToast() {
        toast.classList.remove('active');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }

    // Remove Toast
    let closeToast = toast.querySelector('.toast-message__close');
    closeToast.addEventListener('click', function () {
        toast.classList.remove('active');
        setTimeout(() => {
            toast.remove();
        }, 500);
    });
    // Remove Toast


    // Pause Timeout on Hover
    toast.addEventListener('mouseenter', function () {
        remainingTime -= Date.now() - startTime;
        clearTimeout(toastTimeout);
    });

    // Resume Timeout on Mouse Leave
    toast.addEventListener('mouseleave', function () {
        startTime = Date.now();
        toastTimeout = setTimeout(hideToast, remainingTime);
    });
}
// ********************* Toast Notification Js End *********************
