const eventDetails = {
    wedding: {
        title: 'Wedding Events',
        image: 'wedding.jpg',
        description: 'Description for Wedding events goes here.',
        subEvents: ['Haldi', 'Engagement', 'Reception']
    },
    festival: {
        title: 'Festival Events',
        image: 'festival.jpg',
        description: 'Description for Festival events goes here.',
        subEvents: ['Opening Ceremony', 'Cultural Events', 'Closing Ceremony']
    },
    sports: {
        title: 'Sports Events',
        image: 'sports.jpg',
        description: 'Description for Sports events goes here.',
        subEvents: ['Football Match', 'Basketball Tournament', 'Athletics Meet']
    },
    party: {
        title: 'Party Events',
        image: 'party.jpg',
        description: 'Description for Party events goes here.',
        subEvents: ['Birthday Bash', 'Theme Party', 'New Year Celebration']
    }
};

function openEvent(eventType) {
    const eventDetail = eventDetails[eventType.toLowerCase()];

    document.getElementById('modalTitle').innerText = eventDetail.title;
    document.getElementById('modalImage').src = eventDetail.image;
    document.getElementById('modalDescription').innerText = eventDetail.description;

    // Render sub-events
    const subEventsContainer = document.getElementById('subEventsContainer');
    subEventsContainer.innerHTML = '';

    if (eventDetail.subEvents && eventDetail.subEvents.length > 0) {
        const subEventsList = document.createElement('ul');
        eventDetail.subEvents.forEach(subEvent => {
            const listItem = document.createElement('li');
            listItem.innerText = subEvent;
            subEventsList.appendChild(listItem);
        });
        subEventsContainer.appendChild(subEventsList);
    }

    document.getElementById('eventDetailsModal').style.display = 'block';
}

// ... (remaining JavaScript code) ...