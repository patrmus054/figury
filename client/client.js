const connection = new WebSocket("ws://192.168.0.105:4444");

connection.addEventListener("open", (ws) => {
    const data = { "type": "loadRequest" }
    connection.send(JSON.stringify(data));
});

connection.addEventListener("message", (ws) => {
    const data = JSON.parse(ws.data);

    if (data.type === "moved") {
        refreshPositons(data);
    }
});

const refreshPositons = (data) => {
    const className = data.class;
    const elementToChange = canvas.querySelector(`.${className}`);
    const top = parseInt(data.top);
    const left = parseInt(data.left);

    setTop(elementToChange, top);
    setLeft(elementToChange, left);
}

const getAndSendData = (figure) => {
    data = {
        "type": "moved",
        "class": figure.className,
        "top": getTop(figure),
        "left": getLeft(figure)
    }
    ws.send(JSON.stringify(data));
}

const initializeFiguresEvents = () => {
    for (let i = 0; i < figures.length; i++) {
        const figure = figures[i];

        const sendData = () => {
            if (connection.readyState == connection.OPEN) {

                data = {
                    "type": "moved",
                    "class": figure.className.replace("figure ", ""),
                    "top": getTop(figure),
                    "left": getLeft(figure)
                }
                connection.send(JSON.stringify(data));
                removeListeners;
            }
        }

        const removeListeners = () => {
            page.addEventListener("touchend", () => {
                page.removeEventListener("touchmove", sendData);
            });

            page.addEventListener("mouseup", () => {
                page.removeEventListener("mousemove", sendData);
            });
        }

        const initializeOnMove = () => {
            page.addEventListener("mousemove", sendData);
            page.addEventListener("touchmove", sendData);

            removeListeners();
        }

        figure.addEventListener("mousedown", initializeOnMove);
        figure.addEventListener("touchstart", initializeOnMove);

        move(figure);
        moveTouch(figure);
    }
}

initializeFiguresEvents();
