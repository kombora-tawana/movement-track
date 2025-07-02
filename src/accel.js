// src/accel.js

export function startAccel() {
    if (typeof DeviceMotionEvent?.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then((permissionState) => {
                if (permissionState === "granted") {
                    window.addEventListener("devicemotion", handleMotion);
                } else {
                    alert("Permission denied for accelerometer.");
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("devicemotion", handleMotion);
    }
}

function handleMotion(event) {
    const acc = event.accelerationIncludingGravity;
    document.getElementById("accel-output").textContent =
        `X: ${acc.x?.toFixed(2)}, Y: ${acc.y?.toFixed(2)}, Z: ${acc.z?.toFixed(2)}`;
}
