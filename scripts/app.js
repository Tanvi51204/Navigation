// Building codes mapped to internal building IDs
const buildingCodes = {
    ECE: 'building1',
    CSE: 'building2',
    MAE: 'building3',
    IT: 'building1'
    // Add more building codes as necessary
};

// Room-to-floor mappings for each building
const roomData = {
    building1: [
        { range: [101, 116], floor: 'Ground Floor' },
        { range: [201, 215], floor: 'First Floor' },
        { range: [301, 315], floor: 'Second Floor' }
        // Add more ranges for building1 (ECE)
    ],
    building2: [
        { range: [101, 110], floor: 'floor1' },
        { range: [201, 210], floor: 'floor2' }
        // Add more ranges for building2 (CS)
    ],
    building3: [
        { range: [101, 120], floor: 'floor1' },
        { range: [201, 220], floor: 'floor2' },
        { range: [301, 330], floor: 'floor3' }
        // Add more ranges for building3 (ME)
    ]
};
let selectedBuilding = '';

function selectBuilding(buildingCode) {
    // Store the selected building for further room number lookup
    selectedBuilding = buildingCode.toUpperCase();

    // Display the room number input field after selecting a building
    document.getElementById('room-input').style.display = 'block';
    document.getElementById('floor-plan-container').style.display = 'none'; // Hide floor plan for now
}

// Function to find which floor a room belongs to
// function findFloor() {
//     const input = document.getElementById('room-number').value;
//     const floorPlanContainer = document.getElementById('floor-plan-container');

//     if (input) {
//         let buildingCode = '';
//         let roomNumberStr = '';

//         // Check if the input contains a space (e.g., "ECE 309")
//         if (input.includes(' ')) {
//             [buildingCode, roomNumberStr] = input.split(' ');
//         } else {
//             // If no space, split at the point where numbers start (e.g., "it115" → "it" and "115")
//             const firstDigitIndex = input.search(/\d/);  // Find where the first digit occurs
//             if (firstDigitIndex !== -1) {
//                 buildingCode = input.slice(0, firstDigitIndex);  // Extract the building code (before the digits)
//                 roomNumberStr = input.slice(firstDigitIndex);  // Extract the room number (digits part)
//             }
//         }

//         const roomNumber = parseInt(roomNumberStr, 10);

//         // Convert building code to uppercase
//         const upperBuildingCode = buildingCode.toUpperCase();

//         // Look up the building based on the building code
//         const building = buildingCodes[upperBuildingCode];

//         if (building && !isNaN(roomNumber)) {
//             // Find the corresponding floor for the room number within a range
//             const floorMapping = roomData[building].find(rangeData => 
//                 roomNumber >= rangeData.range[0] && roomNumber <= rangeData.range[1]
//             );

//             if (floorMapping) {
//                 const floor = floorMapping.floor;
//                 // Display corresponding floor plan
//                 floorPlanContainer.innerHTML = `<img src="buildings/${building} ${floor}.jpg" alt="Floor Plan">`;
//             } else {
//                 floorPlanContainer.innerHTML = `<p>Room number not found within any floor range. Please check the input.</p>`;
//             }
//         } else {
//             floorPlanContainer.innerHTML = `<p>Invalid building or room number. Please check your input.</p>`;
//         }
//     } else {
//         floorPlanContainer.innerHTML = `<p>Please enter a valid room number.</p>`;
//     }
// }

function findFloor() {
    const roomNumberStr = document.getElementById('room-number').value;
    const roomNumber = parseInt(roomNumberStr, 10);
    const floorPlanContainer = document.getElementById('floor-plan-container');

    if (!selectedBuilding || isNaN(roomNumber)) {
        floorPlanContainer.innerHTML = `<p>Invalid input. Please select a building and enter a valid room number.</p>`;
        return;
    }

    // Look up the building from the stored value
    const building = buildingCodes[selectedBuilding];

    if (building) {
        // Find the corresponding floor for the room number within the building
        const floorMapping = roomData[building].find(rangeData => 
            roomNumber >= rangeData.range[0] && roomNumber <= rangeData.range[1]
        );

        if (floorMapping) {
            const floor = floorMapping.floor;
            // Display the corresponding floor plan
            floorPlanContainer.innerHTML = `<img src="buildings/${building} ${floor}.jpg" alt="Floor Plan">`;
            floorPlanContainer.style.display = 'block';
        } else {
            floorPlanContainer.innerHTML = `<p>Room number not found. Please check the input.</p>`;
            floorPlanContainer.style.display = 'block';
        }
    } else {
        floorPlanContainer.innerHTML = `<p>Invalid building. Please check your input.</p>`;
        floorPlanContainer.style.display = 'block';
    }
}