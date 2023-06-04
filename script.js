async function getMenu() {
    await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
        .then(response => response.json())
        .then(data => {
            // Display the menu items on the webpage
            const menu = document.getElementById("menu-container");
            data.forEach(item => {
                const menuItem = document.createElement("div");
                menuItem.innerHTML = `
                        <img src="${item.imgSrc}" alt="menuImage">
                        <h3>${item.name}</h3>
                        <p><b>Price:</b> ${item.price}</p>
                        `;
                menu.appendChild(menuItem);
            });
            console.log(data);
        })
        .catch(error => console.error(error));
}

function takeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            // Randomly select three burgers from the menu
            const burgers = ["Classic Burger", "Cheeseburger", "Bacon Burger"];
            const order = burgers.sort(() => 0.5 - Math.random()).slice(0, 3);
            resolve(order);
        }, 2500);
    });
}

// Prepare a order and set order status: tru; and paid false...
function orderPrep() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// After that payment process start and paid set true...
function payOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// after successfully payment complition alert the message ...
function thankyouFnc() {
    alert("Thank you for eating with us today!");
}

async function orderProcess() {
    try {
        await getMenu();
        const order = await takeOrder();
        console.log("Order:", order);
        const orderStatus = await orderPrep();
        console.log("Order Status:", orderStatus);
        const paidStatus = await payOrder();
        console.log("Paid Status:", paidStatus);
        if (paidStatus.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error(error);
    }
}

// Call the orderProcess function to start the order process
orderProcess();