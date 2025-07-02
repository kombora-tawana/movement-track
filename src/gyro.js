// src/gyro.js

let lastAlpha = null;
let totalSpin = 0;

function handleOrientation(event) {
    const alpha = event.alpha; // Rotation around Z-axis

    if (lastAlpha !== null) {
        let delta = alpha - lastAlpha;

        // Handle wraparound between 0 and 360
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        totalSpin += delta;

        document.getElementById("gyro-output").textContent =
            `Spin angle: ${totalSpin.toFixed(2)}°`;

        if (Math.abs(totalSpin) >= 360) {
            document.getElementById("gyro-status").textContent =
                `Spun around ${Math.round(totalSpin / 360)} time(s)!`;
        }
    }

    lastAlpha = alpha;
}

export function startGyro() {
    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
            .then((permissionState) => {
                if (permissionState === "granted") {
                    window.addEventListener("deviceorientation", handleOrientation);
                } else {
                    alert("Permission denied for gyroscope.");
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("deviceorientation", handleOrientation);
    }
}
