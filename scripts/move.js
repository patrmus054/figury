const move = (target) => {
    let startingTop;
    let startingLeft;

    const initializeMoving = (event) => {
        getStartingMouseCoordinates(event);
        event.preventDefault();
        startingTop = getTop(target);
        startingLeft = getLeft(target);

        page.addEventListener("mousemove", moveElement);
        page.addEventListener("mouseup", stopMoving);
    }

    const moveElement = (event) => {
        getMouseCoordinates(event);
        let newLeft = mouseX - mouseX0 + startingLeft;
        let newTop = mouseY - mouseY0 + startingTop;

        if (newTop < 0) newTop = 0;
        else if (newTop + getHeight(target) > canvasHeight) newTop = canvasHeight - getHeight(target);

        if (newLeft < 0) newLeft = 0;
        else if (newLeft + getWidth(target) > canvasWidth) newLeft = canvasWidth - getWidth(target);

        setTop(target, newTop);
        setLeft(target, newLeft);
    }

    const stopMoving = () => {
        page.removeEventListener("mousemove", moveElement);
        page.removeEventListener("mouseup", stopMoving);
    }

    target.addEventListener("mousedown", initializeMoving);
}




const moveTouch = (target) => {
    let startingTop;
    let startingLeft;

    const initializeMoving = (event) => {
        getStartingTouchCoordinates(event);
        event.preventDefault();
        startingTop = getTop(target);
        startingLeft = getLeft(target);

        page.addEventListener("touchmove", moveElement);
        page.addEventListener("touchend", stopMoving);
    }

    const moveElement = (event) => {
        getTouchCoordinates(event);
        let newLeft = mouseX - mouseX0 + startingLeft;
        let newTop = mouseY - mouseY0 + startingTop;

        if (newTop < 0) newTop = 0;
        else if (newTop + getHeight(target) > canvasHeight) newTop = canvasHeight - getHeight(target);

        if (newLeft < 0) newLeft = 0;
        else if (newLeft + getWidth(target) > canvasWidth) newLeft = canvasWidth - getWidth(target);


        setTop(target, newTop);
        setLeft(target, newLeft);
    }

    const stopMoving = () => {
        page.removeEventListener("touchmove", moveElement);
        page.removeEventListener("touchend", stopMoving);
    }

    target.addEventListener("touchstart", initializeMoving);
}