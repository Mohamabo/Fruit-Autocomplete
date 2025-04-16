const input = document.querySelector('#fruit'); // Input field for fruit search
const suggestions = document.querySelector('.suggestions ul'); // Suggestions list to display search results

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu']; 

function search(str) {
	let results = []; // Initialize an empty array to hold search results
	const lowerCaseStr = str.toLowerCase(); // Convert search string to lowercase for case-insensitive comparison

	results = fruit.filter(fruitName => 
		fruitName.toLowerCase().includes(lowerCaseStr)
	); // Filter the fruit array to find matches

	return results; // Return the filtered results
} 

function searchHandler(e) {
	const inputVal = e.target.value.toLowerCase(); // Get the current value of the input field and convert it to lowercase
	const results = search(inputVal); // Call the search function with the input value to get matching results

	showSuggestions(results, inputVal); // Display the suggestions based on the search results
	if (inputVal === '') {
		suggestions.innerHTML = '';  // Clear suggestions if input is empty
		return; // Exit early if input is empty 
	}
} // searchHandler function handles the input event

function showSuggestions(results, inputVal) {
    // Clear previous suggestions
    suggestions.innerHTML = '';

    // If no results, show "No results found"
    if (results.length === 0) {
        suggestions.innerHTML = '<li>No results found</li>';
        return;
    }

    // Add each result as a separate <li> element
    results.forEach(result => {
        const li = document.createElement('li');

        // Highlight the matching part of the result
        const regex = new RegExp(`(${inputVal})`, 'gi'); // Case-insensitive match
        const highlightedText = result.replace(regex, '<strong>$1</strong>');
        li.innerHTML = highlightedText; // Use innerHTML to include <strong> tags

        // Add hover and click events
        li.addEventListener('mouseover', () => li.classList.add('highlight'));
        li.addEventListener('mouseout', () => li.classList.remove('highlight'));
        li.addEventListener('click', () => {
            input.value = result; // Set input value to the clicked suggestion
            suggestions.innerHTML = ''; // Clear suggestions after selection
        });

        // Append the <li> to the suggestions list
        suggestions.appendChild(li);
    });
}

function useSuggestion(e) {
	// Check if the clicked element is a suggestion (li element)
    if (e.target.tagName === 'LI') {
        // Set the input value to the clicked suggestion's text
        input.value = e.target.textContent;

        // Clear the suggestions list
        suggestions.innerHTML = '';
    }
}

input.addEventListener('keyup', searchHandler); // Listen for keyup events to trigger searchHandler
suggestions.addEventListener('click', useSuggestion); // Listen for click events on suggestions to select a suggestion

